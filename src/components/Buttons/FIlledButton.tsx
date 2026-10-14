"use client";

import MuiButton, { type ButtonProps } from "@mui/material/Button";

export default function FIlledButton({
  children,
  sx,
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      variant="contained"
      sx={{
        transition: "transform 120ms ease, box-shadow 120ms ease, background-color 120ms ease",
        "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
        "&:active": { transform: "scale(0.97)" },
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.light",
          outlineOffset: 2,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
