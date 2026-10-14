"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";

export type ToastSeverity = "success" | "info" | "warning" | "error";

interface ToastState {
  key: number;
  message: string;
  severity: ToastSeverity;
  open: boolean;
}

interface FeedbackContextValue {
  showToast: (message: string, severity?: ToastSeverity) => void;
}

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    key: 0,
    message: "",
    severity: "success",
    open: false,
  });

  const showToast = useCallback(
    (message: string, severity: ToastSeverity = "success") => {
      setToast({ key: Date.now(), message, severity, open: true });
    },
    []
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <FeedbackContext.Provider value={value}>
      {children}
      <Snackbar
        key={toast.key}
        open={toast.open}
        autoHideDuration={2600}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ bottom: { xs: 64, sm: 24 } }}
        transitionDuration={250}
      >
        <Slide direction="up" in={toast.open} appear>
          <Alert
            onClose={() => setToast((t) => ({ ...t, open: false }))}
            severity={toast.severity}
            variant="filled"
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
            }}
          >
            {toast.message}
          </Alert>
        </Slide>
      </Snackbar>
    </FeedbackContext.Provider>
  );
}

export function useFeedback(): FeedbackContextValue {
  const ctx = useContext(FeedbackContext);
  if (!ctx) {
    throw new Error("useFeedback must be used inside <FeedbackProvider>");
  }
  return ctx;
}

