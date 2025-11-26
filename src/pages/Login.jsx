  import React, { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";
  import toast, { Toaster } from "react-hot-toast";

  const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async () => {
      if (!email) {
        toast.error("Iltimos, email kiriting!");
        return;
      }

      setLoading(true);
      const toastId = toast.loading("Kod yuborilmoqda...");

      try {
        const { data } = await axios.post("http://localhost:5000/api/auth/login-otp", { email });

        setLoading(false);
        toast.dismiss(toastId);

        if (data.success) {
          toast.success("Emailga kod yuborildi!");
          navigate("/verify-code", { state: { email } });
        } else {
          toast.error(data.message || "Xatolik yuz berdi!");
        }
      } catch (err) {
        setLoading(false);
        toast.dismiss(toastId);
        toast.error("Server bilan aloqa yo‘q yoki xatolik yuz berdi!");
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <Toaster position="top-center" />
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Kirish</h2>

          {/* Email input */}
          <div className="mb-6">
            <label className="block text-gray-900 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Send OTP Button */}
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Yuklanmoqda..." : "Kod yuborish"}
          </button>

          {/* Register link */}
          <p className="text-center text-gray-500 mt-6 text-sm">
            Hisobingiz yo‘qmi?{" "}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">
              Ro‘yxatdan o‘tish
            </Link>
          </p>
        </div>
      </div>
    );
  };

  export default LoginPage;
