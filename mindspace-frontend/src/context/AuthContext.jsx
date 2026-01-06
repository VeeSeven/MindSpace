import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();
export default AuthContext;

const API_BASE = "http://127.0.0.1:8000/api"; 

export function AuthProvider({ children }) {
  const [tokens, setTokens] = useState(() => {
    const raw = localStorage.getItem("tokens");
    return raw ? JSON.parse(raw) : null;
  });

  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("tokens");
    return raw ? jwtDecode(JSON.parse(raw).access) : null;
  });

  
  const loginUser = async (username, password) => {
    try {
      const res = await axios.post(`${API_BASE}/token/`, {
        username,
        password,
      });
      if (res.status === 200) {
        const newTokens = res.data;
        setTokens(newTokens);
        setUser(jwtDecode(newTokens.access));
        localStorage.setItem("tokens", JSON.stringify(newTokens));
        return true;
      }
      return false;
    } catch (err) {
      console.error("loginUser error:", err?.response || err);
      return false;
    }
  };

  const logoutUser = () => {
    setTokens(null);
    setUser(null);
    localStorage.removeItem("tokens");
  };

  
  const refreshToken = async () => {
    try {
      if (!tokens?.refresh) throw new Error("No refresh token");
      const res = await axios.post(`${API_BASE}/token/refresh/`, {
        refresh: tokens.refresh,
      });
      if (res.status === 200) {
        const newTokens = {
          access: res.data.access,
          refresh: tokens.refresh, 
        };
        setTokens(newTokens);
        setUser(jwtDecode(newTokens.access));
        localStorage.setItem("tokens", JSON.stringify(newTokens));
        return true;
      }
    } catch (err) {
      console.warn("refreshToken failed:", err?.response || err);
      logoutUser();
      return false;
    }
  };

const registerUser = async ({ username, password, password2, email }) => {
  try {
    const body = JSON.stringify({ username, password, password2, email });

    let response = await fetch(`${API_BASE}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    console.log("Register response status:", response.status);
    const data = await response.json();

    return response.status === 201;
  } catch (error) {
    console.error("registerUser error:", error);
    return false;
  }
};

  useEffect(() => {
    if (!tokens) return;

    const interval = setInterval(() => {
      refreshToken();
    }, 4 * 60 * 1000);

    return () => clearInterval(interval);
  }, [tokens]);

  const contextData = {
    user,
    tokens,
    loginUser,
    logoutUser,
    registerUser,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
}
