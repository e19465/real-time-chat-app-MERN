import { create } from "zustand";
import { LocalStorageKeys } from "../constants/shared";

export const useAuthStore = create((set) => ({
  userId: localStorage.getItem(LocalStorageKeys.USER_ID),
  userEmail: localStorage.getItem(LocalStorageKeys.USER_EMAIL),
  userFullName: localStorage.getItem(LocalStorageKeys.USER_FULL_NAME),

  // Get user details from local storage
  getUserInfoFromLocalStorage: () => {
    const userId = localStorage.getItem(LocalStorageKeys.USER_ID);
    const userEmail = localStorage.getItem(LocalStorageKeys.USER_EMAIL);
    const userFullName = localStorage.getItem(LocalStorageKeys.USER_FULL_NAME);
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
    const { userId, userEmail, userFullName } = getState();
    return userId && userEmail && userFullName ? true : false;
  },

  // Clear session data
  clearSessionData: () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    set({ userId: null, userEmail: null, userFullName: null });
  },
}));
