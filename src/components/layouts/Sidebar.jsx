import {
  LayoutDashboard,
  Users,
  Settings,
  PlusSquare,
  ImagePlus,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  MessageCircleMoreIcon,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  theme,
}) {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);

      if (window.innerWidth >= 900) {
        // Desktop mode → sidebar always open
        setSidebarOpen(true);
      } else {
        // Mobile mode → sidebar always closed by default
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Analytics", icon: BarChart3, path: "/analystic", badge: "New" },
    { name: "Users", icon: Users, path: "/seeusers" },
    { name: "Add Product", icon: PlusSquare, path: "/addproduct" },
    { name: "Add Col Product", icon: PlusSquare, path: "/add-colproduct" },
    { name: "Add Banner", icon: ImagePlus, path: "/banneradd" },
    { name: "Support Chat", icon: MessageCircleMoreIcon, path: "/tex-podderjka" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  const handleLogout = () => navigate("/register");

  const handleMenuClick = (name) => {
    setActiveTab(name.toLowerCase());

    // MOBILE bo‘lsa menu bosilgandan keyin sidebar yopilsin
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          ${sidebarOpen ? "w-72" : isMobile ? "w-0" : "w-20"}
          fixed top-0 left-0 h-full z-30
          bg-base-100 border-r border-base-300 shadow-md
          transition-all duration-300 flex flex-col relative
        `}
      >
        {/* Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 pointer-events-none" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col h-full">

          {/* LOGO */}
          {sidebarOpen && (
            <div className="p-5 border-b border-base-300 bg-base-100/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary shadow-md flex items-center justify-center">
                  <img src="/Logo.png" alt="logo" className="w-9 h-9 object-contain" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">E-shop</h2>
                  <p className="text-xs text-base-content/60">Admin Panel</p>
                </div>
              </div>
            </div>
          )}

          {/* MENU */}
          {sidebarOpen && (
            <nav className="flex-1 px-3 py-5 overflow-y-auto">
              <p className="text-xs font-semibold text-base-content/50 uppercase tracking-wider px-3 mb-3">
                Menu
              </p>

              <ul className="space-y-1">
                {menu.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.name.toLowerCase();

                  return (
                    <li key={idx}>
                      <Link
                        to={item.path}
                        onClick={() => handleMenuClick(item.name)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary text-white shadow-md"
                            : "hover:bg-base-200 text-base-content/70"
                        }`}
                      >
                        <Icon size={20} />

                        <div className="flex items-center justify-between flex-1">
                          <span className="truncate">{item.name}</span>

                          {item.badge && (
                            <span className="badge badge-primary badge-sm text-white">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          {/* FOOTER */}
          {sidebarOpen && (
            <div className="p-4 border-t border-base-300 bg-base-100/90 backdrop-blur-sm flex flex-col gap-2">
              <button
                onClick={handleLogout}
                className="btn btn-error btn-outline w-full flex items-center gap-2 justify-center"
              >
                <LogOut size={18} /> Exit
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* SIDEBAR TOGGLE BUTTON - ONLY ON MOBILE */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-5 left-5 z-10 btn btn-primary btn-circle shadow-lg"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </>
  );
}
