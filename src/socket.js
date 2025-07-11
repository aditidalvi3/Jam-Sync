import { io } from "socket.io-client";

// Use an environment variable for the backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://jamsync-backend.onrender.com";

const socket = io(BACKEND_URL, {
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("✅ Connected to socket server", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err.message);
});

export default socket;