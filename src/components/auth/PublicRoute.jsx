import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/ui/loader/Loader";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const { authUser, loading } = useAuth();

  console.log("hola");
  if (loading) return <Loader fullScreen />;
  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};
