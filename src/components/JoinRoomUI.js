import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const JoinRoomUI = () => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (username && roomId) {
      navigate(`/chat/${roomId}/${username}`);
    }
  };

  return (
    <motion.div
      className="join-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="join-box">
        <h1 className="join-title">🎶 Join JamSync</h1>
        <div className="input-group">
          <label className="input-label">Your Name</label>
          <input
            type="text"
            className="join-input"
            placeholder="e.g., Aditi"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Room ID</label>
          <input
            type="text"
            className="join-input"
            placeholder="e.g., abc123"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>
        <button
          onClick={handleJoin}
          disabled={!username || !roomId}
          className="join-button"
        >
          Join Room
        </button>
      </div>
    </motion.div>
  );
};

export default JoinRoomUI;