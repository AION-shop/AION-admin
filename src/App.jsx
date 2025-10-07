// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <Routes>
      <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default App;
