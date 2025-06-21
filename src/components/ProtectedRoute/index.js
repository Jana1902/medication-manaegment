// src/components/ProtectedRoute/index.js

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const jwtToken = localStorage.get("jwtToken");

  if (!jwtToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
