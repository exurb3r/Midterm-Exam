"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useFeedStore } from "../store/feed/store.useFeed";
import { useAuthStore, useAuthHydration } from "../store/auth/store.useAuth";
import { useJobsStore } from "../store/jobs/store.useJobs";

import { theme, darkTheme } from "../config/theme/config.theme.colors";
import useThemeStore from "../store/theme/store.useTheme";
import { FeedbackProvider } from "../components/feedback/FeedbackProvider";

type ColorMode = "light" | "dark";

interface ColorModeContextValue {
  mode: ColorMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue | null>(null);

export function useColorMode() {
  const ctx = useContext(ColorModeContext);

  if (!ctx) {
    throw new Error("useColorMode must be used inside <Providers>");
  }

  return ctx;
}

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const mode = useThemeStore((state) => state.mode);
  const toggleColorMode = useThemeStore(
    (state) => state.toggleTheme
  );

  const activeTheme = useMemo(
    () => (mode === "light" ? theme : darkTheme),
    [mode]
  );

  // Rehydrate persisted stores after mount (SSR-safe).
  useEffect(() => {
    useFeedStore.persist.rehydrate();
    useJobsStore.persist.rehydrate();
    useAuthStore.persist.rehydrate();
    useAuthHydration.getState().setAuthReady(true);
  }, []);

  return (
    <ColorModeContext.Provider
      value={{
        mode,
        toggleColorMode,
      }}
    >
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />
        <FeedbackProvider>{children}</FeedbackProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}