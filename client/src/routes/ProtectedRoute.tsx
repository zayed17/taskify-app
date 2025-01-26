import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ComponentType;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component, redirectTo }) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Component />;
};

export default ProtectedRoute;