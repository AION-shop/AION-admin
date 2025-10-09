// src/pages/Register.jsx
import React, { useState } from "react";
import { Lock, Mail, User, Eye, EyeOff, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name || !email || !password || !confirm) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    if (password !== confirm) {
      toast.error("Parollar mos emas!");
      return;
    }

    setLoading(true);

    // Simulyatsiya - bazaga saqlash
    setTimeout(() => {
      const newUser = { name, email, password };
      localStorage.setItem("registeredUser", JSON.stringify(newUser));

      toast.success("Ro‘yxatdan o‘tish muvaffaqiyatli!");
      setLoading(false);

      // Login sahifasiga yo‘naltirish
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-base-200">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Chap tomon - illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-secondary text-white items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>

        <div className="relative z-10 flex flex-col items-center text-center px-10">
          <ShoppingCart className="w-24 h-24 mb-6 animate-bounce" />
          <h1 className="text-4xl font-bold mb-4">Yangi hisob yarating</h1>
          <p className="text-base max-w-md opacity-90">
            Admin panelga kirish uchun yangi hisob oching va boshqaruvni boshlang.
          </p>
        </div>
      </div>

      {/* O‘ng tomon - Register form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-6">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-2xl mb-3">
                <User className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold">Ro‘yxatdan o‘tish</h2>
              <p className="text-base-content/70">
                Hisob yaratish uchun quyidagi ma’lumotlarni to‘ldiring.
              </p>
            </div>

            {/* Foydalanuvchi ismi */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Ism</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-[400px]">
                <User className="w-5 h-5 text-base-content/50" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Ismingiz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>

            {/* Email */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-[400px]">
                <Mail className="w-5 h-5 text-base-content/50" />
                <input
                  type="email"
                  className="grow"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>

            {/* Parol */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Parol</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-[400px]">
                <Lock className="w-5 h-5 text-base-content/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="grow"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </label>
            </div>

            {/* Tasdiqlash paroli */}
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text font-medium">Parolni tasdiqlang</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-[400px]">
                <Lock className="w-5 h-5 text-base-content/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="grow"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </label>
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="btn btn-primary w-full mt-6"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Ro‘yxatdan o‘tish"}
            </button>

            <div className="text-center mt-6">
              <p className="text-sm text-base-content/70">
                Hisobingiz bormi?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Tizimga kirish
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
