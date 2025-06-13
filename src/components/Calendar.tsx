import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  tasks?: { date: string }[];
}

const Calendar: React.FC<CalendarProps> = ({ 
  selectedDate, 
  onDateSelect,
  tasks = []
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate);
  
  // Format dates to compare
  const formatDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Get all days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Add empty days for proper alignment
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ date: null, dayOfMonth: '' });
    }
    
    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateString = formatDateString(date);
      
      // Check if there are tasks for this date
      const hasTask = tasks.some(task => task.date === dateString);
      
      days.push({
        date,
        dayOfMonth: i,
        isToday: formatDateString(date) === formatDateString(new Date()),
        isSelected: formatDateString(date) === formatDateString(selectedDate),
        hasTask
      });
    }
    
    return days;
  };

  // Get month name
  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long' });
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Get days of the week
  const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  
  // Get all days
  const days = getDaysInMonth(currentDate);

  return (
    <div className="w-full bg-white rounded-lg animate-fade-in">
      {/* Calendar header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <button 
          onClick={goToPreviousMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h3 className="font-semibold text-lg capitalize">
          {getMonthName(currentDate)} {currentDate.getFullYear()}
        </h3>
        
        <button 
          onClick={goToNextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 p-2">
        {daysOfWeek.map((day, i) => (
          <div 
            key={i} 
            className="h-7 flex items-center justify-center text-xs font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1 p-2">
        {days.map((day, i) => (
          <div
            key={i}
            onClick={() => day.date && onDateSelect(day.date)}
            className={`
              relative h-10 rounded-full flex items-center justify-center text-sm font-medium
              ${!day.date ? 'opacity-0 cursor-default' : 'cursor-pointer hover:bg-gray-100'}
              ${day.isSelected ? 'bg-secondary text-primary-dark' : ''}
              ${day.isToday && !day.isSelected ? 'bg-primary-light/20 text-primary-dark' : ''}
            `}
          >
            {day.dayOfMonth}
            {day.hasTask && (
              <div className="absolute bottom-1 w-1 h-1 bg-accent rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;