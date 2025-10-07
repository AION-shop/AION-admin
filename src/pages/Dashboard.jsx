// src/pages/Dashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  ShoppingBag,
  DollarSign,
  Menu,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

const stats = [
  {
    title: "Foydalanuvchilar",
    value: "1,245",
    icon: <Users className="w-6 h-6 text-blue-500" />,
    growth: "+12%",
  },
  {
    title: "Buyurtmalar",
    value: "582",
    icon: <ShoppingBag className="w-6 h-6 text-purple-500" />,
    growth: "+8%",
  },
  {
    title: "Daromad",
    value: "$12.4k",
    icon: <DollarSign className="w-6 h-6 text-green-500" />,
    growth: "+17%",
  },
  {
    title: "Analitika",
    value: "92%",
    icon: <BarChart3 className="w-6 h-6 text-orange-500" />,
    growth: "+5%",
  },
];

const logOut = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-base-200 text-base-content">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-base-300 border-r border-base-300 p-6 space-y-6">
        <div className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="text-primary" /> AdminPanel
        </div>

        <nav className="flex flex-col space-y-2 text-sm">
          <button className="btn btn-ghost justify-start gap-2">
            <Users className="w-5 h-5" /> Foydalanuvchilar
          </button>
          <button className="btn btn-ghost justify-start gap-2">
            <ShoppingBag className="w-5 h-5" /> Buyurtmalar
          </button>
          <button className="btn btn-ghost justify-start gap-2">
            <DollarSign className="w-5 h-5" /> Daromad
          </button>
          <button className="btn btn-ghost justify-start gap-2">
            <Settings className="w-5 h-5" /> Sozlamalar
          </button>
        </nav>

        <div className="mt-auto">
          <button
            onClick={logOut} className="btn btn-error btn-outline w-full flex gap-2">
            <LogOut className="w-5 h-5" /> Chiqish
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 bg-base-100 border-b border-base-300">
          <div className="flex items-center gap-3">
            <Menu className="md:hidden" />
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 cursor-pointer hover:text-primary" />
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-primary"
            />
          </div>
        </header>

        {/* Stats Section */}
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition"
            >
              <div className="card-body flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  {item.icon}
                  <span className="text-sm text-success">{item.growth}</span>
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </main>

        {/* Chart Section */}
        <section className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card bg-base-100 shadow-md border border-base-300"
          >
            <div className="card-body">
              <h2 className="text-lg font-semibold mb-4">Savdo statistikasi</h2>
              <div className="h-64 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center text-sm text-base-content/50">
                📊 Chart joyi (masalan, Recharts bilan qo‘shsa bo‘ladi)
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
