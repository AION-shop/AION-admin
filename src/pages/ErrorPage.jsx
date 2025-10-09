import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import LoginPage from "./Login";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <div className="card bg-base-100 shadow-2xl p-10 text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-error/10 p-6 rounded-full">
            <AlertTriangle className="w-16 h-16 text-error" />
          </div>
        </div>

        <h1 className="text-5xl font-bold text-error mb-2">404</h1>
        <p className="text-base-content/70 mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="btn btn-primary w-full"
        >
          ⬅️ Back to Home
        </button>
      </div>

      <p className="mt-8 text-sm text-base-content/60">
        © {new Date().getFullYear()} ShopMarket Admin Panel
      </p>
    </div>
  );
};

export default ErrorPage;
