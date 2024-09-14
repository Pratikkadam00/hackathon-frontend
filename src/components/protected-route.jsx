import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useLoginStore } from "../store/login.store";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { token } = useLoginStore();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default ProtectedRoute;
