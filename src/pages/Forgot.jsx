import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [timer, setTimer] = useState(0); // resend cooldown
  const timerRef = useRef(null);

  const navigate = useNavigate();

  // Timer for resend button
  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [timer]);

  const startCooldown = (seconds = 60) => setTimer(seconds);

  // 🔹 Send Code
  const handleSendCode = async () => {
    toast.dismiss();

    if (!username || !username.startsWith("@")) {
      toast.error("Iltimos, Telegram username’ni @ bilan kiriting!", { duration: 2000 });
      return;
    }

    // 🔹 Darhol loading toast
    toast.loading("Kod yuborilmoqda...", { duration: 2000 });

    setLoadingSend(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      toast.dismiss(); // loading toastni o'chirish

      if (res.ok && data.success) {
        toast.success("Kod Telegram orqali yuborildi!", { duration: 2000 });
        setIsSent(true);
        startCooldown(60);
      } else {
        toast.error(data.message || "Kod yuborilmadi. Qayta urinib ko'ring.", { duration: 2000 });
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Tarmoq xatosi — qayta urinib ko‘ring.", { duration: 2000 });
      console.error(err);
    } finally {
      setLoadingSend(false);
    }
  };

  // 🔹 Verify Code
  const handleVerifyCode = async () => {
    toast.dismiss();

    if (!isSent) {
      toast.error("Avval kod yuboring!", { duration: 2000 });
      return;
    }
    if (!code.trim()) {
      toast.error("Iltimos, kodni kiriting!", { duration: 2000 });
      return;
    }

    // 🔹 Loading toast
    toast.loading("Kod tekshirilmoqda...", { duration: 2000 });
    setLoadingVerify(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, code: code.trim() }),
      });

      const data = await res.json();
      toast.dismiss();

      if (res.ok && data.success) {
        toast.success("Kod to‘g‘ri! Dashboardga yo‘naltirilmoqda...", { duration: 2000 });
        if (data.oneTimeToken) localStorage.setItem("oneTimeToken", data.oneTimeToken);
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Kod noto‘g‘ri yoki muddati oʻtgan.", { duration: 2000 });
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Server xatosi — qayta urinib ko‘ring.", { duration: 2000 });
      console.error(err);
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) {
      toast("Iltimos, kuting...", { icon: "⏳", duration: 2000 });
      return;
    }
    await handleSendCode();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 shadow-md p-6 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">Forgot Password</h2>

        <label className="text-sm text-gray-300 mb-1 block">Telegram username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="@username"
          className="w-full border p-2 rounded-md mb-3 bg-gray-700 text-white placeholder-gray-400"
          disabled={isSent || loadingSend}
        />

        {!isSent ? (
          <button
            onClick={handleSendCode}
            disabled={loadingSend}
            className={`w-full ${loadingSend ? "opacity-70 cursor-wait" : "hover:bg-blue-700"} bg-blue-600 text-white p-2 rounded-md mb-3`}
          >
            {loadingSend ? "Yozilmoqda..." : "Send Code to Telegram"}
          </button>
        ) : (
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-green-400">Kod yuborildi — Telegramni tekshiring.</p>
            <button
              onClick={handleResend}
              disabled={timer > 0 || loadingSend}
              className={`text-sm px-3 py-1 rounded ${timer > 0 ? "bg-gray-700 cursor-not-allowed" : "bg-yellow-600 hover:bg-yellow-700"}`}
            >
              {timer > 0 ? `Resend (${timer}s)` : "Resend"}
            </button>
          </div>
        )}

        {isSent && (
          <>
            <label className="text-sm text-gray-300 mb-1 block">Telegram'dagi kod</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              className="w-full border p-2 rounded-md mb-3 bg-gray-700 text-white placeholder-gray-400"
              disabled={loadingVerify}
            />
            <button
              onClick={handleVerifyCode}
              disabled={loadingVerify}
              className={`w-full ${loadingVerify ? "opacity-70 cursor-wait" : "hover:bg-green-700"} bg-green-600 text-white p-2 rounded-md`}
            >
              {loadingVerify ? "Tekshirilmoqda..." : "Verify Code"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Forgot;
