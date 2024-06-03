import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectPath?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectPath = "/login",
}) => {
  const { authenticatedUser } = useAuth();

  if (!authenticatedUser) {
    return <Navigate to={redirectPath} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
