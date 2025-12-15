import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "../ui/loader/Loader";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader fullScreen={true} />;

  if (!isAuthenticated) return <Navigate to={"/login"} replace />;
  return children;
};
