import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import pentru navigare
import { fetchStudentExams, fetchProfessors } from "../api";
import "../styles/MyExamsPage.css";


function MyExamsPage() {
    const [exams, setExams] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const loadData = async () => {
        try {
          const userDetails = JSON.parse(localStorage.getItem("userdetails"));
          if (!userDetails || userDetails.role !== "student") {
            throw new Error("Not authorized to view exams");
          }
  
          const email = userDetails.email;
          const password = "default_password";
  
          const examsData = await fetchStudentExams(email, password);
          const professorsData = await fetchProfessors();
  
          setExams(examsData);
          setProfessors(professorsData);
        } catch (err) {
          setError(err.message || "Failed to fetch data.");
        } finally {
          setLoading(false);
        }
      };
  
      loadData();
    }, []);
  
    const getProfessorName = (professorId) => {
      const professor = professors.find((prof) => prof.id === professorId);
      return professor ? `${professor.last_name} ${professor.first_name}` : "Unknown";
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div className="my-exams-page">
        <button className="home-button" onClick={() => navigate("/home")}>
          Home
        </button>
        <h1>My Exams</h1>
        <div className="exam-list">
          {exams.length === 0 ? (
            <p>No exams found.</p>
          ) : (
            exams.map((exam) => (
              <div key={exam.id} className="exam-item">
                <div className="professor-name">{getProfessorName(exam.professor_id)}</div>
                <div className="exam-details">
                  <p className="subject">{exam.subject}</p>
                  
                </div>
                <div className="exam-date">{exam.requested_date} </div>
                <div className={`exam-status ${exam.status?.toLowerCase()}`}>
                  {exam.status || "Pending"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
  
  export default MyExamsPage;