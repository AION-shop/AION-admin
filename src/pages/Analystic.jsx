import React from "react";
import { BarChart3, Users, Package, PlusSquare } from "lucide-react";

const stats = [
  { name: "Users", value: 0, color: "bg-primary/20 text-primary", icon: <Users size={24} /> },
  { name: "Products", value: 0, color: "bg-secondary/20 text-secondary", icon: <Package size={24} /> },
  { name: "Banners", value: 0, color: "bg-accent/20 text-accent", icon: <PlusSquare size={24} /> },
  { name: "Analytics", value: 0, color: "bg-info/20 text-info", icon: <BarChart3 size={24} /> },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-base-100 rounded-2xl shadow-deep p-6">
          <h1 className="text-3xl font-bold text-primary/80">Analytics Dashboard</h1>
          <p className="mt-1 opacity-90 text-primary">Barcha statistika default 0</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center p-4 rounded-2xl shadow-soft  dark:bg-base-100 transition-all hover:shadow-deep"
            >
              <div className={`p-4 rounded-xl ${stat.color} mr-4 flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-base-content">{stat.value}</p>
                <p className="text-sm text-base-content/60">{stat.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-base-100 rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-bold mb-4">Daromad grafigi</h2>
            <div className="h-64 flex items-center justify-center text-base-content/50 border border-dashed rounded-lg">
              Grafik: 0
            </div>
          </div>
          <div className="bg-base-100 rounded-2xl shadow-soft p-6">
            <h2 className="text-xl font-bold mb-4">Foydalanuvchi statistikasi</h2>
            <div className="h-64 flex items-center justify-center text-base-content/50 border border-dashed rounded-lg">
              Grafik: 0
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-base-100 rounded-2xl shadow-soft p-6">
          <h2 className="text-xl font-bold mb-4">Eng mashhur productlar</h2>
          <div className="h-64 flex items-center justify-center text-base-content/50 border border-dashed rounded-lg">
            Productlar: 0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
