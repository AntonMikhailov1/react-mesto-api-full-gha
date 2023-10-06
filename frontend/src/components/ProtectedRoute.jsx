import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({ loggedIn }) {
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
