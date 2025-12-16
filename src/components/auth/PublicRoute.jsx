import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/ui/loader/Loader";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const { authUser, loading } = useAuth();

  if (loading) return <Loader fullScreen />;
  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
