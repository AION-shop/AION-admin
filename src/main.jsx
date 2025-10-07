import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { persistor, store } from "./redux/store.js";
import PrivateRouter from "./guard/PrivateRouter.jsx";
import Register from "../src/pages/Register.jsx";
import LoginPage from "../src/pages/Login.jsx";
import ErrorPage from "../src/pages/ErrorPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <App />
      </PrivateRouter>
    ),
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <ErrorPage onNavigate={(path) => router.navigate(path)} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
