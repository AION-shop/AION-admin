import React, { useState } from "react";
import {
  Plus,
  X,
  Package,
  DollarSign,
  FileText,
  Image,
  Tag,
} from "lucide-react";

const AddProductModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-base-100 rounded-2xl w-full max-w-2xl shadow-deep relative flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-300">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Plus className="text-primary" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-base-content">
              Yangi Product Qo'shish
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
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          <InputField
            label="Product nomi *"
            icon={<Package size={16} className="text-primary" />}
            placeholder="Masalan: iPhone 15 Pro Max"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Narxi *"
              icon={<DollarSign size={16} className="text-primary" />}
              placeholder="999"
            />
            <InputField
              label="Kategoriya"
              icon={<Tag size={16} className="text-primary" />}
              placeholder="Masalan: Telefonlar"
            />
          </div>

          <TextAreaField
            label="Tavsif"
            icon={<FileText size={16} className="text-primary" />}
            placeholder="Product haqida batafsil ma'lumot..."
          />

          <InputField
            label="Asosiy rasm URL"
            icon={<Image size={16} className="text-primary" />}
            placeholder="https://example.com/image.jpg"
          />

          <InputField
            label="Qo'shimcha rasmlar"
            icon={<Image size={16} className="text-primary" />}
            placeholder="URL1, URL2, URL3 (vergul bilan ajrating)"
          />
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

// Input components (faqat dizayn)
const InputField = ({ label, icon, ...props }) => (
  <div>
    <label className="label">
      <span className="label-text font-semibold flex items-center gap-2">
        {icon} {label}
      </span>
    </label>
    <input
      {...props}
      className="input input-bordered w-full focus:input-primary"
    />
  </div>
);

const TextAreaField = ({ label, icon, ...props }) => (
  <div>
    <label className="label">
      <span className="label-text font-semibold flex items-center gap-2">
        {icon} {label}
      </span>
    </label>
    <textarea
      {...props}
      className="textarea textarea-bordered w-full h-24 focus:textarea-primary resize-none"
    />
  </div>
);

export default function Products() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-base-100 rounded-2xl p-6 mb-6 text-base-100 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-base-100/20 p-3 rounded-xl">
              <Package className="text-base-100" size={32} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">
                Productlar
              </h1>
              <p className="text-sm opacity-80 text-primary">Jami: 0 ta product</p>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-outline btn-light gap-2 text-primary "
          >
            <Plus size={20} /> Product qo'shish
          </button>
        </div>
        <div className="flex justify-center items-center text-primary">
          <p>hozircha product yoq !</p> 
        </div>

        {/* Modal */}
        <AddProductModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </div>
  );
}
