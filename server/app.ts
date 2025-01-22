import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import userRoutes from './routes/userRoute';

dotenv.config();

const app: Application = express();

connectDB();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 1717;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
