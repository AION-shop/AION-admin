import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";

// Redux
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js";

// Helmet
import { HelmetProvider } from "react-helmet-async";

// Router
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

// Sahifalar
import LoginPage from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotFlow from "./pages/ForgotFlow.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SeeUsers from "./pages/Seeusers.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import AddColproduct from "./pages/AddColproduct.jsx";   // ⭐ Yangi sahifa
import Banneradd from "./pages/banneradd.jsx";
import Analystic from "./pages/Analystic.jsx";
import Documents from "./pages/Documents.jsx";
import Settings from "./pages/Settings.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import SupportChat from "./pages/SupportChat.jsx";
import AddDiscount from "./pages/AddDiscount.jsx";

// 🔐 Protected Route
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// 🌐 Router config
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <div></div> },
      { path: "seeusers", element: <SeeUsers /> },
      { path: "addproduct", element: <AddProduct /> },
      {path: "adddiscount", element: <AddDiscount />},

      // ❌ BU YO‘LDA XATO BOR EDI – olib tashlandi
      // { path : "/addproduct" }

      // ⭐ Yangi Col Product sahifa ROUTE
      { path: "add-colproduct", element: <AddColproduct /> },

      { path: "banneradd", element: <Banneradd /> },
      { path: "analystic", element: <Analystic /> },
      { path: "documents", element: <Documents /> },
      { path: "settings", element: <Settings /> },
    ],
  },

  // Support Chat
  {
    path: "tex-podderjka",
    element: (
      <ProtectedRoute>
        <SupportChat />
      </ProtectedRoute>
    ),
  },

  // Auth pages
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot", element: <ForgotFlow /> },

  // 404
  { path: "*", element: <ErrorPage /> },
]);

// 🚀 Render
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <RouterProvider router={router} />

          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 2000,
              style: { background: "#333", color: "#fff" },
            }}
          />
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
