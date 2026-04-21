import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(null);

  // 🔥 Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const { data } = await api.get("/auth/profile");
        setUser(data); // ✅ FULL USER (with role)
      } catch (err) {
        console.log("Auth failed");
        localStorage.removeItem("token");
      }
    };

    loadUser();
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);

    // 🔥 fetch user after login
    const { data } = await api.get("/auth/profile");
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ User, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};