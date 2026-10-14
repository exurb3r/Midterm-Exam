"use client";

import NextLink from "next/link";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import GroupsIcon from "@mui/icons-material/Groups";
import FeedIcon from "@mui/icons-material/Feed";
import EventIcon from "@mui/icons-material/Event";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

import { useCurrentUser } from "../../store/auth/store.useAuth";
import PersonAvatar from "../Avatar/PersonAvatar";

const CONNECTIONS_COUNT = 0;

const SIDEBAR_LINKS = [
  { icon: <BookmarkIcon />, label: "Saved items", href: "/my-items" },
  { icon: <GroupsIcon />, label: "Groups", href: "/groups" },
  { icon: <FeedIcon />, label: "Newsletters", href: "/newsletters" },
  { icon: <EventIcon />, label: "Events", href: "/events" },
];

import type { Theme } from "@mui/material/styles";

const cardSx = {
  bgcolor: "background.paper",
  border: 1,
  borderColor: (theme: Theme) => theme.palette.border,
  borderRadius: 2,
};

export default function ProfileCard() {
  const user = useCurrentUser();

  return (
    <Box>
      {/* Identity card */}
      <Box sx={{ ...cardSx, overflow: "visible" }}>
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              height: 72,
              background: (theme) => theme.palette.gradient.primary,
              borderRadius: "6px 6px 0 0",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              left: 16,
              bottom: -36,
              width: 72,
              height: 72,
            }}
          >
            <PersonAvatar
              name={user.name}
              initials={user.initials}
              src={user.avatarUrl}
              sx={{
                width: 72,
                height: 72,
                fontSize: 24,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                border: "3px solid",
                borderColor: "background.paper",
                outline: "1px dashed",
                outlineColor: "text.secondary",
                outlineOffset: -6,
              }}
            >
              {user.initials}
            </PersonAvatar>
            <Box
              sx={{
                position: "absolute",
                right: -8,
                bottom: -2,
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                bgcolor: "primary.main",
                color: "primary.contrastText",
                border: "2px solid",
                borderColor: "background.paper",
              }}
            >
              <AddIcon sx={{ fontSize: 18 }} />
            </Box>
          </Box>
        </Box>

        <Stack sx={{ px: 2, pt: 6, pb: 2 }}>
          <Typography variant="body" sx={{ fontWeight: 700, fontSize: 20, lineHeight: 1.3 }}>
            {user.name}
          </Typography>
          <Typography
            variant="bodySmall"
            color="text.secondary"
            sx={{
              mt: 0.25,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {user.headline || "--"}
          </Typography>
          <Typography variant="bodySmall" color="text.secondary" sx={{ mt: 0.5 }}>
            {user.location}
          </Typography>

          <ButtonBase
            component={NextLink}
            href="/profile"
            sx={{
              mt: 1.5,
              width: "100%",
              justifyContent: "flex-start",
              gap: 0.75,
              px: 1.5,
              py: 0.75,
              borderRadius: 1,
              border: "1px dashed",
              borderColor: "text.secondary",
              color: "text.primary",
              bgcolor: "surfaceSubtle",
              transition: "background-color 150ms ease",
              "&:hover": { bgcolor: "surfaceHover" },
              "&.Mui-focusVisible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: 2,
              },
            }}
          >
            <AddIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="bodySmall" sx={{ fontWeight: 600 }}>
              Experience
            </Typography>
          </ButtonBase>
        </Stack>
      </Box>

      {/* Premium card */}
      <Box
        sx={{
          ...cardSx,
          mt: 1,
          px: 2,
          py: 1.5,
          cursor: "pointer",
          transition: "background-color 150ms ease",
          "&:hover": { bgcolor: "surfaceHover" },
        }}
      >
        <Typography variant="bodySmall" color="text.secondary" sx={{ display: "block" }}>
          Access exclusive tools &amp; insights
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 0.75, alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              borderRadius: 0.5,
              bgcolor: "#E8A33D",
            }}
          >
            <WorkspacePremiumIcon sx={{ fontSize: 14, color: "#4A2E00" }} />
          </Box>
          <Typography variant="bodySmall" sx={{ fontWeight: 600, color: "primary.main" }}>
            Try Premium for ₱0
          </Typography>
        </Stack>
      </Box>

      {/* Connections card */}
      <Box
        component={NextLink}
        href="/network"
        sx={{
          ...cardSx,
          mt: 1,
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          textDecoration: "none",
          color: "text.primary",
          transition: "background-color 150ms ease",
          "&:hover": { bgcolor: "surfaceHover" },
        }}
      >
        <Stack>
          <Typography variant="bodySmall" sx={{ fontWeight: 600 }}>
            Connections
          </Typography>
          <Typography variant="bodySmall" color="text.secondary">
            Grow your network
          </Typography>
        </Stack>
        <Typography variant="bodySmall" sx={{ fontWeight: 600, color: "primary.main" }}>
          {CONNECTIONS_COUNT}
        </Typography>
      </Box>

      {/* Sidebar quick links */}
      <Box
        component="nav"
        aria-label="Quick links"
        sx={{
          ...cardSx,
          mt: 1,
          py: 1,
          display: { xs: "none", md: "block" },
        }}
      >
        {SIDEBAR_LINKS.map((link) => (
          <Box
            key={link.label}
            component={NextLink}
            href={link.href}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 2,
              py: 1,
              textDecoration: "none",
              color: "text.primary",
              transition: "background-color 150ms ease",
              "&:hover": { bgcolor: "surfaceHover" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: -2,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                color: "text.secondary",
                "& svg": { fontSize: 20 },
              }}
            >
              {link.icon}
            </Box>
            <Typography variant="bodySmall" sx={{ fontWeight: 600 }}>
              {link.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}