import React, { useState, useEffect, useRef } from "react";
import socket from "../socket";
import VideoChat from "./VideoChat";
import { FiSend } from "react-icons/fi";
import { motion } from "framer-motion";

// Optional: Dummy Now Playing bar
const NowPlaying = ({ track }) => (
  <div className="bg-[#1f1f1f] p-3 text-sm flex items-center justify-between text-white shadow-inner">
    <div>
      🎵 <strong>{track.title}</strong> by {track.artist}
    </div>
    <span className="text-[#1DB954]">Now Playing</span>
  </div>
);

const ChatRoom = ({ roomId, username }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const chatEndRef = useRef(null);

  // Emit join-room & listen to events
  useEffect(() => {
    socket.emit("join-room", roomId, username);

    socket.on("chat-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user-joined", (name) => {
      setMessages((prev) => [...prev, { system: true, message: `${name} joined the room` }]);
    });

    socket.on("user-left", (name) => {
      setMessages((prev) => [...prev, { system: true, message: `${name} left the room` }]);
    });

    socket.on("typing", ({ username }) => {
      setTypingUser(username);
      setTimeout(() => setTypingUser(""), 2000);
    });

    return () => {
      socket.off("chat-message");
      socket.off("user-joined");
      socket.off("user-left");
      socket.off("typing");
    };
  }, [roomId, username]);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("chat-message", {
      roomId,
      message,
      sender: username || "Anonymous",
    });
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleTyping = () => {
    socket.emit("typing", { roomId, username });
  };

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="p-4 bg-[#1f1f1f] shadow flex justify-between items-center">
        <h2 className="text-xl font-bold">🎧 Jam Room: {roomId}</h2>
        <span className="text-sm text-gray-400">User: {username}</span>
      </div>

      {/* Chat & Video */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Area */}
        <div className="flex flex-col flex-1 p-6">
          <div className="flex-1 overflow-y-auto space-y-3 mb-2 bg-[#181818] p-4 rounded-xl">
            {messages.map((msg, i) =>
              msg.system ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-gray-400 italic"
                >
                  {msg.message}
                </motion.div>
              ) : (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-xl max-w-md ${
                    msg.sender === username
                      ? "bg-[#1DB954] text-black self-end"
                      : "bg-[#2c2c2c] text-white self-start"
                  }`}
                >
                  <p className="text-sm font-semibold">{msg.sender}</p>
                  <p>{msg.message}</p>
                </motion.div>
              )
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Typing Indicator */}
          {typingUser && (
            <div className="text-sm text-gray-400 italic mb-2">{typingUser} is typing...</div>
          )}

          {/* Input Bar */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleTyping();
              }}
              onKeyDown={handleKeyPress}
              className="flex-1 bg-[#1f1f1f] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1DB954] text-white"
            />
            <button
              onClick={sendMessage}
              className="bg-[#1DB954] hover:bg-[#1ed760] p-3 rounded-xl text-black"
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>

        {/* Video Chat */}
        <div className="hidden lg:block w-1/2 bg-[#1a1a1a] p-4">
          <VideoChat roomId={roomId} />
        </div>
      </div>

      {/* Now Playing Bar */}
      <NowPlaying track={{ title: "Midnight City", artist: "M83" }} />
    </div>
  );
};

export default ChatRoom;
