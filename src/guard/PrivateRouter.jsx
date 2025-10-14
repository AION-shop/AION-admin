<<<<<<< HEAD
import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PrivateRouter = ({ children }) => {
    // const user = useSelector(state => state.user?.isAuth)
    const user = true
    const navigate = useNavigate()


    useEffect(() => {
        console.log("user: ", user)
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    return children
}

export default PrivateRouter
=======
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
>>>>>>> a203f86549066f90e149dcde0e5ea7e100221194
