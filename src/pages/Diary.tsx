import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, File, Clock } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import { useTasks } from '../context/TaskContext';
import { formatDate } from '../utils/dateUtils';

const Diary: React.FC = () => {
  const navigate = useNavigate();
  const { state: { tasks } } = useTasks();
  const [currentDay] = useState(new Date());
  
  // Format current date for display
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(currentDay);
  
  // Capitalize first letter
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  
  // Filter tasks for today
  const todayString = currentDay.toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => task.dueDate === todayString);
  
  // Sample events for illustration
  const events = [
    {
      id: '1',
      title: 'REUNIÃO COM O CEO',
      time: '15:00',
      completed: false
    },
    {
      id: '2',
      title: 'PREPARAR SLIDE AULA',
      time: '17:30',
      completed: false
    },
    {
      id: '3',
      title: 'BRAINSTORMING',
      time: '21:00',
      completed: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <Header showBack />
      
      {/* Hero section */}
      <div className="bg-primary-dark text-white p-6 pb-8 rounded-b-3xl relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-secondary/30"></div>
        
        <h1 className="text-3xl font-bold mb-6">SEU DIÁRIO!</h1>
        
        <div className="flex items-start space-x-4">
          <div className="bg-accent/20 rounded-xl p-3">
            <CalendarIcon size={32} className="text-accent" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold">{capitalizedDate}</h2>
            <p className="text-primary-lighter">09:00 - 12:00 PM</p>
            <p className="text-sm text-primary-lighter mt-2 max-w-xs">
              Lorem ipsum dolor sit amet, consectuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet erat volutpat.
            </p>
          </div>
        </div>
      </div>
      
      {/* Content section */}
      <div className="p-4 mt-6">
        <h2 className="text-2xl font-bold text-primary-dark mb-4">SUA AGENDA!</h2>
        
        <div className="space-y-3">
          {events.map(event => (
            <div 
              key={event.id}
              className={`
                bg-gray-200 rounded-lg p-4 flex items-center
                ${event.completed ? 'opacity-60' : ''}
              `}
            >
              <div className={`w-6 h-6 rounded-full mr-3 flex-shrink-0 ${event.completed ? 'bg-gray-400' : 'bg-accent'}`}></div>
              
              <div className="flex-1">
                <div className="flex items-start">
                  <File size={16} className="mr-2 text-gray-600 mt-1" />
                  <div>
                    <h3 className={`font-medium ${event.completed ? 'text-gray-500' : 'text-gray-800'}`}>
                      {event.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock size={12} className="mr-1" />
                      <span>ÀS {event.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {events.length === 0 && (
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <p className="text-gray-500">Nenhum evento para hoje</p>
            </div>
          )}
        </div>
        
        {todayTasks.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-primary-dark mb-4">TAREFAS DE HOJE</h2>
            
            <div className="space-y-3">
              {todayTasks.map(task => (
                <div 
                  key={task.id}
                  className="bg-white rounded-lg p-4 shadow-sm"
                  onClick={() => navigate(`/edit-task/${task.id}`)}
                >
                  <div className="flex items-center">
                    <div className={`
                      w-3 h-3 rounded-full mr-3 flex-shrink-0
                      ${task.status === 'completed' ? 'bg-green-500' : 
                        task.status === 'inProgress' ? 'bg-blue-500' : 'bg-orange-500'}
                    `}></div>
                    <h3 className="font-medium">{task.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Navigation />
    </div>
  );
};

export default Diary;