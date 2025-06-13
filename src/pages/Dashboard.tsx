import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { TaskCard } from '../components/TaskCard';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import { useTasks } from '../context/TaskContext';
import { Task } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { state: { tasks }, updateTask } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter tasks based on search and status
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const inProgressTasks = filteredTasks.filter(task => task.status === 'inProgress' || task.status === 'pending');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');
  
  // Handle task click
  const handleTaskClick = (taskId: string) => {
    navigate(`/edit-task/${taskId}`);
  };
  
  // Handle status change
  const handleStatusChange = (id: string, status: Task['status']) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask({ ...task, status });
    }
  };
  
  // Create new task
  const handleCreateTask = () => {
    navigate('/create-task');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Header section with search */}
      <div className="bg-primary-dark text-white">
        <Header />
        
        <div className="p-4 pb-6">
          <h1 className="text-3xl font-bold mb-1">OLÁ!</h1>
          <p className="text-primary-lighter mb-4">VOCÊ TEM UMA TAREFA</p>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar tarefas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-gray-800 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>
      </div>
      
      {/* Tasks content */}
      <div className="p-4">
        {/* In progress section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">EM ANDAMENTO</h2>
          
          {inProgressTasks.length > 0 ? (
            <div className="space-y-3">
              {inProgressTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => handleTaskClick(task.id)}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-4 text-center text-gray-500 shadow-sm">
              Nenhuma tarefa em andamento
            </div>
          )}
        </div>
        
        {/* Completed section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">TRABALHO CONCLUÍDO</h2>
          
          {completedTasks.length > 0 ? (
            <div className="space-y-3">
              {completedTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => handleTaskClick(task.id)}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-4 text-center text-gray-500 shadow-sm">
              Nenhuma tarefa concluída
            </div>
          )}
        </div>
      </div>
      
      {/* Floating action button for mobile */}
      <button
        onClick={handleCreateTask}
        className="fixed bottom-20 right-4 w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg text-white md:hidden"
      >
        <Plus size={24} />
      </button>
      
      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default Dashboard;