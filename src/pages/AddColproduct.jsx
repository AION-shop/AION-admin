import React, { useState, useEffect } from "react";
import { Plus, Trash2, X, Image as ImgIcon, BarChart2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Input va TextArea komponentlari
const InputField = ({ label, name, type = "text", value, onChange, placeholder }) => (
  <div>
    <label className="label font-semibold">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input input-bordered w-full"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="label font-semibold">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="textarea textarea-bordered w-full h-28 resize-none"
    />
  </div>
);

const AdminColProducts = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    thumbnail: "",
    images: "",
    batteryOptions: "",
    maxRange: "",
    acceleration: "",
    power: "",
    reviewsCount: "",
  });

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/col-products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      showToast("error", "Maʼlumotlarni olishda xatolik.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!form.title.trim()) return showToast("error", "Title bo'sh bo‘lmasin!");
    if (!form.thumbnail.trim()) return showToast("error", "Thumbnail talab qilinadi!");

    const payload = {
      ...form,
      price: Number(form.price),
      maxRange: Number(form.maxRange),
      acceleration: Number(form.acceleration),
      power: Number(form.power),
      reviewsCount: Number(form.reviewsCount),
      images: form.images.split(",").map((i) => i.trim()).filter(Boolean),
      batteryOptions: form.batteryOptions.split(",").map((i) => i.trim()).filter(Boolean),
    };

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/col-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        showToast("success", "Mahsulot qo‘shildi!");
        setForm({
          title: "",
          price: "",
          description: "",
          thumbnail: "",
          images: "",
          batteryOptions: "",
          maxRange: "",
          acceleration: "",
          power: "",
          reviewsCount: "",
        });
        setModalOpen(false);
        fetchProducts();
      } else {
        showToast("error", data.message || "Xatolik!");
      }
    } catch {
      showToast("error", "Server bilan aloqa yo‘q.");
    }
    setLoading(false);
  };

  const handleDeleteProduct = async () => {
    if (!deleteModal.id) return;
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/col-products/${deleteModal.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToast("success", "Mahsulot o‘chirildi!");
        fetchProducts();
      } else {
        showToast("error", "O‘chirishda xatolik.");
      }
    } catch {
      showToast("error", "Server xatosi.");
    }
    setDeleting(false);
    setDeleteModal({ open: false, id: null });
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <Helmet>
        <title>Admin — Col Products</title>
        <meta name="description" content="Admin panel: Col products qo‘shish, o‘chirish, boshqarish" />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="bg-base-100 rounded-2xl p-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl">
              <ImgIcon className="text-primary" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Col Products</h1>
              <p className="text-sm opacity-80">Admin panel — mahsulotlar ro‘yxati</p>
              <p className="text-sm opacity-70 mt-1">Jami: <span className="font-semibold">{products.length}</span></p>
            </div>
          </div>

          <button onClick={() => setModalOpen(true)} className="btn btn-outline btn-primary gap-2">
            <Plus size={18} /> Yangi Qo‘shish
          </button>
        </div>

        {/* PRODUCTS GRID */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-primary gap-3">
            <BarChart2 size={48} />
            <p className="text-lg font-medium">Hozircha product yo‘q!</p>
            <p className="text-sm opacity-70">Yangi product qo‘shish uchun tugmani bosing.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p._id} className="bg-base-100 p-4 rounded-2xl shadow hover:shadow-lg transition flex flex-col">
                <div className="h-44 rounded-lg overflow-hidden mb-3 bg-gray-100">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/600x400")}
                  />
                </div>
                <h3 className="font-bold text-lg">{p.title}</h3>
                <p className="text-sm opacity-70 mt-1 line-clamp-2">{p.description}</p>
                <div className="mt-2 flex justify-between items-center text-xs opacity-70">
                  <div>
                    <span className="font-semibold text-primary">{p.price} so‘m</span>
                    <div>Reviews: {p.reviewsCount}</div>
                  </div>
                  <div className="text-right">
                    {p.batteryOptions?.join(", ")}<br />
                    {p.maxRange && `${p.maxRange} km`} {p.power && `• ${p.power} kW`}
                  </div>
                </div>
                <button
                  onClick={() => setDeleteModal({ open: true, id: p._id })}
                  className="btn btn-error btn-sm w-full mt-4 gap-2"
                >
                  <Trash2 size={16} /> O‘chirish
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ADD MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-base-100 rounded-2xl w-full max-w-3xl shadow-xl relative flex flex-col">

              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-base-300">
                <h2 className="text-xl md:text-2xl font-bold text-base-content flex items-center gap-2">
                  <Plus size={20} className="text-primary" /> Yangi Product Qo‘shish
                </h2>
                <button onClick={() => setModalOpen(false)} className="btn btn-ghost btn-sm btn-circle">
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Title *" name="title" value={form.title} onChange={handleChange} placeholder="Tesla Model S" />
                  <InputField label="Price *" name="price" type="number" value={form.price} onChange={handleChange} placeholder="99999" />
                </div>

                <TextAreaField label="Description" name="description" value={form.description} onChange={handleChange} placeholder="Mahsulot haqida..." />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Thumbnail URL *" name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="https://example.com/img.jpg" />
                  <InputField label="Images (comma)" name="images" value={form.images} onChange={handleChange} placeholder="https://a.jpg, https://b.jpg" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Battery Options" name="batteryOptions" value={form.batteryOptions} onChange={handleChange} placeholder="50 kWh, 75 kWh" />
                  <InputField label="Max Range" name="maxRange" type="number" value={form.maxRange} onChange={handleChange} placeholder="500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Acceleration" name="acceleration" type="number" value={form.acceleration} onChange={handleChange} placeholder="3.2" />
                  <InputField label="Power (kW)" name="power" type="number" value={form.power} onChange={handleChange} placeholder="350" />
                </div>

                <InputField label="Reviews Count" name="reviewsCount" type="number" value={form.reviewsCount} onChange={handleChange} placeholder="120" />
              </div>

              {/* Footer */}
              <div className="p-5 border-t flex gap-3">
                <button onClick={() => setModalOpen(false)} className="btn btn-ghost flex-1">Bekor qilish</button>
                <button onClick={handleAddProduct} disabled={loading} className="btn btn-primary flex-1 gap-2">
                  {loading ? "Qo‘shilmoqda..." : <><Plus size={16}/> Qo‘shish</>}
                </button>
              </div>

              {/* TOAST */}
              {toast && (
                <div
                  className={`absolute right-4 bottom-4 p-3 rounded-lg shadow-lg ${
                    toast.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {toast.message}
                </div>
              )}
            </div>
          </div>
        )}

        {/* DELETE CONFIRM MODAL */}
        {deleteModal.open && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-base-100 rounded-xl p-6 w-full max-w-md shadow-2xl">
              <h2 className="text-xl font-bold text-error mb-2">Mahsulotni o‘chirish</h2>
              <p className="mb-6">Bu mahsulotni butunlay o‘chirmoqchimisiz?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal({ open: false, id: null })}
                  className="btn btn-ghost flex-1"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="btn btn-error flex-1"
                  disabled={deleting}
                >
                  {deleting ? "O‘chirilmoqda..." : "Ha, o‘chir"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminColProducts;
