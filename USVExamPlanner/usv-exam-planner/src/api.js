import axios from "axios";

// Configurare instanță Axios
const API = axios.create({
  baseURL: "https://2396-86-123-70-166.ngrok-free.app", // URL generat de ngrok
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
 * @param {string} email
 * @param {string} password
 * @returns {Promise} Detaliile cererii create
 */
const createExamRequest = async (examRequest) => {
  try {
    const response = await API.post("/exams/requests/", examRequest);
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
const deleteExamRequest = async (requestId, email, password) => {
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
 * Fetch list of professors from the backend.
 * @returns {Promise} List of professors
 */
export const fetchProfessors = async () => {
  try {
    const response = await API.get("https://2396-86-123-70-166.ngrok-free.app/professors/");
    return response.data; // Returnează lista profesorilor
  } catch (error) {
    console.error("Failed to fetch professors:", error.response?.data || error.message);
    throw error;
  }
};
async function login(email, password) {
    try {
        const response = await fetch("https://2396-86-123-70-166.ngrok-free.app/auth/login", {
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