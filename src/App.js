import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // useNavigate removed as it's not directly used in AppWrapper
import Sidebar from "./components/Sidebar";
import JoinRoomUI from "./components/JoinRoomUI";
import SpotifyLogin from "./components/SpotifyLogin";
import ChatRoom from "./components/ChatRoom";
import SpotifyCallback from "./components/SpotifyCallback";
import "./index.css"; // Ensure this points to your CSS file

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
    // Apply the flex, h-screen, bg, text, and font styles directly here
    // or create a single class like "app-wrapper" in CSS
    <div className="flex h-screen bg-[#121212] text-white font-sans">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto main-content"> {/* Added main-content class */}
        
        {/* Spotify Login button on top */}
        <SpotifyLogin />

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

// REMOVED DUPLICATE ROUTE DEFINITION: <Route path="/callback" element={<SpotifyCallback />} />
// This line was outside the App component and was redundant.

export default App;