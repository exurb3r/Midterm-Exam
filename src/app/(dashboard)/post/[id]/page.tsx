"use client";

import { useParams } from "next/navigation";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";

import PageContainer from "../../../../components/PageContainer/PageContainer";
import PostCard from "../../../../components/feed/PostCard";
import StateCard from "../../../../components/feedback/StateCard";
import { useFeedStore } from "../../../../store/feed/store.useFeed";

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const post = useFeedStore((s) => s.posts.find((p) => p.id === id));

  if (!post) {
    return (
      <PageContainer maxWidth="sm">
        <Box
          component={NextLink}
          href="/feed"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            textDecoration: "none",
            color: "text.secondary",
            borderRadius: 1,
            px: 1,
            py: 0.5,
            ml: -1,
            "&:hover": { bgcolor: "surfaceHover", color: "text.primary" },
          }}
        >
          <ArrowBackOutlinedIcon fontSize="small" />
          <Typography variant="bodySmall" sx={{ fontWeight: 600 }}>
            Back to feed
          </Typography>
        </Box>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <StateCard
            icon={<SearchOffOutlinedIcon sx={{ fontSize: 48 }} />}
            title="Post not found"
            description="This post may have been removed or is no longer available."
            actionLabel="Back to feed"
            href="/feed"
          />
        </Stack>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="sm">
      <Box
        component={NextLink}
        href="/feed"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.75,
          textDecoration: "none",
          color: "text.secondary",
          borderRadius: 1,
          px: 1,
          py: 0.5,
          ml: -1,
          "&:hover": { bgcolor: "surfaceHover", color: "text.primary" },
        }}
      >
        <ArrowBackOutlinedIcon fontSize="small" />
        <Typography variant="bodySmall" sx={{ fontWeight: 600 }}>
          Back to feed
        </Typography>
      </Box>

      <Stack spacing={2} sx={{ mt: 2 }}>
        <PostCard post={post} forceCommentsOpen />
      </Stack>
    </PageContainer>
  );
}
