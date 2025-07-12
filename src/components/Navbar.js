import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Your Navbar elements go here */}
        <div className="navbar-left">
          <h1 className="text-2xl font-bold text-white">JamSync</h1>
        </div>
        <div className="navbar-right">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/rooms">Rooms</NavLink></li>
            <li><NavLink to="/settings">Settings</NavLink></li>
            {/* FIX: Changed button to NavLink to route to the login page */}
            <li><NavLink to="/login" className="nav-btn">Sign In</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;