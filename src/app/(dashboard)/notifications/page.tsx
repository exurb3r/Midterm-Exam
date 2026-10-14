"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import WorkOutlineIcon from "@mui/icons-material/Work";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

import PageContainer from "../../../components/PageContainer/PageContainer";
import StateCard from "../../../components/feedback/StateCard";
import PersonAvatar from "../../../components/Avatar/PersonAvatar";
import { useFeedback } from "../../../components/feedback/FeedbackProvider";
import NotificationsOffOutlinedIcon from "@mui/icons-material/NotificationsOffOutlined";
import { NOTIFICATIONS, type NotificationKind } from "../../../config/mock/notifications.mock";
import NotificationsIcon from "@mui/icons-material/Notifications";

const TABS: {
  label: string;
  kind: NotificationKind | "all";
  icon: React.ReactElement;
}[] = [
  { label: "All", kind: "all", icon: <NotificationsIcon /> },
  { label: "Reactions", kind: "reactions", icon: <ThumbUpAltOutlinedIcon /> },
  { label: "Comments", kind: "comments", icon: <CommentOutlinedIcon /> },
  { label: "Mentions", kind: "mentions", icon: <AlternateEmailOutlinedIcon /> },
  { label: "Jobs", kind: "jobs", icon: <WorkOutlineIcon /> },
  { label: "Follows", kind: "follows", icon: <PersonAddAlt1OutlinedIcon /> },
];

export default function NotificationsPage() {
  const { showToast } = useFeedback();
  const [tab, setTab] = useState(0);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const activeKind = TABS[tab].kind;
  const visible =
    activeKind === "all"
      ? NOTIFICATIONS
      : NOTIFICATIONS.filter((n) => n.kind === activeKind);

  const markRead = (id: string) => {
    setReadIds((prev) => new Set(prev).add(id));
  };

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread && !readIds.has(n.id)).length;

  const markAllRead = () => {
    setReadIds(new Set(NOTIFICATIONS.map((n) => n.id)));
    showToast("All notifications marked as read");
  };

  return (
    <PageContainer maxWidth="md">
      <Box
        sx={{
          bgcolor: "background.paper",
          border: 1,
          borderColor: (theme) => theme.palette.border,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box sx={{ px: 3, pt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h3">Notifications</Typography>
          <Button
            size="small"
            onClick={markAllRead}
            disabled={unreadCount === 0}
            sx={{
              fontSize: 13,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Mark all as read
          </Button>
        </Box>

        <Tabs
          value={tab}
          onChange={(_, v: number) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2, mt: 1, borderBottom: 1, borderColor: "divider" }}
        >
          {TABS.map((t) => (
            <Tab key={t.label} icon={t.icon} iconPosition="start" label={t.label} />
          ))}
        </Tabs>

        <Box>
          {visible.length === 0 ? (
            <StateCard
              icon={<NotificationsOffOutlinedIcon sx={{ fontSize: 48 }} />}
              title="Nothing here yet"
              description="New activity in this category will show up here."
            />
          ) : (
            visible.map((n) => {
              const unread = n.unread && !readIds.has(n.id);
              return (
                <Box
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  sx={{
                    display: "flex",
                    gap: 2,
                    p: 2,
                    cursor: "pointer",
                    bgcolor: unread ? "surfaceSubtle" : "transparent",
                    "&:hover": { bgcolor: "surfaceHover" },
                  }}
                >
                  <PersonAvatar
                    name={n.actor.name}
                    initials={n.actor.initials}
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: unread ? "primary.main" : "surfaceMuted",
                      color: unread ? "primary.contrastText" : "primary.dark",
                      fontSize: 15,
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {n.actor.initials}
                  </PersonAvatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="bodySmall">
                      <Box component="span" sx={{ fontWeight: 600 }}>
                        {n.actor.name}
                      </Box>{" "}
                      {n.action}
                    </Typography>
                    {n.target && (
                      <Typography
                        variant="bodySmall"
                        color="text.secondary"
                        sx={{
                          mt: 0.5,
                          bgcolor: "surfaceMuted",
                          borderLeft: 3,
                          borderColor: "primary.main",
                          px: 1.5,
                          py: 1,
                          borderRadius: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        “{n.target}”
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary">
                      {n.timeAgo} ago
                    </Typography>
                  </Box>
                  {unread && <CircleDot />}
                </Box>
              );
            })
          )}
        </Box>
      </Box>
    </PageContainer>
  );
}

function CircleDot() {
  return (
    <Box
      sx={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        bgcolor: "primary.main",
        flexShrink: 0,
        alignSelf: "center",
      }}
    />
  );
}
