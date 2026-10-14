"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import EventOutlinedIcon from "@mui/icons-material/Event";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

import PageContainer from "../../../components/PageContainer/PageContainer";
import OutLinedButton from "../../../components/Buttons/OutLinedButton";
import FIlledButton from "../../../components/Buttons/FIlledButton";
import { useFeedback } from "../../../components/feedback/FeedbackProvider";
import { EVENTS, EVENT_MODE_FILTERS, type MockEvent } from "../../../config/mock/events.mock";

function EventCard({
  event,
  attending,
  onToggle,
}: {
  event: MockEvent;
  attending: boolean;
  onToggle: () => void;
}) {
  const isPast = event.status === "past";

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: 1,
        borderColor: (theme) => theme.palette.border,
        borderRadius: 2,
        p: 2,
        opacity: isPast ? 0.75 : 1,
        display: "flex",
        gap: 2,
        alignItems: "flex-start",
      }}
    >
      {/* Date block */}
      <Box
        sx={{
          bgcolor: "surfaceMuted",
          border: 1,
          borderColor: "divider",
          borderRadius: 1.5,
          px: 1.25,
          py: 1,
          textAlign: "center",
          flexShrink: 0,
          minWidth: 64,
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
          {event.dateLabel.split(",")[1]?.trim().split(" ")[0]}
        </Typography>
        <Typography sx={{ fontWeight: 700, fontSize: 20, color: "primary.main" }}>
          {event.dateLabel.split(" ")[1]?.replace(",", "")}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
          {event.dateLabel.split(" ").at(-1)}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontWeight: 600,
            color: isPast ? "text.primary" : "primary.main",
          }}
        >
          {event.title}
        </Typography>
        <Typography variant="bodySmall" color="text.secondary">
          Hosted by {event.organizer}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25, mt: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <EventOutlinedIcon sx={{ fontSize: 15 }} />
            {event.timeLabel}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {event.mode === "Online" ? (
              <VideocamOutlinedIcon sx={{ fontSize: 15 }} />
            ) : (
              <LocationOnOutlinedIcon sx={{ fontSize: 15 }} />
            )}
            {event.location}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <GroupOutlinedIcon sx={{ fontSize: 15 }} />
            {event.attendees.toLocaleString()} attendees
          </Typography>
        </Box>

        {event.attendedByConnections && !isPast && (
          <Typography variant="caption" color="primary.main" sx={{ display: "block", mt: 0.75, fontWeight: 600 }}>
            {event.attendedByConnections}
          </Typography>
        )}
      </Box>

      {!isPast && (
        <Box sx={{ flexShrink: 0 }}>
          {attending ? (
            <OutLinedButton
              size="small"
              startIcon={<ConfirmationNumberOutlinedIcon />}
              onClick={onToggle}
              aria-label={`cancel attendance for ${event.title}`}
              sx={{ borderRadius: 999, textTransform: "none", fontWeight: 600 }}
            >
              Going
            </OutLinedButton>
          ) : (
            <FIlledButton
              size="small"
              onClick={onToggle}
              aria-label={`attend ${event.title}`}
              sx={{ borderRadius: 999, textTransform: "none", fontWeight: 600 }}
            >
              Attend
            </FIlledButton>
          )}
        </Box>
      )}
    </Box>
  );
}

export default function EventsPage() {
  const { showToast } = useFeedback();
  const [tab, setTab] = useState(0);
  const [mode, setMode] = useState<(typeof EVENT_MODE_FILTERS)[number]>("All");
  const [attendingIds, setAttendingIds] = useState<Set<string>>(new Set());

  const upcoming = useMemo(() => EVENTS.filter((e) => e.status === "upcoming"), []);
  const past = useMemo(() => EVENTS.filter((e) => e.status === "past"), []);

  const visible = (tab === 0 ? upcoming : past).filter(
    (e) => mode === "All" || e.mode === mode
  );

  const toggleAttend = (id: string) => {
    const event = EVENTS.find((e) => e.id === id);
    setAttendingIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast(`Removed ${event?.title} from your events`, "info");
      } else {
        next.add(id);
        showToast(`You're going to ${event?.title}`, "success");
      }
      return next;
    });
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
        <Box sx={{ px: { xs: 2, md: 3 }, pt: { xs: 2, md: 3 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <EventOutlinedIcon sx={{ color: "primary.main", fontSize: 28 }} />
            <Box>
              <Typography variant="h2">Events</Typography>
              <Typography variant="bodySmall" color="text.secondary">
                Meetups, workshops, and virtual sessions
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap", gap: 0.5 }}>
            {EVENT_MODE_FILTERS.map((m) => (
              <Chip
                key={m}
                label={m}
                size="small"
                onClick={() => setMode(m)}
                color={mode === m ? "primary" : "default"}
                variant={mode === m ? "filled" : "outlined"}
                sx={{ cursor: "pointer" }}
              />
            ))}
          </Stack>
        </Box>

        <Tabs value={tab} onChange={(_, v: number) => setTab(v)} sx={{ px: 2, mt: 1 }}>
          <Tab label={`Upcoming (${upcoming.length})`} />
          <Tab label={`Past (${past.length})`} />
        </Tabs>
        <Box sx={{ borderTop: 1, borderColor: "divider" }} />

        <Stack spacing={2} sx={{ p: { xs: 2, md: 3 } }}>
          {visible.length === 0 ? (
            <Typography variant="bodySmall" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
              No {mode === "All" ? "" : `${mode.toLowerCase()} `}events here yet.
            </Typography>
          ) : (
            visible.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                attending={attendingIds.has(event.id)}
                onToggle={() => toggleAttend(event.id)}
              />
            ))
          )}
        </Stack>
      </Box>
    </PageContainer>
  );
}
