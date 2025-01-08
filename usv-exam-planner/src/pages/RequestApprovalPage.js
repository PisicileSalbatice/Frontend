// src/pages/RequestApprovalPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RequestApprovalPage() {
  const [decision, setDecision] = useState(null);
  const navigate = useNavigate();

  const handleAccept = () => {
    setDecision('accepted');
    setTimeout(() => {
      alert('Request Accepted');
      navigate('/requests'); // Redirecționează la Requests după acceptare
    }, 500); // Așteaptă 500ms pentru a simula procesul de acceptare
  };

  const handleReject = () => {
    setDecision('rejected');
    setTimeout(() => {
      alert('Request Rejected');
      navigate('/requests'); // Redirecționează la Requests după refuz
    }, 500); // Așteaptă 500ms pentru a simula procesul de refuzare
  };

  return (
    <div>
      <h2>Request Approval</h2>
      <p>Are you sure you want to approve or reject this request?</p>
      <button onClick={handleAccept} disabled={decision !== null}>Accept</button>
      <button onClick={handleReject} disabled={decision !== null}>Reject</button>

      {decision && (
        <div>
          <h3>Decision: {decision === 'accepted' ? 'Accepted' : 'Rejected'}</h3>
        </div>
      )}
    </div>
  );
}

export default RequestApprovalPage;