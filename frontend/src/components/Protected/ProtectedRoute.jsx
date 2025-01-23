import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserSession } from "../../hooks/useUserSession";

export const ProtectedRoute = ({ children }) => {
  const { userSession } = useUserSession();

  if (!userSession) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
