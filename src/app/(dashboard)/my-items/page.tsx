"use client";

import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import WorkOutlinedIcon from "@mui/icons-material/Work";

import PageContainer from "../../../components/PageContainer/PageContainer";
import StateCard from "../../../components/feedback/StateCard";
import PersonAvatar from "../../../components/Avatar/PersonAvatar";
import { useFeedback } from "../../../components/feedback/FeedbackProvider";
import { useFeedStore } from "../../../store/feed/store.useFeed";
import { useJobsStore } from "../../../store/jobs/store.useJobs";
import { JOBS } from "../../../config/mock/jobs.mock";

export default function MyItemsPage() {
  const { showToast } = useFeedback();
  const [tab, setTab] = useState(0);
  const posts = useFeedStore((s) => s.posts);
  const toggleSave = useFeedStore((s) => s.toggleSave);
  const savedJobIds = useJobsStore((s) => s.savedJobIds);
  const toggleSaveJob = useJobsStore((s) => s.toggleSaveJob);

  const savedPosts = posts.filter((p) => p.saved);
  const savedJobs = JOBS.filter((j) => savedJobIds.includes(j.id));

  const unsaveJob = (id: string) => {
    toggleSaveJob(id);
    showToast("Removed from saved jobs", "info");
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
        <Box sx={{ px: 3, pt: 2 }}>
          <Typography variant="h3">My items</Typography>
          <Typography variant="caption" color="text.secondary">
            Saved posts and jobs live here
          </Typography>
        </Box>
        <Tabs value={tab} onChange={(_, v: number) => setTab(v)} sx={{ px: 2, mt: 1 }}>
          <Tab label={`Saved posts (${savedPosts.length})`} />
          <Tab label={`Saved jobs (${savedJobs.length})`} />
        </Tabs>
        <Box sx={{ borderTop: 1, borderColor: "divider" }} />

        {tab === 0 && (
          <Box sx={{ p: 2 }}>
            {savedPosts.length === 0 ? (
              <StateCard
                icon={<BookmarkBorderOutlinedIcon sx={{ fontSize: 48 }} />}
                title="Nothing saved yet"
                description="Use the ••• menu on any post and choose “Save post” to keep it here."
                actionLabel="Browse the feed"
                href="/feed"
              />
            ) : (
              savedPosts.map((post) => (
                <Box
                  key={post.id}
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    p: 2,
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <PersonAvatar
                    name={post.author.name}
                    initials={post.author.initials}
                    sx={{
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      width: 44,
                      height: 44,
                    }}
                  >
                    {post.author.initials}
                  </PersonAvatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                      {post.author.name}
                      <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        {post.timeAgo === "now" ? "Just now" : `${post.timeAgo} ago`}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="bodySmall"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.text}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    onClick={() => {
                      toggleSave(post.id);
                      showToast("Removed from saved items", "info");
                    }}
                    sx={{ alignSelf: "center", minWidth: 0, px: 1 }}
                    aria-label="remove from saved"
                  >
                    <BookmarkOutlinedIcon fontSize="small" sx={{ color: "primary.main" }} />
                  </Button>
                </Box>
              ))
            )}
          </Box>
        )}

        {tab === 1 && (
          <Box sx={{ p: 2 }}>
            {savedJobs.length === 0 ? (
              <StateCard
                icon={<WorkOutlinedIcon sx={{ fontSize: 48 }} />}
                title="No saved jobs"
                description="Bookmark jobs from the Jobs page to compare them later."
                actionLabel="Find jobs"
                href="/jobs"
              />
            ) : (
              savedJobs.map((job) => (
                <Box
                  key={job.id}
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "center",
                    p: 2,
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "surfaceMuted",
                      color: "primary.dark",
                      fontWeight: 700,
                      width: 44,
                      height: 44,
                    }}
                  >
                    {job.initials}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 14 }} noWrap>
                      {job.title}
                    </Typography>
                    <Typography variant="bodySmall" color="text.secondary" noWrap>
                      {job.company} · {job.location}
                    </Typography>
                    <Chip size="small" label={job.workplaceType} sx={{ mt: 0.5 }} />
                  </Box>
                  <Button
                    size="small"
                    onClick={() => unsaveJob(job.id)}
                    aria-label="remove from saved jobs"
                  >
                    Remove
                  </Button>
                </Box>
              ))
            )}
          </Box>
        )}
      </Box>
    </PageContainer>
  );
}
