import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { fetchProfessorRequests, approveRequest, rejectRequest, fetchAllStudents } from "../api"; // Importează funcțiile din API
import "../styles/HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // Verificăm și preluăm userdetails din localStorage
  const [userDetails, setUserDetails] = useState({ name: "", role: "" });
  const [requests, setRequests] = useState([]); // Pentru cererile profesorului
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Controlează afișarea popup-ului
  

  const moveRequestToMyExams = (request) => {
    const existingExams = JSON.parse(localStorage.getItem("my-exams-page")) || [];
    const updatedExams = [...existingExams, request];
    localStorage.setItem("my-exams-page", JSON.stringify(updatedExams));
  };

   // Adăugat pentru maparea student_id -> nume
   const [studentMap, setStudentMap] = useState({}); // Mapare student_id -> nume student

   

   useEffect(() => {
    console.log("Student Map:", studentMap);
  }, [studentMap]);

  
  

   useEffect(() => {
    const storedUser = localStorage.getItem("userdetails");
    console.log("Hai la balci:")
    console.log(localStorage);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserDetails(parsedUser);
  
      if (parsedUser.role === "professor") {
        loadRequests(parsedUser.id); // Încarcă cererile doar pentru profesori
        loadStudentMap(); // Încarcă maparea student_id -> nume student
      }
    }
  }, []);

  

  const loadRequests = async (professorId) => {
    setLoadingRequests(true);
    try {
      const data = await fetchProfessorRequests(professorId);
      console.log("Requests after fetching:", data);
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoadingRequests(false);
    }
  };
  

  const loadStudentMap = async () => {
    try {
      const response = await fetch("https://actively-settling-tortoise.ngrok-free.app/students");
      const text = await response.text();
      console.log("Raw Response:", text); // Debugging
      
      const students = JSON.parse(text);
      console.log("Parsed Students:", students); // Verificăm conversia la JSON
  
      const map = {};
      students.forEach((student) => {
        if (student.id && student.name) {
          map[student.id] = student.name;
        } else {
          console.error("Missing fields in student object:", student);
        }
      });
      
      setStudentMap(map);
      console.log("Student Map Created:", map); // Debugging
    } catch (err) {
      console.error("Failed to load student map:", err);
    }
  };
  
  
  
  const handleApprove = async (requestId) => {
    try {
      console.log(`Approving request ID: ${requestId}`);
      await approveRequest(requestId); // Actualizare status în baza de date
      // Eliminăm cererea local după aprobare
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
    } catch (err) {
      console.error("Failed to approve request:", err);
    }
  };
  
  const handleReject = async (requestId) => {
    try {
      console.log(`Rejecting request ID: ${requestId}`);
      await rejectRequest(requestId); // Actualizare status în baza de date
      // Eliminăm cererea local după respingere
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
    } catch (err) {
      console.error("Failed to reject request:", err);
    }
  };
  

  const role = userDetails.role ? userDetails.role.toLowerCase() : "unknown";
  const name = userDetails.name || "Utilizator necunoscut";

  const isStudentEmail = role === "student";
  const isProfessorEmail = role === "professor";
  const userType = isStudentEmail ? "Student" : isProfessorEmail ? "Profesor" : "Utilizator necunoscut";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleScheduleClick = () => {
    if (userDetails.role === "professor") {
      setShowPopup(true); // Afișează popup-ul
    } else {
      navigate("/exam-scheduling");
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Ascunde popup-ul
  };

  const handleDayClick = (day) => {
    const date = new Date(year, month, day);
    const formattedDate = date.toISOString().split("T")[0];
    navigate(`/exam-scheduling?date=${formattedDate}`);
  };

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(new Date());

  const months = [
    "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
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
        <div key={`day-${day}`} className={className} onClick={() => handleDayClick(day)}>
          {day}
        </div>
      );
    }

    return daysArray;
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>USV Exam Planner</h1>
        <nav className="nav-links">
          <button onClick={() => navigate("/home")}>Home</button>
          <button onClick={() => navigate("/my-exams")}>My Exams</button>
          <button onClick={handleScheduleClick}>Schedule</button>
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Logout</button>
          )}
        </nav>
        <div className="user-info">
          <span>{userType}</span>
          <span role="img" aria-label="profile: ">: </span>
          <span>{name}👤</span>
        </div>
      </header>

      <div className="banner">
        <h2>Welcome to USV Exam Planner</h2>
        <p>Plan your exams efficiently</p>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Feature Not Available</h2>
            <p>This feature is not available for professors.</p>
            <button className="close-popup" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}

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
      </div>

      {/* Section for professor requests */}
      {userDetails.role === "professor" && (
        
        <div className="requests-section">
          <h2>Requests</h2>
          {loadingRequests ? (
            <p>Loading requests...</p>
          ) : requests.length === 0 ? (
            <p>No requests found.</p>
          ) : (
            <ul className="request-list">
              {requests.map((request) => (
                  console.log("Request student ID:", request.student_id),
                  console.log("Student Map:", studentMap),
                  console.log("Resolved Student Name:", studentMap[request.student_id]),
                  
                  
                <li key={request.id} className="request-item">
                  <p><strong>Subject:</strong> {request.subject}</p>
                  <p><strong>Date:</strong> {request.requested_date}</p>
                  <p>
  <strong>Student:</strong>{" "}
  {studentMap[request.student_id] || `ID: ${request.student_id}`}
</p>

                  <p><strong>Status:</strong> {request.status || "Pending"}</p> {/* Afișează statusul */}
                  <div className="request-buttons">
                    <button onClick={() => handleApprove(request.id)}>Approve</button>
                    <button onClick={() => handleReject(request.id)}>Reject</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
