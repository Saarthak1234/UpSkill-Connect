import express from "express";
import { createServer } from "http";  // For Socket.io server
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./Utils/dbConnection.js";
import authRoutes from "./Routes/auth.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://upskill-connect-frontend.onrender.com",
    methods: "GET,POST,PUT,DELETE",
  })
);

// Connect to database
connectDB();

// Create HTTP server & attach Socket.io
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://upskill-connect-frontend.onrender.com",
    methods: ["GET", "POST"],
  },
});

// Maps to track connected users
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

// Socket.io event handling
io.on("connection", (socket) => {
  console.log(`🔗 Socket Connected: ${socket.id}`);

  //Error handling in sockets
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });

  socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
  });

  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    
    socket.join(room);
    io.to(room).emit("user:joined", { email, id: socket.id });
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incoming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  socket.on("disconnect", () => {
    console.log(`Socket Disconnected: ${socket.id}`);
    const email = socketidToEmailMap.get(socket.id);
    emailToSocketIdMap.delete(email);
    socketidToEmailMap.delete(socket.id);
  });
});

// Express Routes
app.get("/", (req, res) => {
  res.send("Welcome!! You are on the home screen");
});

app.use("/api/auth", authRoutes);

// Start the server
server.listen(PORT, "0.0.0.0" ,() => {
  console.log(`Server running on PORT ${PORT}`);
});
