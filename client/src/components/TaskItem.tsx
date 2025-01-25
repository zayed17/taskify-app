import React, { useRef } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useDrag } from 'react-dnd';
import { ITask } from '../types/taskType';

interface TaskItemProps {
  task: ITask;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { _id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <div ref={ref}
      className={`p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-move border border-gray-200 ${
        isDragging ? 'opacity-50' : ''}`}>
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{task.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        </div>
        <button  onClick={() => onDelete(task._id)}
          className="text-gray-500 hover:text-gray-900 transition-colors duration-300 p-2 rounded-full hover:bg-gray-100" >
          <DeleteOutlined className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;