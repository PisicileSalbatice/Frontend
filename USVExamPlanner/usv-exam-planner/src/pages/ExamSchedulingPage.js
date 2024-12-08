import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
<<<<<<< Updated upstream
=======
import { createExamRequest } from '../api'; 
>>>>>>> Stashed changes
import '../styles/ExamSchedulingPage.css';

function ExamSchedulingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedDate, setSelectedDate] = useState('');
<<<<<<< Updated upstream
=======
  const [classroom, setClassroom] = useState('');
  const [subject, setSubject] = useState('');
  const [professor, setProfessor] = useState('ProfA');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
=======
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !classroom || !subject) {
      setErrorMessage('All fields are required!');
      return;
    }

    const examRequest = {
      student_id: 1,
      professor_id: professor,
      classroom_id: classroom,
      requested_date: selectedDate,
      subject: subject,
    };

    try {
      const response = await createExamRequest(examRequest);
      console.log('Exam request created successfully:', response);
      setSuccessMessage('Exam scheduled successfully!');
      setErrorMessage('');
      setTimeout(() => navigate('/exams'), 2000);
    } catch (error) {
      console.error('Error creating exam request:', error);
      setErrorMessage('Failed to schedule the exam. Please try again later.');
    }
  };

  const handleReset = () => {
    setSelectedDate('');
    setClassroom('');
    setSubject('');
    setProfessor('ProfA');
  };

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        <form>
=======
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
>>>>>>> Stashed changes
          <label>
            Date:
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </label>

          <label>
            Classroom:
<<<<<<< Updated upstream
            <input type="text" placeholder="Enter classroom" />
=======
            <input
              type="text"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
              placeholder="Enter classroom"
              required
            />
>>>>>>> Stashed changes
          </label>

          <label>
            Subject:
<<<<<<< Updated upstream
            <input type="text" placeholder="Enter subject" />
=======
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              required
            />
>>>>>>> Stashed changes
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
            <button type="button" onClick={handleReset}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExamSchedulingPage;
