import React from "react";
import { Bell, Search } from "lucide-react";

export default function Navbar({ userEmail }) {
  return (
    <header className="bg-[#1e293b] border-b border-gray-800 px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-400 hover:bg-gray-800 rounded-lg transition">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-800">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-white">
                {userEmail.split("@")[0]}
              </p>
              <p className="text-xs text-gray-400">{userEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
