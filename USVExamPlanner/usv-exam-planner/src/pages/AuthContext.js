import React, { createContext, useState, useContext } from "react";

// Creăm contextul pentru autentificare
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Inițial nu avem un utilizator logat

  const login = (email, password) => {
    // Logica ta de autentificare, de exemplu un apel API
    return new Promise((resolve, reject) => {
      if (email === "student@usv.ro" && password === "password") {
        setUser({ email });
        resolve({ email });
      } else {
        reject(new Error("Invalid credentials"));
      }
    });
  };

  const logout = () => {
    setUser(null); // La logout, resetăm userul
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};