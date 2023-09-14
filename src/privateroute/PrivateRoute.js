import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function PrivateRoute({ children }) {
  const { admin } = useSelector((state) => state.admin);
  return admin.uid ? children : <Navigate to="/" />;
}

export default PrivateRoute;
