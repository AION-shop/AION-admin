  // Forgot.jsx
  import React, { useState, useEffect, useRef } from "react";
  import toast from "react-hot-toast";

  const Forgot = ({ onCodeSent }) => {
    const [username, setUsername] = useState("");
    const [loadingSend, setLoadingSend] = useState(false);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);

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

    const handleSendCode = async () => {
      toast.dismiss();

      if (!username || !username.startsWith("@")) {
        toast.error("Iltimos, Telegram username’ni @ bilan kiriting!", { duration: 2000 });
        return;
      }

      setLoadingSend(true);
      toast.loading("Kod yuborilmoqda...", { duration: 2000 });
      try {
        const res = await fetch("http://localhost:8000/api/auth/send-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ telegram: username }),
        });

        const data = await res.json();
        toast.dismiss();

        if (res.ok && data.success) {
          toast.success("Kod Telegram orqali yuborildi!", { duration: 2000 });
          startCooldown(60);
          onCodeSent(username); // callback orqali parentga username yuboramiz
        } else {
          toast.error(data.message || "Kod yuborilmadi.", { duration: 2000 });
        }
      } catch (err) {
        toast.dismiss();
        toast.error("Server xatosi, qayta urinib ko‘ring.", { duration: 2000 });
        console.error(err);
      } finally {
        setLoadingSend(false);
      }
    };

    const handleResend = async () => {
      if (timer > 0) return;
      await handleSendCode();
    };

    return (
      <div className="bg-gray-800 shadow-md p-6 rounded-xl w-full max-w-md mx-auto mt-20">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">Forgot Password</h2>

        <label className="text-sm text-gray-300 mb-1 block">Telegram username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="@username"
          className="w-full border p-2 rounded-md mb-3 bg-gray-700 text-white placeholder-gray-400"
          disabled={loadingSend}
        />

        <button
          onClick={handleSendCode}
          disabled={loadingSend}
          className={`w-full ${loadingSend ? "opacity-70 cursor-wait" : "hover:bg-blue-700"} bg-blue-600 text-white p-2 rounded-md mb-3`}
        >
          {loadingSend ? "Yozilmoqda..." : "Send Code to Telegram"}
        </button>

        {timer > 0 && (
          <button
            onClick={handleResend}
            disabled={timer > 0 || loadingSend}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-md"
          >
            {timer > 0 ? `Resend (${timer}s)` : "Resend"}
          </button>
        )}
      </div>
    );
  };

  export default Forgot;
