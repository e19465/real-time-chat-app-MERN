import { createContext, useRef, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { useAuthStore } from "../store/useAuthStore";
import { useSocketStore } from "../store/useSocketStore";

const SocketContext = createContext(null);
let socketInstance = null; // Global socket instance

export const useSocket = () => {
  return useContext(SocketContext);
};

// Function to access the socket instance globally
export const getSocket = () => {
  if (!socketInstance) {
    console.error("Socket instance is not initialized yet.");
  }
  return socketInstance;
};

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const userId = useAuthStore((state) => state.userId);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { subscribeToOnlineUsers, unSubscribeToOnlineUsers } = useSocketStore();

  useEffect(() => {
    if (userId && isAuthenticated()) {
      socketRef.current = io(import.meta.env.VITE_BACKEND_BASE_URL, {
        withCredentials: true,
        query: { userId },
      });

      // Assign to the global variable
      socketInstance = socketRef.current;

      const socket = socketRef.current;

      socket.on("connect", () => {
        // console.log("Connected to socket server");
        subscribeToOnlineUsers();
      });

      return () => {
        // console.log("Disconnecting from socket");
        unSubscribeToOnlineUsers();
        socket.disconnect();
        socketInstance = null; // Clear the global instance
      };
    } else {
      //   console.log("User not authenticated, socket not initialized.");
      return () => {
        if (socketRef.current) {
          unSubscribeToOnlineUsers(socketRef.current);
          socketRef.current.disconnect();
          socketInstance = null; // Clear the global instance
        }
      };
    }
  }, [userId, isAuthenticated]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
