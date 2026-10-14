"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SortOutlinedIcon from "@mui/icons-material/Sort";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import PageContainer from "../../../components/PageContainer/PageContainer";
import ProfileCard from "../../../components/feed/ProfileCard";
import PostComposer from "../../../components/feed/PostComposer";
import PostCard from "../../../components/feed/PostCard";
import NewsCard from "../../../components/feed/NewsCard";
import AddToFeedCard from "../../../components/feed/AddToFeedCard";
import PeopleAlsoViewed from "../../../components/feed/PeopleAlsoViewed";
import FeedFooter from "../../../components/feed/FeedFooter";
import { useFeedStore } from "../../../store/feed/store.useFeed";
import { CURRENT_USER } from "../../../config/mock/feed.mock";

const SORT_OPTIONS = ["Top", "Recent"] as const;

function PostSkeleton() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: 1,
        borderColor: (theme) => theme.palette.border,
        borderRadius: 2,
        p: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Skeleton variant="circular" width={48} height={48} />
        <Box sx={{ flex: 1 }}>
          <Skeleton width="40%" height={20} />
          <Skeleton width="70%" height={14} />
        </Box>
      </Box>
      <Skeleton width="92%" height={16} sx={{ mt: 2 }} />
      <Skeleton width="85%" height={16} />
      <Skeleton width="55%" height={16} />
      <Skeleton variant="rectangular" height={180} sx={{ mt: 1.5, borderRadius: 1 }} />
    </Box>
  );
}

function SortBar() {
  const [sortBy, setSortBy] = useState<(typeof SORT_OPTIONS)[number]>("Top");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "background.paper",
          border: 1,
          borderColor: (theme) => theme.palette.border,
          borderRadius: 2,
          px: 2,
          py: 0.75,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 2,
              height: 24,
              bgcolor: "text.primary",
              borderRadius: 1,
            }}
          />
          <Typography variant="bodySmall" color="text.secondary">
            {sortBy === "Top" ? "Sort by: Top" : "Sort by: Recent"}
          </Typography>
        </Box>
        <Button
          size="small"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          startIcon={<SortOutlinedIcon />}
          endIcon={<KeyboardArrowDownOutlinedIcon />}
          sx={{
            fontSize: 13,
            textTransform: "none",
            fontWeight: 600,
            color: "text.secondary",
            "&:hover": { bgcolor: "surfaceHover" },
          }}
        >
          Sort
        </Button>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem
            key={option}
            selected={sortBy === option}
            onClick={() => {
              setSortBy(option);
              setAnchorEl(null);
            }}
          >
            {option === "Top" ? "Top posts" : "Most recent"}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default function FeedPage() {
  const posts = useFeedStore((s) => s.posts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageContainer maxWidth="lg">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            md: "232px minmax(0, 1fr)",
            lg: "232px minmax(0, 1fr) 312px",
          },
          gridTemplateAreas: {
            xs: `"main"`,
            md: `"left main"`,
            lg: `"left main right"`,
          },
          gap: 3,
          alignItems: "start",
        }}
      >
        {/* Left rail — Career Nexus-accurate profile + sidebar links */}
        <Box sx={{ gridArea: "left", display: { xs: "none", md: "block" } }}>
          <Stack spacing={2} sx={{ position: "sticky", top: 68 }}>
            <ProfileCard />
          </Stack>
        </Box>

        {/* Main column */}
        <Box sx={{ gridArea: "main", minWidth: 0 }}>
          <Stack spacing={2}>
            <PostComposer />

            {loading ? (
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            ) : (
              <>
                <SortBar />
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </>
            )}
          </Stack>
          <FeedFooter />
        </Box>

        {/* Right rail */}
        <Box sx={{ gridArea: "right", display: { xs: "none", lg: "block" } }}>
          <Stack spacing={2} sx={{ position: "sticky", top: 68 }}>
            <NewsCard />
            <AddToFeedCard />
            <PeopleAlsoViewed />
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
                UI concept — no real data is collected.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </PageContainer>
  );
}
