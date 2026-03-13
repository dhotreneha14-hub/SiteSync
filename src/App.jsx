import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import ProjectList from './pages/ProjectList';
import DPRForm from './pages/DPRForm';
import Reports from './pages/Reports';

import './App.css';

function ToasterWithTheme() {
  const { isDark } = useTheme();
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: isDark ? '#1e293b' : '#fff',
          color: isDark ? '#e2e8f0' : '#334155',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2)',
          borderRadius: '12px',
          border: isDark ? '1px solid #334155' : '1px solid #f1f5f9',
          fontWeight: '600',
          padding: '16px 20px',
        },
        success: {
          iconTheme: { primary: '#10b981', secondary: isDark ? '#1e293b' : '#fff' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: isDark ? '#1e293b' : '#fff' },
        },
      }}
    />
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/dpr" element={<DPRForm />} />
              <Route path="/reports" element={<Reports />} />
            </Route>

            <Route path="/" element={<Navigate to="/projects" replace />} />
            <Route path="*" element={<Navigate to="/projects" replace />} />
          </Routes>
          <ToasterWithTheme />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
