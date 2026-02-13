import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const tokens = sessionStorage.getItem("tokens");

  if (tokens) {
    const access = JSON.parse(tokens).access;
    config.headers["Authorization"] = `Bearer ${access}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const tokens = JSON.parse(sessionStorage.getItem("tokens") || "{}");

      try {
        
        const response = await axios.post(baseURL + "token/refresh/", {
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


export const notesAPI = {
  getAll: (params = {}) => axiosInstance.get('notes/', { params }),
  
  getById: (id) => axiosInstance.get(`notes/${id}/`),
  
  create: (data) => axiosInstance.post('notes/', data),
  
  update: (id, data) => axiosInstance.put(`notes/${id}/`, data),
  
  delete: (id) => axiosInstance.delete(`notes/${id}/`),
  
  getTags: () => axiosInstance.get('tags/'),

  createTag: (data) => axiosInstance.post('tags/', data),

  updateTag: (id, data) => axiosInstance.put(`tags/${id}/`, data),
  
  deleteTag: (id) => axiosInstance.delete(`tags/${id}/`),
  
  assignTagToNote: (noteId, tagId) => 
    axiosInstance.post(`notes/${noteId}/add_tag/`, { tag_id: tagId }),
  removeTagFromNote: (noteId, tagId) => 
    axiosInstance.delete(`notes/${noteId}/remove_tag/`, { data: { tag_id: tagId } }),
  
  getNotesByTag: (tagId) => axiosInstance.get(`notes/?tag=${tagId}`),
};

export default function useAxios() {
  return axiosInstance;
}