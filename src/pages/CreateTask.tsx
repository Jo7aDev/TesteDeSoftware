import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { Input, Textarea, Select } from '../components/Input';
import { Button } from '../components/Button';
import Header from '../components/Header';

const CATEGORIES = [
  { value: 'work', label: 'Trabalho' },
  { value: 'personal', label: 'Pessoal' },
  { value: 'study', label: 'Estudo' },
  { value: 'health', label: 'Saúde' },
  { value: 'other', label: 'Outro' }
];

const CreateTask: React.FC = () => {
  const navigate = useNavigate();
  const { addTask } = useTasks();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('work');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('2025');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Generate options for days
  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    label: String(i + 1).padStart(2, '0')
  }));
  
  // Generate options for months
  const monthOptions = [
    { value: '01', label: 'Janeiro' },
    { value: '02', label: 'Fevereiro' },
    { value: '03', label: 'Março' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Maio' },
    { value: '06', label: 'Junho' },
    { value: '07', label: 'Julho' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' }
  ];
  
  // Generate options for years
  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const yearValue = 2025 + i;
    return { value: String(yearValue), label: String(yearValue) };
  });
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'O título é obrigatório';
    }
    
    if (!day) {
      newErrors.day = 'Selecione o dia';
    }
    
    if (!month) {
      newErrors.month = 'Selecione o mês';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Format the due date
    const dueDate = `${year}-${month}-${day}`;
    
    // Add the task
    addTask({
      title,
      category,
      dueDate,
      description,
      status: 'pending'
    });
    
    // Navigate back to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <Header title="CRIAR NOVA TAREFA" showBack />
      
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary-dark mb-1">CRIAR NOVA</h2>
        <p className="text-gray-500 mb-6">TAREFA</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase mb-1">
              TITULO
            </label>
            <Input
              type="text"
              placeholder="NOME DO PROJETO"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
              className="bg-primary-light text-white placeholder:text-primary-lighter/70"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase mb-1">
              SELECIONE A CATEGORIA
            </label>
            <Select
              options={CATEGORIES}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-primary-light text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase mb-1">
              CALENDÁRIO
            </label>
            <div className="grid grid-cols-3 gap-2">
              <Select
                options={dayOptions}
                value={day}
                onChange={(e) => setDay(e.target.value)}
                error={errors.day}
                className="bg-primary-light text-white"
                placeholder="Dia"
              />
              <Select
                options={monthOptions}
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                error={errors.month}
                className="bg-primary-light text-white"
                placeholder="Mês"
              />
              <Select
                options={yearOptions}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-primary-light text-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase mb-1">
              ADICIONAR DESCRIÇÃO
            </label>
            <Textarea
              placeholder="DESCRIÇÃO DO PROJETO"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-primary-light text-white placeholder:text-primary-lighter/70"
            />
          </div>
          
          <div className="pt-4">
            <Button
              type="submit"
              variant="accent"
              size="lg"
              fullWidth
            >
              CRIAR NOVA TAREFA
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;