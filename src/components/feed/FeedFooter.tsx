"use client";

import NextLink from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { APP_NAME } from "../../config/config";

const LINKS: { label: string; href: string }[] = [
  { label: "About", href: "#" },
  { label: "Accessibility", href: "#" },
  { label: "Help Center", href: "/help" },
  { label: "Privacy & Terms", href: "#" },
  { label: "Ad Choices", href: "#" },
  { label: "Advertising", href: "#" },
  { label: "Business Services", href: "#" },
  { label: "Get the app", href: "#" },
];

export default function FeedFooter() {
  return (
    <Box sx={{ pt: 1, pb: { xs: 10, sm: 6 } }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: 2.5,
          rowGap: 0.75,
        }}
      >
        {LINKS.map(({ label, href }) => (
          <NextLink
            key={label}
            href={href}
            style={{ textDecoration: "none" }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: 12,
                "&:hover": { color: "primary.main", textDecoration: "underline" },
              }}
            >
              {label}
            </Typography>
          </NextLink>
        ))}
      </Box>

      <Stack
        direction="row"
        spacing={0.75}
        sx={{ justifyContent: "center", alignItems: "center", mt: 1.5 }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            color: "text.primary",
          }}
        >
          {APP_NAME}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          A UI clone concept © 2026
        </Typography>
      </Stack>
    </Box>
  );
}
