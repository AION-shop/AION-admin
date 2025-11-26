import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const VerifyCodePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!code) return toast.error("Kod kiriting!");

    setLoading(true);
    const toastId = toast.loading("Kod tekshirilmoqda...");

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, code });

      setLoading(false);
      toast.dismiss(toastId);

      if (data.success) {
        toast.success("Kirish muvaffaqiyatli!");
        // Redux ga user saqlash
        dispatch(login({ user: { email }, token: data.token }));
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Kod noto‘g‘ri!");
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
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Kod tasdiqlash</h2>
        <p className="text-gray-600 text-center mb-4">Email: <span className="font-medium">{email}</span></p>

        <input
          type="text"
          placeholder="123456"
          className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? "Yuklanmoqda..." : "Tasdiqlash"}
        </button>
      </div>
    </div>
  );
};

export default VerifyCodePage;
