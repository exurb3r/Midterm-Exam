"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

import PageContainer from "../../../components/PageContainer/PageContainer";
import {
  ANALYTICS_SUMMARY,
  IMPRESSIONS_SERIES,
  VIEWER_ROLES,
  POST_PERFORMANCE,
} from "../../../config/mock/analytics.mock";

const DAYS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"];

function BarChart() {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...IMPRESSIONS_SERIES);
  const chartH = 180;

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1, height: chartH + 28, mt: 2 }}>
      {IMPRESSIONS_SERIES.map((v, i) => (
        <Tooltip key={i} title={`${v} impressions · ${DAYS[i]}`} arrow>
          <Box
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
              cursor: "pointer",
            }}
          >
            {hover === i && (
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {v}
              </Typography>
            )}
            <Box
              sx={{
                width: "100%",
                maxWidth: 34,
                height: (v / max) * chartH,
                bgcolor: hover === i ? "primary.dark" : "primary.main",
                borderRadius: "4px 4px 0 0",
                transition: "height 300ms ease, background-color 150ms ease",
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
              {DAYS[i]}
            </Typography>
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
}

function DonutChart() {
  const colors = ["#2F6B3A", "#8FA564", "#B5C48A", "#D5DFB8", "#E8EED3"];
  const total = VIEWER_ROLES.reduce((s, r) => s + r.pct, 0);

  // Pure prefix sums — no reassignment during render (react-compiler safe).
  const cumPct = (toIndex: number) =>
    VIEWER_ROLES.slice(0, toIndex).reduce((s, r) => s + (r.pct / total) * 100, 0);
  const stops = VIEWER_ROLES.map(
    (r, i) =>
      `${colors[i % colors.length]} ${cumPct(i)}% ${cumPct(i + 1)}%`
  ).join(", ");

  return (
    <Box sx={{ display: "flex", gap: 2.5, alignItems: "center", mt: 2, flexWrap: "wrap" }}>
      <Box
        sx={{
          width: 132,
          height: 132,
          borderRadius: "50%",
          background: `conic-gradient(${stops})`,
          flexShrink: 0,
        }}
      />
      <Stack sx={{ gap: 0.75, minWidth: 0 }}>
        {VIEWER_ROLES.map((r, i) => (
          <Stack key={r.role} direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "2px",
                bgcolor: colors[i % colors.length],
              }}
            />
            <Typography variant="bodySmall" color="text.secondary" noWrap>
              {r.role}
            </Typography>
            <Typography variant="bodySmall" sx={{ fontWeight: 600, ml: "auto" }}>
              {r.pct}%
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

function MetricCard({
  icon,
  label,
  value,
  delta,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: 1,
        borderColor: (theme) => theme.palette.border,
        borderRadius: 2,
        p: 2,
        flex: 1,
        minWidth: 180,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ color: "text.secondary", display: "flex" }}>{icon}</Box>
        <Typography variant="bodySmall" color="text.secondary">
          {label}
        </Typography>
      </Box>
      <Typography variant="h2" sx={{ mt: 1 }}>
        {value}
      </Typography>
      <Chip
        size="small"
        label={`${delta} vs last period`}
        sx={{ mt: 1, bgcolor: "accentSecondary", color: "primary.dark", fontWeight: 600 }}
      />
    </Box>
  );
}

export default function AnalyticsPage() {
  const [tab, setTab] = useState(0);

  return (
    <PageContainer maxWidth="lg">
      <Stack spacing={2}>
        <Box
          sx={{
            bgcolor: "background.paper",
            border: 1,
            borderColor: (theme) => theme.palette.border,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box sx={{ px: 3, pt: 2 }}>
            <Typography variant="h3">Analytics</Typography>
            <Typography variant="caption" color="text.secondary">
              Visible only to you · last 12 weeks
            </Typography>
          </Box>
          <Tabs value={tab} onChange={(_, v: number) => setTab(v)} sx={{ px: 2, mt: 1 }}>
            <Tab label="Content" />
            <Tab label="Audience" />
          </Tabs>
          <Box sx={{ borderTop: 1, borderColor: "divider" }} />
        </Box>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <MetricCard
            icon={<VisibilityOutlinedIcon fontSize="small" />}
            label="Post impressions"
            value={ANALYTICS_SUMMARY.impressions.toLocaleString()}
            delta={ANALYTICS_SUMMARY.impressionsDelta}
          />
          <MetricCard
            icon={<PersonSearchOutlinedIcon fontSize="small" />}
            label="Profile views"
            value={String(ANALYTICS_SUMMARY.profileViews)}
            delta={ANALYTICS_SUMMARY.profileViewsDelta}
          />
          <MetricCard
            icon={<TrendingUpOutlinedIcon fontSize="small" />}
            label="Search appearances"
            value={String(ANALYTICS_SUMMARY.searchAppearances)}
            delta={ANALYTICS_SUMMARY.searchAppearancesDelta}
          />
        </Stack>

        {tab === 0 && (
          <>
            <Box
              sx={{
                bgcolor: "background.paper",
                border: 1,
                borderColor: (theme) => theme.palette.border,
                borderRadius: 2,
                p: 2.5,
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>Impressions over time</Typography>
              <Typography variant="caption" color="text.secondary">
                Hover a bar for weekly detail
              </Typography>
              <BarChart />
            </Box>

            <Box
              sx={{
                bgcolor: "background.paper",
                border: 1,
                borderColor: (theme) => theme.palette.border,
                borderRadius: 2,
                p: 2.5,
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>Top performing posts</Typography>
              <Stack sx={{ mt: 1.5 }}>
                {POST_PERFORMANCE.map((post, i) => (
                  <Box
                    key={post.id}
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      py: 1.5,
                      borderTop: i === 0 ? 0 : 1,
                      borderColor: "divider",
                      flexWrap: { xs: "wrap", sm: "nowrap" },
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, flex: 1, minWidth: 200, fontSize: 14 }}>
                      {post.title}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      {[
                        { label: "impressions", value: post.impressions },
                        { label: "reactions", value: post.reactions },
                        { label: "comments", value: post.comments },
                        { label: "reposts", value: post.reposts },
                      ].map((m) => (
                        <Box key={m.label} sx={{ textAlign: "center", minWidth: 64 }}>
                          <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                            {m.value}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {m.label}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>
          </>
        )}

        {tab === 1 && (
          <Box
            sx={{
              bgcolor: "background.paper",
              border: 1,
              borderColor: (theme) => theme.palette.border,
              borderRadius: 2,
              p: 2.5,
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Who viewed your profile</Typography>
            <Typography variant="caption" color="text.secondary">
              By seniority and function
            </Typography>
            <DonutChart />
          </Box>
        )}
      </Stack>
    </PageContainer>
  );
}
