import React from "react";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoute = ({ children }) => {
  return (
    <ProtectedRoute requiredRoles={["Admin Dinas Kesehatan", "Super Admin"]}>
      {children}
    </ProtectedRoute>
  );
};

export default AdminRoute;
