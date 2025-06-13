export interface Usuario {
  id: string;
  nomeUsuario: string;
  email: string;
}

export interface Tarefa {
  id: string;
  titulo: string;
  categoria: string;
  dataPrazo: string;
  descricao: string;
  status: 'pendente' | 'emAndamento' | 'concluida';
  dataCriacao: string;
}

export interface EstadoAutenticacao {
  usuario: Usuario | null;
  estaAutenticado: boolean;
  carregando: boolean;
}

export type AcaoAutenticacao = 
  | { type: 'LOGIN_SUCESSO'; payload: Usuario }
  | { type: 'SAIR' }
  | { type: 'CARREGANDO' }
  | { type: 'ERRO_LOGIN' };

export interface EstadoTarefa {
  tarefas: Tarefa[];
  carregando: boolean;
  erro: string | null;
}

export type AcaoTarefa =
  | { type: 'BUSCAR_TAREFAS_SUCESSO'; payload: Tarefa[] }
  | { type: 'ADICIONAR_TAREFA'; payload: Tarefa }
  | { type: 'ATUALIZAR_TAREFA'; payload: Tarefa }
  | { type: 'EXCLUIR_TAREFA'; payload: string }
  | { type: 'CARREGANDO' }
  | { type: 'ERRO'; payload: string };