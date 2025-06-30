import { io } from "socket.io-client";

const socket = io("https://jamsync-backend.onrender.com", {
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("✅ Connected to socket server", socket.id);
});

export default socket;
