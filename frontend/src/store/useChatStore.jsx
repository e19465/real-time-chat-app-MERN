import { create } from "zustand";
import { LocalStorageKeys } from "../constants/shared";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedChatUser: localStorage.getItem(LocalStorageKeys.SELECTED_CHAT_USER)
    ? JSON.parse(localStorage.getItem(LocalStorageKeys.SELECTED_CHAT_USER))
    : null,
  onlineUsers: [],

  // Set online users
  setOnlineUsers: (users) => {
    set({ onlineUsers: users });
  },

  //TODO: optimize this later
  setSelectedChatUser: (user) => {
    localStorage.setItem(
      LocalStorageKeys.SELECTED_CHAT_USER,
      JSON.stringify(user)
    );
    set({ selectedChatUser: user });
  },
  clearSelectedChatUser: () => {
    set({ selectedChatUser: null });
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
