// src/pages/LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate(); // Hook-ul pentru navigare

  const goToRegister = () => {
    // Navighează către pagina de Register
    navigate('/register');
  };

  const goToHome = () => {
    // Navighează către pagina de Home
    navigate('/home');
  };

  return (
    <div>
      <h2>Login Page</h2>
      <p>Welcome! Please choose an option.</p>

      {/* Butoane pentru navigare */}
      <button onClick={goToHome}>Go to Home</button>
      <button onClick={goToRegister}>Go to Register</button>
    </div>
  );
}

export default LoginPage;
