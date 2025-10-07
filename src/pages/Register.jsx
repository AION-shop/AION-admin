import { useState } from "react";
import { UserPlus, User, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ React Router navigate

  const handleRegister = () => {
    // 🔍 Bo‘sh joylarni tekshirish
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Iltimos, barcha joylarni to‘ldiring!");
      return;
    }

    // 🔍 Parolni tekshirish
    if (formData.password !== formData.confirmPassword) {
      alert("Parollar mos kelmadi!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Ro‘yxatdan o‘tish muvaffaqiyatli!");
      navigate("/login"); // ✅ avtomatik login sahifasiga yo‘naltiradi
    }, 1500);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex h-screen bg-base-200">
      {/* Chap tomon */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-32 -translate-y-32"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-32 translate-y-32"
        />

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            className="mb-8"
          >
            <UserPlus className="w-32 h-32 drop-shadow-lg" strokeWidth={1.5} />
          </motion.div>

          <motion.h1
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold mb-4 drop-shadow-md"
          >
            Qo‘shiling!
          </motion.h1>
          <p className="text-xl text-emerald-100 max-w-md mb-8">
            Admin hisobini yarating va platformani to‘liq nazorat qilishni
            boshlang
          </p>
        </div>
      </div>

      {/* O‘ng tomon */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-6 sm:p-12">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md bg-base-100 rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-2xl mb-4 shadow-md"
            >
              <UserPlus className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-base-content">
              Ro‘yhatdan o‘tish
            </h2>
            <p className="text-base-content/60 mt-2">
              Admin hisobini yaratish uchun ma’lumotlarni kiriting
            </p>
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                To‘liq ism
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ism Familiya"
                  className="input input-bordered w-full pl-12 focus:ring-2 focus:ring-success"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email manzil
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="input input-bordered w-full pl-12 focus:ring-2 focus:ring-success"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Parol</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-12 focus:ring-2 focus:ring-success"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Parolni tasdiqlang
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-12 focus:ring-2 focus:ring-success"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleRegister}
              className="btn btn-success w-full shadow-md"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Ro‘yhatdan o‘tish"
              )}
            </motion.button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-base-content/60">
              Hisobingiz bormi?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-primary font-medium hover:underline"
              >
                Kirish
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
