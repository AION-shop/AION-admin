import React, { useState, useEffect, useRef } from "react";
import { Mail, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Forgot = ({ onCodeSent }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((t) => (t <= 1 ? (clearInterval(timerRef.current), 0) : t - 1));
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [timer]);

  const handleSendCode = async () => {
    toast.dismiss();
    if (!username || !username.startsWith("@")) {
      toast.error("Iltimos, Telegram username'ni @ bilan kiriting!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot/send", {
        telegram: username,
      });

      if (res.data.success) {
        toast.success("Kod yuborildi ✅");
        setTimer(60);
        onCodeSent(username);
      } else {
        toast.error(res.data.message || "Xatolik yuz berdi!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Serverda xato yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  const handleExit = () => navigate("/login");

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl p-8 rounded-3xl w-full max-w-md border border-slate-700/60 backdrop-blur-sm">
      <Toaster position="top-center" />

      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Parolni tiklash
        </h2>
        <p className="text-center text-slate-400 text-sm mb-8">
          Telegram username orqali tasdiqlash kodi oling
        </p>

        <div className="mb-6">
          <label className="text-sm font-medium text-slate-300 mb-2 block flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-400" />
            Telegram username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@username"
            className="w-full border-2 border-slate-700 focus:border-blue-500 p-3.5 rounded-xl bg-slate-800/60 text-white placeholder-slate-500 transition-all duration-300 outline-none"
          />
        </div>

        <button
          onClick={handleSendCode}
          disabled={loading || timer > 0}
          className={`w-full font-semibold p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
            loading || timer > 0
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/25"
          }`}
        >
          {loading ? "Yuborilmoqda..." : timer > 0 ? `Qayta yuborish: ${timer}s` : "Kod yuborish"}
        </button>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Eslab qoldingizmi?{" "}
            <button onClick={handleExit} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Tizimga kirish
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
