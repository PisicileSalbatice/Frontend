// src/pages/ExamSchedulingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ExamSchedulingPage.css'; // Importă stilurile CSS din folderul styles

function ExamSchedulingPage() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div className="scheduling-container">
      <h2>Schedule an Exam</h2>
      <p>Choose your exam details below.</p>

      {/* Formular pentru Scheduling */}
      <form className="scheduling-form">
        <label htmlFor="exam-type">Exam Type:</label>
        <select id="exam-type" name="exam-type">
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="history">History</option>
        </select>

        <label htmlFor="professor">Select Professor:</label>
        <select id="professor" name="professor">
          <option value="prof-a">Prof. A</option>
          <option value="prof-b">Prof. B</option>
          <option value="prof-c">Prof. C</option>
          <option value="prof-d">Prof. D</option>
          <option value="prof-e">Prof. E</option>
        </select>

        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" />

        <label htmlFor="time">Time:</label>
        <input type="time" id="time" name="time" />

        <button type="button">Schedule</button>
      </form>

      {/* Butoane de navigare */}
      <div className="scheduling-buttons">
        <button onClick={goToHome}>Go to Home</button>
      </div>
    </div>
  );
}

export default ExamSchedulingPage;
