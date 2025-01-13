import axios from "axios";

// Configurare instanță Axios
const API = axios.create({
  baseURL: "https://actively-settling-tortoise.ngrok-free.app", // URL generat de ngrok
});

// Funcții pentru interacțiunea cu backend-ul

/**
 * Login utilizator
 * @param {string} email
 * @param {string} password
 * @returns {Promise} Tokenul de acces sau mesaj de eroare
 */
export const login = async (email, password) => {
  try {
    const response = await fetch("https://actively-settling-tortoise.ngrok-free.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    console.log("Login successful:", data);
    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

export const getuserdetails = async (email) => {
  try {
    const response = await fetch(`https://actively-settling-tortoise.ngrok-free.app/exams/user/details?email=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    console.log("User details:", data);
    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};


/**
 * Obține examenele unui student
 * @param {string} email
 * @param {string} password
 * @returns {Promise} Lista de examene
 */
export const fetchStudentExams = async (studentId) => {
  try {
    const response = await fetch(`https://actively-settling-tortoise.ngrok-free.app/exams/exams/student/${studentId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch exams: ${response.status}`);
    }
    const data = await response.json(); // Parsează răspunsul
    console.log("Student exams fetched:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch student exams:", error.message);
    throw error;
  }
};





/**
 * Creare cerere de examen
 * @param {Object} examRequest Obiect cu detaliile cererii
 * @returns {Promise} Detaliile cererii create
 */
export const createExamRequest = async (examRequest, email, password) => {
  try {
    console.log("Sending API request with email:", email, "password:", password);

    const response = await API.post(
      "/exams/requests/",
      examRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: { email: email, password: password }, // Trimitem ca query params
      }
    );

    console.log("Server Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to create exam request:", error.response?.data || error.message);
    throw error;
  }
};




/**
 * Șterge o cerere de examen
 * @param {number} requestId ID-ul cererii de șters
 * @param {string} email
 * @param {string} password
 * @returns {Promise} Mesaj de succes
 */
export const deleteExamRequest = async (requestId, email, password) => {
  try {
    const response = await API.delete(`/exams/requests/${requestId}`, {
      params: { email, password },
    });
    console.log("Exam request deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to delete exam request:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch classrooms from the backend
 * @returns {Promise} List of classrooms
 */
export const fetchClassrooms = async () => {
  try {
    const response = await fetch("https://actively-settling-tortoise.ngrok-free.app/classrooms/");
    if (!response.ok) {
      throw new Error("Failed to fetch classrooms");
    }
    const data = await response.json();
    console.log("Classrooms fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    return [];
  }
};

/**
 * Fetch list of professors from the backend.
 * @returns {Promise} List of professors
 */
export const fetchProfessors = async () => {
  try {
    const response = await API.get("/professors/");
    console.log("Professors fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch professors:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obține lista de examene pentru utilizatorul curent
 * @param {number} userId - ID-ul utilizatorului
 * @returns {Promise} Lista de examene
 */
export const fetchExamsForUser = async (studentId) => {
  try {
      const response = await API.get(`/exams/exams/student/${studentId}`);
      console.log("Exams fetched:", response.data);
      return response.data;
  } catch (error) {
      console.error("Failed to fetch user exams:", error.response?.data || error.message);
      throw error;
  }
};









/**
 * Fetch all exam requests for a professor.
 * @param {number} professorId
 * @returns {Promise} List of requests
 */
export const fetchProfessorRequests = async (professorId) => {
  try {
    const response = await API.get("https://actively-settling-tortoise.ngrok-free.app/exams/requests", {
      params: { professor_id: professorId },
    });
    console.log("Requests fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch professor requests:", error);
    throw error;
  }
};

/**
 * Approve an exam request
 * @param {number} requestId - ID-ul cererii
 * @returns {Promise}
 */
export const approveRequest = async (requestId) => {
  try {
    // Obține datele utilizatorului din localStorage
    const userDetails = JSON.parse(localStorage.getItem("userdetails"));
    if (!userDetails || !userDetails.email || !userDetails.password) {
      throw new Error("User details are missing");
    }

    const email = userDetails.email;
    const password = userDetails.password;

    const url = `https://actively-settling-tortoise.ngrok-free.app/exams/requests/${requestId}/status?status=approved&email=${email}&password=${password}`;
    console.log("Approving request with URL:", url);
    console.log("password: ", userDetails.password);

    // Trimitere cerere PUT
    const response = await API.put(url);
    console.log("Request approved:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to approve request:", error);
    throw error;
  }
};


/**
 * Reject an exam request
 * @param {number} requestId - ID-ul cererii
 * @returns {Promise}
 */
export const rejectRequest = async (requestId) => {
  try {
    // Preluăm email-ul și parola din localStorage
    const email = JSON.parse(localStorage.getItem("userdetails")).email;
    const password = JSON.parse(localStorage.getItem("userdetails")).password;

    const url = `https://actively-settling-tortoise.ngrok-free.app/exams/requests/${requestId}/status?status=rejected&email=${email}&password=${password}`;
    console.log("Rejecting request with URL:", url);

    const response = await API.put(url); // Trimitere cerere PUT
    console.log("Request rejected:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to reject request:", error);
    throw error;
  }
};




/**
 * Fetch all students
 * @returns {Promise} Lista tuturor studenților
 */
export const fetchAllStudents = async () => {
  try {
    const response = await API.get("https://actively-settling-tortoise.ngrok-free.app/students/");
    console.log("Students fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch students:", error);
    throw error;
  }
};







export default {
  login,
  fetchStudentExams,
  createExamRequest,
  deleteExamRequest,
  fetchClassrooms,
  fetchProfessors,
  fetchProfessorRequests,
  approveRequest,
  rejectRequest,
  fetchAllStudents
};
