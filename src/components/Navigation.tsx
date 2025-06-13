import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, PlusCircle, ListTodo, Settings } from 'lucide-react';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: ListTodo, label: 'Diary', path: '/diary' },
    { 
      icon: PlusCircle, 
      label: 'Create', 
      path: '/create-task', 
      className: 'bg-accent text-white shadow-lg -mt-5 rounded-full p-4' 
    },
    { icon: Calendar, label: 'Report', path: '/report' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`
                flex flex-col items-center justify-center p-2
                ${item.className || ''}
                ${isActive && !item.className ? 'text-primary-dark' : 'text-gray-500'}
              `}
            >
              <Icon size={item.className ? 24 : 20} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;