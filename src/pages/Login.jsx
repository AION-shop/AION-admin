import React, { useState } from "react";
import {
  ShoppingCart,
  Lock,
  Mail,
  AlertTriangle,
  Home,
  RefreshCw,
  User,
  UserPlus,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// Login Component
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const Login = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1500);
  }


  return (
    <div className="flex h-screen bg-base-200">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full translate-x-32 translate-y-32"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="mb-8 animate-bounce">
            <ShoppingCart className="w-32 h-32" strokeWidth={1.5} />
          </div>

          <h1 className="text-5xl font-bold mb-4">Admin Panel</h1>
          <p className="text-xl text-center text-purple-100 max-w-md">
            E-commerce platformangizni boshqaring va biznesingizni
            rivojlantiring
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6 w-full max-w-md">
            <div className="bg-base-300 glass bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-purple-100">Mahsulotlar</div>
            </div>
            <div className="bg-base-300 glass bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">1.2K</div>
              <div className="text-sm text-purple-100">Buyurtmalar</div>
            </div>
            <div className="bg-base-300 glass bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm text-purple-100">Mamnunlik</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-base-content">
              Xush kelibsiz!
            </h2>
            <p className="text-base-content/60 mt-2">
              Admin paneliga kirish uchun ma'lumotlaringizni kiriting
            </p>
          </div>

          <div className="space-y-6">
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">
                Email manzil
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="input input-bordered w-full pl-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Parol</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <span className="text-sm">Eslab qolish</span>
              </label>
              <button className="text-sm text-primary hover:underline">
                Parolni unutdingizmi?
              </button>
            </div>

            <button
              onClick={Login}
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Kirish"
              )}
            </button>
          </div>

          <div className="mt-8 text-center space-y-3">
            <p className="text-sm text-base-content/60">
              Hisobingiz yo'qmi?{" "}
              <button
                onClick={() => navigate("register")}
                className="text-primary font-medium hover:underline"
              >
                Ro'yxatdan o'tish
              </button>
            </p>
            <button
              onClick={() => navigate("register")}
              className="text-primary font-medium hover:underline"
            >
              Ro'yxatdan o'tish
            </button>
            <button
              onClick={() => navigate("error")}
              className="text-sm text-secondary hover:underline"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
