const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const { SocketKeys, SocketRelatedMethods } = require("../constants/common");
require("dotenv").config();

//! environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
const allowedHeaders = process.env.ALLOWED_HEADERS.split(",");
const allowCredentials = process.env.ALLOW_CREDENTIALS === "true";

//! configuration
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: allowCredentials,
    allowedHeaders: allowedHeaders,
  },
});

//! online users
const userSocketMap = {}; // { userId: socketId }

io.on(SocketRelatedMethods.CONNECTION, (socket) => {
  console.log("A user connected: ", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // io.emit() is used to broadcast to all connected clients
  io.emit(SocketKeys.GET_ONLINE_USERS, Object.keys(userSocketMap));

  socket.on(SocketRelatedMethods.DISCONNECT, () => {
    console.log("A user disconnected: ", socket.id);
    delete userSocketMap[userId];
    // Emit the updated list of online users
    io.emit(SocketKeys.GET_ONLINE_USERS, Object.keys(userSocketMap));
  });
});

module.exports = { app, server, io };
