import axios from "axios";

let baseURL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach tokens to every request
axiosInstance.interceptors.request.use((config) => {
  const tokens = sessionStorage.getItem("tokens");

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

      const tokens = JSON.parse(sessionStorage.getItem("tokens") || "{}");

      try {
        const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
          refresh: tokens.refresh,
        });

        const newAccess = response.data.access;

        const newTokens = {
          access: newAccess,
          refresh: tokens.refresh,
        };

        sessionStorage.setItem("tokens", JSON.stringify(newTokens));

        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        sessionStorage.removeItem("tokens");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// Create a notes API utility object
export const notesAPI = {
  // Get all notes (flat or tree)
  getAll: (params = {}) => axiosInstance.get('notes/', { params }),
  
  // Get note by ID with children
  getById: (id) => axiosInstance.get(`notes/${id}/`),
  
  // Create note with optional parent
  create: (data) => axiosInstance.post('notes/', data),
  
  // Update note
  update: (id, data) => axiosInstance.put(`notes/${id}/`, data),
  
  // Delete note
  delete: (id) => axiosInstance.delete(`notes/${id}/`),
  
  // Get notes by tag
  getByTag: (tag) => axiosInstance.get(`notes/?tag=${tag}`),
  
  // Get top-level notes (no parent)
  getTopLevel: () => axiosInstance.get('notes/?parent__isnull=true'),
};

// The useAxios hook (for backward compatibility)
export default function useAxios() {
  return axiosInstance;
}