import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStudentExams, fetchProfessors, fetchAllStudents } from "../api";
import "../styles/MyExamsPage.css";

function MyExamsPage() {
  const [exams, setExams] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem("userdetails"));

        if (!userDetails) {
          throw new Error("User details not found.");
        }

        let examsData = [];
        if (userDetails.role === "student") {
          const email = userDetails.email;
          const password = "default_password";

          examsData = await fetchStudentExams(email, password);
        } else if (userDetails.role === "professor") {
          examsData = JSON.parse(localStorage.getItem("approved-exams")) || [];
        }

        const professorsData = await fetchProfessors();
        const studentsData = await fetchAllStudents();

        setExams(examsData);
        setProfessors(professorsData);
        setStudents(studentsData);
      } catch (err) {
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getStudentName = (studentId) => {
    const student = students.find((stud) => stud.id === studentId);
    return student ? student.name : "Unknown Student";
  };

  const getProfessorName = (professorId) => {
    const professor = professors.find((prof) => prof.id === professorId);
    return professor ? `${professor.last_name} ${professor.first_name}` : "Unknown Professor";
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
              <div className="exam-header">
                {JSON.parse(localStorage.getItem("userdetails")).role === "professor" ? (
                  <p className="student-name">
                    <strong>Student:</strong>{" "}
                    <span className="highlight">{getStudentName(exam.student_id)}</span>
                  </p>
                ) : (
                  <p className="professor-name">
                    <strong>Professor:</strong>{" "}
                    <span className="highlight">{getProfessorName(exam.professor_id)}</span>
                  </p>
                )}
              </div>
              <div className="exam-details">
                <p className="subject">
                  <strong>Subject:</strong> {exam.subject}
                </p>
                <p className={`exam-status ${exam.status}`}>
                  <strong>Status:</strong> {exam.status || "Pending"}
                </p>
              </div>
              <div className="exam-date">
                <strong>Date:</strong> {exam.requested_date}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyExamsPage;
