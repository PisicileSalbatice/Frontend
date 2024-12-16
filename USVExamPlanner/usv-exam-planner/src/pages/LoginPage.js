import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api"; // Importă funcția login din api.js
import "../styles/LoginPage.css"; // Importă stilurile CSS

function LoginPage() {
  const navigate = useNavigate();

  // State pentru email, parola și mesajele de eroare
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Funcția pentru trimiterea cererii de autentificare
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await login(email, password);
      console.log("Login successful:", response);
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message || "Eroare la conectare cu serverul.");
    }
  };

  

  return (
    <div className="login-page">
      {/* Antet */}
      <header className="header">
        <h1>USV Exam Planner</h1>
        
      </header>

      {/* Secțiunea principală */}
      <div className="main-section">
        <div className="welcome-banner">
          <h2>Welcome to USV Exam Planner</h2>
          <p>Login to access your account</p>
        </div>
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleLogin}>
            <h3>Login Form</h3>
            <p>Enter your login credentials</p>
            {error && <p className="error">{error}</p>} {/* Mesaj de eroare */}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualizează email-ul
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualizează parola
              required
            />
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