import React from 'react';
import { Task } from '../types';
import { FileText, MoreVertical } from 'lucide-react';
import { formatarData as formatDate } from '../utils/dateUtils';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  onStatusChange?: (id: string, status: Task['status']) => void;
}

const statusColors = {
  pending: 'bg-orange-500',
  inProgress: 'bg-blue-500',
  completed: 'bg-green-500'
};

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onClick, 
  onStatusChange 
}) => {
  // Format the date for display
  const formattedDate = formatDate(task.dueDate);
  
  // Handle status change
  const handleStatusChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onStatusChange) return;
    
    const nextStatus: Record<Task['status'], Task['status']> = {
      pending: 'inProgress',
      inProgress: 'completed',
      completed: 'pending'
    };
    
    onStatusChange(task.id, nextStatus[task.status]);
  };

  return (
    <div 
      className={`
        bg-white rounded-lg shadow-md p-4 mb-3 transition-all
        hover:shadow-lg cursor-pointer animate-fade-in
        ${task.status === 'completed' ? 'opacity-70' : 'opacity-100'}
      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-3">
          <div 
            className={`
              ${statusColors[task.status]} w-5 h-5 rounded-full mt-1
              flex-shrink-0 cursor-pointer transition-colors
              hover:ring-2 hover:ring-offset-2 hover:ring-${statusColors[task.status]}
            `}
            onClick={handleStatusChange}
          />
          <div>
            <h3 className={`font-semibold text-lg mb-1 ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FileText size={14} className="mr-1" />
              <span>{task.category}</span>
              <span className="mx-2">•</span>
              <span>{formattedDate}</span>
            </div>
            {task.description && (
              <p className="text-gray-600 text-sm line-clamp-2">{task.description}</p>
            )}
          </div>
        </div>
        <MoreVertical size={20} className="text-gray-400" />
      </div>
    </div>
  );
};

interface CompactTaskCardProps {
  task: Task;
  onClick?: () => void;
}

export const CompactTaskCard: React.FC<CompactTaskCardProps> = ({ task, onClick }) => {
  return (
    <div 
      className="flex items-center justify-between bg-white rounded-lg p-3 mb-2 shadow-sm hover:shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className={`${statusColors[task.status]} w-3 h-3 rounded-full mr-3`} />
        <span className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.title}
        </span>
      </div>
      <span className="text-xs text-gray-500">{formatDate(task.dueDate, 'short')}</span>
    </div>
  );
};