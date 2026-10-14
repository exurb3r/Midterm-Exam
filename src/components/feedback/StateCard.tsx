"use client";

import NextLink from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface StateCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  href?: string;
}

export default function StateCard({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  href,
}: StateCardProps) {
  return (
    <Stack
      sx={{ py: { xs: 6, md: 8 }, px: 2, textAlign: "center", alignItems: "center" }}
    >
      <Box sx={{ color: "text.disabled", mb: 1.5 }}>{icon}</Box>
      <Typography variant="body" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      {description && (
        <Typography
          variant="bodySmall"
          color="text.secondary"
          sx={{ mt: 0.75, maxWidth: 360 }}
        >
          {description}
        </Typography>
      )}
      {actionLabel && (href ? (
        <NextLink href={href} style={{ textDecoration: "none" }}>
          <Button
            sx={{ mt: 2.5, borderRadius: 999, textTransform: "none", fontWeight: 600 }}
          >
            {actionLabel}
          </Button>
        </NextLink>
      ) : (
        <Button
          onClick={onAction}
          sx={{ mt: 2.5, borderRadius: 999, textTransform: "none", fontWeight: 600 }}
        >
          {actionLabel}
        </Button>
      ))}
    </Stack>
  );
}
