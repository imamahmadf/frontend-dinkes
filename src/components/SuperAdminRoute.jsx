import React from "react";
import ProtectedRoute from "./ProtectedRoute";

const SuperAdminRoute = ({ children }) => {
  return <ProtectedRoute requiredRole="Super Admin">{children}</ProtectedRoute>;
};

export default SuperAdminRoute;
