import React, { useEffect, useState } from "react";
import { Users, UserPlus, Package, PlusCircle, Image } from "lucide-react";
import axios from "axios";
import dayjs from "dayjs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const Analytics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsersToday: 0,
    totalProducts: 0,
    newProductsToday: 0,
    totalBanners: 0,
    newBannersToday: 0,
  });

  const [productChart, setProductChart] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const today = dayjs().format("YYYY-MM-DD");

        // USERS
        const usersRes = await axios.get("http://localhost:5000/api/userClient");
        const users = usersRes.data?.users || [];
        const newUsersToday = users.filter(u => dayjs(u.createdAt).format("YYYY-MM-DD") === today).length;

        // PRODUCTS
        const productsRes = await axios.get("http://localhost:5000/api/products/");
        const products = productsRes.data?.products || [];
        const newProductsToday = products.filter(p => dayjs(p.createdAt).format("YYYY-MM-DD") === today).length;

        // PRODUCT CHART: kunlik count
        const dailyStats = {};
        products.forEach(p => {
          const date = dayjs(p.createdAt).format("YYYY-MM-DD");
          dailyStats[date] = (dailyStats[date] || 0) + 1;
        });
        const chartData = Object.keys(dailyStats)
          .sort()
          .map(date => ({ date, value: dailyStats[date] }));
        setProductChart(chartData);

        // BANNERS
        const bannersRes = await axios.get("http://localhost:5000/api/banners");
        const banners = bannersRes.data?.banners || [];
        const newBannersToday = banners.filter(b => dayjs(b.createdAt).format("YYYY-MM-DD") === today).length;

        // SET ALL STATS
        setStats({
          totalUsers: users.length,
          newUsersToday,
          totalProducts: products.length,
          newProductsToday,
          totalBanners: banners.length,
          newBannersToday,
        });
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { label: "Jami foydalanuvchilar", value: stats.totalUsers, icon: <Users />, color: "bg-primary/20" },
    { label: "Bugun yangi userlar", value: stats.newUsersToday, icon: <UserPlus />, color: "bg-info/20" },
    { label: "Jami productlar", value: stats.totalProducts, icon: <Package />, color: "bg-secondary/20" },
    { label: "Bugun product qo‘shilgan", value: stats.newProductsToday, icon: <PlusCircle />, color: "bg-success/20" },
    { label: "Jami bannerlar", value: stats.totalBanners, icon: <Image />, color: "bg-warning/20" },
    { label: "Bugun banner qo‘shilgan", value: stats.newBannersToday, icon: <PlusCircle />, color: "bg-accent/20" },
  ];

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-base-100 p-5 rounded-xl shadow">
          <h1 className="text-3xl font-bold text-primary">Admin Analytics</h1>
          <p className="opacity-70">Real vaqt statistikasi</p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <div key={i} className="bg-base-100 p-5 rounded-xl shadow flex items-center gap-4">
              <div className={`p-3 rounded-lg ${c.color}`}>{c.icon}</div>
              <div>
                <p className="text-3xl font-bold">{c.value}</p>
                <p className="opacity-60">{c.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* PRODUCT CHART */}
        <div className="bg-base-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Productlar o‘sish grafigi (kunlik)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
