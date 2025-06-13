import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
  showNotification?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false, 
  showMenu = true,
  showNotification = true 
}) => {
  const navigate = useNavigate();
  const { state: { user }, logout } = useAuth();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="sticky top-0 z-10 bg-primary-dark text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBack && (
            <button 
              onClick={handleBack}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary-light/30 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          
          {showMenu && (
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary-light/30 transition-colors">
              <Menu size={24} />
            </button>
          )}
          
          {title && (
            <h1 className="text-xl font-bold">{title}</h1>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {showNotification && (
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary-light/30 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>
            </button>
          )}
          
          {user && (
            <div className="text-sm font-medium">
              <span className="hidden md:inline mr-2">Olá, </span>
              <span>{user.username}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;