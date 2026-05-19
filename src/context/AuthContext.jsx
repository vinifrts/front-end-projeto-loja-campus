import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, pass) => {
    if (email === "admin@unifor.br" && pass === "admin123") {
      setUser({ name: "Admin Unifor", email, role: "admin" });
      return "admin";
    }
    if (email && pass.length >= 4) {
      setUser({ name: "Estudante Unifor", email, role: "user" });
      return "user";
    }
    return null;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}