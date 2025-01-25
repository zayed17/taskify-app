import { Request, Response } from 'express';
import User from '../models/userModel';

/**
 * @description Handles task creation for a user.
 * @route       POST /api/task/create-task
 * @access      Private (only authenticated users can create tasks)
 */
export const createTask = async (req: any, res: Response) => {
  try {

    const userId = req.userId;
    const { title, description } = req.body;

    if (!userId) {
       res.status(400).json({ message: 'User ID is required' });
       return 
    }

    if (!title || !description) {
       res.status(400).json({ message: 'Title and description are required' });
       return 
    }

    const user = await User.findById(userId);

    if (!user) {
       res.status(404).json({ message: 'User not found' });
       return 
    }

    const newTask : any = {
      title,
      description,
      status: 'Pending',
      createdAt: new Date(),
    };

    user.tasks.push(newTask);
    await user.save();

    res.status(201).json({message: 'Task added successfully',task: newTask,});
  } catch (error: any) {
    res.status(500).json({ message: 'Server error',error: error.message || 'Something went wrong',});
  }
};


/**
 * @description Lists all tasks for the authenticated user.
 * @route       GET /api/task/list-tasks
 * @access      Private (only authenticated users can access their tasks)
 */
export const listTask = async (req: any, res: Response) => {
  try {
    const userId = req.userId; 

    if (!userId) {
       res.status(400).json({ success: false, message: 'User ID is required' });
       return
    }

    const user = await User.findById(userId).select('tasks');

    if (!user) {
       res.status(404).json({ success: false, message: 'User not found' });
       return
    }

    res.status(200).json({ success: true, tasks: user.tasks });
  } catch (error) {
    console.error('Error listing tasks:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve tasks' });
  }
};


/**
 * @description Updates the status of a task for the authenticated user.
 * @route       PATCH /api/task/update-task/:taskId
 * @access      Private (only authenticated users can update their tasks)
 */
export const updateTask = async (req: any, res: Response) => {
  try {
    const userId = req.userId; 
    const taskId = req.params.taskId; 
    const { status } = req.body; 

    if (!userId) {
       res.status(400).json({ success: false, message: 'User ID is required' });
       return
    }

    if (!taskId) {
       res.status(400).json({ success: false, message: 'Task ID is required' });
       return
    }

    if (!status || !['Pending', 'Completed', 'Done'].includes(status)) {
       res.status(400).json({ success: false, message: 'Valid status is required' });
       return
    }

    const user = await User.findById(userId);

    if (!user) {
       res.status(404).json({ success: false, message: 'User not found' });
       return
    }


    const task = user.tasks?.find(t => t._id.equals(taskId));

    if (!task) {
       res.status(404).json({ success: false, message: 'Task not found' });
       return
    }

    task.status = status;

    await user.save();

    res.status(200).json({ success: true, message: 'Task status updated successfully', task });

  } catch (error: any) {
    console.error('Error updating task:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message || 'Something went wrong' });
  }
};


/**
 * @description Deletes a task for the authenticated user.
 * @route       DELETE /api/task/delete-task/:taskId
 * @access      Private (only authenticated users can delete their tasks)
 */
export const deleteTask = async (req: any, res: Response) => {
  try {
    const userId = req.userId; 
    const taskId = req.params.taskId;


    if (!userId) {
       res.status(400).json({ success: false, message: 'User ID is required' });
       return
    }

    if (!taskId) {
       res.status(400).json({ success: false, message: 'Task ID is required' });
       return
    }

    const user = await User.findById(userId);

    if (!user) {
       res.status(404).json({ success: false, message: 'User not found' });
       return
    }

    const taskIndex = user.tasks.findIndex((task) => task._id.equals(taskId));

    if (taskIndex === -1) {
       res.status(404).json({ success: false, message: 'Task not found' });
       return
    }

    user.tasks.splice(taskIndex, 1);

    await user.save();

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting task:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message || 'Something went wrong' });
  }
};