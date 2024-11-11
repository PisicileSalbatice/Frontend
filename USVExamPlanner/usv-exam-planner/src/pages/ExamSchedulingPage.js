import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ExamSchedulingPage.css'; // Importă stilurile CSS din folderul styles

function ExamSchedulingPage() {
  const navigate = useNavigate();

  return (
    <div className="scheduling-container">
      <h1>Exam Schedule Request Form</h1>
      <p>Please fill out the following details to request an exam schedule</p>

      {/* Form for Scheduling */}
      <form className="scheduling-form">
        <div className="input-group">
          <label htmlFor="professor">Professor</label>
          <select id="professor" name="professor" className="dropdown">
            <option value="">Select a professor</option>
            <option value="prof-a">Prof. A</option>
            <option value="prof-b">Prof. B</option>
            <option value="prof-c">Prof. C</option>
            <option value="prof-d">Prof. D</option>
            <option value="prof-e">Prof. E</option>
          </select>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" placeholder="Select date from calendar" />
          </div>
          <div className="input-group">
            <label htmlFor="classroom">Classroom</label>
            <input type="text" id="classroom" name="classroom" placeholder="Enter your classroom" />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="Enter the subject" />
          </div>
          <div className="input-group">
            <label htmlFor="time">Time</label>
            <input type="time" id="time" name="time" placeholder="Enter the time" />
          </div>
        </div>

        <div className="button-row">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="reset" className="reset-btn">Reset</button>
        </div>
      </form>

      <div className="confirmation">
        <p>Your request has been successfully submitted. Thank you!</p>
      </div>
    </div>
  );
}

export default ExamSchedulingPage;
