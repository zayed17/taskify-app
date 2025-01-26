import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import sendEmail from '../utils/sendMail';

const JWT_SECRET = process.env.JWT_SECRET

/**
 * @description Handles user signup by creating a new user in the database.
 * @route       POST /api/user/signup
 * @access      Public
 */
export const signup = async (req: Request, res: Response) => {

  const { name, email, password } = req.body;

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
       res.status(400).json({ message: 'User already exists' });
       return
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @description Handles user login by verifying the credentials and returning a JWT token.
 * @route       POST /api/user/login
 * @access      Public
 */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
       res.status(400).json({ message: 'User not found' }); 
       return 
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       res.status(400).json({ message: 'Invalid credentials' });
       return
    }


    const token = jwt.sign({ userId: user._id }, JWT_SECRET!, { expiresIn: '1h' });

    res.cookie('userToken', token, { httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, 
    });
    
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Server error' });
  }
};



/**
 * @description Handles Google authentication (login/signup).
 * @route       POST /api/user/google-auth
 * @access      Public
 */
export const googleAuth = async (req: Request, res: Response) => {
  const { email, name ,sub} = req.body;

  try {

    let user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET!, { expiresIn: '1h' });
       res.status(200).json({ token, isNewUser: false });
       return
    } else {
      const newUser = new User({
        name,
        email,
        password:sub
      });

      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, JWT_SECRET!, { expiresIn: '1h' });

      res.cookie('userToken', token, { httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000, 
      });

       res.status(201).json({ token, isNewUser: true });
       return
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




/**
 * @description Handles the forgot password request.
 * @route       POST /api/user/forgot-password
 * @access      Public
 */
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
       res.status(400).json({ success: false, message: 'Email is required' });
       return
    }

    const user = await User.findOne({ email });

    if (!user) {
       res.status(404).json({ success: false, message: 'User not found' });
       return
    }

    const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET!, { expiresIn: '1h' });

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();

    const resetLink = `${process.env.CORS_ORIGIN}/reset-password/${resetToken}`;

    await sendEmail({
      to: email,
      subject: 'Password Reset',
      text: `Click the link to reset your password: ${resetLink}`,
    });

    res.status(200).json({ success: true, message: 'Password reset link sent to your email' });
  } catch (error: any) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message || 'Something went wrong' });
  }
};


/**
 * @description Handles the password reset request.
 * @route       POST /api/user/reset-password/:token
 * @access      Public
 */
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token) {
       res.status(400).json({ success: false, message: 'Token is required' });
       return
    }

    if (!newPassword) {
       res.status(400).json({ success: false, message: 'New password is required' });
       return
    }

    const decoded: any = jwt.verify(token,JWT_SECRET!);
    const user = await User.findOne({
      _id: decoded.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
       res.status(400).json({ success: false, message: 'Invalid or expired token' });
       return
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12); 

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error: any) {
    console.error('Error in resetPassword:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message || 'Something went wrong' });
  }
};



/**
 * @description Handles feed creation for a user.
 * @route       POST /api/user/create-feed
 * @access      Private (only authenticated users can create feed)
 */

export const createFeed = async (req: any, res: Response) => {
  try {
    const { caption, imageUrl } = req.body;
    const userId = req.userId; 

    if (!caption || !imageUrl) {
       res.status(400).json({ error: 'Caption and image URL are required' });
       return 
    }

    const user = await User.findById(userId);
    if (!user) {
       res.status(404).json({ error: 'User not found' });
       return 
    }

    user.feeds.push({ imageUrl, caption });
    await user.save();

    res.status(201).json({ message: 'Feed created successfully'});
  } catch (error) {
    console.error('Error creating feed:', error);
    res.status(500).json({ error: 'Failed to create feed' });
  }
};



/**
 * @description Lists all feeds for the authenticated user.
 * @route       GET /api/user/list-feed
 * @access      Private (only authenticated users can access their feeds)
 */
export const listFeed = async (req: any, res: Response) => {
  try {
    const userId = req.userId; 
    if (!userId) {
       res.status(400).json({ success: false, message: 'User ID is required' });
       return
    }

    const user = await User.findById(userId).select('feeds');

    if (!user) {
       res.status(404).json({ success: false, message: 'User not found' });
       return
    }

    res.status(200).json({ success: true, feeds: user.feeds });
  } catch (error) {
    console.error('Error listing feeds:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve feeds' });
  }
};


/**
 * @description Deletes a feed for the authenticated user.
 * @route       DELETE /api/user/delete-feed/:feedId
 * @access      Private (only authenticated users can delete their feeds)
 */
export const deleteFeed = async (req: any, res: Response) => {
  try {
    const userId = req.userId; 
    const feedId = req.params.feedId;

    console.log("checking aoerfsdfdsf")

    if (!userId) {
       res.status(400).json({ success: false, message: 'User ID is required' });
       return
    }

    if (!feedId) {
       res.status(400).json({ success: false, message: 'Feed ID is required' });
       return
    }

    const user = await User.findById(userId);

    if (!user) {
       res.status(404).json({ success: false, message: 'User not found' });
       return
    }

    const feedIndex = user.feeds.findIndex((feed) => feed._id.equals(feedId));

    if (feedIndex === -1) {
       res.status(404).json({ success: false, message: 'Feed not found' });
       return
    }

    user.feeds.splice(feedIndex, 1);

    await user.save();

    res.status(200).json({ success: true, message: 'feed deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting feed:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message || 'Something went wrong' });
  }
};

