import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Importă contextul de autentificare
import "../styles/HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth(); // Preia starea de autentificare și funcția logout
  const email = user?.email; // Presupunând că `user` conține emailul utilizatorului

  console.log(email); // Verifică ce email apare

  // Verificăm dacă emailul se termină cu @student.usv.ro
  const isStudentEmail = email && email.toLowerCase().endsWith("@student.usv.ro");

  const handleLogout = () => {
    logout(); // Dezautentifică utilizatorul
    navigate("/login"); // Navighează la pagina de Login
  };

  const handleDayClick = (day) => {
    const date = new Date(2025, 0, day + 1); // Generăm data pe baza zilei (luna: ianuarie 2025)
    const formattedDate = date.toISOString().split("T")[0]; // Formatăm data ca "YYYY-MM-DD"
    navigate(`/exam-scheduling?date=${formattedDate}`); // Navigăm la ExamSchedulingPage cu data ca query param
  };

  const handleApproval = () => {
    navigate("/request-approval");
  };

  const handleMoreRequests = () => {
    navigate("/requests"); // Navighează la RequestsPage
  };

  return (
    <div className="home-page">
      {/* Antet */}
      <header className="header">
        <h1>USV Exam Planner</h1>
        <nav className="nav-links">
          <button onClick={() => navigate("/home")}>Home</button>
          <button onClick={() => navigate("/my-exams")}>My Exams</button>
          <button onClick={() => navigate("/exam-scheduling")}>Schedule</button>
          
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </nav>
        <div className="search-bar">
          <input type="text" placeholder="Search in site" />
        </div>
      </header>

      {/* Banner principal */}
      <div className="banner">
        <h2>Welcome to USV Exam Planner</h2>
        <p>Plan your exams efficiently</p>
      </div>

      {/* Calendar */}
      <div className="calendar-section">
        <h3>January 2025</h3>
        <div className="calendar">
          <div className="calendar-grid">
            {Array.from({ length: 31 }, (_, index) => {
              const day = index + 1;
              let className = "";
              if (day === 4) className = "pending";
              if (day === 11) className = "declined";
              if (day === 13) className = "approved";

              return (
                <div
                  key={day}
                  className={`day ${className}`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Legenda */}
          <div className="legend">
            <span className="legend-item pending">Pending</span>
            <span className="legend-item declined">Declined</span>
            <span className="legend-item approved">Approved</span>
          </div>
        </div>
      </div>

      {/* Requests - Se afișează doar dacă utilizatorul nu are email @student.usv.ro */}
      {!isStudentEmail && (
        <div className="requests-section">
          <h3>Requests</h3>
          <div className="request-item">
            <p>
              <strong>Pascut Aurelia</strong>
            </p>
            <p>Math Exam - Group 3143b</p>
            <p>04/01/2025 | 15:00-17:00</p>
            <button onClick={handleApproval} className="approve-button">
              Approve
            </button>
            <button onClick={handleApproval} className="decline-button">
              Reject
            </button>
          </div>

          <div className="request-item">
            <p>
              <strong>Rotaru Aurelian</strong>
            </p>
            <p>Science Exam - Group 3143b</p>
            <p>13/01/2025 | 12:00-14:00</p>
            <button onClick={handleApproval} className="approve-button">
              Approve
            </button>
            <button onClick={handleApproval} className="decline-button">
              Reject
            </button>
          </div>

          <button onClick={handleMoreRequests} className="more-requests-button">
            More requests
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 USV Exam Planner. All Rights Reserved.</p>
        <p>Contact Us: InfoUSV@gmail.com</p>
      </footer>
    </div>
  );
}

export default HomePage;
