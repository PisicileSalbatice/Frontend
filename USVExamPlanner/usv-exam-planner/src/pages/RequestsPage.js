// src/pages/RequestsPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function RequestsPage() {
  const navigate = useNavigate();

  const goToApproval = () => {
    // Navighează către pagina de aprobare a cererii
    navigate('/request-approval');
  };

  const goToHome = () => {
    // Navighează către pagina Home
    navigate('/home');
  };

  return (
    <div>
      <h2>Requests Page</h2>
      <p>Click the button below to approve or reject a request.</p>
      <button onClick={goToApproval}>Go to Request Approval</button> {/* Butonul pentru a merge la aprobarea cererii */}
      <button onClick={goToHome}>Go to Home</button> {/* Butonul pentru a merge la Home */}
    </div>
  );
}

export default RequestsPage;
