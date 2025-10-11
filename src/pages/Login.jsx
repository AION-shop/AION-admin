import React, { useState } from "react";
import { Lock, User, Eye, EyeOff, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const LoginPage = () => {
  const [telegram, setTelegram] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    toast.dismiss();

    if (!telegram || !password) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!", { duration: 2000 });
      return;
    }

    setLoading(true);
    toast.loading("Kirish amalga oshirilmoqda...", { duration: 1500 });

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        telegram,
        password,
      });

      setLoading(false);
      toast.dismiss();

      if (res.data.success) {
        dispatch(
          login({
            user: res.data.user,
            token: res.data.token,
          })
        );
        toast.success("Tizimga muvaffaqiyatli kirdingiz!", { duration: 2000 });
        navigate("/dashboard");
      } else {
        toast.error(res.data.message || "Kirishda xatolik!", { duration: 2000 });
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.dismiss();
      toast.error("Server bilan aloqa yo‘q!", { duration: 2000 });
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
          <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
          <p className="text-base max-w-md opacity-90">
            Mahsulotlaringizni boshqaring, buyurtmalarni kuzating va biznesingizni samarali yuriting.
          </p>
        </div>
      </div>

      {/* O‘ng tomon */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-6">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-2xl mb-3">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold">Xush kelibsiz!</h2>
              <p className="text-base-content/70">
                Telegram username va parolingiz bilan tizimga kiring.
              </p>
            </div>

            {/* Telegram username */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Telegram username</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-[400px]">
                <User className="w-5 h-5 text-base-content/50" />
                <input
                  type="text"
                  className="grow"
                  placeholder="@developerBhk"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                />
              </label>
            </div>

            {/* Parol */}
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text font-medium">Parol</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-[400px]">
                <Lock className="w-5 h-5 text-base-content/50" />
                <input
                  type={showPass ? "text" : "password"}
                  className="grow bg-transparent outline-none"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </label>
            </div>

            <div className="flex justify-between items-center mt-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                <span className="text-sm">Eslab qolish</span>
              </label>
              <Link to="/forgot" className="text-sm text-primary hover:underline">
                Parolni unutdingizmi?
              </Link>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="btn btn-primary w-full mt-6"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Kirish"}
            </button>

            <div className="text-center mt-6">
              <p className="text-sm text-base-content/70">
                Hisobingiz yo‘qmi?{" "}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Ro‘yxatdan o‘tish
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
