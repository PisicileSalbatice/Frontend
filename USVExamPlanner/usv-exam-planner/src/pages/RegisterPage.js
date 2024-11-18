import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css'; // Import styles from the same folder

function RegisterPage() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div className="register-page">
      {/* Header */}
      <header className="header">
        <h1>USV Exam Planner</h1>
        <nav className="nav-links">
          <button onClick={() => navigate('/home')}>Home</button>
          <button onClick={goToLogin}>Login</button>
        </nav>
      </header>

      {/* Main Section */}
      <div className="main-section">
        <div className="welcome-banner">
          <h2>Welcome to USV Exam Planner</h2>
          <p>Create an account to get started</p>
        </div>
        <div className="register-form-container">
          <form className="register-form">
            <h3>Registration Form</h3>
            <p>Fill out the form below to create an account</p>

            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your username" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="Confirm your password" />

            <button type="submit">Register</button>
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

export default RegisterPage;
