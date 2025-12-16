import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "@/components/ui/loader/Loader";
import { UnauthrizedPage } from "@/pages/unauthorizedPage/UnauthrizedPage";

export const ProtectedRoute = () => {
  const { authUser, unauthorized, loading, userProfile } = useAuth();

  if (loading) return <Loader fullScreen={true} />;
  if (!authUser) return <Navigate to={"/login"} replace />;

  // Logueado pero sin permisos
  if (unauthorized || !userProfile) {
    return <UnauthrizedPage />;
  }
  return <Outlet />;
};
