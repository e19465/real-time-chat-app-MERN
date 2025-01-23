import { create } from "zustand";
import { LocalStorageKeys } from "../constants/shared";

export const useAuthStore = create((set, get) => ({
  userId: localStorage.getItem(LocalStorageKeys.USER_ID),
  userEmail: localStorage.getItem(LocalStorageKeys.USER_EMAIL),
  userFullName: localStorage.getItem(LocalStorageKeys.USER_FULL_NAME),

  // Get user details from local storage
  getUserInfoFromLocalStorage: () => {
    const userId = localStorage.getItem(LocalStorageKeys.USER_ID);
    const userEmail = localStorage.getItem(LocalStorageKeys.USER_EMAIL);
    const userFullName = localStorage.getItem(LocalStorageKeys.USER_FULL_NAME);
    set({ userId, userEmail, userFullName }); // Sync state with localStorage
    return { userId, userEmail, userFullName };
  },

  // Set user details in local storage
  setUserInfoToLocalStorage: (data) => {
    localStorage.setItem(LocalStorageKeys.USER_ID, data?._id);
    localStorage.setItem(LocalStorageKeys.USER_EMAIL, data?.email);
    localStorage.setItem(LocalStorageKeys.USER_FULL_NAME, data?.fullName);
    set({
      userId: data?._id,
      userEmail: data?.email,
      userFullName: data?.fullName,
    });
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const { userId, userEmail, userFullName } = get();
    return Boolean(userId && userEmail && userFullName);
  },

  // Clear session data
  clearSessionData: () => {
    localStorage.removeItem(LocalStorageKeys.USER_ID);
    localStorage.removeItem(LocalStorageKeys.USER_EMAIL);
    localStorage.removeItem(LocalStorageKeys.USER_FULL_NAME);
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    set({ userId: null, userEmail: null, userFullName: null });
  },
}));
