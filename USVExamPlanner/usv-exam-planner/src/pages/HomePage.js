// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate(); // Hook-ul pentru navigare

  const goToExamScheduling = () => {
    // Navighează către pagina de programare examen
    navigate('/exam-scheduling');
  };

  const goToRequests = () => {
    // Navighează către pagina de Requests
    navigate('/requests');
  };

  const goToLogin = () => {
    // Navighează către pagina de Login
    navigate('/login');
  };

  const goToRegister = () => {
    // Navighează către pagina de Register
    navigate('/register');
  };

  return (
    <div>
      <h2>Welcome to the Home Page!</h2>
      <p>This is the home page.</p>
      <button onClick={goToExamScheduling}>Schedule Exam</button> {/* Butonul pentru programarea examenului */}
      <button onClick={goToRequests}>Go to Requests</button> {/* Butonul pentru a merge la Requests */}
      <button onClick={goToLogin}>Go to Login</button> {/* Butonul pentru a merge la Login */}
      <button onClick={goToRegister}>Go to Register</button> {/* Butonul pentru a merge la Register */}
    </div>
  );
}

export default HomePage;
