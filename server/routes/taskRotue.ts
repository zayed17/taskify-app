import { Router } from 'express';
import { createTask ,listTask,updateTask,deleteTask} from '../controllers/taskController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/create-task',authMiddleware, createTask);
router.get('/list-task',authMiddleware, listTask);
router.patch('/update-task/:taskId',authMiddleware, updateTask);
router.delete('/delete-task/:taskId',authMiddleware, deleteTask);


export default router;
