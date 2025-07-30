import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import { safeGetItem, safeSetItem, safeRemoveItem } from "../utils/storage";

export const AuthContext = createContext(); // ✅ tambahkan baris ini

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => safeGetItem("user"));
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [role, setRole] = useState(() => safeGetItem("role"));

  // Computed value untuk isAuthenticated
  const isAuthenticated = !!token && !!user;

  const login = useCallback(async (namaPengguna, password) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/user/login`,
        {
          namaPengguna,
          password,
        }
      );
      setUser(data.user);
      setToken(data.token);
      setRole(data.role);
      safeSetItem("user", data.user);
      localStorage.setItem("token", data.token);
      safeSetItem("role", data.role);
      return true; // ✅ Return true jika berhasil
    } catch (err) {
      console.error("Login gagal", err);
      return false; // ✅ Return false jika gagal
    }
  }, []);

  const logout = useCallback(() => {
    console.log("Logging out...");
    setUser(null);
    setToken(null);
    setRole(null);
    safeRemoveItem("user");
    localStorage.removeItem("token");
    safeRemoveItem("role");

    // Gunakan setTimeout untuk memastikan state sudah diupdate sebelum redirect
    setTimeout(() => {
      window.location.href = "/login?force=true";
    }, 100);
  }, []);

  const register = useCallback(
    async (nama, CleanNamaPengguna, password, role, unitKerjaId) => {
      try {
        await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/user/register`,
          {
            nama,
            namaPengguna: CleanNamaPengguna,
            password,
            role,
            unitKerjaId,
          }
        );
        console.log("Register berhasil");
      } catch (err) {
        console.error("Register gagal", err);
      }
    },
    []
  );

  // Axios interceptor untuk refresh token
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("Axios interceptor error:", error);
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const res = await axios.post(
              `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/user/refresh`,
              {},
              { withCredentials: true }
            );
            localStorage.setItem("token", res.data.accessToken);
            setToken(res.data.accessToken);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.accessToken}`;
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${res.data.accessToken}`;
            return axios(originalRequest);
          } catch (refreshErr) {
            console.error("Token refresh gagal, logout");
            logout();
          }
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, [logout, setToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        login,
        logout,
        register,
        isAuthenticated,
        setUser,
        setToken,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
