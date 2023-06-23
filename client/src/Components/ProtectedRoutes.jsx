import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

function ProtectedRoutes() {
  const { isAuthenticated, loading } = useAuth();
  
  if(loading) return <h1></h1>
  if (!loading && !isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}

export default ProtectedRoutes;
