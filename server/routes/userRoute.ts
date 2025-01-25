import { Router } from 'express';
import { signup, login, forgotPassword, resetPassword } from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',resetPassword)

export default router;
