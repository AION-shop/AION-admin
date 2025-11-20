import { useState, useEffect } from "react";
import { Moon, Sun, User } from "lucide-react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.user.user); // Redux userSlice

  // localStorage orqali theme-ni o‘qish, default: dark
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    // theme-ni html ga o‘rnatish
    document.documentElement.setAttribute("data-theme", theme);
    // localStorage-ga saqlash
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <div className="navbar bg-base-100 shadow-lg border-b border-base-300 px-6 sticky top-0 z-50 cursor-pointer">
      <div className="flex-1">
        <a className= {`text-xl ${theme === "dark" ? "text-primary" : "text-base-content"}
            font-bold  text-primary hover:scale-105 transition-transform cursor-pointer`}>
          Admin Dashboard
        </a>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-full cursor-pointer">
          <User size={16} className="text-primary" />
          <span className="text-sm font-medium cursor-pointer">{user?.telegram || "Guest"}</span>
        </div>

        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle hover:bg-base-200"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun size={20} className="text-warning" />
          ) : (
            <Moon size={20} className="text-primary" />
          )}
        </button>
      </div>
    </div>
  );
}
