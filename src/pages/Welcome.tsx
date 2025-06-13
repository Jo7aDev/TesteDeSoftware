import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary-dark overflow-hidden relative animate-fade-in">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-secondary opacity-80 -translate-y-1/3 translate-x-1/3"></div>
      <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-accent opacity-80 -translate-y-1/3 -translate-x-1/3"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-secondary opacity-80 translate-y-1/3 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-accent opacity-80 translate-y-1/3 -translate-x-1/3"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-white mb-2 animate-slide-up">
            BEM VINDO!
          </h1>
          <p className="text-xl text-gray-200 animate-slide-up" style={{ animationDelay: '150ms' }}>
            SEU APP DE PRODUTIVIDADE
          </p>
        </div>
        
        <div className="w-full max-w-xs space-y-4">
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => navigate('/login')}
            className="animate-slide-up font-semibold"
            style={{ animationDelay: '300ms' }}
          >
            ENTRAR
          </Button>
          
          <Button
            variant="accent"
            size="lg"
            fullWidth
            onClick={() => navigate('/register')}
            className="animate-slide-up"
            style={{ animationDelay: '450ms' }}
          >
            CRIE UMA CONTA
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;