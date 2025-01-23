import { create } from "zustand";
import { AppSettings, LocalStorageKeys } from "../constants/shared";

export const useThemeStore = create((set) => ({
  theme:
    localStorage.getItem(LocalStorageKeys.SELECTED_THEME) ||
    AppSettings.DEFAULT_THEME,
  setTheme: (theme) => {
    localStorage.setItem(LocalStorageKeys.SELECTED_THEME, theme);
    set({ theme });
  },
}));
