// src/components/Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    BarChart3,
    FileText,
} from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) {
    const navigate = useNavigate();
    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "users", label: "Users", icon: Users },
        { id: "documents", label: "Documents", icon: FileText },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    const handleLogout = () => {
        // toast.success("Siz tizimdan chiqdingiz!", { duration: 1000 });
        setTimeout(() => {
            navigate("/login");
        }, 1);
    };

    return (
        <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-[#1e293b] border-r border-gray-800 transition-all duration-300 flex flex-col shadow-xl`}>
            <Toaster position="top-center" reverseOrder={false} />
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                {sidebarOpen && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">MA</span>
                        </div>
                        <h2 className="text-xl font-bold text-white">MyApp</h2>
                    </div>
                )}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-800 transition text-gray-400"
                >
                    {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                activeTab === item.id
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            }`}
                        >
                            <Icon size={20} />
                            {sidebarOpen && <span className="font-medium">{item.label}</span>}
                        </button>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition"
                >
                    <LogOut size={20} />
                    {sidebarOpen && <span className="font-medium">Logout</span>}
                </button>
            </div>
        </aside>
    );
}
