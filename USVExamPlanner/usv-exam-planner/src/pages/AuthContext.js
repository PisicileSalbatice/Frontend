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
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    return new Promise(async (resolve, reject) => {
      // Exemplu simplificat de validare
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
          // Simulează fetch-ul datelor studentului din baza de date
          const response = await fetch(`/api/users?email=${email}`);
          const data = await response.json();

          const userDetails = {
            email,
            role,
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
          };

          setUser(userDetails);
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
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
