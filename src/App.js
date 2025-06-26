import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import JoinRoomUI from "./components/JoinRoomUI";
import ChatRoom from "./components/ChatRoom";
import "./index.css";

function App() {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const handleJoin = () => {
    if (roomId && username) {
      setJoined(true);
    }
  };

  return (
    <div className="flex h-screen bg-[#121212] text-white font-sans">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        {joined ? (
          <ChatRoom roomId={roomId} username={username} />
        ) : (
          <JoinRoomUI
            username={username}
            setUsername={setUsername}
            roomId={roomId}
            setRoomId={setRoomId}
            handleJoin={handleJoin}
          />
        )}
      </main>
    </div>
  );
}

export default App;
