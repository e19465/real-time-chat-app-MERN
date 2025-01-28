import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { SocketKeys } from "../constants/shared";
import { getSocket } from "../context/SocketContext";
import { useChatStore } from "./useChatStore";

export const useSocketStore = create((set, get) => ({
  onlineUsers: [],

  // Initialize listeners and fetch online users
  subscribeToOnlineUsers: () => {
    const { isAuthenticated } = useAuthStore.getState();
    const socket = getSocket();
    if (!socket || !isAuthenticated()) {
      return;
    }

    // Prevent duplicate listeners by removing previous ones
    socket.off(SocketKeys.GET_ONLINE_USERS);

    // Add listener for online users
    socket.on(SocketKeys.GET_ONLINE_USERS, (userIds) => {
      set({ onlineUsers: userIds });
    });
    // console.log("Subscribed to online users.");
  },

  // Disconnect listeners when not needed
  unSubscribeToOnlineUsers: () => {
    const socket = getSocket();
    if (socket) {
      socket.off(SocketKeys.GET_ONLINE_USERS);
      // console.log("Cleared online user listeners.");
    }
  },

  // subscribe to messages
  subscribeToMessages: () => {
    const { isAuthenticated } = useAuthStore.getState();
    const { selectedChatUser } = useChatStore.getState();
    const socket = getSocket();
    if (!socket || !isAuthenticated()) {
      return;
    }

    // Prevent duplicate listeners by removing previous ones
    socket.off(SocketKeys.SEND_NEW_MESSAGE);

    // Add listener for new messages
    socket.on(SocketKeys.SEND_NEW_MESSAGE, (message) => {
      // console.log("sender: ", message.senderId);
      // console.log("receiver: ", message.receiverId);
      // console.log("selectedChatUser: ", selectedChatUser._id);
      if (
        message.senderId === selectedChatUser._id ||
        message.receiverId === selectedChatUser._id
      ) {
        useChatStore.getState().addMessage(message);
      }
    });
    // console.log("Subscribed to new messages.");
  },

  // Unsubscribe to messages
  unSubscribeToMessages: () => {
    const socket = getSocket();
    if (socket) {
      socket.off(SocketKeys.RECEIVE_NEW_MESSAGE);
      // console.log("Cleared new message listeners.");
    }
  },

  // Subscribe to message deletion
  subscribeToDeleteMessage: () => {
    const { isAuthenticated } = useAuthStore.getState();
    const socket = getSocket();
    if (!socket || !isAuthenticated()) {
      return;
    }

    // Prevent duplicate listeners by removing previous ones
    socket.off(SocketKeys.DELETE_MESSAGE);

    // Add listener for message deletion
    socket.on(SocketKeys.DELETE_MESSAGE, (messageIds) => {
      useChatStore.getState().deleteMessages(messageIds);
    });
    // console.log("Subscribed to message deletion.");
  },

  // Unsubscribe to message deletion
  unSubscribeToDeleteMessage: () => {
    const socket = getSocket();
    if (socket) {
      socket.off(SocketKeys.DELETE_MESSAGE);
      // console.log("Cleared message deletion listeners.");
    }
  },
}));
