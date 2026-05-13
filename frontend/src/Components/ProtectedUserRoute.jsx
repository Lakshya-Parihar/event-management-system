import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedUserRoute = ({ children }) => {
  const isUserLoggedIn = localStorage.getItem("user");

  return isUserLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedUserRoute;

