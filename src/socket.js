// socket.js
import { io } from "socket.io-client";

// Use environment variable for backend URL, fallback to localhost in dev
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

const socket = io(BACKEND_URL, {
  withCredentials: true,               // Important for cookies/credentials
  transports: ["websocket"],           // Prefer WebSocket
});

// Optional: Log events for debugging
socket.on("connect", () => {
  console.log("✅ Connected to socket server:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err.message);
});

export default socket;
