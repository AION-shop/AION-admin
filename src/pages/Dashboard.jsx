import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { TrendingUp, TrendingDown, Users, BarChart3, DollarSign, Folder } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const userEmail = "user@example.com";

  const stats = [
    { label: "Total Users", value: "2,543", change: "+12.5%", positive: true, icon: Users },
    { label: "Revenue", value: "$45,231", change: "+8.2%", positive: true, icon: DollarSign },
    { label: "Active Projects", value: "18", change: "-2.3%", positive: false, icon: Folder },
    { label: "Growth", value: "94.5%", change: "+3.1%", positive: true, icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-[#0f172a] text-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar userEmail={userEmail} />

        <main className="flex-1 overflow-y-auto p-6 bg-[#0f172a]">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="bg-[#1e293b] border border-gray-700 p-6 rounded-2xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">{stat.label}</p>
                        <h2 className="text-2xl font-semibold mt-1">{stat.value}</h2>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                        <Icon size={22} />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      {stat.positive ? (
                        <TrendingUp size={16} className="text-green-500" />
                      ) : (
                        <TrendingDown size={16} className="text-red-500" />
                      )}
                      <p className={`text-sm font-semibold ${stat.positive ? "text-green-500" : "text-red-500"}`}>
                        {stat.change}
                      </p>
                      <span className="text-sm text-gray-400">vs last month</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#1e293b] border border-gray-700 rounded-2xl p-8 text-center">
              <p className="text-gray-400 text-sm">📊 Chart component will appear here</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
