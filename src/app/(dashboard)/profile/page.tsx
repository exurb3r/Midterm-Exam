"use client";

import { useState } from "react";
import NextLink from "next/link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EyeOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

import PageContainer from "../../../components/PageContainer/PageContainer";
import PostDialog from "../../../components/feed/PostDialog";
import FIlledButton from "../../../components/Buttons/FIlledButton";
import OutLinedButton from "../../../components/Buttons/OutLinedButton";
import { PROFILE } from "../../../config/mock/profile.mock";
import { useCurrentUser } from "../../../store/auth/store.useAuth";
import { useFeedback } from "../../../components/feedback/FeedbackProvider";
import PersonAvatar from "../../../components/Avatar/PersonAvatar";
import { ANALYTICS_SUMMARY } from "../../../config/mock/analytics.mock";
import MessagingDock from "../../../components/feed/Messagingdock";

function SectionCard({
  children,
  onEdit,
}: {
  children: React.ReactNode;
  onEdit?: boolean;
}) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: 1,
        borderColor: (theme) => theme.palette.border,
        borderRadius: 2,
        p: { xs: 2, md: 3 },
        position: "relative",
      }}
    >
      {onEdit && (
        <IconButton
          size="small"
          sx={{ position: "absolute", top: 12, right: 12 }}
          aria-label="edit section"
        >
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      )}
      {children}
    </Box>
  );
}

export default function ProfilePage() {
  const user = useCurrentUser();
  const { showToast } = useFeedback();
  const [openToWork, setOpenToWork] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  // Show the compact header once the big profile header has scrolled away (mobile only).
  const miniHeaderVisible = useScrollTrigger({
    threshold: 380,
    disableHysteresis: true,
  });

  return (
    <PageContainer maxWidth="lg">
      {/* Mobile mini header — slides in under the navbar after scrolling */}
      <Box
        aria-hidden={!miniHeaderVisible}
        sx={{
          position: "fixed",
          top: 52,
          left: 0,
          right: 0,
          zIndex: (t) => t.zIndex.appBar - 1,
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          gap: 1.25,
          px: 2,
          py: 0.75,
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          transform: miniHeaderVisible ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 200ms ease",
          pointerEvents: "none",
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
        <Box sx={{ minWidth: 0 }}>
          <Typography noWrap sx={{ fontWeight: 600, fontSize: 14 }}>
            {user.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "block" }}>
            {user.headline}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "232px minmax(0, 1fr)" },
          gap: 2,
          alignItems: "start",
        }}
      >
        {/* Sticky left rail (desktop only) */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "sticky",
            top: 68,
          }}
        >
          <Stack spacing={2}>
            <Box
              sx={{
                bgcolor: "background.paper",
                border: 1,
                borderColor: (theme) => theme.palette.border,
                borderRadius: 2,
                p: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Profile viewers
              </Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {ANALYTICS_SUMMARY.profileViews}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "background.paper",
                border: 1,
                borderColor: (theme) => theme.palette.border,
                borderRadius: 2,
                p: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Post impressions
              </Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {ANALYTICS_SUMMARY.impressions.toLocaleString()}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "background.paper",
                border: 1,
                borderColor: (theme) => theme.palette.border,
                borderRadius: 2,
                p: 2,
                display: "flex",
                gap: 1.25,
                alignItems: "center",
                cursor: "pointer",
                transition: "background-color 150ms ease",
                "&:hover": { bgcolor: "surfaceHover" },
              }}
              component={NextLink}
              href="/my-items"
            >
              <WorkspacePremiumOutlinedIcon fontSize="small" sx={{ color: "#915907" }} />
              <Typography variant="bodySmall" sx={{ fontWeight: 600 }}>
                My items
              </Typography>
              <ChevronRightOutlinedIcon sx={{ fontSize: 16, ml: "auto", color: "text.secondary" }} />
            </Box>
          </Stack>
        </Box>

        {/* Main profile column */}
        <Stack spacing={2} sx={{ minWidth: 0 }}>
          {/* Header */}
          <SectionCard>
            <Box
              sx={{
                height: 134,
                mx: { xs: -2, md: -3 },
                mt: { xs: -2, md: -3 },
                mb: 2,
                background: (theme) => theme.palette.gradient.primary,
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
                position: "relative",
              }}
            >
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "background.paper",
                  "&:hover": { bgcolor: "surfaceHover" },
                }}
                aria-label="edit cover"
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>

            <PersonAvatar
              name={user.name}
              initials={user.initials}
              src={user.avatarUrl}
              sx={{
                width: 128,
                height: 128,
                fontSize: 42,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                border: "4px solid",
                borderColor: "background.paper",
                mb: 1.5,
              }}
            >
              {user.initials}
            </PersonAvatar>

            <Typography variant="h2">{user.name}</Typography>
            <Typography variant="body" color="text.primary" sx={{ mt: 0.5 }}>
              {user.headline}
            </Typography>
            <Typography variant="bodySmall" color="text.secondary" sx={{ mt: 0.75 }}>
              {user.location} ·{" "}
              <Box component="span" sx={{ color: "primary.main", fontWeight: 600, cursor: "pointer" }}>
                {PROFILE.connections}
              </Box>
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}>
              <FIlledButton
                size="small"
                onClick={() => setComposerOpen(true)}
                sx={{ borderRadius: 999, textTransform: "none", fontWeight: 600 }}
              >
                Create a post
              </FIlledButton>
              <OutLinedButton
                size="small"
                startIcon={<EyeOutlinedIcon />}
                color={openToWork ? "success" : "primary"}
                variant={openToWork ? "contained" : "outlined"}
                onClick={() => {
                  setOpenToWork((v) => !v);
                  showToast(
                    openToWork
                      ? "Open to work turned off — recruiters can no longer see your status"
                      : "You're now open to work — recruiters can find you",
                    openToWork ? "info" : "success"
                  );
                }}
                sx={{ borderRadius: 999, textTransform: "none", fontWeight: 600 }}
              >
                {openToWork ? "Open to work ✓" : "Open to work"}
              </OutLinedButton>
              <OutLinedButton
                size="small"
                startIcon={<TrendingUpOutlinedIcon />}
                onClick={() =>
                  showToast("Profile strength: 85% — add 2 skills to reach All-Star", "info")
                }
                sx={{ borderRadius: 999, textTransform: "none", fontWeight: 600 }}
              >
                Enhance profile
              </OutLinedButton>
            </Stack>
          </SectionCard>

          {/* Analytics teaser */}
          <Box
            component={NextLink}
            href="/analytics"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              bgcolor: "background.paper",
              border: 1,
              borderColor: (theme) => theme.palette.border,
              borderRadius: 2,
              p: 2,
              textDecoration: "none",
              color: "inherit",
              transition: "border-color 150ms ease, box-shadow 150ms ease",
              "&:hover": {
                borderColor: (theme) => theme.palette.borderStrong,
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                Private to you
              </Typography>
              <Typography variant="bodySmall" color="text.secondary">
                {ANALYTICS_SUMMARY.impressions.toLocaleString()} post impressions ·{" "}
                {ANALYTICS_SUMMARY.profileViews} profile views — see your analytics
              </Typography>
            </Box>
            <ChevronRightOutlinedIcon sx={{ color: "text.secondary" }} />
          </Box>

          {/* About */}
          <SectionCard onEdit>
            <Typography variant="h3">About</Typography>
            <Typography variant="bodySmall" sx={{ whiteSpace: "pre-line", mt: 1 }}>
              {PROFILE.about}
            </Typography>
          </SectionCard>

          {/* Activity */}
          <SectionCard>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Box>
                <Typography variant="h3">Activity</Typography>
                <Typography
                  variant="bodySmall"
                  sx={{ color: "primary.main", fontWeight: 600, cursor: "pointer" }}
                >
                  1,842 followers
                </Typography>
              </Box>
              <FIlledButton
                size="small"
                startIcon={<EditOutlinedIcon />}
                onClick={() => setComposerOpen(true)}
                sx={{ borderRadius: 999, textTransform: "none", fontWeight: 600 }}
              >
                Create a post
              </FIlledButton>
            </Box>
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              {PROFILE.activity.map((item) => (
                <Box
                  key={item.title}
                  sx={{
                    border: 1,
                    borderColor: (theme) => theme.palette.border,
                    borderRadius: 1.5,
                    p: 2,
                    cursor: "pointer",
                    transition: "background-color 150ms ease",
                    "&:hover": { bgcolor: "surfaceHover" },
                  }}
                >
                  <Typography variant="bodySmall" sx={{ fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.meta}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </SectionCard>

          {/* Experience */}
          <SectionCard onEdit>
            <Typography variant="h3">Experience</Typography>
            <Stack sx={{ mt: 1.5 }}>
              {PROFILE.experience.map((exp, i) => (
                <Box
                  key={exp.company}
                  sx={{
                    display: "flex",
                    gap: 2,
                    py: 2,
                    borderTop: i === 0 ? 0 : 1,
                    borderColor: "divider",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "surfaceMuted",
                      color: "primary.dark",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {exp.initials}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 600 }}>{exp.role}</Typography>
                    <Typography variant="bodySmall">{exp.company} · Full-time</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                      {exp.period} · {exp.location}
                    </Typography>
                    <Typography variant="bodySmall" sx={{ mt: 1 }}>
                      {exp.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </SectionCard>

          {/* Education */}
          <SectionCard onEdit>
            <Typography variant="h3">Education</Typography>
            <Stack sx={{ mt: 1.5 }}>
              {PROFILE.education.map((edu, i) => (
                <Box
                  key={edu.school}
                  sx={{
                    display: "flex",
                    gap: 2,
                    py: 2,
                    borderTop: i === 0 ? 0 : 1,
                    borderColor: "divider",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "surfaceMuted",
                      color: "primary.dark",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {edu.initials}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>{edu.school}</Typography>
                    <Typography variant="bodySmall">{edu.degree}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                      {edu.period}
                    </Typography>
                    <Typography variant="bodySmall" color="text.secondary" sx={{ mt: 0.5 }}>
                      {edu.detail}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </SectionCard>

          {/* Skills */}
          <SectionCard onEdit>
            <Typography variant="h3">Skills</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1.5 }}>
              {PROFILE.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onClick={() => {}}
                  sx={{ cursor: "pointer", "&:hover": { bgcolor: "surfaceHover" } }}
                />
              ))}
            </Box>
          </SectionCard>
        </Stack>
      </Box>

      <PostDialog open={composerOpen} onClose={() => setComposerOpen(false)} />
        <MessagingDock />
    </PageContainer>
  );
}
