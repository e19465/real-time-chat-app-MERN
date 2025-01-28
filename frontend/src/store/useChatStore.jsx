import { create } from "zustand";
import { SessionStorageKeys } from "../constants/shared";

export const useChatStore = create((set, get) => ({
  messages: [],
  selectedChatUser: sessionStorage.getItem(
    SessionStorageKeys.SELECTED_CHAT_USER
  )
    ? JSON.parse(sessionStorage.getItem(SessionStorageKeys.SELECTED_CHAT_USER))
    : null,

  // used to set the selected chat user (user to chat) when clicked on a user
  setSelectedChatUser: (user) => {
    sessionStorage.setItem(
      SessionStorageKeys.SELECTED_CHAT_USER,
      JSON.stringify(user)
    );
    set({ selectedChatUser: user });
  },

  // used to clear the selected chat user when the chat is closed
  clearSelectedChatUser: () => {
    sessionStorage.removeItem(SessionStorageKeys.SELECTED_CHAT_USER);
    set({ selectedChatUser: null });
  },

  // used to add a new message to the messages array
  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },

  // used to set the messages array
  setMessages: (messages) => {
    set({ messages });
  },

  // used to clear a message by its id
  clearMessageById: (messageId) => {
    set((state) => ({
      messages: state.messages.filter((message) => message._id !== messageId),
    }));
  },

  // used to delete messages by their ids
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
