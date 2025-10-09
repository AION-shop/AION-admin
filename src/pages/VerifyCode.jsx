import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyCode = ({ username }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!code.trim()) {
      toast.error("Iltimos, kodni kiriting!", { duration: 2000 });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, code }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Kod to‘g‘ri! Dashboardga yo‘naltirilmoqda...", { duration: 2000 });
        if (data.oneTimeToken) localStorage.setItem("oneTimeToken", data.oneTimeToken);
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Kod noto‘g‘ri yoki muddati oʻtgan.", { duration: 2000 });
      }
    } catch (err) {
      toast.error("Server xatosi!", { duration: 2000 });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 shadow-md p-6 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">
          Verify Telegram Code
        </h2>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Telegram kodini kiriting"
          className="w-full border p-2 rounded-md mb-3 bg-gray-700 text-white placeholder-gray-400"
        />
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-md"
        >
          {loading ? "Tekshirilmoqda..." : "Verify Code"}
        </button>
      </div>
    </div>
  );
};

export default VerifyCode;
