import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api/";

export function registerUser(userData) {
  return axios.post(baseURL + "register/", userData, {
    headers: { "Content-Type": "application/json" }
  });
}