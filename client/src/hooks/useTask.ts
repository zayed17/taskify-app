import { useState, useEffect } from 'react';
import { useCreateTaskMutation, useGetTaskQuery, useUpdateTaskMutation ,useDeleteTaskMutation} from '../api';

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: 'Pending' | 'Completed' | 'Done';
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { data: taskList, isLoading, error,refetch } = useGetTaskQuery('');
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();


  useEffect(() => {
    if (taskList && taskList.tasks) {
      setTasks(taskList.tasks);
    }
  }, [taskList]);

  const handleAddTask = async (values: Omit<ITask, '_id'>) => {
    try {
      const newTask = await createTask(values).unwrap();
      setTasks((prevTasks) => [...prevTasks, newTask.task]);
      refetch()
    } catch (error) {
      throw new Error('Failed to add task');
    }
  };

  const handleMoveTask = async (taskId: string, newStatus: ITask['status']) => {
    try {
      await updateTask({ taskId, updatedData: { status: newStatus } }).unwrap();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      throw new Error('Failed to update task');
    }
  };

  const handleDeleteTask = async(taskId: string) => {
    await deleteTask(taskId).unwrap(); 
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  return {
    tasks,
    isLoading,
    error,
    handleAddTask,
    handleMoveTask,
    handleDeleteTask,
  };
};