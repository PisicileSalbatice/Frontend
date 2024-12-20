import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RequestsPage from './pages/RequestsPage';
import RequestApprovalPage from './pages/RequestApprovalPage';
import ExamSchedulingPage from './pages/ExamSchedulingPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pentru pagina de Home */}
        <Route path="/home" element={<HomePage />} />
        
        {/* Rutele pentru Login și Register */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Rutele pentru Requests și Request Approval */}
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/request-approval" element={<RequestApprovalPage />} />
        
        {/* Ruta pentru programarea examenelor */}
        <Route path="/exam-scheduling" element={<ExamSchedulingPage />} />

        {/* Redirecționare implicită către HomePage */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
