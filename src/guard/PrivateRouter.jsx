import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const location = useLocation();

  if (!isAuth) {
    // Agar tizimga kirmagan bo‘lsa → /login sahifasiga yo‘naltiramiz
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default PrivateRouter;
