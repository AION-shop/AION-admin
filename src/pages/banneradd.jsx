// BannerPage.jsx
import React, { useState, useEffect } from "react";
import { Plus, X, Image } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const BannerModal = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !image.trim()) {
      toast.error("Title va image majburiy!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/banners/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, image, link }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        onAdd(data.banner);
        onClose();
        setTitle(""); setImage(""); setLink("");
      } else toast.error(data.message || "Xatolik yuz berdi");
    } catch (err) {
      console.error(err);
      toast.error("Server bilan bog‘lanishda xatolik!");
    } finally { setLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-base-100 rounded-2xl w-full max-w-xl shadow-deep relative flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-base-300">
          <h2 className="text-2xl font-bold text-base-content">Yangi Banner Qo'shish</h2>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}><X size={20}/></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="label"><span className="label-text font-semibold">Title *</span></label>
            <input type="text" className="input input-bordered w-full" value={title} onChange={e => setTitle(e.target.value)} placeholder="Masalan: Summer Sale"/>
          </div>
          <div>
            <label className="label"><span className="label-text font-semibold flex items-center gap-2"><Image size={16}/> Image URL *</span></label>
            <input type="text" className="input input-bordered w-full" value={image} onChange={e => setImage(e.target.value)} placeholder="https://example.com/banner.jpg"/>
            {image && <img src={image} alt="preview" className="w-full h-40 object-cover rounded-lg border mt-2"/>}
          </div>
          <div>
            <label className="label"><span className="label-text font-semibold">Link</span></label>
            <input type="text" className="input input-bordered w-full" value={link} onChange={e => setLink(e.target.value)} placeholder="https://example.com"/>
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t border-base-300">
          <button onClick={onClose} className="btn btn-ghost flex-1">Bekor qilish</button>
          <button onClick={handleSubmit} disabled={loading} className="btn btn-primary flex-1">{loading ? "Qo'shilyapti..." : <><Plus size={16}/> Qo'shish</>}</button>
        </div>
      </div>
    </div>
  );
};

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-base-100 rounded-2xl w-full max-w-md shadow-deep flex flex-col p-6">
        <h2 className="text-xl font-bold mb-4">Haqiqatan ham o‘chirmoqchimisiz?</h2>
        <div className="flex gap-3">
          <button className="btn btn-ghost flex-1" onClick={onClose}>Bekor qilish</button>
          <button className="btn btn-error flex-1" onClick={onDelete}>Ha, o‘chirish</button>
        </div>
      </div>
    </div>
  );
};

export default function BannerPage() {
  const [banners, setBanners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  const fetchBanners = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/banners/");
      const data = await res.json();
      if (data.success) setBanners(data.banners);
    } catch (err) { console.error(err); toast.error("Server bilan bog‘lanishda xatolik!"); }
  };

  useEffect(() => { fetchBanners(); }, []);

  const handleAddBanner = (newBanner) => { setBanners(b => [newBanner, ...b]); toast.success("Yangi banner qo'shildi!"); };
  const confirmDelete = (banner) => { setBannerToDelete(banner); setDeleteModalOpen(true); };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/banners/${bannerToDelete._id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setBanners(b => b.filter(x => x._id !== bannerToDelete._id));
        toast.success(data.message);
      } else toast.error(data.message || "Xatolik yuz berdi");
    } catch (err) { console.error(err); toast.error("Server bilan bog‘lanishda xatolik!"); }
    finally { setDeleteModalOpen(false); setBannerToDelete(null); }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6 lg:p-8">
      <Toaster position="top-center"/>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Banners ({banners.length})</h1>
          <button className="btn btn-outline btn-primary gap-2" onClick={() => setModalOpen(true)}>
            <Plus size={18}/> Banner qo'shish
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.length === 0 ? (
            <p className="text-center text-primary col-span-full">Hozircha banner yo‘q!</p>
          ) : (
            banners.map(b => (
              <div key={b._id} className="bg-base-100 rounded-xl shadow p-4 relative">
                <img src={b.image} alt={b.title} className="w-full h-40 object-cover rounded-lg mb-2"/>
                <h2 className="font-bold text-lg">{b.title}</h2>
                {b.link && <p className="text-sm opacity-70">{b.link}</p>}
                <button className="btn btn-error btn-sm absolute top-3 right-3" onClick={() => confirmDelete(b)}>O‘chirish</button>
              </div>
            ))
          )}
        </div>
      </div>

      <BannerModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAddBanner}/>
      <DeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onDelete={handleDelete}/>
    </div>
  );
}
