import React, { useState } from "react";
import { CheckCircle, ArrowLeft, Lock } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const VerifyCode = ({ username, onBack }) => {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleVerify = async () => {
    toast.dismiss();
    if (!username || !code || !newPassword) {
      toast.error("Barcha maydonlarni to'ldiring!");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot/verify", {
        telegram: username,
        code,
        newPassword,
      });

      if (res.data.success) {
        toast.success("Parol muvaffaqiyatli o'zgartirildi!");
        setTimeout(() => (window.location.href = "/login"), 1500);
      } else {
        toast.error(res.data.message || "Kod noto‘g‘ri yoki xato!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Serverda xato yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl p-8 rounded-3xl w-full max-w-md border border-slate-700/50 backdrop-blur-sm">
      <Toaster position="top-center" />

      <button
        onClick={onBack}
        className="absolute -top-2 -left-2 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all duration-300 border border-slate-700"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center justify-center mb-6 mt-6">
        <div className="bg-gradient-to-br from-green-500 to-blue-600 p-3 rounded-2xl shadow-lg">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
        Kodni tasdiqlang
      </h2>
      <p className="text-center text-slate-400 text-sm mb-2">
        <span className="text-blue-400 font-medium">{username}</span> ga yuborildi
      </p>

      <div className="mb-5">
        <label className="text-sm font-medium text-slate-300 mb-2 block flex items-center gap-2">
          Tasdiqlash kodi
        </label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="123456"
          className="w-full border-2 border-slate-700 focus:border-green-500 p-3.5 rounded-xl bg-slate-800/50 text-white placeholder-slate-500 text-center text-2xl font-mono tracking-widest outline-none transition-all duration-300"
          maxLength={6}
        />
      </div>

      <div className="mb-6">
        <label className="text-sm font-medium text-slate-300 mb-2 block flex items-center gap-2">
          Yangi parol
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Kamida 6 ta belgi"
            className="w-full border-2 border-slate-700 focus:border-blue-500 p-3.5 pr-12 rounded-xl bg-slate-800/50 text-white placeholder-slate-500 transition-all duration-300 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
      </div>

      <button
        onClick={handleVerify}
        disabled={loading}
        className={`w-full font-semibold p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
          loading
            ? "bg-slate-700 text-slate-400 cursor-wait"
            : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-green-500/25"
        }`}
      >
        {loading ? "Tekshirilmoqda..." : "Tasdiqlash va parolni o'zgartirish"}
      </button>
    </div>
  );
};

export default VerifyCode;
