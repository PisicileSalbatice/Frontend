import React, { useState } from "react";
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

  // State pentru luna selectată
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  // Array pentru numele lunilor
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  // Array pentru numele zilelor săptămânii
  const daysOfWeek = ["D", "L", "M", "M", "J", "V", "S"];

  // Calcularea primelor zile din lună
  const getFirstDayOfMonth = () => {
    const date = new Date(year, month, 1);
    return date.getDay(); // Returnează ziua săptămânii (0=Sunday, 1=Monday, etc.)
  };

  // Generarea zilelor calendarului
  const generateDays = () => {
    const firstDay = getFirstDayOfMonth(); // Ziua săptămânii în care începe luna
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Numărul de zile din luna curentă
    const daysArray = [];

    // Adaugă zilele din luna anterioară dacă este necesar pentru completarea săptămânii
    const prevMonthDays = new Date(year, month, 0).getDate(); // Ultima zi a lunii anterioare
    let prevMonthDay = prevMonthDays - firstDay + 1; // Ziua în care să începem

    // Adăugăm zile din luna precedentă
    for (let i = firstDay; i > 0; i--) {
      daysArray.push({
        day: prevMonthDay,
        isCurrentMonth: false,
      });
      prevMonthDay++;
    }

    // Adăugăm zilele din luna curentă
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({
        day: i,
        isCurrentMonth: true,
      });
    }

    // Adăugăm zilele din luna următoare pentru completarea săptămânii
    const totalDaysInCalendar = daysArray.length;
    while (totalDaysInCalendar % 7 !== 0) {
      daysArray.push({
        day: i,
        isCurrentMonth: false,
      });
      i++;
    }

    return daysArray;
  };

  // Navigare între luni
  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
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

            {generateDays().map((item, index) => {
              const { day, isCurrentMonth } = item;
              let className = "";
              if (!isCurrentMonth) {
                className = "previous-or-next-month"; // Stil pentru zilele din luna anterioară/următoare
              }

              return (
                <div
                  key={index}
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
