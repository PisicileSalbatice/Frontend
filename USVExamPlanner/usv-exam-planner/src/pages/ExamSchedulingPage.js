import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ExamSchedulingPage.css';

function ExamSchedulingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const date = params.get('date'); // Preluăm data din query param
    if (date) {
      // Corectăm data pentru a evita diferența de fus orar
      const correctedDate = new Date(date);
      correctedDate.setMinutes(correctedDate.getMinutes() - correctedDate.getTimezoneOffset()); // Ajustăm pentru a elimina diferența de fus orar
      const formattedDate = correctedDate.toISOString().split('T')[0]; // Formatează data ca YYYY-MM-DD
      setSelectedDate(formattedDate); // Setează data corectă
    }
  }, [location.search]);

  return (
    <div className="exam-scheduling-page">
      <header>
        <h1>Exam Schedule Request</h1>
        <nav>
          <button onClick={() => navigate('/home')}>Home</button>
        </nav>
      </header>

      <div className="form-container">
        <h2>Exam Scheduling Form</h2>
        <form>
          <label>
            Date:
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </label>

          <label>
            Classroom:
            <input type="text" placeholder="Enter classroom" />
          </label>

          <label>
            Subject:
            <input type="text" placeholder="Enter subject" />
          </label>

          <label>
            Professor:
            <select>
              <option value="ProfA">Prof A</option>
              <option value="ProfB">Prof B</option>
              <option value="ProfC">Prof C</option>
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