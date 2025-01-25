import React from 'react';
import { Form, Row, Col } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AuthInput, AuthButton } from '../components/Auth';
import TaskColumn  from '../components/TaskColumn';
import { ITask } from '../types/taskType';
import { useTasks } from '../hooks/useTask';
import { showSuccessNotification, showErrorNotification } from '../utils/notifications';
import Loader from '../components/Loader';


const TaskManagement: React.FC = () => {
  const { tasks, isLoading, error, handleAddTask, handleMoveTask, handleDeleteTask } = useTasks();
  const [taskForm] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await handleAddTask(values);
      showSuccessNotification('Task added successfully!');
      taskForm.resetFields();
    } catch (error) {
      showErrorNotification('Failed to add task', 'Something went wrong');
    }
  };

  const onDrop = async (taskId: string, newStatus: ITask['status']) => {
    try {
      await handleMoveTask(taskId, newStatus);
    } catch (error) {
      showErrorNotification('Failed to move task', 'Something went wrong');
    }
  };

  const onDelete = (taskId: string) => {
    handleDeleteTask(taskId);
    showSuccessNotification('Task Deleted', 'The task has been successfully deleted.');
  };

  if (isLoading) return <Loader />;
  
  if (error) return <div>Error fetching tasks!</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Task Management</h1>
        <div className="mb-8">
          <Form form={taskForm} onFinish={onFinish} layout="vertical" className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <Row gutter={16}>
              <Col span={12}>
                <AuthInput name="title" label="Task Title" placeholder="Enter task title" prefixIcon="name" />
              </Col>
              <Col span={12}>
                <AuthInput name="description" label="Task Description" placeholder="Enter task description" prefixIcon="name" />
              </Col>
            </Row>
            <AuthButton loading={false} text="Add Task" />
          </Form>
        </div>

        <Row gutter={[32, 32]} className="p-6">
          <TaskColumn status="Pending" tasks={tasks.filter((task) => task.status === 'Pending')} onDrop={onDrop} onDelete={onDelete} />
          <TaskColumn status="Completed" tasks={tasks.filter((task) => task.status === 'Completed')} onDrop={onDrop} onDelete={onDelete} />
          <TaskColumn status="Done" tasks={tasks.filter((task) => task.status === 'Done')} onDrop={onDrop} onDelete={onDelete} />
        </Row>
      </div>
    </DndProvider>
  );
};

export default TaskManagement;