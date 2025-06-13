import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ArrowLeft, Mail, Lock, User, Loader2 } from 'lucide-react';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { register, state: { isLoading } } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!username.trim()) {
      newErrors.username = 'Usuário é obrigatório';
    }
    
    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 8) {
      newErrors.password = 'A senha deve ter pelo menos 8 caracteres';
    } else if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) {
      newErrors.password = 'A senha deve conter pelo menos um número e um caractere especial';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await register(username, email, password);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ form: 'Falha no registro. Tente novamente.' });
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
            <h1 className="text-3xl font-bold text-white mb-2">Crie sua conta</h1>
            <p className="text-primary-lighter">Preencha os campos abaixo para se registrar</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
            {errors.form && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-md p-3 text-sm">
                {errors.form}
              </div>
            )}
            
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="USUÁRIO"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                type="email"
                placeholder="E-MAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
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
                error={errors.password}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                type="password"
                placeholder="CONFIRMAR SENHA"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            <Button 
              type="submit" 
              variant="accent" 
              size="lg" 
              fullWidth
              disabled={isLoading}
              className="mt-6"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin mr-2" />
              ) : null}
              REGISTRAR
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-primary-lighter text-sm">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-secondary font-medium hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;