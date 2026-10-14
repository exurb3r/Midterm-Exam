"use client";

import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import Portal from "@mui/material/Portal";

import { useCurrentUser } from "../../store/auth/store.useAuth";
import PersonAvatar from "../Avatar/PersonAvatar";

type Conversation = {
  id: string;
  name: string;
  source?: string;
  preview: string;
  date: string;
  avatarText: string;
  avatarBg: string;
  tab: "Focused" | "Other";
};

// Mock data — replace with your store/API later
const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "The Career Nexus Team",
    source: "via Career Nexus",
    preview: "Welcome to Career Nexus! 3 important tips to get started on your profile",
    date: "Sep 26",
    avatarText: "CN",
    avatarBg: "#2F6B3A",
    tab: "Focused",
  },
];

const TABS = ["Focused", "Other"] as const;

export default function MessagingDock() {
  const user = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Focused");
  const [query, setQuery] = useState("");

  const items = CONVERSATIONS.filter(
    (c) =>
      c.tab === tab &&
      (query.trim() === "" ||
        `${c.name} ${c.preview}`.toLowerCase().includes(query.trim().toLowerCase()))
  );

  return (
    <Portal>
        <Box
        component="aside"
        aria-label="Messaging"
        sx={{
            position: "fixed",
            right: 24,
            bottom: 0,
            zIndex: (theme) => theme.zIndex.appBar,
            width: 320,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            bgcolor: "background.paper",
            border: 1,
            borderBottom: 0,
            borderColor: (theme) => theme.palette.border,
            borderRadius: "8px 8px 0 0",
            boxShadow: "0 0 8px rgba(0,0,0,0.25)",
            overflow: "hidden",
        }}
        >
        {/* Header */}
        <Stack
            direction="row"
            sx={{
            alignItems: "center",
            pr: 1,
            borderBottom: open ? 1 : 0,
            borderColor: "divider",
            }}
        >
            <ButtonBase
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="messaging-panel"
            sx={{
                flex: 1,
                justifyContent: "flex-start",
                gap: 1.5,
                px: 2,
                py: 1,
                textAlign: "left",
                "&:hover": { bgcolor: "surfaceHover" },
                "&.Mui-focusVisible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: -2,
                },
            }}
            >
            <PersonAvatar
                name={user.name}
                initials={user.initials}
                src={user.avatarUrl}
                sx={{
                width: 32,
                height: 32,
                fontSize: 13,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                }}
            >
                {user.initials}
            </PersonAvatar>
            <Typography variant="body" sx={{ fontWeight: 600 }}>
                Messaging
            </Typography>
            </ButtonBase>

            <IconButton size="small" aria-label="More messaging options" sx={{ color: "text.secondary" }}>
            <MoreHorizIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" aria-label="Compose message" sx={{ color: "text.secondary" }}>
            <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
            size="small"
            aria-label={open ? "Collapse messaging" : "Expand messaging"}
            onClick={() => setOpen((v) => !v)}
            sx={{ color: "text.secondary", ml: 0.5 }}
            >
            {open ? (
                <KeyboardArrowDownIcon fontSize="small" />
            ) : (
                <KeyboardArrowUpIcon fontSize="small" />
            )}
            </IconButton>
        </Stack>

        {/* Panel */}
        {open && (
            <Box
            id="messaging-panel"
            sx={{ display: "flex", flexDirection: "column", height: 480, maxHeight: "calc(100vh - 120px)" }}
            >
            <Box sx={{ px: 1.5, py: 1.5 }}>
                <Stack
                direction="row"
                sx={{
                    alignItems: "center",
                    gap: 1,
                    px: 1.25,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: "surfaceSubtle",
                }}
                >
                <SearchIcon sx={{ fontSize: 20, color: "text.secondary" }} />
                <InputBase
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search messages"
                    inputProps={{ "aria-label": "Search messages" }}
                    sx={{ flex: 1, fontSize: 14 }}
                />
                <TuneIcon sx={{ fontSize: 20, color: "text.secondary" }} />
                </Stack>
            </Box>

            <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                variant="fullWidth"
                textColor="inherit"
                sx={{
                minHeight: 40,
                borderBottom: 1,
                borderColor: "divider",
                "& .MuiTabs-indicator": { bgcolor: "success.main", height: 3 },
                "& .MuiTab-root": {
                    minHeight: 40,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "text.secondary",
                },
                "& .Mui-selected": { color: "success.main" },
                }}
            >
                {TABS.map((t) => (
                <Tab key={t} value={t} label={t} disableRipple />
                ))}
            </Tabs>

            <Box sx={{ flex: 1, overflowY: "auto" }}>
                {items.length === 0 ? (
                <Typography
                    variant="bodySmall"
                    color="text.secondary"
                    sx={{ display: "block", px: 2, py: 3, textAlign: "center" }}
                >
                    No messages
                </Typography>
                ) : (
                items.map((c) => (
                    <ButtonBase
                    key={c.id}
                    sx={{
                        width: "100%",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        gap: 1.5,
                        px: 2,
                        py: 1.5,
                        textAlign: "left",
                        "&:hover": { bgcolor: "surfaceHover" },
                    }}
                    >
                    <Avatar
                        variant="rounded"
                        sx={{
                        width: 48,
                        height: 48,
                        bgcolor: c.avatarBg,
                        color: "#fff",
                        fontWeight: 700,
                        borderRadius: "50%",
                        }}
                    >
                        {c.avatarText}
                    </Avatar>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Stack direction="row" sx={{ justifyContent: "space-between", gap: 1 }}>
                        <Typography variant="body" noWrap sx={{ fontWeight: 600 }}>
                            {c.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                            {c.date}
                        </Typography>
                        </Stack>
                        <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                        >
                        {c.source && (
                            <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
                            {c.source}
                            </Box>
                        )}
                        {c.source ? " • " : ""}
                        {c.preview}
                        </Typography>
                    </Box>
                    </ButtonBase>
                ))
                )}
            </Box>
            </Box>
        )}
        </Box>
    </Portal>
  );
}