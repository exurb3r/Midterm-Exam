"use client";

import Box from "@mui/material/Box";
import type { Breakpoint } from "@mui/material/styles";

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: Breakpoint | false;
  disableGutters?: boolean;
}

export default function PageContainer({
  children,
  maxWidth = "lg",
  disableGutters = false,
}: PageContainerProps) {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        maxWidth: (theme) =>
          maxWidth ? theme.breakpoints.values[maxWidth] : "100%",
        mx: "auto",
        px: disableGutters ? 0 : { xs: 2, sm: 3 },
        py: disableGutters ? 0 : { xs: 2, sm: 3 },
      }}
    >
      {children}
    </Box>
  );
}
