import React, { useEffect, useState } from "react";
import {
  Users,
  Loader2,
  CalendarDays,
  RefreshCw,
  Search,
  UserCircle,
} from "lucide-react";

const SeeUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // 🧠 Foydalanuvchilarni olish
  const fetchUsers = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("http://localhost:5000/api/auth/users");
      const data = await res.json();

      if (data.success) setUsers(data.users || []);
      else console.error("Xato:", data.message);
    } catch (err) {
      console.error("Server bilan bog‘lanishda xato:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🕓 Toshkent vaqti bilan formatlash
  const formatDate = (iso) => {
    if (!iso) return "—";
    const date = new Date(iso);
    return date.toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 🔍 Qidiruv logikasi
  const filtered = users.filter(
    (u) =>
      u.telegram?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.chatId?.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen p-6 bg-base-200 text-base-content transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Users className="text-primary" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Foydalanuvchilar</h1>
              <p className="text-sm opacity-70">
                Jami: {users.length || 0} ta foydalanuvchi
              </p>
            </div>
          </div>

          <button
            onClick={fetchUsers}
            disabled={refreshing}
            className="btn btn-sm btn-primary gap-2"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            Yangilash
          </button>
        </div>

        {/* Qidiruv */}
        <div className="bg-base-100 rounded-xl p-4 shadow-sm mb-6 border border-base-300">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50"
              size={18}
            />
            <input
              type="text"
              placeholder="Telegram yoki Chat ID bo‘yicha qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10 bg-base-200 focus:bg-base-100"
            />
          </div>
          {searchTerm && (
            <p className="text-sm opacity-60 mt-2">
              Natijalar: {filtered.length} ta
            </p>
          )}
        </div>

        {/* Jadval */}
        <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-x-auto">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <Loader2 className="animate-spin text-primary mb-3" size={40} />
              <p className="opacity-70">Yuklanmoqda...</p>
            </div>
          ) : filtered.length > 0 ? (
            <table className="table w-full">
              <thead className="bg-base-200">
                <tr>
                  <th>#</th>
                  <th>
                    <div className="flex items-center gap-2">
                      <UserCircle size={16} />
                      Telegram
                    </div>
                  </th>
                  <th>Chat ID</th>
                  <th>
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      Ro‘yhatdan o‘tgan
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr
                    key={u._id}
                    className="hover:bg-base-200/60 transition-colors duration-200"
                  >
                    <td>{i + 1}</td>
                    <td className="font-medium text-primary">
                      {u.telegram || "—"}
                    </td>
                    <td>
                      <span className="badge badge-outline badge-primary">
                        {u.chatId}
                      </span>
                    </td>
                    <td className="text-sm opacity-70">{formatDate(u.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col justify-center items-center py-20">
              <Users className="text-base-content opacity-30 mb-3" size={48} />
              <p className="text-lg font-medium">
                {searchTerm
                  ? "Natija topilmadi"
                  : "Foydalanuvchilar hali yo‘q"}
              </p>
              <p className="text-sm opacity-60">
                {searchTerm
                  ? "Boshqa so‘z bilan urinib ko‘ring."
                  : "Yangi foydalanuvchilar ro‘yxatdan o‘tishini kuting."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeeUsers;
