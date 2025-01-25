import React, { useRef } from 'react';
import { Col } from 'antd';
import { useDrop } from 'react-dnd';
import TaskItem from './TaskItem';
import { ITask } from '../types/taskType';

interface TaskColumnProps {
  status: ITask['status'];
  tasks: ITask[];
  onDrop: (taskId: string, newStatus: ITask['status']) => void;
  onDelete: (id: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ status, tasks, onDrop, onDelete }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { _id: string; status: ITask['status'] }) => {
      onDrop(item._id, status);
      return { status };
    },
  });

  drop(ref);

  return (
    <Col span={8}ref={ref}
      className="min-h-[500px] bg-white shadow-sm rounded-lg p-5 transition-all duration-300 hover:shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 uppercase tracking-wider">
        {status}
      </h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} onDelete={onDelete} />
        ))}
      </div>
      {tasks.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-400 italic">
          <p>No tasks here</p>
        </div>
      )}
    </Col>
  );
};

export default TaskColumn;