import { create } from "zustand";
import { LocalStorageKeys } from "../constants/shared";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedChatUserId:
    localStorage.getItem(LocalStorageKeys.SELECTED_CHAT_USER_ID) || null,
  onlineUsers: [],

  // Set online users
  setOnlineUsers: (users) => {
    set({ onlineUsers: users });
  },

  //TODO: optimize this later
  setSelectedChatUserId: (userId) => {
    localStorage.setItem(LocalStorageKeys.SELECTED_CHAT_USER_ID, userId);
    set({ selectedChatUserId: userId });
  },
  clearSelectedChatUserId: () => {
    set({ selectedChatUserId: null });
  },

  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },

  clearMessages: () => {
    set({ messages: [] });
  },

  setUsers: (users) => {
    set({ users });
  },

  clearUsers: () => {
    set({ users: [] });
  },
}));
