import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyCode = ({ username }) => {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ← redirect uchun

  const handleVerify = async () => {
    toast.dismiss();

    if (!username || !code || !newPassword) {
      toast.error("Barcha maydonlarni to‘ldiring!");
      return;
    }

    setLoading(true);
    toast.loading("Tekshirilmoqda...");

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegram: username, code, newPassword }),
      });

      const data = await res.json();
      toast.dismiss();

      if (res.ok && data.success) {
        toast.success(data.message);

        // ✅ 1.5 sekunddan keyin login sahifasiga yo‘naltirish
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Server bilan aloqa yo‘q!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 shadow-md p-6 rounded-xl w-full max-w-md mx-auto mt-20">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-2xl font-semibold text-center mb-4 text-white">Verify Code</h2>

      <label className="text-sm text-gray-300 mb-1 block">Tasdiqlash kodi</label>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="123456"
        className="w-full border p-2 rounded-md mb-3 bg-gray-700 text-white placeholder-gray-400"
      />

      <label className="text-sm text-gray-300 mb-1 block">Yangi parol</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Yangi parol"
        className="w-full border p-2 rounded-md mb-3 bg-gray-700 text-white placeholder-gray-400"
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className={`w-full ${loading ? "opacity-70 cursor-wait" : "hover:bg-green-700"} bg-green-600 text-white p-2 rounded-md`}
      >
        {loading ? "Tekshirilmoqda..." : "Verify & Reset Password"}
      </button>

      <p className="text-center text-sm text-gray-400 mt-3">
        Kodni olganingizdan so‘ng, yangi parol bilan <span className="text-blue-400 underline cursor-pointer" onClick={() => navigate("/login")}>login</span> qilishingiz mumkin.
      </p>
    </div>
  );
};

export default VerifyCode;
