import axios from "axios";

// Fungsi untuk mendapatkan base URL berdasarkan environment
const getBaseURL = () => {
  // Jika ada environment variable, gunakan itu
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Jika di production, gunakan domain yang sesuai
  if (import.meta.env.PROD) {
    // Ganti dengan domain production Anda
    return "http://localhost:7000/api";
  }

  // Default untuk development
  return "http://localhost:7000/api";
};

// Membuat instance axios dengan konfigurasi default
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000, // 30 detik timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Tambahkan token jika ada
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle error response
    if (error.response?.status === 401) {
      // Unauthorized - redirect ke login atau clear token
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;
