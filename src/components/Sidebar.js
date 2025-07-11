import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaCog } from "react-icons/fa"; // Added icons for visual appeal

function Sidebar() {
  return (
    <aside className="w-64 bg-[#1f1f1f] p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-extrabold mb-8 text-white tracking-wide">
          JamSync
        </h2>
        <nav className="space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-3 text-lg font-medium px-4 py-3 rounded-lg transition-colors duration-200 
              ${
                isActive 
                  ? "bg-[#2c2c2c] text-[#1DB954] shadow-md" // More prominent active state with a soft shadow
                  : "text-gray-300 hover:bg-[#2c2c2c] hover:text-white" // Subtle hover effect
              }`
            }
          >
            <FaHome />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              `flex items-center space-x-3 text-lg font-medium px-4 py-3 rounded-lg transition-colors duration-200 
              ${
                isActive 
                  ? "bg-[#2c2c2c] text-[#1DB954] shadow-md" 
                  : "text-gray-300 hover:bg-[#2c2c2c] hover:text-white"
              }`
            }
          >
            <FaUsers />
            <span>Rooms</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center space-x-3 text-lg font-medium px-4 py-3 rounded-lg transition-colors duration-200 
              ${
                isActive 
                  ? "bg-[#2c2c2c] text-[#1DB954] shadow-md"
                  : "text-gray-300 hover:bg-[#2c2c2c] hover:text-white"
              }`
            }
          >
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>
      
      {/* Optional: Add a profile or info section at the bottom */}
      <div className="border-t border-gray-700 pt-6 mt-8 text-sm text-gray-500">
        <p>JamSync © 2025</p>
      </div>
    </aside>
  );
}

export default Sidebar;