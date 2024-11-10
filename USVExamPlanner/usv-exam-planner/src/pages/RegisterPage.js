// src/pages/RegisterPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css'; // Importă stilurile CSS din folderul styles

function RegisterPage() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div className="register-container">
      <h2>Register Page</h2>
      <p>Create an account or choose an option below.</p>

      {/* Formular pentru Register */}
      <form className="register-form">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" placeholder="Enter username" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Enter email" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter password" />

        <label htmlFor="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm password" />

        <button type="button">Register</button>
      </form>

      {/* Butoane de navigare */}
      <div className="register-buttons">
        <button onClick={goToHome}>Go to Home</button>
        <button onClick={goToLogin}>Go to Login</button>
      </div>
    </div>
  );
}

export default RegisterPage;
