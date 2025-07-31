import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button, HStack } from "@chakra-ui/react";
import { RiArrowRightLine, RiMailLine } from "react-icons/ri";
import Home from "./pages/Home";
import VisiMisi from "./pages/DinasKesehatan/VisiMisi";
import TugasDanFungsi from "./pages/DinasKesehatan/TugasDanFungsi";
import Struktur from "./pages/DinasKesehatan/Struktur";
import Berkala from "./pages/PPID/Berkala";
import Publik from "./pages/PPID/Publik";
import SertaMerta from "./pages/PPID/SertaMerta";
import SetiapSaat from "./pages/PPID/SetiapSaat";
import Permohonan from "./pages/Pelayanan/Permohonan";
import CekPermohonan from "./pages/Pelayanan/CekPermohonan";
import P2P from "./pages/Bidang/P2P";
import Sekret from "./pages/Bidang/Sekret";
import SDK from "./pages/Bidang/SDK";
import Yankes from "./pages/Bidang/Yankes";
import Kesmas from "./pages/Bidang/Kesmas";
import ProfilePPID from "./pages/ProfilPPID/Profile";
import TugasDanFungsiPPID from "./pages/ProfilPPID/TugasDanFUngsiPPID";
import SOPInformasi from "./pages/SOP/SOPInformasi";
import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import Login from "./pages/Login";
import { AuthContext } from "./contexts/AuthContext";
import { safeSetItem, safeRemoveItem } from "./utils/storage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import SuperAdminRoute from "./components/SuperAdminRoute";
import TambahBerita from "./pages/Admin/Berita/TambahBerita";

function App() {
  const { logout, setToken, setUser, setRole, isAuthenticated } =
    useContext(AuthContext);
  const authCheckedRef = useRef(false);

  useEffect(() => {
    // Mencegah multiple calls
    if (authCheckedRef.current) {
      return;
    }

    let isMounted = true;
    authCheckedRef.current = true;

    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      // Jika sudah ada token dan user data, tidak perlu check auth lagi
      if (token && userData && isAuthenticated) {
        console.log("User sudah ter-authenticate, skip auth check");
        return;
      }

      if (!token) {
        console.log("cek gak token");
        if (isMounted) {
          // Jangan panggil logout() di sini untuk mencegah infinite loop
          console.log("No token found, user not authenticated");
        }
        return;
      }

      try {
        console.log("cek ada token, verifying...");
        const { data } = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/user/check-auth`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Auth check result:", data);
        if (data.isAuthenticated && isMounted) {
          setToken(token);
          setUser(data.user);
          setRole(data.user?.role);
          safeSetItem("user", data.user);
          safeSetItem("role", data.user?.role || null);
        } else if (isMounted) {
          // Jangan panggil logout() di sini untuk mencegah infinite loop
          console.log("Token invalid, clearing auth data");
          setToken(null);
          setUser(null);
          setRole(null);
          localStorage.removeItem("token");
          safeRemoveItem("user");
          safeRemoveItem("role");
        }
      } catch (err) {
        console.error("Auth check error", err);
        if (isMounted) {
          // Jangan panggil logout() di sini untuk mencegah infinite loop
          console.log("Auth check failed, clearing auth data");
          setToken(null);
          setUser(null);
          setRole(null);
          localStorage.removeItem("token");
          safeRemoveItem("user");
          safeRemoveItem("role");
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]); // Hanya re-run jika isAuthenticated berubah
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Tidak memerlukan login */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Dinas Kesehatan - Public */}
        <Route path="/dinkes/visi-misi" element={<VisiMisi />} />
        <Route path="/dinkes/tugas-fungsi" element={<TugasDanFungsi />} />
        <Route path="/dinkes/struktur" element={<Struktur />} />
        {/* PPID - Public */}
        <Route path="/informasi/berkala" element={<Berkala />} />
        <Route path="/informasi/publik" element={<Publik />} />
        <Route path="/informasi/serta-merta" element={<SertaMerta />} />
        <Route path="/informasi/setiap-saat" element={<SetiapSaat />} />
        <Route path="/ppid/profile" element={<ProfilePPID />} />
        <Route path="/ppid/tugas-dan-fungsi" element={<TugasDanFungsiPPID />} />
        {/* Protected Routes - Memerlukan login */}
        <Route
          path="/pelayanan/permohonan"
          element={
            <ProtectedRoute minimumRole="User">
              <Permohonan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pelayanan/cek-permohonan"
          element={
            <ProtectedRoute minimumRole="User">
              <CekPermohonan />
            </ProtectedRoute>
          }
        />
        {/* Admin Routes - Hanya untuk Admin Dinas Kesehatan dan Super Admin */}
        <Route
          path="/bidang/p2p"
          element={
            <AdminRoute>
              <P2P />
            </AdminRoute>
          }
        />
        <Route
          path="/bidang/sekret"
          element={
            <AdminRoute>
              <Sekret />
            </AdminRoute>
          }
        />
        <Route
          path="/bidang/sdk"
          element={
            <AdminRoute>
              <SDK />
            </AdminRoute>
          }
        />
        <Route
          path="/bidang/yankes"
          element={
            <AdminRoute>
              <Yankes />
            </AdminRoute>
          }
        />
        <Route
          path="/bidang/kesmas"
          element={
            <AdminRoute>
              <Kesmas />
            </AdminRoute>
          }
        />
        {/* User Routes - Untuk user biasa */}
        <Route
          path="/sop/pengajuan-informasi"
          element={
            <UserRoute>
              <SOPInformasi />
            </UserRoute>
          }
        />
        {/* Super Admin Routes - Hanya untuk Super Admin */}
        <Route
          path="/admin/superx"
          element={
            <SuperAdminRoute>
              <div>Super Adminxxx Dashboard</div>
            </SuperAdminRoute>
          }
        />

        <Route
          path="/admin/tambah-berita"
          element={
            <adminRoute>
              <TambahBerita />
            </adminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
