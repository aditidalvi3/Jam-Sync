import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-[#1f1f1f] p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">JamSync</h2>
      <nav className="space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block w-full text-left px-2 py-1 rounded transition-colors duration-200 ${
              isActive ? "bg-[#2c2c2c] text-[#1DB954]" : "hover:bg-[#2c2c2c]"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/join"
          className={({ isActive }) =>
            `block w-full text-left px-2 py-1 rounded transition-colors duration-200 ${
              isActive ? "bg-[#2c2c2c] text-[#1DB954]" : "hover:bg-[#2c2c2c]"
            }`
          }
        >
          Rooms
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `block w-full text-left px-2 py-1 rounded transition-colors duration-200 ${
              isActive ? "bg-[#2c2c2c] text-[#1DB954]" : "hover:bg-[#2c2c2c]"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;