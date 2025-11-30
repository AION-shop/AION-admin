import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/sell";

const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSellers = async () => {
    try {
      const { data } = await axios.get(API_URL);
      if (data.success) setSellers(data.data);
      else setError("Ma'lumotni olishda xatolik bo'ldi");
    } catch (err) {
      setError("Serverga ulana olmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Sotuvchilar ro‘yxati</h1>

      {loading && <div className="loading loading-spinner loading-lg"></div>}

      {error && <div className="alert alert-error mb-4"><span>{error}</span></div>}

      {!loading && sellers.length === 0 && !error && (
        <p className="text-gray-500">Hali hech qanday ariza kelmagan.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellers.map((seller) => (
          <div key={seller._id} className="card bg-base-100 shadow-xl border">
            <div className="card-body">
              <h2 className="card-title">{seller.fullName || "Noma'lum ism"}</h2>
              <p><strong>Hudud:</strong> {seller.region || "-"}</p>
              <p><strong>Avtomobil modeli:</strong> {seller.carModel || "-"}</p>
              <p><strong>Yosh:</strong> {seller.age || "-"}</p>
              <p><strong>Telefon:</strong> {seller.phone || "-"}</p>
              <p><strong>Email:</strong> {seller.email || "-"}</p>
              <p><strong>O‘zingiz haqingizda:</strong> {seller.aboutYou || "-"}</p>
              <p><strong>Avtomobil haqida:</strong> {seller.aboutCar || "-"}</p>
              <p><strong>Qo‘shimcha ma’lumot:</strong> {seller.extraInfo || "-"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sellers;
