import React, { useState } from "react";
import { Lock, User, Eye, EyeOff, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const RegisterPage = () => {
  const [telegram, setTelegram] = useState("");
  const [password, setPassword] = useState("");
  const [chatId, setChatId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!telegram || !password || !chatId) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }
    if (!telegram.startsWith("@")) {
      toast.error("Telegram username '@' belgisi bilan boshlanishi kerak!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        telegram,
        password,
        chatId,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Ro‘yxatdan o‘tish muvaffaqiyatli!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data.message || "Xatolik yuz berdi!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server bilan bog‘lanishda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-base-200">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Chap tomon */}
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

      {/* O‘ng tomon */}
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

            {/* Telegram username */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Telegram username</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="@developerBhk"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
              />
            </div>

            {/* Chat ID */}
            {/* Chat ID */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Telegram Chat ID</span>
              </label>

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Masalan: 123456789"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
              />

              <p className="text-xs text-gray-500 mt-1">
                1️⃣ Chat ID olish uchun{" "}
                <a
                  href="https://t.me/CheckID_AIDbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-500"
                >
                  botga kirib <strong>“Mening ID”</strong> tugmasini bosib, o‘z ID-ingizni oling
                </a>.
              </p>

              <p className="text-xs text-gray-500 mt-1">
                2️⃣ Keyin{" "}
                <a
                  href="https://t.me/FotgotPass_1_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-500"
                >
                  bu botga kirib <code>/start</code> yuboring
                </a>, shunda sizga parol keladi.
              </p>

              <p className="text-xs text-gray-500 mt-1">
                ✅ Olingan Chat ID ni yuqoridagi maydonga kiriting va ro‘yxatdan o‘ting.
              </p>
            </div>



            {/* Parol */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Parol</span>
              </label>
              <div className="input input-bordered flex items-center gap-2 w-full">
                <Lock className="w-5 h-5 text-base-content/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="grow bg-transparent outline-none"
                  placeholder="********"
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
              </div>
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
