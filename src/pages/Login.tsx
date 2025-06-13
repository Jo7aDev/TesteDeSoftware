import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ArrowLeft, Lock, User, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, state: { isLoading } } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary flex flex-col">
      {/* Header */}
      <div className="p-4">
        <button 
          onClick={() => navigate('/')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta!</h1>
            <p className="text-primary-lighter">Entre com suas credenciais para continuar</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-md p-3 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <Input
                  type="text"
                  placeholder="USUÁRIO"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <Input
                  type="password"
                  placeholder="SENHA"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              variant="secondary" 
              size="lg" 
              fullWidth
              disabled={isLoading}
              className="mt-6"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin mr-2" />
              ) : null}
              ENTRAR
            </Button>
            
            <div className="text-center mt-4">
              <Link to="/forgot-password" className="text-secondary text-sm hover:underline">
                ESQUECEU A SENHA?
              </Link>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-primary-lighter text-sm">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-secondary font-medium hover:underline">
                Registre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;