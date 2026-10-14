"use client";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 4 } }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1.5,
            background: (theme) => theme.palette.gradient.primary,
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          CN
        </Box>
      </Box>
      {children}
      <CssBaseline />
    </Box>
  );
}
