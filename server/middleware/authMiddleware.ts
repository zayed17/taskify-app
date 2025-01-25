import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface AuthRequest extends Request {
  userId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET

/**
 * @description Middleware to protect routes by checking for a valid JWT.
 */
const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.userToken;
  if (!token) {
     res.status(401).json({ message: 'Unauthorized, no token provided' });
     return
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET!);
    req.userId = (decoded as { userId: string }).userId;
    next();
  } catch (error) {
    console.error(error);
     res.status(401).json({ message: 'Invalid or expired token' });
     return
  }
};

export default authMiddleware;
