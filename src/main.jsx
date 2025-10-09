import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

// Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js";

// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Sahifalar
import LoginPage from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotFlow from "./pages/ForgotFlow.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot", element: <ForgotFlow /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "*", element: <ErrorPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 2000, // 🔹 2 soniya
            style: { background: "#333", color: "#fff" },
          }}
        />
      </PersistGate>
    </Provider>
  </StrictMode>
);
