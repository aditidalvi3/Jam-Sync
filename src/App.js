import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import JoinRoomUI from "./components/JoinRoomUI";
import SpotifyLogin from "./components/SpotifyLogin";
import ChatRoom from "./components/ChatRoom";
import SpotifyCallback from "./components/SpotifyCallback";
import LandingPage from "./LandingPage";

function App() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
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

  const handleJoin = () => {
    if (roomId && username) {
      setJoined(true);
    }
  };

  return (
    <Router>
      <div className="flex h-screen bg-[#121212] text-white font-sans">
        <Sidebar />

        <main className="flex-1 p-6 overflow-y-auto main-content">
          <Routes>
            <Route path="/" element={<LandingPage onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
            <Route
              path="/join"
              element={
                !joined ? (
                  <JoinRoomUI
                    username={username}
                    setUsername={setUsername}
                    roomId={roomId}
                    setRoomId={setRoomId}
                    handleJoin={handleJoin}
                  />
                ) : (
                  <ChatRoom roomId={roomId} username={username} />
                )
              }
            />
            <Route path="/login" element={<SpotifyLogin />} />
            <Route path="/callback" element={<SpotifyCallback />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;