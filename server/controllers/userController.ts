import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET
console.log(JWT_SECRET,"chekcing the en")
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

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Server error' });
  }
};
