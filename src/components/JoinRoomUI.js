// File: src/components/JoinRoomUI.js
import React from "react";
import { motion } from "framer-motion";

const JoinRoomUI = ({ username, setUsername, roomId, setRoomId, handleJoin }) => (
  <motion.div
    className="flex flex-col items-center justify-center min-h-screen px-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="bg-[#1b1b1b] p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
      <h1 className="text-3xl font-bold text-[#1DB954] text-center">🎶 Join JamSync</h1>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Your Name</label>
        <input
          type="text"
          className="bg-[#121212] border border-gray-700 p-3 w-full text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          placeholder="e.g., Aditi"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Room ID</label>
        <input
          type="text"
          className="bg-[#121212] border border-gray-700 p-3 w-full text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          placeholder="e.g., abc123"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>

      <button
        onClick={handleJoin}
        disabled={!username || !roomId}
        className="w-full py-3 bg-[#1DB954] text-black font-semibold rounded-xl hover:bg-[#1ed760] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Join Room
      </button>
    </div>
  </motion.div>
);

export default JoinRoomUI;
