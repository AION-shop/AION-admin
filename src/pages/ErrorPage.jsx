import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-base-200">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-rose-600 via-red-500 to-pink-600 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-32 -translate-y-32"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-32 translate-y-32"
        ></motion.div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="mb-8"
          >
            <AlertTriangle
              className="w-32 h-32 animate-pulse drop-shadow-lg"
              strokeWidth={1.5}
            />
          </motion.div>

          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-9xl font-extrabold mb-4 drop-shadow-md"
          >
            404
          </motion.h1>
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-2xl text-rose-100 max-w-md mb-8"
          >
            Oops! Sahifa topilmadi
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 max-w-md shadow-lg"
          >
            <p>
              Siz qidirayotgan sahifa mavjud emas yoki boshqa joyga ko‘chirilgan
              bo‘lishi mumkin.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Error Info */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md text-center"
        >
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-error rounded-full shadow-lg mb-6">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-base-content mb-4">
              Sahifa topilmadi
            </h2>
            <p className="text-base-content/70 text-lg">
              Kechirasiz, siz qidirayotgan sahifa mavjud emas.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="alert alert-warning mb-8 shadow-md"
          >
            <AlertTriangle className="w-5 h-5" />
            <span>URL manzil noto‘g‘ri kiritilgan bo‘lishi mumkin</span>
          </motion.div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/login")}
              className="btn btn-primary w-full gap-2 shadow-md"
            >
              <Home className="w-5 h-5" />
              Login sahifaga qaytish
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.location.reload()}
              className="btn btn-outline w-full gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Sahifani yangilash
            </motion.button>
          </div>

          <div className="mt-10 p-6 bg-base-100 rounded-2xl shadow-md">
            <h3 className="font-semibold mb-3">Yordam kerakmi?</h3>
            <p className="text-sm text-base-content/60 mb-4">
              Agar muammo davom etsa, quyidagi havolalardan foydalaning:
            </p>
            <div className="flex justify-center gap-6">
              <button className="text-sm text-primary hover:underline">
                Yordam markazi
              </button>
              <button className="text-sm text-primary hover:underline">
                Qo‘llab-quvvatlash
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
