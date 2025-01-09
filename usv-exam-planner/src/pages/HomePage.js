import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../styles/HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // Verificăm și preluăm userdetails din localStorage
  const [userDetails, setUserDetails] = useState({ name: "", role: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("userdetails");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserDetails(parsedUser);
    }
  }, []);

  const role = userDetails.role ? userDetails.role.toLowerCase() : "unknown";
  const name = userDetails.name || "Utilizator necunoscut";

  const isStudentEmail = role === "student";
  const isProfessorEmail = role === "professor";
  const userType = isStudentEmail ? "Student" : isProfessorEmail ? "Profesor" : "Utilizator necunoscut";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDayClick = (day) => {
    const date = new Date(year, month, day);
    const formattedDate = date.toISOString().split("T")[0];
    navigate(`/exam-scheduling?date=${formattedDate}`);
  };

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [popupDetails, setPopupDetails] = useState(null);

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

  const openPopup = (requestDetails) => {
    setPopupDetails(requestDetails);
  };

  const closePopup = () => {
    setPopupDetails(null);
  };

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
            <button onClick={() => navigate("/login")}>Logout</button>
          )}
        </nav>
        <div className="user-info">
          <span>{userType}</span>
          <span role="img" aria-label="profile">👤</span>
          <span>{name}</span>
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
    </div>
  );
}

export default HomePage;
