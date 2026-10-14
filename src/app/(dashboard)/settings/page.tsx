"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

import PageContainer from "../../../components/PageContainer/PageContainer";
import { useFeedback } from "../../../components/feedback/FeedbackProvider";
import { useColorMode } from "../../../app/providers";

interface ToggleRow {
  key: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ACCOUNT_ROW: ToggleRow[] = [
  {
    key: "twofa",
    icon: <SecurityOutlinedIcon fontSize="small" />,
    title: "Two-step verification",
    description: "Add an extra layer of protection when you sign in.",
  },
];

const NOTIFICATION_ROWS: ToggleRow[] = [
  {
    key: "reactions",
    icon: <NotificationsActiveOutlinedIcon fontSize="small" />,
    title: "Reactions & comments",
    description: "Get notified when someone reacts to or comments on your posts.",
  },
  {
    key: "invitations",
    icon: <BadgeOutlinedIcon fontSize="small" />,
    title: "Invitations to connect",
    description: "Email me when someone invites me to connect.",
  },
];

const VISIBILITY_ROWS: ToggleRow[] = [
  {
    key: "profileViewing",
    icon: <VisibilityOffOutlinedIcon fontSize="small" />,
    title: "Private profile mode",
    description: "Browse profiles without others knowing you viewed them.",
  },
  {
    key: "searchEngine",
    icon: <LanguageOutlinedIcon fontSize="small" />,
    title: "Public profile visibility",
    description: "Let search engines show your public profile.",
  },
];

function ToggleSection({
  heading,
  rows,
  values,
  onChange,
}: {
  heading: string;
  rows: ToggleRow[];
  values: Record<string, boolean>;
  onChange: (key: string) => void;
}) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: 1,
        borderColor: (theme) => theme.palette.border,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Typography sx={{ fontWeight: 600, px: 2.5, pt: 2, pb: 1 }}>{heading}</Typography>
      <List disablePadding>
        {rows.map((row, i) => (
          <ListItemButton
            key={row.key}
            onClick={() => onChange(row.key)}
            sx={{ borderTop: i === 0 ? 0 : 1, borderColor: "divider", py: 1.5 }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "text.secondary" }}>
              {row.icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{row.title}</Typography>
              }
              secondary={
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  {row.description}
                </Typography>
              }
            />
            <Switch
              edge="end"
              checked={values[row.key] ?? false}
              tabIndex={-1}
              slotProps={{ input: { "aria-label": row.title } }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default function SettingsPage() {
  const { showToast } = useFeedback();
  const { mode, toggleColorMode } = useColorMode();
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    twofa: true,
    reactions: true,
    invitations: false,
    profileViewing: false,
    searchEngine: true,
  });

  const handleToggle = (key: string) => {
    const next = !toggles[key];
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    const row = [...ACCOUNT_ROW, ...NOTIFICATION_ROWS, ...VISIBILITY_ROWS].find(
      (r) => r.key === key
    );
    if (row) {
      showToast(`${row.title} ${next ? "enabled" : "disabled"}`, next ? "success" : "info");
    }
  };

  return (
    <PageContainer maxWidth="md">
      <Stack spacing={2}>
        <Box
          sx={{
            bgcolor: "background.paper",
            border: 1,
            borderColor: (theme) => theme.palette.border,
            borderRadius: 2,
            p: 2.5,
          }}
        >
          <Typography variant="h3">Settings</Typography>
          <Typography variant="caption" color="text.secondary">
            Manage your account, display, and visibility preferences
          </Typography>
        </Box>

        {/* Dark mode display row (wired to the real theme) */}
        <Box
          sx={{
            bgcolor: "background.paper",
            border: 1,
            borderColor: (theme) => theme.palette.border,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Typography sx={{ fontWeight: 600, px: 2.5, pt: 2, pb: 1 }}>Display</Typography>
          <ListItemButton onClick={toggleColorMode} sx={{ py: 1.5 }}>
            <ListItemIcon sx={{ minWidth: 40, color: "text.secondary" }}>
              <DarkModeOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Dark mode</Typography>
              }
              secondary={
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  {mode === "dark" ? "Currently on" : "Currently off"}
                </Typography>
              }
            />
            <Switch checked={mode === "dark"} tabIndex={-1} slotProps={{ input: { "aria-label": "Dark mode" } }} />
          </ListItemButton>
        </Box>

        <ToggleSection
          heading="Security & account"
          rows={ACCOUNT_ROW}
          values={toggles}
          onChange={handleToggle}
        />
        <ToggleSection
          heading="Notifications"
          rows={NOTIFICATION_ROWS}
          values={toggles}
          onChange={handleToggle}
        />
        <ToggleSection
          heading="Visibility"
          rows={VISIBILITY_ROWS}
          values={toggles}
          onChange={handleToggle}
        />

        <Box sx={{ px: 1, pb: { xs: 6, sm: 2 } }}>
          <Divider sx={{ my: 1 }} />
          <Typography variant="caption" color="text.secondary">
            Settings are UI-only in this concept and reset on reload.
          </Typography>
        </Box>
      </Stack>
    </PageContainer>
  );
}
