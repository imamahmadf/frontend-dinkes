import React from "react";
import ProtectedRoute from "./ProtectedRoute";

const UserRoute = ({ children }) => {
  return <ProtectedRoute requiredRole="User">{children}</ProtectedRoute>;
};

export default UserRoute;
