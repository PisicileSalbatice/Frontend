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
/*export const login = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    console.log("Login successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};
*/
/**
 * Obține examenele unui student
 * @param {string} email
 * @param {string} password
 * @returns {Promise} Lista de examene
 */
const fetchStudentExams = async (email, password) => {
  try {
    const response = await API.get("https://actively-settling-tortoise.ngrok-free.app/students/exams", {
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
 * @param {string} email
 * @param {string} password
 * @returns {Promise} Detaliile cererii create
 */
const createExamRequest = async (examRequest) => {
  const response = await fetch("https://actively-settling-tortoise.ngrok-free.app/exams/requests/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(examRequest),
  });

  return response;
};
/**
 * Șterge o cerere de examen
 * @param {number} requestId ID-ul cererii de șters
 * @param {string} email
 * @param {string} password
 * @returns {Promise} Mesaj de succes
 */
const deleteExamRequest = async (requestId, email, password) => {
  try {
    const response = await API.delete(`https://actively-settling-tortoise.ngrok-free.app/exams/requests/${requestId}`, {
      params: { email, password },
    });
    console.log("Exam request deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to delete exam request:", error.response?.data || error.message);
    throw error;
  }
};

// api.js
export async function fetchClassrooms() {
  try {
    const response = await fetch("https://actively-settling-tortoise.ngrok-free.app/classrooms/");
    if (!response.ok) {
      throw new Error('Failed to fetch classrooms');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching classrooms:', error);
    return [];
  }
}

/**
 * Fetch list of professors from the backend.
 * @returns {Promise} List of professors
 */
export const fetchProfessors = async () => {
  try {
    const response = await API.get("https://actively-settling-tortoise.ngrok-free.app/professors/");
    return response.data; // Returnează lista profesorilor
  } catch (error) {
    console.error("Failed to fetch professors:", error.response?.data || error.message);
    throw error;
  }
};
async function login(email, password) {
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
    } catch (error) {
        console.error("Error during login:", error.message);
    }
    
}
export {
    login,
    fetchStudentExams,
    createExamRequest,
    deleteExamRequest,
};