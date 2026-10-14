"use client";

import { useState } from "react";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import PageContainer from "../../../components/PageContainer/PageContainer";
import PersonAvatar from "../../../components/Avatar/PersonAvatar";
import StateCard from "../../../components/feedback/StateCard";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import {
  CONVERSATIONS,
  type MockConversation,
  type MockMessage,
} from "../../../config/mock/messaging.mock";

interface RichMessage extends MockMessage {
  from: "me" | "them";
}

export default function MessagingPage() {
  const [conversations, setConversations] = useState<MockConversation[]>(CONVERSATIONS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");

  const active = conversations.find((c) => c.id === activeId) ?? null;

  const filtered = conversations.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      c.person.name.toLowerCase().includes(q) ||
      c.person.headline.toLowerCase().includes(q)
    );
  });

  const openConversation = (id: string) => {
    setActiveId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  };

  const sendMessage = () => {
    if (!active) return;
    const text = (drafts[active.id] ?? "").trim();
    if (!text) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              messages: [
                ...c.messages,
                { id: `m${Date.now()}`, from: "me" as const, text, time: "Now" },
              ],
            }
          : c
      )
    );
    setDrafts((prev) => ({ ...prev, [active.id]: "" }));
  };

  return (
    <PageContainer maxWidth="lg" disableGutters>
      <Box
        sx={{
          bgcolor: "background.paper",
          border: 1,
          borderColor: (theme) => theme.palette.border,
          borderRadius: 2,
          overflow: "hidden",
          height: { xs: "calc(100dvh - 136px)", sm: "calc(100vh - 120px)" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "340px minmax(0, 1fr)" },
        }}
      >
        {/* Conversation list */}
        <Box
          sx={{
            borderRight: { md: 1, xs: 0 },
            borderColor: "divider",
            display: { xs: active ? "none" : "flex", md: "flex" },
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <Box sx={{ p: 2, pb: 1 }}>
            <Typography variant="h3">Messaging</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 1.5,
                bgcolor: "surfaceHover",
                border: 1,
                borderColor: (theme) => theme.palette.border,
                borderRadius: 1.5,
                px: 1.25,
                py: 0.75,
              }}
            >
              <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
              <InputBase
                placeholder="Search messages"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ fontSize: 14, flex: 1, "& input": { p: 0 } }}
                inputProps={{ "aria-label": "search messages" }}
              />
            </Box>
          </Box>
          <Box sx={{ overflowY: "auto", flex: 1 }}>
            {filtered.map((conv) => {
              const last = conv.messages[conv.messages.length - 1];
              return (
                <Box
                  key={conv.id}
                  onClick={() => openConversation(conv.id)}
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    p: 2,
                    cursor: "pointer",
                    bgcolor: conv.id === activeId ? "surfaceHover" : "transparent",
                    borderLeft: 3,
                    borderLeftColor: conv.id === activeId ? "primary.main" : "transparent",
                    "&:hover": { bgcolor: "surfaceHover" },
                  }}
                >
                  <Badge
                    badgeContent={conv.unread}
                    color="primary"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <PersonAvatar
                      name={conv.person.name}
                      initials={conv.person.initials}
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                      }}
                    >
                      {conv.person.initials}
                    </PersonAvatar>
                  </Badge>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 600 }} noWrap>
                      {conv.person.name}
                    </Typography>
                    <Typography variant="bodySmall" color="text.secondary" noWrap>
                      {last ? `${last.from === "me" ? "You: " : ""}${last.text}` : ""}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {conv.lastActive}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
            {filtered.length === 0 && (
              <StateCard
                icon={<SearchOffOutlinedIcon sx={{ fontSize: 40 }} />}
                title="No conversations found"
                description={search ? `Nothing matches "${search}".` : "Start a new conversation to see it here."}
                actionLabel={search ? "Clear search" : undefined}
                onAction={search ? () => setSearch("") : undefined}
              />
            )}
          </Box>
        </Box>

        {/* Chat pane */}
        <Box
          sx={{
            display: { xs: active ? "flex" : "none", md: "flex" },
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          {active ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 2,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => setActiveId(null)}
                  sx={{ display: { md: "none" } }}
                  aria-label="back to conversations"
                >
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
                <PersonAvatar
                  name={active.person.name}
                  initials={active.person.initials}
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    fontSize: 14,
                  }}
                >
                  {active.person.initials}
                </PersonAvatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600 }} noWrap>
                    {active.person.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {active.person.headline} · {active.lastActive}
                  </Typography>
                </Box>
                <IconButton size="small" aria-label="conversation options">
                  <MoreHorizIcon />
                </IconButton>
              </Box>

              <Box sx={{ flex: 1, overflowY: "auto", p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
                {active.messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      maxWidth: "75%",
                      alignSelf: msg.from === "me" ? "flex-end" : "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: msg.from === "me" ? "primary.main" : "surfaceMuted",
                        color: msg.from === "me" ? "primary.contrastText" : "text.primary",
                        // Pill-round bubble with a small squared tail on the sender side.
                        borderRadius: 999,
                        px: 2.25,
                        py: 1.25,
                        borderTopRightRadius: msg.from === "me" ? 8 : 999,
                        borderTopLeftRadius: msg.from === "me" ? 999 : 8,
                        boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                        transition: "transform 120ms ease",
                        "&:hover": { transform: "translateY(-1px)" },
                        animation: "bubble-in 180ms ease both",
                        "@keyframes bubble-in": {
                          from: { opacity: 0, transform: "translateY(6px) scale(0.97)" },
                          to: { opacity: 1, transform: "translateY(0) scale(1)" },
                        },
                      }}
                    >
                      <Typography variant="bodySmall">{msg.text}</Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mt: 0.25, textAlign: msg.from === "me" ? "right" : "left" }}
                    >
                      {msg.time}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 2,
                  borderTop: 1,
                  borderColor: "divider",
                }}
              >
                <InputBase
                  fullWidth
                  multiline
                  maxRows={4}
                  placeholder="Write a message…"
                  value={drafts[active.id] ?? ""}
                  onChange={(e) =>
                    setDrafts((prev) => ({ ...prev, [active.id]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  sx={{
                    bgcolor: "surfaceHover",
                    border: 1,
                    borderColor: (theme) => theme.palette.border,
                    borderRadius: 999,
                    px: 2,
                    py: 1,
                    fontSize: 14,
                  }}
                  inputProps={{ "aria-label": "write a message" }}
                />
                <IconButton
                  onClick={sendMessage}
                  disabled={!(drafts[active.id] ?? "").trim()}
                  sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    transition: "transform 120ms ease, background-color 120ms ease",
                    "&:hover": { bgcolor: "primary.dark" },
                    "&:active": { transform: "scale(0.9)" },
                    "&.Mui-disabled": { bgcolor: "surfaceMuted", color: "text.disabled" },
                  }}
                  aria-label="send message"
                >
                  <SendRoundedIcon fontSize="small" />
                </IconButton>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
                textAlign: "center",
              }}
            >
              <ForumOutlinedIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
              <Typography variant="h3">Select a conversation</Typography>
              <Typography variant="bodySmall" color="text.secondary" sx={{ mt: 1 }}>
                Choose from your existing conversations on the left, or start a new one.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </PageContainer>
  );
}
