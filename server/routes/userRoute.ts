import { Router } from 'express';
import { signup, login } from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;
