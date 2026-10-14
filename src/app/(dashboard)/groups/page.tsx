"use client";

import { useMemo, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/Groups";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CheckOutlinedIcon from "@mui/icons-material/Check";

import PageContainer from "../../../components/PageContainer/PageContainer";
import StateCard from "../../../components/feedback/StateCard";
import FIlledButton from "../../../components/Buttons/FIlledButton";
import OutLinedButton from "../../../components/Buttons/OutLinedButton";
import { useFeedback } from "../../../components/feedback/FeedbackProvider";
import { GROUPS, GROUP_CATEGORIES, type MockGroup } from "../../../config/mock/groups.mock";

function formatMembers(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function GroupCard({
  group,
  joined,
  onToggle,
}: {
  group: MockGroup;
  joined: boolean;
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
        flexDirection: "column",
        transition: "box-shadow 150ms ease, border-color 150ms ease",
        "&:hover": {
          borderColor: (theme) => theme.palette.borderStrong,
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        },
      }}
    >
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: "surfaceMuted",
            color: "primary.dark",
            fontSize: 15,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {group.initials}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography noWrap sx={{ fontWeight: 600 }}>
            {group.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {group.category} · Active {group.activityAgo} ago
          </Typography>
        </Box>
      </Box>

      <Typography
        variant="bodySmall"
        color="text.secondary"
        sx={{
          mt: 1.25,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {group.description}
      </Typography>

      {group.joinedByConnections && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
          {group.joinedByConnections}
        </Typography>
      )}

      <Box sx={{ mt: "auto", pt: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "text.secondary",
            mb: 1.25,
          }}
        >
          <PersonOutlinedIcon sx={{ fontSize: 15 }} />
          <Typography variant="caption">{formatMembers(group.members)} members</Typography>
        </Box>
        {joined ? (
          <OutLinedButton
            fullWidth
            size="small"
            startIcon={<CheckOutlinedIcon />}
            onClick={onToggle}
            aria-label={`leave ${group.name}`}
            sx={{ borderRadius: 999, textTransform: "none", fontWeight: 600 }}
          >
            Joined
          </OutLinedButton>
        ) : (
          <FIlledButton
            fullWidth
            size="small"
            onClick={onToggle}
            aria-label={`join ${group.name}`}
            sx={{ borderRadius: 999, textTransform: "none", fontWeight: 600 }}
          >
            Join
          </FIlledButton>
        )}
      </Box>
    </Box>
  );
}

export default function GroupsPage() {
  const { showToast } = useFeedback();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof GROUP_CATEGORIES)[number]>("All");
  const [joinedIds, setJoinedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(
    () =>
      GROUPS.filter((group) => {
        const matchesCategory = category === "All" || group.category === category;
        const q = query.trim().toLowerCase();
        const matchesQuery =
          q === "" ||
          group.name.toLowerCase().includes(q) ||
          group.category.toLowerCase().includes(q) ||
          group.description.toLowerCase().includes(q);
        return matchesCategory && matchesQuery;
      }),
    [query, category]
  );

  const toggleJoin = (id: string) => {
    const group = GROUPS.find((g) => g.id === id);
    setJoinedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast(`Left ${group?.name}`, "info");
      } else {
        next.add(id);
        showToast(`Joined ${group?.name}`, "success");
      }
      return next;
    });
  };

  return (
    <PageContainer maxWidth="lg">
      <Box
        sx={{
          bgcolor: "background.paper",
          border: 1,
          borderColor: (theme) => theme.palette.border,
          borderRadius: 2,
          p: { xs: 2, md: 3 },
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <GroupsOutlinedIcon sx={{ color: "primary.main", fontSize: 28 }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h2">Groups</Typography>
            <Typography variant="bodySmall" color="text.secondary">
              Communities of professionals sharing what they know
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 2,
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
            placeholder="Search groups"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ fontSize: 14, flex: 1, "& input": { p: 0 } }}
            inputProps={{ "aria-label": "search groups" }}
          />
        </Box>

        <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap", gap: 0.5 }}>
          {GROUP_CATEGORIES.map((c) => (
            <Chip
              key={c}
              label={c}
              size="small"
              onClick={() => setCategory(c)}
              color={category === c ? "primary" : "default"}
              variant={category === c ? "filled" : "outlined"}
              sx={{ cursor: "pointer" }}
            />
          ))}
        </Stack>
      </Box>

      {filtered.length === 0 ? (
        <StateCard
          icon={<SearchOffOutlinedIcon sx={{ fontSize: 48 }} />}
          title="No groups found"
          description="Try different keywords or another category."
          actionLabel="Clear filters"
          onAction={() => {
            setQuery("");
            setCategory("All");
          }}
        />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          {filtered.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              joined={joinedIds.has(group.id)}
              onToggle={() => toggleJoin(group.id)}
            />
          ))}
        </Box>
      )}

      <Divider sx={{ my: 3 }} />
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center" }}>
        Showing {filtered.length} of {GROUPS.length} groups · A UI concept with sample communities
      </Typography>
    </PageContainer>
  );
}
