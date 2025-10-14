import {
  LayoutDashboard,
  Users,
  Settings,
  PlusSquare,
  ImagePlus,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  theme, // Dashboard dan props orqali keladi
}) {
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/", badge: null },
    { name: "Analytics", icon: BarChart3, path: "/analystic", badge: "New" },
    { name: "Users", icon: Users, path: "/seeusers", badge: null },
    { name: "Add Product", icon: PlusSquare, path: "/addproduct", badge: null },
    { name: "Add Banner", icon: ImagePlus, path: "/banneradd", badge: null },
    { name: "Settings", icon: Settings, path: "/settings", badge: null },
  ];

  const handleLogout = () => {
    // Redux yoki localStorage clear qilishingiz mumkin
    navigate("/login");
  };

  return (
    <aside
      className={`${sidebarOpen ? "w-72" : "w-20"
        } flex flex-col transition-all duration-300 shadow-soft h-screen relative overflow-hidden 
      bg-base-100 border-r border-base-300 text-base-content`}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-5 border-b border-base-300 bg-base-100/90 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-md ${ "bg-primary"
                }`}
            >
              <img
                src="/Logo.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
            </div>

            {sidebarOpen && (
              <div>
                <h2
                  className={`text-xl font-bold transition-colors ${theme === "dark" ? "text-white" : "text-primary"
                    }`}
                >
                  E-shop
                </h2>
                <p
                  className={`text-xs font-medium transition-colors ${theme === "dark" ? "text-gray-400" : "text-base-content/60"
                    }`}
                >
                  Admin Panel
                </p>
              </div>
            )}
          </div>



        </div>

        {/* Menu Section */}
        <nav className="flex-1 px-3 py-5 overflow-y-auto">
          {sidebarOpen && (
            <p className="text-xs font-semibold text-base-content/50 uppercase tracking-wider px-3 mb-3">
              Menu
            </p>
          )}

          <ul className="space-y-1">
            {menu.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name.toLowerCase();

              return (
                <li key={idx}>
                  <Link
                    to={item.path}
                    onClick={() => setActiveTab(item.name.toLowerCase())}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200 group relative ${isActive
                      ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-deep scale-[1.02]"
                      : "hover:bg-base-200 text-base-content/70 hover:text-base-content hover:scale-[1.01]"
                      }`}
                    title={!sidebarOpen ? item.name : undefined}
                  >
                    <Icon
                      size={20}
                      className={`flex-shrink-0 ${isActive ? "text-white" : "text-base-content/70"}`}
                    />
                    {sidebarOpen && (
                      <div className="flex items-center justify-between flex-1">
                        <span className="truncate">{item.name}</span>
                        {item.badge && (
                          <span
                            className={`badge badge-sm ${isActive
                              ? "badge-ghost bg-white/20 text-white border-none"
                              : "badge-primary text-white"
                              }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout + Collapse */}
        <div className="p-4 border-t border-base-300 bg-base-100/90 backdrop-blur-sm flex flex-col gap-2">
          <button
            onClick={handleLogout}
            className="btn btn-ghost w-full flex items-center gap-2 border-error hover:bg-error hover:border-base-100 "
          >
            <LogOut size={18} /> {sidebarOpen && "Exit"}
          </button>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`btn btn-sm btn-outline w-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 group ${!sidebarOpen ? "btn-circle" : ""
              }`}
          >
            {sidebarOpen ? (
              <ChevronLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
            ) : (
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
