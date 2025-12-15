import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

export function registerUser(userData) {
  return axios.post(baseURL + "register/", userData, {
    headers: { "Content-Type": "application/json" }
  });
}
