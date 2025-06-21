import { Navigate, Outlet } from "react-router-dom";
import cookies from "js-cookie";

const ProtectedRoute = () => {
  const token = cookies.get("jwtToken") || localStorage.getItem("jwtToken");

  if (!token) {
    // No token, redirect to login
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
