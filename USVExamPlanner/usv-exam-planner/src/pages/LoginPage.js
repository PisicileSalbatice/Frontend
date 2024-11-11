// src/pages/LoginPage.js

// Import librăria React și hook-ul useNavigate din react-router-dom
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // Import stilurile CSS

function LoginPage() {
  // Definesc hook-ul useNavigate pentru navigarea între pagini
  const navigate = useNavigate();

  // Funcție pentru a naviga către pagina de înregistrare
  const goToRegister = () => {
    navigate('/register');
  };

  // Funcție pentru a naviga către pagina principală (Home)
  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div className="login-page">
      {/* Container pentru butoanele de navigare, poziționat în dreapta sus */}
      <div className="top-navigation" style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <button onClick={goToHome} className="nav-button">Home</button>
        <button onClick={goToRegister} className="nav-button">Register</button>
      </div>

      {/* Titlul și subtitlul paginii */}
      <header className="login-header">
        <h1>Welcome to USV Exam Planner</h1>
        <p>Login to access your account</p>
      </header>

      {/* Conținutul principal al paginii de login */}
      <div className="login-content">
        <div className="login-form-container">
          {/* Mici informații */}
          <h2>Login Form</h2>
          <p>Enter your login credentials</p>

          {/* Formularul de login */}
          <form className="login-form">
            {/* Câmpul pentru email */}
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />

            {/* Câmpul pentru parola */}
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />

            {/* Butonul de submit */}
            <button type="button" className="submit-button">Submit</button>
          </form>
        </div>
      </div>

      {/* Footer-ul paginii */}
      <footer className="login-footer">
        <p>© 2024 Universitatea Ștefan cel Mare Suceava</p>
      </footer>
    </div>
  );
}

// Exportăm componenta LoginPage pentru a fi folosită în alte fișiere
export default LoginPage;
