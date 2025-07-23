// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <BrowserRouter>
        <Routes>
          {/* The login page is a public route */}
          <Route path="/login" element={<LoginPage />} />

          {/* The dashboard is a protected route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect any other path (like the root "/") to the dashboard, 
              which will then be checked by the ProtectedRoute */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;