import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Calendar from '../components/Calendar';

const Report: React.FC = () => {
  const { state: { tasks } } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState<typeof tasks>([]);
  
  // When selected date or tasks change, filter tasks for the selected date
  useEffect(() => {
    const dateString = selectedDate.toISOString().split('T')[0];
    const filteredTasks = tasks.filter(task => task.dueDate === dateString);
    setTasksForSelectedDate(filteredTasks);
  }, [selectedDate, tasks]);
  
  // Get tasks with dates for calendar
  const tasksWithDates = tasks.map(task => ({
    date: task.dueDate
  }));
  
  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <Header title="RELATÓRIO" showBack />
      
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary-dark mb-1">RELATÓRIO</h2>
        <p className="text-gray-500 mb-6">DIÁRIO DE TAREFAS</p>
        
        {/* Calendar component */}
        <Calendar 
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          tasks={tasksWithDates}
        />
        
        {/* Tasks for selected date */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">TAREFAS</h3>
          
          {tasksForSelectedDate.length > 0 ? (
            <div className="space-y-4">
              {tasksForSelectedDate.map(task => (
                <div key={task.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-accent rounded-full mr-2"></div>
                        <h4 className="font-bold text-gray-800">{task.title.toUpperCase()}</h4>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{task.description.substring(0, 30)}...</p>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 text-sm">
                        {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <p className="text-gray-500">Nenhuma tarefa para este dia</p>
            </div>
          )}
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Report;