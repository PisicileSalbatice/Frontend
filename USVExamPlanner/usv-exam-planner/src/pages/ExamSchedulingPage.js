import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createExamRequest, fetchProfessors, fetchClassrooms } from '../api';
import '../styles/ExamSchedulingPage.css';

function ExamSchedulingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedDate, setSelectedDate] = useState('');
  const [classroom, setClassroom] = useState('');
  const [subject, setSubject] = useState('');
  const [professor, setProfessor] = useState('');
  const [professors, setProfessors] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Încarcă lista de profesori
  useEffect(() => {
    const loadProfessors = async () => {
      try {
        const professorList = await fetchProfessors();
        if (Array.isArray(professorList)) {
          setProfessors(professorList);
        } else {
          console.error('Professors data is not an array.');
        }
      } catch (error) {
        console.error('Error fetching professors:', error);
      }
    };

    loadProfessors();
  }, []);

  // Încarcă lista de clase
  useEffect(() => {
    const loadClassrooms = async () => {
      try {
        const classroomList = await fetchClassrooms();
        console.log('Fetched classrooms:', classroomList); // Debug

        if (Array.isArray(classroomList)) {
          setClassrooms(classroomList);
        } else {
          console.error('Classroom data is not an array.');
        }
      } catch (error) {
        console.error('Error fetching classrooms:', error);
      }
    };

    loadClassrooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne reîncărcarea paginii
  
    // Validare pentru câmpurile obligatorii
    if (!selectedDate || !classroom || !subject || !professor) {
      setErrorMessage('All fields are required!');
      return;
    }

    const student=JSON.parse(localStorage.getItem("userdetails"));
    

    const examRequest = {
      student_id: student.id,
      professor_id: professor,
      classroom_id: classroom,
      requested_date: selectedDate,
      subject,
    };
    console.log(examRequest);

    try {
      await createExamRequest(examRequest);
      setSuccessMessage('Exam scheduled successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error scheduling exam:', error);
      setErrorMessage('Failed to schedule the exam.');
    }
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

          <select
  value={classroom}
  onChange={(e) => setClassroom(e.target.value)}
  required
>
  {classrooms.length > 0 ? (
    classrooms.map((cls) => (
      <option key={cls.id} value={cls.id}>
        {`${cls.short_name} (${cls.building_name})`}
      </option>
    ))
  ) : (
    <option value="">No classrooms available</option>
  )}
</select>

          <label>
            Subject:
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </label>

          <label>
            Professor:
            <select
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
              required
            >
              {professors.length > 0 ? (
                professors.map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {`${prof.last_name} ${prof.first_name}`}
                  </option>
                ))
              ) : (
                <option value="">No professors available</option>
              )}
            </select>
          </label>

          <div className="form-buttons">
          <button type="button" onClick={handleReset}>Reset</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExamSchedulingPage;
