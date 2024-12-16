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
    const response = await fetch(`https://actively-settling-tortoise.ngrok-free.app/exams/user/details?email=${email}`, {
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
export const fetchStudentExams = async (email, password) => {
  try {
    const response = await API.get("/students/exams", {
      params: { email, password },
    });
    console.log("Student exams:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exams:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Creare cerere de examen
 * @param {Object} examRequest Obiect cu detaliile cererii
 * @returns {Promise} Detaliile cererii create
 */
export const createExamRequest = async (examRequest) => {
  try {
    const response = await API.post("/exams/requests/", examRequest, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Exam request created:", response.data);
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

export default {
  login,
  fetchStudentExams,
  createExamRequest,
  deleteExamRequest,
  fetchClassrooms,
  fetchProfessors,
};
