import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const RegisterPage = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!nickname || !email || !password) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Ro‘yxatdan o‘tish...");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        nickname,
        email,
        password,
      });

      setLoading(false);
      toast.dismiss(toastId);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      setLoading(false);
      toast.dismiss(toastId);
      toast.error(err?.response?.data?.message || "Server bilan aloqa yo‘q!");
    }
  };

  return (
    <>
      <Helmet>
        <title>Register - Admin Panel</title>
        <meta name="description" content="Admin panelga kirish uchun ro‘yxatdan o‘tish sahifasi" />
      </Helmet>

      <Toaster position="top-center" />

      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="card w-full max-w-md bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Ro‘yxatdan o‘tish</h2>

          <div className="form-control mb-4">
            <label className="label">Nickname</label>
            <input
              type="text"
              placeholder="Nickname"
              className="input input-bordered w-full"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control mb-6">
            <label className="label">Parol</label>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Yuklanmoqda..." : "Ro‘yxatdan o‘tish"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Hisobingiz bormi?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Tizimga kirish
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
