import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  element: React.ComponentType;
  redirectTo: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element: Component, redirectTo }) => {
  const token = localStorage.getItem("userToken");

  if (token) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Component />;
};

export default PublicRoute;