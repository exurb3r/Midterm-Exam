"use client";

import { useMemo, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CircleIcon from "@mui/icons-material/Circle";

import PageContainer from "../../../components/PageContainer/PageContainer";
import { useFeedback } from "../../../components/feedback/FeedbackProvider";
import StateCard from "../../../components/feedback/StateCard";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import FIlledButton from "../../../components/Buttons/FIlledButton";
import OutLinedButton from "../../../components/Buttons/OutLinedButton";
import { JOBS, type MockJob } from "../../../config/mock/jobs.mock";
import { useJobsStore } from "../../../store/jobs/store.useJobs";

const FILTERS = ["All", "Remote", "Hybrid", "On-site"] as const;

function JobListItem({
  job,
  selected,
  saved,
  onSelect,
  onToggleSave,
}: {
  job: MockJob;
  selected: boolean;
  saved: boolean;
  onSelect: () => void;
  onToggleSave: () => void;
}) {
  return (
    <Box
      onClick={onSelect}
      sx={{
        display: "flex",
        gap: 1.5,
        p: 2,
        cursor: "pointer",
        borderLeft: 3,
        borderLeftColor: selected ? "primary.main" : "transparent",
        bgcolor: selected ? "surfaceHover" : "transparent",
        "&:hover": { bgcolor: "surfaceHover" },
      }}
    >
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
        {job.initials}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{ fontWeight: 600, color: selected ? "primary.main" : "text.primary" }}
          noWrap
        >
          {job.title}
        </Typography>
        <Typography variant="bodySmall" color="text.secondary" noWrap>
          {job.company} · {job.location}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.75 }}>
          <Chip label={job.workplaceType} size="small" color="primary" />
          {job.easyApply && <Chip label="Easy Apply" size="small" />}
          <Chip label={`${job.matchScore}% match`} size="small" variant="outlined" />
        </Box>
        {job.salary && (
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75 }}>
            {job.salary} · {job.postedAgo} ago · {job.applicants} applicants
          </Typography>
        )}
      </Box>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onToggleSave();
        }}
        aria-label={saved ? "unsave job" : "save job"}
        sx={{ flexShrink: 0, alignSelf: "flex-start" }}
      >
        {saved ? (
          <BookmarkOutlinedIcon sx={{ color: "primary.main" }} />
        ) : (
          <BookmarkBorderOutlinedIcon />
        )}
      </IconButton>
    </Box>
  );
}

export default function JobsPage() {
  const { showToast } = useFeedback();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [selectedId, setSelectedId] = useState<string | null>(JOBS[0].id);
  const savedJobIds = useJobsStore((s) => s.savedJobIds);
  const appliedJobIds = useJobsStore((s) => s.appliedJobIds);
  const toggleSaveJob = useJobsStore((s) => s.toggleSaveJob);
  const markApplied = useJobsStore((s) => s.markApplied);

  const filtered = useMemo(
    () =>
      JOBS.filter((job) => {
        const matchesFilter = filter === "All" || job.workplaceType === filter;
        const q = query.trim().toLowerCase();
        const matchesQuery =
          q === "" ||
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q);
        return matchesFilter && matchesQuery;
      }),
    [query, filter]
  );

  const selected = JOBS.find((j) => j.id === selectedId) ?? null;

  const toggleSave = (id: string) => {
    const job = JOBS.find((j) => j.id === id);
    if (savedJobIds.includes(id)) {
      toggleSaveJob(id);
      showToast(`Removed "${job?.title}" from saved jobs`, "info");
    } else {
      toggleSaveJob(id);
      showToast(`Saved "${job?.title}"`);
    }
  };

  const toggleApplied = (id: string) => {
    const job = JOBS.find((j) => j.id === id);
    markApplied(id);
    showToast(`Application submitted to ${job?.company}`, "success");
  };

  return (
    <PageContainer maxWidth="lg">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "400px minmax(0, 1fr)" },
          gap: 2,
          alignItems: "start",
        }}
      >
        {/* List column */}
        <Box
          sx={{
            bgcolor: "background.paper",
            border: 1,
            borderColor: (theme) => theme.palette.border,
            borderRadius: 2,
            overflow: "hidden",
            maxHeight: { md: "calc(100vh - 120px)" },
            position: { md: "sticky" },
            top: { md: 68 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ p: 2, pb: 1 }}>
            <Typography variant="h3">Job picks for you</Typography>
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
                placeholder="Search jobs by title, company, or location"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ fontSize: 14, flex: 1, "& input": { p: 0 } }}
                inputProps={{ "aria-label": "search jobs" }}
              />
            </Box>
            <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap", gap: 0.5 }}>
              {FILTERS.map((f) => (
                <Chip
                  key={f}
                  label={f}
                  size="small"
                  onClick={() => setFilter(f)}
                  color={filter === f ? "primary" : "default"}
                  variant={filter === f ? "filled" : "outlined"}
                  sx={{ cursor: "pointer" }}
                />
              ))}
            </Stack>
          </Box>
          <Divider />
          <Box sx={{ overflowY: "auto" }}>
            {filtered.length === 0 ? (
              <StateCard
                icon={<SearchOffOutlinedIcon sx={{ fontSize: 48 }} />}
                title="No jobs match your search"
                description="Try different keywords or adjust the workplace type filter."
                actionLabel="Clear filters"
                onAction={() => {
                  setQuery("");
                  setFilter("All");
                }}
              />
            ) : (
              filtered.map((job) => (
                <Box key={job.id} sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <JobListItem
                    job={job}
                    selected={job.id === selectedId}
                    saved={savedJobIds.includes(job.id)}
                    onSelect={() => setSelectedId(job.id)}
                    onToggleSave={() => toggleSave(job.id)}
                  />
                </Box>
              ))
            )}
          </Box>
        </Box>

        {/* Details column */}
        <Box
          sx={{
            bgcolor: "background.paper",
            border: 1,
            borderColor: (theme) => theme.palette.border,
            borderRadius: 2,
            p: { xs: 2, md: 3 },
            display: { xs: selected ? "block" : "none", md: "block" },
          }}
        >
          {selected ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: "surfaceMuted",
                    color: "primary.dark",
                    fontWeight: 700,
                  }}
                >
                  {selected.initials}
                </Avatar>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="h3">{selected.title}</Typography>
                  <Typography variant="bodySmall" color="text.secondary">
                    {selected.company} · {selected.location} · {selected.workplaceType}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                <Chip label={`${selected.matchScore}% profile match`} color="primary" size="small" />
                {selected.promoted && <Chip label="Promoted" size="small" />}
                {selected.easyApply && <Chip label="Easy Apply" size="small" />}
                <Chip label={selected.industry} size="small" variant="outlined" />
              </Box>

              {selected.salary && (
                <Typography variant="bodySmall" sx={{ mt: 2, display: "flex", alignItems: "center", gap: 0.75 }}>
                  <CircleIcon sx={{ fontSize: 6, color: "text.secondary" }} />
                  {selected.salary}
                </Typography>
              )}
              <Typography variant="bodySmall" color="text.secondary" sx={{ mt: 0.5 }}>
                {selected.postedAgo} ago · {selected.applicants} applicants
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mt: 2 }}>
                {appliedJobIds.includes(selected.id) ? (
                  <FIlledButton disabled startIcon={<CircleIcon sx={{ fontSize: 8 }} />} sx={{ borderRadius: 999 }}>
                    Applied
                  </FIlledButton>
                ) : (
                  <FIlledButton
                    onClick={() => toggleApplied(selected.id)}
                    sx={{ borderRadius: 999, px: 3 }}
                  >
                    {selected.easyApply ? "Easy Apply" : "Apply on company site"}
                  </FIlledButton>
                )}
                <OutLinedButton
                  onClick={() => toggleSave(selected.id)}
                  startIcon={
                    savedJobIds.includes(selected.id) ? (
                      <BookmarkOutlinedIcon />
                    ) : (
                      <BookmarkBorderOutlinedIcon />
                    )
                  }
                  sx={{ borderRadius: 999, textTransform: "none", fontWeight: 600 }}
                >
                  {savedJobIds.includes(selected.id) ? "Saved" : "Save"}
                </OutLinedButton>
              </Stack>

              <Divider sx={{ my: 2.5 }} />

              <Typography variant="h3" sx={{ mb: 1 }}>
                About the job
              </Typography>
              <Typography variant="bodySmall" sx={{ whiteSpace: "pre-line" }}>
                {selected.description}
              </Typography>

              <Typography variant="body" sx={{ fontWeight: 600, mt: 2 }}>
                What you&apos;ll do
              </Typography>
              <Box component="ul" sx={{ pl: 3, mt: 1 }}>
                {selected.requirements.map((r) => (
                  <Typography key={r} component="li" variant="bodySmall">
                    {r}
                  </Typography>
                ))}
              </Box>

              <Typography variant="body" sx={{ fontWeight: 600, mt: 2 }}>
                Benefits
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 1 }}>
                {selected.benefits.map((b) => (
                  <Chip key={b} label={b} size="small" />
                ))}
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 3 }}>
                <LocationOnOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">
                  {selected.location} · {selected.workplaceType}
                </Typography>
              </Box>
            </>
          ) : (
            <Box sx={{ py: 8, textAlign: "center" }}>
              <Typography variant="body" color="text.secondary">
                Select a job to see details
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </PageContainer>
  );
}
