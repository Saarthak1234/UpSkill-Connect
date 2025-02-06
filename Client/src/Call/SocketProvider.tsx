import React, { createContext, useMemo, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

// Create a context for the socket
const SocketContext = createContext<Socket | null>(null);

// Custom hook to use the socket
export const useSocket = (): Socket => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};

// Define the SocketProvider component
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize the socket connection using useMemo to prevent unnecessary reinitialization
  const socket = useMemo(() => io("https://upskill-connect-backend.onrender.com", { transports: ['websocket', 'polling'],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000,
    autoConnect: true }), []);

  useEffect(() => {
    // Connect socket when component mounts
    socket.connect();

    // Event listeners for debugging and handling reconnections
    socket.on("connect", () => console.log("✅ Socket connected:", socket.id));
    socket.on("disconnect", () => console.log("⚠️ Socket disconnected"));
    socket.on("connect_error", (err) => console.error("❌ Socket connection error:", err));

    return () => {
      // Cleanup: Disconnect socket and remove all event listeners when unmounting
      socket.disconnect();
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
    };
  }, [socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
