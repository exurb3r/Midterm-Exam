"use client";

import { useState } from "react";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";

import PageContainer from "../../../components/PageContainer/PageContainer";
import FIlledButton from "../../../components/Buttons/FIlledButton";
import OutLinedButton from "../../../components/Buttons/OutLinedButton";
import { useFeedback } from "../../../components/feedback/FeedbackProvider";
import StateCard from "../../../components/feedback/StateCard";
import PersonAvatar from "../../../components/Avatar/PersonAvatar";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import {
  INVITATIONS,
  NETWORK_SUGGESTIONS,
} from "../../../config/mock/network.mock";
import type { MockPerson } from "../../../config/mock/feed.mock";

const MANAGE_LINKS = [
  { label: "My items", href: "/my-items", icon: <BookmarkBorderOutlinedIcon fontSize="small" /> },
  { label: "Groups", href: "/groups", icon: <GroupsOutlinedIcon fontSize="small" /> },
  { label: "Events", href: "/events", icon: <EventOutlinedIcon fontSize="small" /> },
  { label: "Newsletters", href: "/newsletters", icon: <FeedOutlinedIcon fontSize="small" /> },
];

/* ------------------------------------------------------------------ */
/* Suggestion card with dismiss + connect state                       */
/* ------------------------------------------------------------------ */

function PersonCard({
  person,
  mutual,
  onDismiss,
  onConnect,
}: {
  person: MockPerson;
  mutual?: string;
  onDismiss: () => void;
  onConnect: () => void;
}) {
  const [connected, setConnected] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const handleDismiss = () => {
    setLeaving(true);
    // Let the fade-out play before unmounting the card.
    setTimeout(onDismiss, 180);
  };

  const handleConnect = () => {
    setConnected(true);
    onConnect();
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: 1,
        borderColor: (theme) => theme.palette.border,
        borderRadius: 2,
        p: 2,
        pt: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        opacity: leaving ? 0 : 1,
        transform: leaving ? "scale(0.94)" : "none",
        transition: "opacity 180ms ease, transform 180ms ease",
        "&:hover": {
          borderColor: (t) => t.palette.borderStrong,
          boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
        },
      }}
    >
      <IconButton
        size="small"
        onClick={handleDismiss}
        aria-label={`Dismiss ${person.name} suggestion`}
        sx={{
          position: "absolute",
          top: 6,
          right: 6,
          width: 28,
          height: 28,
          color: "text.secondary",
          transition: "background-color 150ms ease, color 150ms ease",
          "&:hover": { bgcolor: "surfaceHover", color: "text.primary" },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <PersonAvatar
        name={person.name}
        initials={person.initials}
        sx={{
          width: 72,
          height: 72,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          fontSize: 24,
          mt: 0.5,
          transition: "transform 150ms ease",
        }}
      >
        {person.initials}
      </PersonAvatar>
      <Typography variant="body" sx={{ mt: 1.5, fontWeight: 600 }}>
        {person.name}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          mt: 0.5,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          minHeight: 32,
        }}
      >
        {person.headline}
      </Typography>
      {mutual && (
        <Stack direction="row" spacing={0.75} sx={{ mt: 0.75, alignItems: "center" }}>
          <GroupOutlinedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
          <Typography variant="caption" color="text.secondary">
            {mutual}
          </Typography>
        </Stack>
      )}
      <OutLinedButton
        fullWidth
        size="small"
        onClick={handleConnect}
        disabled={connected}
        startIcon={
          connected ? undefined : <PersonAddAlt1OutlinedIcon fontSize="small" />
        }
        sx={{
          mt: 1.5,
          borderRadius: 999,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        {connected ? "Pending" : "Connect"}
      </OutLinedButton>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function MyNetworkPage() {
  const { showToast } = useFeedback();
  const [invitations, setInvitations] = useState(INVITATIONS);
  const [suggestions, setSuggestions] = useState(NETWORK_SUGGESTIONS);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleAccept = (id: string) => {
    const inv = invitations.find((i) => i.id === id);
    setRemovingId(id);
    setTimeout(() => {
      setInvitations((prev) => prev.filter((i) => i.id !== id));
      setRemovingId(null);
    }, 180);
    showToast(`You and ${inv?.person.name ?? "they"} are now connected`);
  };

  const handleIgnore = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      setInvitations((prev) => prev.filter((i) => i.id !== id));
      setRemovingId(null);
    }, 180);
    showToast("Invitation ignored", "info");
  };

  return (
    <PageContainer maxWidth="lg">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "232px minmax(0, 1fr)" },
          gap: 2,
          alignItems: "start",
        }}
      >
        {/* Left rail — manage my network */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            bgcolor: "background.paper",
            border: 1,
            borderColor: (theme) => theme.palette.border,
            borderRadius: 2,
            py: 1.5,
            position: "sticky",
            top: 68,
          }}
        >
          <Typography
            variant="bodySmall"
            sx={{ px: 2, pb: 1, fontWeight: 600, color: "text.secondary" }}
          >
            Manage my network
          </Typography>
          {MANAGE_LINKS.map((link) => (
            <Box
              key={link.label}
              component={NextLink}
              href={link.href}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.75,
                px: 2,
                py: 1,
                textDecoration: "none",
                color: "text.primary",
                transition: "background-color 120ms ease",
                "&:hover": { bgcolor: "surfaceHover" },
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: -2,
                },
              }}
            >
              <Box sx={{ display: "flex", color: "text.secondary" }}>{link.icon}</Box>
              <Typography variant="bodySmall" sx={{ fontWeight: 600 }}>
                {link.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Main column */}
        <Stack spacing={2}>
          {/* Invitations */}
          <Box
            sx={{
              bgcolor: "background.paper",
              border: 1,
              borderColor: (theme) => theme.palette.border,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                px: 3,
                pt: 2,
                pb: 1.5,
              }}
            >
              <Typography variant="h3">Invitations</Typography>
              <Typography variant="bodySmall" color="text.secondary">
                {invitations.length} pending
              </Typography>
            </Box>

            {invitations.length === 0 ? (
              <StateCard
                icon={<GroupsOutlinedIcon sx={{ fontSize: 48 }} />}
                title="No pending invitations"
                description="When someone wants to connect with you, their invitation will appear here for you to accept or ignore."
              />
            ) : (
              <Stack divider={<Box sx={{ borderTop: 1, borderColor: "divider" }} />}>
                {invitations.map((inv) => (
                  <Box
                    key={inv.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      px: 3,
                      py: 2,
                      flexWrap: { xs: "wrap", sm: "nowrap" },
                      opacity: removingId === inv.id ? 0 : 1,
                      transform: removingId === inv.id ? "translateX(12px)" : "none",
                      transition: "opacity 180ms ease, transform 180ms ease",
                    }}
                  >
                    <PersonAvatar
                      name={inv.person.name}
                      initials={inv.person.initials}
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                      }}
                    >
                      {inv.person.initials}
                    </PersonAvatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body" sx={{ fontWeight: 600 }}>
                        {inv.person.name}
                      </Typography>
                      <Typography
                        variant="bodySmall"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {inv.person.headline}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {inv.timeAgo} ago
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                      <OutLinedButton
                        onClick={() => handleIgnore(inv.id)}
                        sx={{ borderRadius: 999, textTransform: "none", fontWeight: 600 }}
                      >
                        Ignore
                      </OutLinedButton>
                      <FIlledButton
                        onClick={() => handleAccept(inv.id)}
                        sx={{ borderRadius: 999, textTransform: "none", fontWeight: 600 }}
                      >
                        Accept
                      </FIlledButton>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>

          {/* People you may know */}
          <Box
            sx={{
              bgcolor: "background.paper",
              border: 1,
              borderColor: (theme) => theme.palette.border,
              borderRadius: 2,
              px: 3,
              pt: 2,
              pb: 3,
            }}
          >
            <Typography variant="h3">People you may know</Typography>
            <Typography variant="bodySmall" color="text.secondary" sx={{ mt: 0.5 }}>
              Based on your profile and activity — dismiss anyone you already know.
            </Typography>

            {suggestions.length === 0 ? (
              <StateCard
                icon={<SentimentSatisfiedAltOutlinedIcon sx={{ fontSize: 48 }} />}
                title="You're all caught up"
                description="No more suggestions for now. New people to follow will show up here over time."
              />
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr 1fr",
                    lg: "1fr 1fr 1fr 1fr",
                  },
                  gap: 2,
                  mt: 2,
                }}
              >
                {suggestions.map((sug) => (
                  <PersonCard
                    key={sug.id}
                    person={sug.person}
                    mutual={sug.mutual}
                    onDismiss={() =>
                      setSuggestions((prev) => prev.filter((s) => s.id !== sug.id))
                    }
                    onConnect={() => showToast(`Invitation sent to ${sug.person.name}`)}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Stack>
      </Box>
    </PageContainer>
  );
}
