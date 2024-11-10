// src/pages/LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // Importă stilurile CSS din folderul styles

function LoginPage() {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <p>Log into your account or choose an option below.</p>

      {/* Formular pentru Login */}
      <form className="login-form">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" placeholder="Enter username" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter password" />

        <button type="button">Login</button>
      </form>

      {/* Butoane de navigare */}
      <div className="login-buttons">
        <button onClick={goToHome}>Go to Home</button>
        <button onClick={goToRegister}>Go to Register</button>
      </div>
    </div>
  );
}

export default LoginPage;
