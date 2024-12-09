import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RequestsPage.css'; // Import the CSS file

function RequestsPage() {
  const navigate = useNavigate();

  const goToApprovalPage = (action) => {
    // Navigate to the RequestApprovalPage with the action as a query parameter
    navigate(`/request-approval?action=${action}`);
  };

  const goToHome = () => {
    navigate('/home');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="requests-page">
      {/* Header */}
      <header className="header">
        <h1>Exam Planner Requests</h1>
        <div className="nav-buttons">
          <button onClick={goToHome}>Home</button>
          <button onClick={goToProfile}>Profile</button>
        </div>
      </header>

      {/* Requests Section */}
      <div className="requests-section">
        <h2>Student Requests</h2>
        <p>View and manage all student exam planner requests</p>

        {/* Request Items */}
        <div className="request-item">
          <div className="request-details">
            <div className="student-info">
              <div className="student-avatar"></div>
              <div className="student-name">
                <p><strong>John Doe</strong></p>
                <p>Math Exam - Group 3143b</p>
                <p>02/15/2024 | 15:00-17:00</p>
              </div>
            </div>
            <div className="request-actions">
              <button
                className="reject-button"
                onClick={() => goToApprovalPage('reject')}
              >
                Reject
              </button>
              <button
                className="approve-button"
                onClick={() => goToApprovalPage('approve')}
              >
                Approve
              </button>
            </div>
          </div>
        </div>

        <div className="request-item">
          <div className="request-details">
            <div className="student-info">
              <div className="student-avatar"></div>
              <div className="student-name">
                <p><strong>Jane Smith</strong></p>
                <p>Science Exam - Group 3143b</p>
                <p>02/15/2024 | 12:00-14:00</p>
              </div>
            </div>
            <div className="request-actions">
              <button
                className="reject-button"
                onClick={() => goToApprovalPage('reject')}
              >
                Reject
              </button>
              <button
                className="approve-button"
                onClick={() => goToApprovalPage('approve')}
              >
                Approve
              </button>
            </div>
          </div>
        </div>

        {/* More requests button */}
        <button className="more-requests-button">More requests</button>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-user-info">
          <div className="user-avatar"></div>
          <div className="user-details">
            <p><strong>George Mahalu</strong></p>
            <p>Science Department</p>
            <p>Welcome to exam planner requests</p>
          </div>
        </div>
        <div className="footer-actions">
          <button onClick={handleLogout} className="logout-button">Logout</button>
          <button onClick={goToProfile} className="view-profile-button">View Profile</button>
        </div>
      </footer>
    </div>
  );
}

export default RequestsPage;