import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

// Pages
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import Diary from './pages/Diary';
import Report from './pages/Report';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Simplified auth check - in real app, would use context
  const isAuthenticated = localStorage.getItem('auth') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/create-task" element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            } />
            
            <Route path="/diary" element={
              <ProtectedRoute>
                <Diary />
              </ProtectedRoute>
            } />
            
            <Route path="/report" element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;