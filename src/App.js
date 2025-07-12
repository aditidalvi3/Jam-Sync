import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import JoinRoomUI from "./components/JoinRoomUI";
import SpotifyLogin from "./components/SpotifyLogin";
import ChatRoom from "./components/ChatRoom";
import SpotifyCallback from "./components/SpotifyCallback";
import LandingPage from "./components/LandingPage";
// REMOVED: The import for the Sidebar component
import Navbar from "./components/Navbar";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <Router>
      {/* ADDED: The top-level Navbar component */}
      <Navbar />

      <div className="bg-[#121212] text-white font-sans">
        {/* REMOVED: The Sidebar component from the layout */}
        <main className="flex-1 p-6 overflow-y-auto main-content">
          <Routes>
            <Route path="/" element={<LandingPage onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
            <Route path="/rooms" element={<JoinRoomUI />} />
            <Route path="/chat/:roomId/:username" element={<ChatRoom />} />
            <Route path="/login" element={<SpotifyLogin />} />
            <Route path="/callback" element={<SpotifyCallback />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;