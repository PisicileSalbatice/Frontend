import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // Importă stilurile CSS

function LoginPage() {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      {/* Antet */}
      <header className="header">
        <h1>USV Exam Planner</h1>
        <nav className="nav-links">
          <button onClick={() => navigate('/home')}>Home</button>
          <button onClick={goToRegister}>Register</button>
        </nav>
      </header>

      {/* Secțiunea principală */}
      <div className="main-section">
        <div className="welcome-banner">
          <h2>Welcome to USV Exam Planner</h2>
          <p>Login to access your account</p>
        </div>
        <div className="login-form-container">
          <form className="login-form">
            <h3>Login Form</h3>
            <p>Enter your login credentials</p>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Universitatea Ștefan cel Mare Suceava</p>
      </footer>
    </div>
  );
}

export default LoginPage;
