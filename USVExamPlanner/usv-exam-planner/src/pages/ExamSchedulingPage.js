import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createExamRequest } from "../api"; // Importă funcția pentru request
import "../styles/ExamSchedulingPage.css";

function ExamSchedulingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedDate, setSelectedDate] = useState("");
  const [classroom, setClassroom] = useState(""); // Classroom ID
  const [subject, setSubject] = useState("");
  const [professor, setProfessor] = useState("1"); // Default professor ID
  const email = "student@example.com"; // Înlocuiește cu email-ul utilizatorului autentificat
  const password = "password123"; // Înlocuiește cu parola utilizatorului autentificat

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const date = params.get("date");
    if (date) {
      const correctedDate = new Date(date);
      correctedDate.setMinutes(correctedDate.getMinutes() - correctedDate.getTimezoneOffset());
      const formattedDate = correctedDate.toISOString().split("T")[0];
      setSelectedDate(formattedDate);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const examRequest = {
      student_id: 1, // ID-ul studentului (modifică după caz)
      professor_id: parseInt(professor), // ID-ul profesorului
      classroom_id: parseInt(classroom), // ID-ul sălii
      requested_date: selectedDate, // Data cerută în format ISO
      subject: subject.trim(), // Materia
    };

    try {
      const response = await createExamRequest(examRequest, email, password);
      console.log("Exam request created successfully:", response);
      navigate("/exams");
    } catch (error) {
      console.error("Error creating exam request:", error);
      console.error("Error details:", error.response?.data?.detail);
      alert("Failed to create exam request. Please check the form and try again.");
    }
  };

  return (
    <div className="exam-scheduling-page">
      <header>
        <h1>Exam Schedule Request</h1>
        <nav>
          <button onClick={() => navigate("/home")}>Home</button>
        </nav>
      </header>

      <div className="form-container">
        <h2>Exam Scheduling Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Date:
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </label>

          <label>
            Classroom ID:
            <input
              type="number"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
              placeholder="Enter classroom ID"
            />
          </label>

          <label>
            Subject:
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
            />
          </label>

          <label>
            Professor ID:
            <select
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
            >
              <option value="1">Prof A</option>
              <option value="2">Prof B</option>
              <option value="3">Prof C</option>
            </select>
          </label>

          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExamSchedulingPage;
