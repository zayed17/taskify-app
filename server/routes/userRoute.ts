import { Router } from 'express';
import { signup, login, forgotPassword, resetPassword ,googleAuth, createFeed, listFeed,  deleteFeed} from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';


const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',resetPassword)
router.post('/google-auth',googleAuth)
router.post('/create-feed',authMiddleware,createFeed)
router.get('/list-feed',authMiddleware,listFeed)
router.delete('/delete-feed/:feedId',authMiddleware,deleteFeed)

export default router;

