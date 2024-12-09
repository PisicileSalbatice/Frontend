import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createExamRequest, fetchProfessors } from '../api'; 
import '../styles/ExamSchedulingPage.css';

function ExamSchedulingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedDate, setSelectedDate] = useState('');
  const [classroom, setClassroom] = useState('');
  const [subject, setSubject] = useState('');
  const [professor, setProfessor] = useState('');
  const [professors, setProfessors] = useState([]); // State pentru profesori
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const date = params.get('date');
    if (date) {
      const correctedDate = new Date(date);
      correctedDate.setMinutes(correctedDate.getMinutes() - correctedDate.getTimezoneOffset());
      const formattedDate = correctedDate.toISOString().split('T')[0];
      setSelectedDate(formattedDate);
    }

    // Încarcă lista de profesori din backend
    const loadProfessors = async () => {
      try {
        const professorList = await fetchProfessors();
        console.log("Professors fetched:", professorList);  // Log pentru a vedea ce date primesc
  
        if (Array.isArray(professorList)) {
          setProfessors(professorList);
        } else {
          setProfessors([]);  // În caz că nu este un array
          console.error("Received data is not an array.");
        }
      } catch (error) {
        setErrorMessage("Failed to load professors.");
        console.error("Error loading professors:", error);
      }
    };
  

    loadProfessors();
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !classroom || !subject) {
      setErrorMessage('All fields are required!');
      return;
    }

    const examRequest = {
      student_id: 1,
      professor_id: professor, // ID-ul profesorului din lista încărcată
      classroom_id: classroom,
      requested_date: selectedDate,
      subject: subject,
    };

    const email = 'user@example.com'; // Exemplu, ar trebui să ai email-ul utilizatorului
    const password = 'password'; // Exemplu, ar trebui să ai parola utilizatorului

    
  };

  const handleReset = () => {
    setSelectedDate('');
    setClassroom('');
    setSubject('');
    setProfessor('');
  };

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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
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
            <input
              type="text"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
              placeholder="Enter classroom"
              required
            />
          </label>

          <label>
            Subject:
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              required
            />
          </label>

          <label>
            Professor:
            <select
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
            >
              {Array.isArray(professors) && professors.length > 0 ? (
                professors.map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {prof.name}
                  </option>
                ))
              ) : (
                <option value="">No professors available</option>
              )}
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
