import React, { useState } from "react";

export default function AddDiscount() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    product1: {
      name: "",
      price: "",
      originalPrice: "",
      image: "",
      showProduct1Until: "",
    },
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("product1.")) {
      const key = name.split(".")[1];
      setForm((f) => ({ ...f, product1: { ...f.product1, [key]: value } }));
    } else if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/discount-cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setToast({ type: "success", message: "Discount Card muvaffaqiyatli qo‘shildi!" });
        setForm({
          title: "",
          description: "",
          product1: { name: "", price: "", originalPrice: "", image: "", showProduct1Until: "" },
          isActive: true,
        });
      } else {
        setToast({ type: "error", message: data.message || "Xatolik yuz berdi" });
      }
    } catch (err) {
      setToast({ type: "error", message: "Server bilan bog‘lanishda xatolik" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <h1 className="text-2xl font-bold mb-4">Yangi Discount Card qo‘shish</h1>
      <div className="max-w-xl bg-base-100 p-6 rounded-xl shadow space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />
        <input
          type="text"
          name="product1.name"
          placeholder="Product name"
          value={form.product1.name}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="product1.price"
          placeholder="Discount Price"
          value={form.product1.price}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="product1.originalPrice"
          placeholder="Original Price"
          value={form.product1.originalPrice}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="product1.image"
          placeholder="Product Image URL"
          value={form.product1.image}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="date"
          name="product1.showProduct1Until"
          value={form.product1.showProduct1Until}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Active
        </label>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Qo‘shilmoqda..." : "Qo‘shish"}
        </button>
        {toast && (
          <div className={`p-3 rounded ${toast.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
}
