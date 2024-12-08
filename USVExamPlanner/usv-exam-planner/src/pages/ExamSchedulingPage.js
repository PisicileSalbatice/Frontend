import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createExamRequest } from '../api'; // Ensure you import the createExamRequest function
import '../styles/ExamSchedulingPage.css';

function ExamSchedulingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedDate, setSelectedDate] = useState('');
  const [classroom, setClassroom] = useState('');
  const [subject, setSubject] = useState('');
  const [professor, setProfessor] = useState('ProfA');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const date = params.get('date');
    if (date) {
      const correctedDate = new Date(date);
      correctedDate.setMinutes(correctedDate.getMinutes() - correctedDate.getTimezoneOffset());
      const formattedDate = correctedDate.toISOString().split('T')[0];
      setSelectedDate(formattedDate);
    }
  }, [location.search]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const examRequest = {
      student_id: 1, // Replace with actual student ID (probably from the auth context or user info)
      professor_id: professor, // Use the selected professor
      classroom_id: classroom, // Use the input classroom
      exam_date: selectedDate, // Use the selected date
      subject: subject, // Use the input subject
    };

    try {
      const response = await createExamRequest(examRequest);
      console.log('Exam request created successfully:', response);
      // Navigate to another page or show a success message
      navigate('/exams');
    } catch (error) {
      console.error('Error creating exam request:', error);
      // Handle error (display a message, etc.)
    }
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
            Classroom:
            <input
              type="text"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
              placeholder="Enter classroom"
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
            Professor:
            <select
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
            >
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
