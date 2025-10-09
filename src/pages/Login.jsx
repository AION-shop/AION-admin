import React, { useState } from "react";
import { Lock, Phone, ShoppingCart, User, Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [telegram, setTelegram] = useState("");
  const [phone, setPhone] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔹 Static foydalanuvchi (test uchun)
  const staticUser = {
    telegram: "@developerBhk",
    phone: "+998901234567",
    name: "Admin",
  };

  const handleLogin = () => {
    toast.dismiss();

    if (!telegram || !phone) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!", { duration: 2000 });
      return;
    }

    setLoading(true);
    toast.loading("Kirish amalga oshirilmoqda...", { duration: 1500 });

    setTimeout(() => {
      setLoading(false);
      toast.dismiss();

      // 🔹 Tekshirish
      if (telegram === staticUser.telegram && phone === staticUser.phone) {
        const fakeToken = "secureToken12345";
        dispatch(login({ user: staticUser, token: fakeToken }));
        toast.success("Tizimga muvaffaqiyatli kirdingiz!", { duration: 2000 });
        navigate("/dashboard");
      } else {
        toast.error("Telegram username yoki telefon raqam noto‘g‘ri!", {
          duration: 2000,
        });
      }
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-base-200">
      {/* Toast */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Chap tomon - illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-secondary text-white items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>

        <div className="relative z-10 flex flex-col items-center text-center px-10">
          <ShoppingCart className="w-24 h-24 mb-6 animate-bounce" />
          <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
          <p className="text-base max-w-md opacity-90">
            Mahsulotlaringizni boshqaring, buyurtmalarni kuzating va biznesingizni samarali yuriting.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md w-full">
            <div className="bg-base-100 glass backdrop-blur-md rounded-2xl p-4">
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-sm opacity-80">Mahsulotlar</p>
            </div>
            <div className="bg-base-100 glass backdrop-blur-md rounded-2xl p-4">
              <h3 className="text-2xl font-bold">1.2K</h3>
              <p className="text-sm opacity-80">Buyurtmalar</p>
            </div>
            <div className="bg-base-100 glass backdrop-blur-md rounded-2xl p-4">
              <h3 className="text-2xl font-bold">98%</h3>
              <p className="text-sm opacity-80">Mamnun mijozlar</p>
            </div>
          </div>
        </div>
      </div>

      {/* O‘ng tomon - Login form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-6">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-2xl mb-3">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold">Xush kelibsiz!</h2>
              <p className="text-base-content/70">
                Telegram username va telefon raqamingiz bilan tizimga kiring.
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

            {/* Telefon raqam */}
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text font-medium">Telefon raqam</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-[400px]">
                <Phone className="w-5 h-5 text-base-content/50" />
                <input
                  type={showPhone ? "text" : "password"}
                  className="grow bg-transparent outline-none"
                  placeholder="+998901234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPhone(!showPhone)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  {showPhone ? <EyeOff size={20} /> : <Eye size={20} />}
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
