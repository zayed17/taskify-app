import { Router } from 'express';
import { signup, login, forgotPassword, resetPassword ,googleAuth} from '../controllers/userController';


const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',resetPassword)
router.post('/google-auth',googleAuth)

export default router;

