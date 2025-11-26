import React, { useState, useEffect } from "react";

const Settings = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [color, setColor] = useState(localStorage.getItem("color") || "#3b82f6"); // default blue

  // Load saved settings
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("settings")) || {};
    setFirstName(savedSettings.firstName || "");
    setLastName(savedSettings.lastName || "");
    setPreview(savedSettings.profilePic || "");
    setTheme(savedSettings.theme || theme);
    setColor(savedSettings.color || color);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const settings = {
      firstName,
      lastName,
      profilePic: preview, // frontend preview
      theme,
      color,
    };
    localStorage.setItem("settings", JSON.stringify(settings));
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.setProperty("--primary-color", color);
    alert("Sozlamalar saqlandi!");
    window.dispatchEvent(new Event("settingsUpdated")); // notify Dashboard
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Profil va tema sozlamalari</h2>

      <form onSubmit={handleSave} className="space-y-4">

        {/* Profil rasmi */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-gray-300 dark:border-gray-600">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700 text-gray-500">+</div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered file-input-sm w-full max-w-xs"
          />
        </div>

        {/* First Name */}
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-gray-100">Ism</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-gray-100">Familiya</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        {/* Theme selection */}
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-gray-100">Tema</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="select select-bordered w-full dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Primary color */}
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-gray-100">Primary color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 p-0 border-0 rounded"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Saqlash
        </button>
      </form>
    </div>
  );
};

export default Settings;
