import { create } from "zustand";
import { LocalStorageKeys } from "../constants/shared";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem(LocalStorageKeys.SELECTED_THEME) || "coffee",
  setTheme: (theme) => {
    localStorage.setItem(LocalStorageKeys.SELECTED_THEME, theme);
    set({ theme });
  },
}));
