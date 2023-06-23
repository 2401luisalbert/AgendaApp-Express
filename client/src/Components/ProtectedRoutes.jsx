import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

function ProtectedRoutes() {
  const { isAuthenticated, loading } = useAuth();
  console.log(loading, isAuthenticated);

  if (!loading && !isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}

export default ProtectedRoutes;
