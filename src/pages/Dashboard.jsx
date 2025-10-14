import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/layouts/Sidebar";
import Navbar from "../components/layouts/Navbar";
import { Users, PlusSquare, Package, BarChart3 } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const user = useSelector((state) => state.user.user);
  const userEmail = user?.telegram || "Guest";

  const location = useLocation();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);



  return (
    <div className="flex h-screen bg-base-100 text-base-content transition-colors duration-300">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar userEmail={userEmail} setTheme={setTheme} />

        <main className="flex-1 overflow-y-auto p-8 bg-base-100">
          {/* Dashboard asosiy overview */}
          {location.pathname === "/dashboard" && (
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-1">
                Welcome back!
              </h1>
              <p className="text-base-content/70 text-sm md:text-base">
                Hello <span className="font-medium text-primary">{user?.telegram || "Guest"}</span>, here is your dashboard overview.
              </p>
            </div>
          )}

          {/* Child routes render qilinadi */}
          <Outlet />
        </main>

      </div>
    </div>
  );
}
