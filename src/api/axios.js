import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // optional (for cookies / refresh tokens later)
});

/* =========================
   🔐 REQUEST INTERCEPTOR
========================= */
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

/* =========================
   🚨 RESPONSE INTERCEPTOR
========================= */
API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // 🔴 If Unauthorized
    if (error.response?.status === 401) {
      console.warn("Unauthorized - token expired or invalid");

      // Remove token
      localStorage.removeItem("token");

      // Redirect to login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;