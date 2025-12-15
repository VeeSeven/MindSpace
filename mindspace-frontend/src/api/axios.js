import axios from "axios";
import { jwtDecode } from "jwt-decode";

let baseURL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach tokens to every request
axiosInstance.interceptors.request.use((config) => {
  const tokens = localStorage.getItem("tokens");

  if (tokens) {
    const access = JSON.parse(tokens).access;
    config.headers["Authorization"] = `Bearer ${access}`;
  }

  return config;
});

// Automatically refresh token on 401
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");

      try {
        const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
          refresh: tokens.refresh,
        });

        const newAccess = response.data.access;

        const newTokens = {
          access: newAccess,
          refresh: tokens.refresh,
        };

        localStorage.setItem("tokens", JSON.stringify(newTokens));

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${newAccess}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("tokens");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default function useAxios() {
  return axiosInstance;
}
