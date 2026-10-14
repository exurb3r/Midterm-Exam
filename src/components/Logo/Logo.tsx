"use client";

import NextLink from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { APP_NAME } from "../../config/config";

interface LogoProps {
  href?: string;
  size?: number;
  /** Show the app name next to the mark (hidden on phones either way). */
  showName?: boolean;
}

export default function Logo({
  href = "/feed",
  size = 34,
  showName = true,
}: LogoProps) {
  return (
    <Box
      component={NextLink}
      href={href}
      aria-label={APP_NAME}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        textDecoration: "none",
        borderRadius: "6px",
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: 2,
        },
      }}
    >
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: `${Math.round(size * 0.15)}px`,
          background: (theme) => theme.palette.gradient.primary,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        <Typography
          component="span"
          sx={{
            color: "#fff",
            fontFamily: "var(--font-display), sans-serif",
            fontWeight: 800,
            // Lowercase letters have no ascenders, so a big size is needed to
            // fill the square; the tight tracking keeps "cn" snug.
            fontSize: size * 0.72,
            lineHeight: 1,
            letterSpacing: "-0.05em",
            // x-height sits below the line-box centre; nudge up to centre it
            transform: "translateY(-0.04em)",
            userSelect: "none",
          }}
        >
          cn
        </Typography>
      </Box>

      {showName && (
        <Typography
          component="span"
          sx={{
            display: { xs: "none", sm: "block" },
            fontWeight: 700,
            fontSize: "1.125rem",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "text.primary",
          }}
        >
          {APP_NAME}
        </Typography>
      )}
    </Box>
  );
}