import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { TaskState, TaskAction, Task } from '../types';

// Initial state
const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null
};

// Create context
const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}>({
  state: initialState,
  dispatch: () => null,
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {}
});

// Reducer function
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'FETCH_TASKS_SUCCESS':
      return {
        ...state,
        tasks: action.payload,
        isLoading: false
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

// Provider component
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks from local storage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const tasks = JSON.parse(storedTasks);
        dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: tasks });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: 'Failed to load tasks' });
      }
    } else {
      // For demo, initialize with sample tasks if none exist
      const sampleTasks: Task[] = [
        {
          id: '1',
          title: 'Complete Project Proposal',
          category: 'Work',
          dueDate: '2025-05-15',
          description: 'Finish the quarterly project proposal for the management team',
          status: 'inProgress',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Schedule Team Meeting',
          category: 'Work',
          dueDate: '2025-05-10',
          description: 'Set up the weekly team sync meeting and prepare agenda',
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Grocery Shopping',
          category: 'Personal',
          dueDate: '2025-05-07',
          description: 'Buy groceries for the week',
          status: 'completed',
          createdAt: new Date().toISOString()
        }
      ];
      
      localStorage.setItem('tasks', JSON.stringify(sampleTasks));
      dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: sampleTasks });
    }
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  // Add a new task
  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  // Update an existing task
  const updateTask = (updatedTask: Task) => {
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
  };

  // Delete a task
  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  return (
    <TaskContext.Provider value={{ state, dispatch, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the task context
export const useTasks = () => useContext(TaskContext);