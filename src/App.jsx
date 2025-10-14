import React from "react";
import { Routes, Route } from "react-router-dom";
import ForgotFlow from "./pages/ForgotFlow.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRouter from "./guard/PrivateRouter.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const App = () => {
  return (
    <Routes>
      {/* Dashboard faqat PrivateRouter ichida ishlaydi */}
      <Route
        path="/dashboard"
        element={
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        }
      />

      {/* Forgot password */}
      <Route path="/forgot" element={<ForgotFlow />} />

      {/* Default / Not Found */}
      <Route path="*" element={<ForgotFlow />} />
    </Routes>
  );
};

export default App;
