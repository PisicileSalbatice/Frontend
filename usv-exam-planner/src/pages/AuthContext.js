import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Inițializare user din localStorage
    const savedUser = localStorage.getItem("userdetails");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    return new Promise(async (resolve, reject) => {
      // Validare simplificată
      if (password === "default_password") {
        let role;

        if (email.toLowerCase().includes("@student.usv.ro")) {
          role = "student";
        } else if (email.toLowerCase().includes("@usm.ro")) {
          role = "professor";
        } else {
          role = "unknown";
        }

        try {
          // Simulează fetch-ul datelor utilizatorului din baza de date
          const response = await fetch(`/api/users?email=${email}`);
          if (!response.ok) {
            throw new Error("User not found");
          }
          const data = await response.json();

          const userDetails = {
            email,
            role,
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
          };

          // Salvare utilizator în state și localStorage
          setUser(userDetails);
          localStorage.setItem("userdetails", JSON.stringify(userDetails));
          console.log("User set in AuthContext:", userDetails); // Debug
          resolve(userDetails);
        } catch (error) {
          console.error("Error fetching user data:", error);
          reject(new Error("Failed to fetch user data"));
        }
      } else {
        reject(new Error("Invalid credentials"));
      }
    });
  };

  const logout = () => {
    setUser(null); // Resetează utilizatorul
    localStorage.removeItem("userdetails"); // Șterge utilizatorul din localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
