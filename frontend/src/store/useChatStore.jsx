import { create } from "zustand";
import { SessionStorageKeys } from "../constants/shared";

export const useChatStore = create((set, get) => ({
  messages: [],
  selectedChatUser: sessionStorage.getItem(
    SessionStorageKeys.SELECTED_CHAT_USER
  )
    ? JSON.parse(sessionStorage.getItem(SessionStorageKeys.SELECTED_CHAT_USER))
    : null,
  onlineUsers: [],

  // Set online users
  setOnlineUsers: (users) => {
    set({ onlineUsers: users });
  },

  //TODO: optimize this later
  setSelectedChatUser: (user) => {
    sessionStorage.setItem(
      SessionStorageKeys.SELECTED_CHAT_USER,
      JSON.stringify(user)
    );
    set({ selectedChatUser: user });
  },

  clearSelectedChatUser: () => {
    sessionStorage.removeItem(SessionStorageKeys.SELECTED_CHAT_USER);
    set({ selectedChatUser: null });
  },

  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },

  setMessages: (messages) => {
    set({ messages });
  },

  clearMessageById: (messageId) => {
    set((state) => ({
      messages: state.messages.filter((message) => message._id !== messageId),
    }));
  },

  deleteMessages: (messageIds) => {
    set((state) => ({
      messages: state.messages.filter(
        (message) => !messageIds.includes(message._id)
      ),
    }));
  },
}));

// Listen for session storage updates and sync Zustand state
window.addEventListener("storage", (event) => {
  if (event.key === SessionStorageKeys.SELECTED_CHAT_USER) {
    const updatedUser = event.newValue ? JSON.parse(event.newValue) : null;
    useChatStore.getState().setSelectedChatUser(updatedUser);
  }
});
