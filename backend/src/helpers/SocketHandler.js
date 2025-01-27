const { io } = require("../config/socket");
const { SocketRelatedMethods, SocketKeys } = require("../constants/shared");

//! online users
const userSocketMap = {}; // { userId: socketId }

// Export a function to initialize socket listeners
const initializeSocketListeners = () => {
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
};

const getUserSocketId = (userId) => {
  return userSocketMap[userId];
};

module.exports = {
  initializeSocketListeners,
  getUserSocketId,
};
