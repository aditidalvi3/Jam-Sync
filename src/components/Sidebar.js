import React from "react";

function Sidebar() {
  const handleNavigation = (section) => {
    console.log(`Navigating to: ${section}`);
    // In future: set state or navigate using React Router
  };

  return (
    <aside className="w-64 bg-[#1f1f1f] p-6">
      <h2 className="text-2xl font-bold mb-6">JamSync</h2>
      <nav className="space-y-4">
        <button
          onClick={() => handleNavigation("Home")}
          className="block w-full text-left px-2 py-1 rounded hover:bg-[#2c2c2c]"
        >
          Home
        </button>
        <button
          onClick={() => handleNavigation("Rooms")}
          className="block w-full text-left px-2 py-1 rounded hover:bg-[#2c2c2c]"
        >
          Rooms
        </button>
        <button
          onClick={() => handleNavigation("Settings")}
          className="block w-full text-left px-2 py-1 rounded hover:bg-[#2c2c2c]"
        >
          Settings
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
