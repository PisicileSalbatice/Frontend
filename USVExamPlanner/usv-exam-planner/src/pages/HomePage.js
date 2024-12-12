import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../styles/HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const email = user?.email;

  const isStudentEmail = email && email.toLowerCase().endsWith("@student.usv.ro");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDayClick = (day) => {
    const date = new Date(year, month, day);
    const formattedDate = date.toISOString().split("T")[0];
    navigate(`/exam-scheduling?date=${formattedDate}`);
  };

  const handleApproval = () => {
    navigate("/request-approval");
  };

  const handleMoreRequests = () => {
    navigate("/requests");
  };

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(new Date());

  const months = [
    "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
  ];

  const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return (new Date(year, month, 1).getDay() + 6) % 7;
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prevYear) => prevYear - 1);
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prevYear) => prevYear + 1);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const daysArray = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay =
        currentDate.getDate() === day &&
        currentDate.getMonth() === month &&
        currentDate.getFullYear() === year;
      const className = isCurrentDay ? "day current-day" : "day";
      daysArray.push(
        <div
          key={`day-${day}`}
          className={className}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>
      );
    }

    return daysArray;
  };

  useEffect(() => {
    const currentDate = new Date();
    setMonth(currentDate.getMonth());
    setYear(currentDate.getFullYear());
    setCurrentDate(currentDate);
  }, []);

  return (
    <div className="home-page">
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

      <div className="banner">
        <h2>Welcome to USV Exam Planner</h2>
        <p>Plan your exams efficiently</p>
      </div>

      <div className="calendar-section">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>Previous</button>
          <h3>{months[month]} {year}</h3>
          <button onClick={handleNextMonth}>Next</button>
        </div>
        <div className="calendar-grid">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="day-name">
              {day}
            </div>
          ))}
          {generateCalendar()}
        </div>
        <div className="legend">
          <span className="legend-item pending">Pending</span>
          <span className="legend-item declined">Declined</span>
          <span className="legend-item approved">Approved</span>
        </div>
      </div>

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

      <footer className="footer">
        <p>© 2025 USV Exam Planner. All Rights Reserved.</p>
        <p>Contact Us: InfoUSV@gmail.com</p>
      </footer>
    </div>
  );
}

export default HomePage;
