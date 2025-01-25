import { create } from "zustand";
import { LocalStorageKeys } from "../constants/shared";

export const useChatStore = create((set, get) => ({
  messages: [],
  selectedUser: null,
  users: [],
  selectedChatUserId:
    localStorage.getItem(LocalStorageKeys.SELECTED_CHAT_USER_ID) || null,
  onlineUsers: [],

  // Set online users
  setOnlineUsers: (users) => {
    set({ onlineUsers: users });
  },

  // Set selected chat user
  setSelectedChatUserId: (userId) => {
    localStorage.setItem(LocalStorageKeys.SELECTED_CHAT_USER_ID, userId);
    set({ selectedChatUserId: userId });
  },

  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },

  //TODO: optimize this later
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  setUsers: (users) => {
    set({ users });
  },

  clearMessages: () => {
    set({ messages: [] });
  },

  clearSelectedUser: () => {
    set({ selectedUser: null });
  },

  clearUsers: () => {
    set({ users: [] });
  },
}));
