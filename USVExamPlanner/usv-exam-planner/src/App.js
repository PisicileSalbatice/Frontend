import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import RequestsPage from './pages/RequestsPage';
import RequestApprovalPage from './pages/RequestApprovalPage';
import ExamSchedulingPage from './pages/ExamSchedulingPage'; // Importă ExamSchedulingPage

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pentru Login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Ruta pentru Register */}
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Ruta pentru Home */}
        <Route path="/home" element={<HomePage />} />
        
        {/* Ruta pentru Requests */}
        <Route path="/requests" element={<RequestsPage />} />
        
        {/* Ruta pentru RequestApproval */}
        <Route path="/request-approval" element={<RequestApprovalPage />} />
        
        {/* Ruta pentru programare examen */}
        <Route path="/exam-scheduling" element={<ExamSchedulingPage />} />
        
        {/* Ruta implicită care te redirecționează la login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
