import React, { useState } from "react";
import { Plus, X, Image, Loader2 } from "lucide-react";

// Modal (faqat dizayn)
const AddBannerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-base-100 rounded-2xl w-full max-w-xl shadow-deep relative flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-300">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Plus className="text-primary" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-base-content">
              Yangi Banner Qo'shish
            </h2>
          </div>
          <button
            className="btn btn-ghost btn-sm btn-circle hover:bg-base-200"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                Title *
              </span>
            </label>
            <input
              type="text"
              placeholder="Masalan: Summer Sale Banner"
              className="input input-bordered w-full focus:input-primary"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <Image size={16} className="text-primary" /> Banner Image URL *
              </span>
            </label>
            <input
              type="text"
              placeholder="https://example.com/banner.jpg"
              className="input input-bordered w-full focus:input-primary"
            />
            <div className="mt-2">
              <img
                src="https://via.placeholder.com/300x150"
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg border-2 border-base-300"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-base-300">
          <button onClick={onClose} className="btn btn-ghost flex-1">
            Bekor qilish
          </button>
          <button className="btn btn-primary flex-1 gap-2">
            <Plus size={18} /> Qo'shish
          </button>
        </div>
      </div>
    </div>
  );
};

// Asosiy sahifa (faqat dizayn)
const Banners = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-base-100 rounded-2xl shadow-deep p-6 md:p-8 mb-6 text-base-100 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              Banners
            </h1>
            <p className="text-sm mt-1 opacity-90 text-primary">
              Jami: 0 ta banner
            </p>
          </div>
          <button
            className="btn btn-outline btn-light gap-2 text-primary"
            onClick={() => setModalOpen(true)}
          >
            <Plus size={20} /> Banner qo'shish
          </button>
        </div>

        <div>
          <p className="text-primary flex justify-center items-center">hozircha banner yoq !</p>
        </div>
      
      </div>

      {/* Modal */}
      <AddBannerModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Banners;
