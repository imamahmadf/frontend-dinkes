import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Center, VStack, Spinner, Text } from "@chakra-ui/react";
import { hasRole, hasAnyRole, hasMinimumRole } from "../utils/roleUtils";

const ProtectedRoute = ({
  children,
  requiredRole = null,
  requiredRoles = null,
  minimumRole = null,
}) => {
  const { isAuthenticated, user, role } = useContext(AuthContext);
  const location = useLocation();

  // Loading state - bisa ditambahkan jika ada loading state dari auth
  if (isAuthenticated === undefined) {
    return (
      <Center height="100vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text>Memverifikasi autentikasi...</Text>
        </VStack>
      </Center>
    );
  }

  // Jika tidak ter-authenticate, redirect ke login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Cek role-based access control
  let hasAccess = true;
  let accessMessage = "";

  if (requiredRole) {
    hasAccess = hasRole(role, requiredRole);
    if (!hasAccess) {
      accessMessage = `Anda memerlukan role "${requiredRole}" untuk mengakses halaman ini.`;
    }
  } else if (requiredRoles) {
    hasAccess = hasAnyRole(role, requiredRoles);
    if (!hasAccess) {
      accessMessage = `Anda memerlukan salah satu role: ${requiredRoles.join(
        ", "
      )} untuk mengakses halaman ini.`;
    }
  } else if (minimumRole) {
    hasAccess = hasMinimumRole(role, minimumRole);
    if (!hasAccess) {
      accessMessage = `Anda memerlukan minimal role "${minimumRole}" untuk mengakses halaman ini.`;
    }
  }

  // Jika tidak memiliki akses yang cukup
  if (!hasAccess) {
    return (
      <Center height="100vh">
        <VStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold" color="red.500">
            Akses Ditolak
          </Text>
          <Text textAlign="center">{accessMessage}</Text>
          <Text fontSize="sm" color="gray.500">
            Role Anda:{" "}
            {role?.map((r) => r.role?.nama || r.nama).join(", ") ||
              "Tidak ada role"}
          </Text>
        </VStack>
      </Center>
    );
  }

  // Jika semua kondisi terpenuhi, render children
  return children;
};

export default ProtectedRoute;
