import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Importă contextul de autentificare
import "../styles/HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth(); // Preia starea de autentificare și funcția logout
  const email = user?.email; // Presupunând că `user` conține emailul utilizatorului

  // Verificăm dacă emailul se termină cu @student.usv.ro
  const isStudentEmail = email && email.toLowerCase().endsWith("@student.usv.ro");

  const handleLogout = () => {
    logout(); // Dezautentifică utilizatorul
    navigate("/login"); // Navighează la pagina de Login
  };

  const handleDayClick = (day) => {
    const date = new Date(year, month, day);
    const formattedDate = date.toISOString().split("T")[0]; // Formatăm data ca "YYYY-MM-DD"
    navigate(`/exam-scheduling?date=${formattedDate}`); // Navigăm la ExamSchedulingPage cu data ca query param
  };

  const handleApproval = () => {
    navigate("/request-approval");
  };

  const handleMoreRequests = () => {
    navigate("/requests"); // Navighează la RequestsPage
  };

  // State pentru luna și anul curent
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(new Date()); // Data curentă

  // Array pentru numele lunilor
  const months = [
    "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
  ];

  // Array pentru numele zilelor săptămânii în limba română
  const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];

  const getFirstDayOfMonth = (year, month) => {
    // Calculăm prima zi a lunii curente
    const date = new Date(year, month, 1);
    return (date.getDay() + 6) % 7; // Ajustăm pentru săptămâna care începe de luni
  };
  
  const generateDays = () => {
    const firstDay = getFirstDayOfMonth(year, month); // Prima zi a lunii (0=Luni)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Numărul de zile din lună
    const daysArray = [];
  
    // Adăugăm casete goale înainte de prima zi a lunii
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null); // Casete goale
    }
  
    // Adăugăm zilele efective din lună
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
  
    return daysArray;
  };
  
  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prevYear) => prevYear + 1); // Anul avansează corect
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };
  
  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prevYear) => prevYear - 1); // Anul scade corect
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };
  
  // Sincronizare inițială cu data curentă
  useEffect(() => {
    const currentDate = new Date();
    setMonth(currentDate.getMonth());
    setYear(currentDate.getFullYear());
    setCurrentDate(currentDate); // Actualizează data curentă
  }, []);
  

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
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>Previous</button>
          <h3>{months[month]} {year}</h3>
          <button onClick={handleNextMonth}>Next</button>
        </div>
        <div className="calendar">
          <div className="calendar-grid">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="day-name">
                {day}
              </div>
            ))}

            {generateDays().map((day, index) => {
              if (day === null) {
                return <div key={index} className="day empty"></div>;
              }

              // Verificăm dacă ziua curentă este în calendarul generat și o marcăm
              const isCurrentDay = currentDate.getDate() === day && currentDate.getMonth() === month && currentDate.getFullYear() === year;
              let className = isCurrentDay ? "current-day" : "";

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
