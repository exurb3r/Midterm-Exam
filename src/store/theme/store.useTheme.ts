"use client";

import { create } from "zustand";

type ColorMode = "light" | "dark";

interface ThemeState {
  mode: ColorMode;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  mode: "light",
  toggleTheme: () =>
    set((state) => ({
      mode: state.mode === "light" ? "dark" : "light",
    })),
}));

export default useThemeStore;
