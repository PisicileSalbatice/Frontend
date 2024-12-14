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

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      if (email.endsWith("@student.usv.ro")) {
        // Setăm rolul ca "student" dacă email-ul este de student
        setUser({ email, role: "student", student_id: 1 });
        resolve({ email, role: "student", student_id: 1 });
      } else if (email.endsWith("@usm.ro")) {
        // Setăm rolul ca "professor" dacă email-ul este de profesor
        setUser({ email, role: "professor", professor_id: 7116 });
        resolve({ email, role: "professor", professor_id: 7116 });
      } else {
        reject(new Error("Invalid credentials"));
      }
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
