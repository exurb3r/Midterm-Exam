"use client";

import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";

import PageContainer from "../../../components/PageContainer/PageContainer";
import OutLinedButton from "../../../components/Buttons/OutLinedButton";
import FIlledButton from "../../../components/Buttons/FIlledButton";
import { useFeedback } from "../../../components/feedback/FeedbackProvider";
import { NEWSLETTERS, type MockNewsletter } from "../../../config/mock/newsletters.mock";

function NewsletterCard({
  newsletter,
  subscribed,
  onToggle,
}: {
  newsletter: MockNewsletter;
  subscribed: boolean;
  onToggle: () => void;
}) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: 1,
        borderColor: (theme) => theme.palette.border,
        borderRadius: 2,
        p: 2,
        display: "flex",
        gap: 2,
        transition: "box-shadow 150ms ease, border-color 150ms ease",
        "&:hover": {
          borderColor: (theme) => theme.palette.borderStrong,
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        },
      }}
    >
      <Avatar
        sx={{
          width: 48,
          height: 48,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          fontSize: 15,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {newsletter.initials}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0.75 }}>
          <Typography sx={{ fontWeight: 600 }}>{newsletter.title}</Typography>
          <Chip size="small" variant="outlined" label={newsletter.cadence} sx={{ height: 20 }} />
        </Box>
        <Typography variant="caption" color="text.secondary">
          {newsletter.publisher} · {newsletter.subscribers} subscribers
        </Typography>
        <Typography
          variant="bodySmall"
          color="text.secondary"
          sx={{
            mt: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {newsletter.description}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
          <DraftsOutlinedIcon sx={{ fontSize: 15 }} />
          Latest: “{newsletter.latestIssue}” · {newsletter.latestIssueAgo} ago
        </Typography>
      </Box>

      <Box sx={{ flexShrink: 0, alignSelf: "center" }}>
        {subscribed ? (
          <OutLinedButton
            size="small"
            startIcon={<MailOutlinedIcon />}
            onClick={onToggle}
            aria-label={`unsubscribe from ${newsletter.title}`}
            sx={{ borderRadius: 999, textTransform: "none", fontWeight: 600 }}
          >
            Subscribed
          </OutLinedButton>
        ) : (
          <FIlledButton
            size="small"
            onClick={onToggle}
            aria-label={`subscribe to ${newsletter.title}`}
            sx={{ borderRadius: 999, textTransform: "none", fontWeight: 600 }}
          >
            Subscribe
          </FIlledButton>
        )}
      </Box>
    </Box>
  );
}

export default function NewslettersPage() {
  const { showToast } = useFeedback();
  const [subscribedIds, setSubscribedIds] = useState<Set<string>>(new Set(["nl-1"]));

  const toggleSubscribe = (id: string) => {
    const newsletter = NEWSLETTERS.find((n) => n.id === id);
    setSubscribedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast(`Unsubscribed from ${newsletter?.title}`, "info");
      } else {
        next.add(id);
        showToast(`Subscribed to ${newsletter?.title}`, "success");
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
          p: { xs: 2, md: 3 },
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.25,
        }}
      >
        <FeedOutlinedIcon sx={{ color: "primary.main", fontSize: 28 }} />
        <Box>
          <Typography variant="h2">Newsletters</Typography>
          <Typography variant="bodySmall" color="text.secondary">
            Free weekly and monthly reads, delivered to your inbox
          </Typography>
        </Box>
      </Box>

      <Stack spacing={2}>
        {NEWSLETTERS.map((newsletter) => (
          <NewsletterCard
            key={newsletter.id}
            newsletter={newsletter}
            subscribed={subscribedIds.has(newsletter.id)}
            onToggle={() => toggleSubscribe(newsletter.id)}
          />
        ))}
      </Stack>
    </PageContainer>
  );
}
