// src/pages/ExamSchedulingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ExamSchedulingPage() {
  const navigate = useNavigate();

  const goToHome = () => {
    // Navighează înapoi la Home
    navigate('/home');
  };

  return (
    <div>
      <h2>Schedule an Exam</h2>
      <p>Choose a date and time to schedule your exam.</p>
      {/* Formularul de programare examen */}
      <form>
        <label htmlFor="exam-date">Select Exam Date:</label>
        <input type="date" id="exam-date" name="exam-date" required />
        
        <label htmlFor="exam-time">Select Exam Time:</label>
        <input type="time" id="exam-time" name="exam-time" required />
        
        <button type="submit">Schedule Exam</button>
      </form>

      {/* Buton pentru a merge înapoi la Home */}
      <button onClick={goToHome}>Go to Home</button>
    </div>
  );
}

export default ExamSchedulingPage;
