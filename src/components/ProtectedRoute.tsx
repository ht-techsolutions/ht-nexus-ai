import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AuthLoading from "./AuthLoading";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <AuthLoading />;
  if (!user)
    return (
      <Navigate to='/login' replace state={{ returnUrl: location.pathname }} />
    );
  return <>{children}</>;
};

export default ProtectedRoute;
