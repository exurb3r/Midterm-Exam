"use client";

import MuiButton, { type ButtonProps } from "@mui/material/Button";

export default function OutLinedButton({
  children,
  sx,
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      variant="outlined"
      sx={{
        transition: "transform 120ms ease, box-shadow 120ms ease, background-color 120ms ease, border-color 120ms ease",
        "&:hover": { boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
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
