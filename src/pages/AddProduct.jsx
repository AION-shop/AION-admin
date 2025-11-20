// Products.jsx
import React, { useState, useEffect } from "react";
import { Plus, X, Image as ImgIcon, Battery, BarChart2, Trash2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

/**
 * Products page + AddProductModal (admin)
 * DELETE qo‘shilgan (modal + api)
 */

const InputField = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div>
    <label className="label">
      <span className="label-text font-semibold">{label}</span>
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="input input-bordered w-full focus:input-primary"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="label">
      <span className="label-text font-semibold">{label}</span>
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="textarea textarea-bordered w-full h-28 focus:textarea-primary resize-none"
    />
  </div>
);

function AddProductModal({ isOpen, onClose, onAdd }) {
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

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!isOpen) {
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
      setToast(null);
      setLoading(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!form.title.trim()) return "Title bo'sh bo'la olmaydi.";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0)
      return "Narxni to'g'ri kiriting.";
    if (!form.thumbnail.trim()) return "Thumbnail URL talab qilinadi.";
    return null;
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      showToast("error", err);
      return;
    }

    const payload = {
      title: form.title.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      thumbnail: form.thumbnail.trim(),
      images:
        form.images
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean) || [],
      batteryOptions:
        form.batteryOptions
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean) || [],
      maxRange: form.maxRange ? Number(form.maxRange) : undefined,
      acceleration: form.acceleration ? Number(form.acceleration) : undefined,
      power: form.power ? Number(form.power) : undefined,
      reviewsCount: form.reviewsCount ? Number(form.reviewsCount) : 0,
    };

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        const newProduct = data.product || data;
        onAdd(newProduct);
        showToast("success", "Product muvaffaqiyatli qo'shildi.");
        onClose();
      } else {
        showToast("error", data.message || "Server xatosi.");
      }
    } catch (err) {
      showToast("error", "Server bilan bog‘lanishda xatolik.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-base-100 rounded-2xl w-full max-w-3xl shadow-xl relative flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-base-300">
          <h2 className="text-xl md:text-2xl font-bold text-base-content flex items-center gap-2">
            <Plus size={20} className="text-primary" /> Yangi Product Qo‘shish
          </h2>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
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
            <InputField label="Max Range" name="maxRange" value={form.maxRange} onChange={handleChange} type="number" placeholder="500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Acceleration" name="acceleration" value={form.acceleration} onChange={handleChange} type="number" placeholder="3.2" />
            <InputField label="Power (kW)" name="power" value={form.power} onChange={handleChange} type="number" placeholder="350" />
          </div>

          <InputField label="Reviews Count" name="reviewsCount" value={form.reviewsCount} onChange={handleChange} type="number" placeholder="120" />
        </div>

        {/* Footer */}
        <div className="p-5 border-t flex gap-3">
          <button onClick={onClose} className="btn btn-ghost flex-1">Bekor qilish</button>
          <button onClick={handleSubmit} disabled={loading} className="btn btn-primary flex-1 gap-2">
            {loading ? "Qo‘shilmoqda..." : <><Plus size={16}/> Qo‘shish</>}
          </button>
        </div>

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
  );
}





// ================================================
// MAIN PRODUCTS PAGE
// ================================================
export default function Products() {
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [pageToast, setPageToast] = useState(null);

  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [deleting, setDeleting] = useState(false);

  // Get all products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        if (res.ok) setProducts(data.products || data);
      } catch (err) {
        setPageToast({ type: "error", message: "Mahsulotlarni yuklashda xatolik." });
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts((p) => [newProduct, ...p]);
    setPageToast({ type: "success", message: "Yangi product qo‘shildi." });
    setTimeout(() => setPageToast(null), 3000);
  };

  const handleDeleteProduct = async () => {
    if (!deleteModal.id) return;

    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/products/${deleteModal.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== deleteModal.id));
        setPageToast({ type: "success", message: "Product o‘chirildi." });
      } else {
        setPageToast({ type: "error", message: data.message || "O‘chirishda xato." });
      }
    } catch (err) {
      setPageToast({ type: "error", message: "Server bilan bog‘lanishda xato." });
    } finally {
      setDeleteModal({ open: false, id: null });
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <Helmet>
        <title>Admin — Productlar</title>
        <meta name="description" content="Admin panel: Product qo‘shish, o‘chirish, boshqarish" />
      </Helmet>

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="bg-base-100 rounded-2xl p-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl">
              <ImgIcon className="text-primary" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Productlar</h1>
              <p className="text-sm opacity-80">Admin panel — mahsulotlar ro‘yxati</p>
              <p className="text-sm opacity-70 mt-1">
                Jami: <span className="font-semibold">{products.length}</span>
              </p>
            </div>
          </div>

          <button onClick={() => setModalOpen(true)} className="btn btn-outline btn-primary gap-2">
            <Plus size={18} /> Product qo‘shish
          </button>
        </div>

        {/* PAGE TOAST */}
        {pageToast && (
          <div
            className={`mb-4 p-3 rounded-lg shadow ${
              pageToast.type === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {pageToast.message}
          </div>
        )}

        {/* GRID */}
        {loadingProducts ? (
          <div className="text-center py-12 text-primary">Yuklanmoqda...</div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-primary gap-3">
            <BarChart2 size={48} />
            <p className="text-lg font-medium">Hozircha product yo‘q!</p>
            <p className="text-sm opacity-70">Yangi product qo‘shish uchun tugmani bosing.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p._id} className="bg-base-100 p-4 rounded-2xl shadow hover:shadow-lg transition">
                <div className="h-44 rounded-lg overflow-hidden mb-3 bg-gray-100">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/600x400")}
                  />
                </div>

                <h3 className="font-bold text-lg">{p.title}</h3>
                <p className="text-sm opacity-70 mt-1">{p.description?.slice(0, 120)}</p>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-primary">${p.price}</span>
                    <div className="text-xs opacity-70">Reviews: {p.reviewsCount}</div>
                  </div>
                  <div className="text-right text-xs opacity-70">
                    {p.batteryOptions?.join(", ")}
                    <br />
                    {p.maxRange && `${p.maxRange} km`} {p.power && `• ${p.power} kW`}
                  </div>
                </div>

                {/* DELETE BUTTON */}
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
        <AddProductModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAddProduct} />

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
}
