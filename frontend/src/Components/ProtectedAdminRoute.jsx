// src/components/ProtectedAdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    // Optional: Check token expiry here
    return children;
  } catch (error) {
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin" replace />;
  }
};

export default ProtectedAdminRoute;