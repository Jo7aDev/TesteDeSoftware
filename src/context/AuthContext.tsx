import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { AuthState, AuthAction, User } from '../types';

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false
};

// Create context
const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}>({
  state: initialState,
  dispatch: () => null,
  login: async () => {},
  register: async () => {},
  logout: () => {}
});

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    case 'LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing auth on mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('user');
        localStorage.removeItem('auth');
      }
    }
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    dispatch({ type: 'LOADING' });
    
    try {
      // Mock API call - in a real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, accept any login
      const user: User = {
        id: '1',
        username,
        email: `${username}@example.com`
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('auth', 'true');
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR' });
      throw new Error('Login failed');
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string) => {
    dispatch({ type: 'LOADING' });
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes
      const user: User = {
        id: Date.now().toString(),
        username,
        email
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('auth', 'true');
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR' });
      throw new Error('Registration failed');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);