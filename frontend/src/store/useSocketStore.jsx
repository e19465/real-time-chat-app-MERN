import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { io } from "socket.io-client";
import { SocketKeys } from "../constants/shared";

export const useSocketStore = create((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectToSocket: () => {
    const { isAuthenticated, userId } = useAuthStore.getState();
    if (!isAuthenticated() || get().socket?.connected) return;
    const socket = io(import.meta.env.VITE_BACKEND_BASE_URL, {
      withCredentials: true,
      query: { userId: userId },
    });
    socket.connect();
    set({ socket });
    socket.on(SocketKeys.GET_ONLINE_USERS, (userIds) => {
      //   console.log(userIds);
      set({ onlineUsers: userIds });
    });
  },

  // Disconnect from socket
  disconnectFromSocket: () => {
    if (get().socket?.connected) {
      console.log("Disconnecting from socket");
      get().socket?.disconnect();
    }
  },
}));
