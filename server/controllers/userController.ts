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