// File: src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import JoinRoomUI from "./components/JoinRoomUI";
import ChatRoom from "./components/ChatRoom";
import SpotifyCallback from "./components/SpotifyCallback";
import "./index.css";

function AppWrapper() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (roomId && username) {
      setJoined(true);
    }
  };

  return (
    <div className="flex h-screen bg-[#121212] text-white font-sans">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route
            path="/"
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
          <Route path="/callback" element={<SpotifyCallback />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

<Route path="/callback" element={<SpotifyCallback />} />

export default App;
