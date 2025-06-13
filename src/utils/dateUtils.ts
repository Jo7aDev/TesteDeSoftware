/**
 * Formata uma string de data para um formato mais legível
 */
export const formatarData = (dataString: string, formato: 'completo' | 'curto' = 'completo'): string => {
  const data = new Date(dataString);
  
  if (isNaN(data.getTime())) {
    return 'Data inválida';
  }
  
  if (formato === 'curto') {
    // Retorna apenas dia/mês
    return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}`;
  }
  
  // Formato completo com dia da semana
  const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  const dia = data.getDate();
  const mes = meses[data.getMonth()];
  const ano = data.getFullYear();
  
  return `${dia} ${mes} ${ano}`;
};

/**
 * Verifica se uma data é hoje
 */
export const eHoje = (dataString: string): boolean => {
  const data = new Date(dataString);
  const hoje = new Date();
  
  return data.getDate() === hoje.getDate() &&
    data.getMonth() === hoje.getMonth() &&
    data.getFullYear() === hoje.getFullYear();
};

/**
 * Verifica se uma data está no passado
 */
export const ePassado = (dataString: string): boolean => {
  const data = new Date(dataString);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  
  return data < hoje;
};

/**
 * Obtém um tempo relativo legível (hoje, ontem, amanhã ou data formatada)
 */
export const obterTempoRelativo = (dataString: string): string => {
  const data = new Date(dataString);
  const hoje = new Date();
  const ontem = new Date();
  const amanha = new Date();
  
  ontem.setDate(hoje.getDate() - 1);
  amanha.setDate(hoje.getDate() + 1);
  
  // Reseta as partes de tempo para comparação precisa
  hoje.setHours(0, 0, 0, 0);
  ontem.setHours(0, 0, 0, 0);
  amanha.setHours(0, 0, 0, 0);
  data.setHours(0, 0, 0, 0);
  
  if (data.getTime() === hoje.getTime()) {
    return 'Hoje';
  } else if (data.getTime() === ontem.getTime()) {
    return 'Ontem';
  } else if (data.getTime() === amanha.getTime()) {
    return 'Amanhã';
  } else {
    return formatarData(dataString);
  }
};