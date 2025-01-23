import { create } from "zustand";

export const useChatStore = create((set, get) => ({
  messages: [],
  selectedUser: null,
  users: [],

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
