"use client";

import NextLink from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import RssFeedOutlinedIcon from "@mui/icons-material/RssFeedOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

import { NEWS } from "../../config/mock/feed.mock";

export default function NewsCard() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: 1,
        borderColor: (theme) => theme.palette.border,
        borderRadius: 2,
        p: 2,
      }}
    >
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h3" sx={{ fontSize: "1rem" }}>
          Career Nexus News
        </Typography>
        <RssFeedOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
      </Stack>

      <Stack spacing={1.5} sx={{ mt: 1.5 }}>
        {NEWS.map((item) => (
          <NextLink key={item.title} href="#" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                "&:hover": { bgcolor: "surfaceHover", borderRadius: 1 },
                px: 0.5,
                py: 0.5,
                mx: -0.5,
                transition: "background-color 150ms ease",
              }}
            >
              <Typography
                variant="bodySmall"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                • {item.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.timeAgo} ago · {item.source}
              </Typography>
            </Box>
          </NextLink>
        ))}
      </Stack>

      <Box
        component={NextLink}
        href="#"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          mt: 1.5,
          px: 1,
          py: 0.5,
          borderRadius: 999,
          textDecoration: "none",
          color: "text.secondary",
          fontSize: 13,
          fontWeight: 600,
          transition: "background-color 150ms ease",
          "&:hover": { bgcolor: "surfaceHover" },
        }}
      >
        Show more
        <ExpandMoreOutlinedIcon sx={{ fontSize: 16 }} />
      </Box>
    </Box>
  );
}
