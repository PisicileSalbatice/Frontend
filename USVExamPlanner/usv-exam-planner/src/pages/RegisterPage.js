// src/pages/RegisterPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate(); // Hook-ul pentru navigare

  const handleRegister = () => {
    // Când butonul este apăsat, redirecționează spre Home
    navigate('/home');
  };

  return (
    <div>
      <h2>Register</h2>
      <button onClick={handleRegister}>Go to Home</button>
    </div>
  );
}

export default RegisterPage;
