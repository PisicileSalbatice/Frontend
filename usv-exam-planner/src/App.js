import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importă paginile
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RequestsPage from "./pages/RequestsPage";
import RequestApprovalPage from "./pages/RequestApprovalPage";
import ExamSchedulingPage from "./pages/ExamSchedulingPage";

// Importă AuthProvider din context
import { AuthProvider } from "./pages/AuthContext"; // Asigură-te că importi corect
import MyExamsPage from "./pages/MyExamsPage";


function App() {
  return (
    // Învelește aplicația cu AuthProvider
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta pentru pagina de Home */}
          <Route path="/home" element={<HomePage />} />

           {/* Ruta pentru pagina de Home */}
           <Route path="/my-exams" element={<MyExamsPage />} />

          {/* Rutele pentru Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rutele pentru Requests și Request Approval */}
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/request-approval" element={<RequestApprovalPage />} />

          {/* Ruta pentru programarea examenelor */}
          <Route path="/exam-scheduling" element={<ExamSchedulingPage />} />

          {/* Redirecționare implicită către Login */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
