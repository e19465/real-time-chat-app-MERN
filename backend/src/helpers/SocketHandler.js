const { io } = require("../config/socket");
const { SocketRelatedMethods, SocketKeys } = require("../constants/shared");

//! online users
const userSocketMap = new Map(); // userId -> socketId

// Get user socket id
const getUserSocketId = (userId) => {
  return userSocketMap.get(userId.toString());
};

// Send message in real time
const sendMessageRealTimeSocket = (message) => {
  // console.log("Sending message in real time: ", message);
  const senderSocketId = getUserSocketId(message.senderId);
  const receiverSocketId = getUserSocketId(message.receiverId);

  if (senderSocketId) {
    // console.log("Sending message to sender: ", message.senderId);
    io.to(senderSocketId).emit(SocketKeys.SEND_NEW_MESSAGE, message);
  }

  if (receiverSocketId) {
    // console.log("Sending message to receiver: ", message.receiverId);
    io.to(receiverSocketId).emit(SocketKeys.SEND_NEW_MESSAGE, message);
  }
};

// Delete message in real time
const deleteMessageRealTimeSocket = (messages) => {
  const receiverSocketId = getUserSocketId(messages[0]?.receiverId);
  const messageIds = messages.map((message) => message._id);
  if (receiverSocketId) {
    // console.log("Deleting message to receiver: ", message.receiverId);
    io.to(receiverSocketId).emit(SocketKeys.DELETE_MESSAGE, messageIds);
  }
};

// Export a function to initialize socket listeners
const initializeSocketListeners = () => {
  io.on(SocketRelatedMethods.CONNECTION, (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      console.log(`User connected: ${userId} with socketId: ${socket.id}`);
      userSocketMap.set(userId, socket.id);
    }

    // io.emit() is used to broadcast to all connected clients
    io.emit(SocketKeys.GET_ONLINE_USERS, Array.from(userSocketMap.keys()));

    //! Disconnect from socket
    socket.on(SocketRelatedMethods.DISCONNECT, () => {
      console.log("A user disconnected: ", socket.id);
      userSocketMap.delete(userId);
      io.emit(SocketKeys.GET_ONLINE_USERS, Array.from(userSocketMap.keys()));
    });
  });
};

module.exports = {
  initializeSocketListeners,
  getUserSocketId,
  sendMessageRealTimeSocket,
  deleteMessageRealTimeSocket,
};
