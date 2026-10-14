"use client";

import { useState } from "react";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import CheckIcon from "@mui/icons-material/Check";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import { keyframes } from "@mui/system";
import { useFeedStore } from "../../store/feed/store.useFeed";
import { useFeedback } from "../feedback/FeedbackProvider";
import PersonAvatar from "../Avatar/PersonAvatar";
import { useCurrentUser } from "../../store/auth/store.useAuth";

const likePop = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.35); }
  100% { transform: scale(1); }
`;

const MAX_COLLAPSED_LINES = 3;

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export default function PostCard({
  post,
  forceCommentsOpen = false,
}: {
  post: import("../../store/feed/store.useFeed").FeedPost;
  forceCommentsOpen?: boolean;
}) {
  const toggleLike = useFeedStore((s) => s.toggleLike);
  const toggleFollow = useFeedStore((s) => s.toggleFollow);
  const toggleRepost = useFeedStore((s) => s.toggleRepost);
  const toggleSave = useFeedStore((s) => s.toggleSave);
  const toggleComments = useFeedStore((s) => s.toggleComments);
  const setCommentDraft = useFeedStore((s) => s.setCommentDraft);
  const addComment = useFeedStore((s) => s.addComment);
  const { showToast } = useFeedback();
  const user = useCurrentUser();
  // The signed-in user's own posts (stored with initials only) still show their photo.
  const authorSrc = user.signedIn && user.name === post.author.name ? user.avatarUrl : undefined;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [likeBump, setLikeBump] = useState(false);

  const totalReactions =
    post.reactions.like +
    post.reactions.celebrate +
    post.reactions.support +
    post.reactions.love;

  const shouldTruncate = post.text.split("\n").length > MAX_COLLAPSED_LINES;
  const [expanded, setExpanded] = useState(false);

  const handleAddComment = () => {
    if (!post.newCommentDraft.trim()) return;
    addComment(post.id);
    showToast("Comment posted");
  };

  const handleLike = () => {
    toggleLike(post.id);
    if (!post.liked) {
      setLikeBump(true);
      setTimeout(() => setLikeBump(false), 350);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: 1,
        borderColor: (theme) => theme.palette.border,
        borderRadius: 2,
        overflow: "hidden",
        transition: "box-shadow 150ms ease, border-color 150ms ease",
        "&:hover": {
          borderColor: (theme) => theme.palette.borderStrong,
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", gap: 1.5, p: 2, pb: 1 }}>
        <Tooltip title={post.author.name} arrow>
          <PersonAvatar
            name={post.author.name}
            initials={post.author.initials}
            src={authorSrc}
            sx={{
              width: 48,
              height: 48,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              cursor: "pointer",
            }}
          >
            {post.author.initials}
          </PersonAvatar>
        </Tooltip>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography noWrap sx={{ fontWeight: 600, fontSize: 15 }}>
            {post.author.name} ·{" "}
            <Box component="span" sx={{ fontWeight: 400, fontSize: 12, color: "text.secondary" }}>
              2nd
            </Box>
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "block" }}>
            {post.author.headline}
          </Typography>
          <NextLink
            href={`/post/${post.id}`}
            aria-label="open post"
            style={{ display: "block" }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", "&:hover": { textDecoration: "underline" } }}
            >
              {post.timeAgo === "now" ? "Just now" : `${post.timeAgo} ago`}
            </Typography>
          </NextLink>
        </Box>
        <Button
          size="small"
          onClick={() => {
            toggleFollow(post.id);
            showToast(
              post.following ? `Unfollowed ${post.author.name}` : `Following ${post.author.name}`
            );
          }}
          startIcon={post.following ? <CheckIcon /> : <PersonAddAlt1OutlinedIcon />}
          sx={{
            minWidth: 0,
            alignSelf: "flex-start",
            borderRadius: 999,
            px: 1.5,
            fontSize: 13,
            textTransform: "none",
            fontWeight: 600,
            color: post.following ? "text.secondary" : "primary.main",
            border: 1,
            borderColor: post.following ? "divider" : "primary.main",
            "&:hover": { bgcolor: "surfaceHover" },
          }}
        >
          {post.following ? "Following" : "Follow"}
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }} />
        </Button>
        <IconButton
          size="small"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          aria-label="post options"
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              toggleSave(post.id);
              showToast(post.saved ? "Removed from saved items" : "Saved to My Items");
            }}
          >
            {post.saved ? "Remove from saved" : "Save post"}
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Copy link</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Not interested</MenuItem>
        </Menu>
      </Box>

      {/* Body */}
      <Box sx={{ px: 2, pb: 1.5 }}>
        <Typography
          variant="bodySmall"
          sx={{
            whiteSpace: "pre-line",
            ...(shouldTruncate && !expanded
              ? {
                  display: "-webkit-box",
                  WebkitLineClamp: MAX_COLLAPSED_LINES,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }
              : {}),
          }}
        >
          {post.text}
        </Typography>
        {shouldTruncate && !expanded && (
          <Button
            size="small"
            sx={{ minWidth: 0, px: 0, textTransform: "none", fontWeight: 600 }}
            onClick={() => setExpanded(true)}
          >
            …see more
          </Button>
        )}
      </Box>

      {/* Media */}
      {post.image && (
        <Box
          component="img"
          src={post.image}
          alt=""
          loading="lazy"
          sx={{
            width: "100%",
            display: "block",
            aspectRatio: "15 / 8",
            objectFit: "cover",
          }}
        />
      )}

      {post.linkPreview && (
        <Box
          sx={{
            borderTop: 1,
            borderBottom: 1,
            borderColor: "divider",
            p: 2,
            bgcolor: "surfaceSubtle",
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>{post.linkPreview.title}</Typography>
          <Typography variant="caption" color="text.secondary">
            {post.linkPreview.publisher}
          </Typography>
        </Box>
      )}

      {/* Reaction count row */}
      <Box sx={{ display: "flex", justifyContent: "space-between", px: 2, py: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <ReactionBubble color="#3B82F6" />
          <ReactionBubble color="#22C55E" />
          <ReactionBubble color="#EF4444" />
          <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
            {formatCount(totalReactions)}
          </Typography>
        </Box>
        <ButtonBase
          component={NextLink}
          href={`/post/${post.id}`}
          sx={{
            borderRadius: 1,
            fontSize: 12,
            color: "text.secondary",
            px: 1,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {post.comments.length} comments · {post.reposts} reposts
        </ButtonBase>
      </Box>

      <Box sx={{ borderTop: 1, borderColor: "divider", mx: 2 }} />

      {/* Action bar */}
      <Box sx={{ display: "flex", p: 0.5 }}>
        <PostActionButton
          icon={
            <Box
              component="span"
              sx={{ display: "inline-flex", ...(likeBump ? { animation: `${likePop} 350ms ease` } : {}) }}
            >
              {post.liked ? (
                <ThumbUpIcon fontSize="small" color="primary" />
              ) : (
                <ThumbUpOutlinedIcon fontSize="small" />
              )}
            </Box>
          }
          label="Like"
          active={post.liked}
          onClick={handleLike}
        />
        <PostActionButton
          icon={<ChatBubbleOutlineOutlinedIcon fontSize="small" />}
          label="Comment"
          onClick={() => toggleComments(post.id)}
        />
        <PostActionButton
          icon={<RepeatOutlinedIcon fontSize="small" />}
          label="Repost"
          active={post.repostedByMe}
          onClick={() => {
            toggleRepost(post.id);
            showToast(post.repostedByMe ? "Repost removed" : "Reposted to your feed");
          }}
        />
        <PostActionButton
          icon={<SendOutlinedIcon fontSize="small" />}
          label="Send"
          onClick={() => showToast("Sharing options coming soon", "info")}
        />
      </Box>

      {/* Inline comments */}
      {(forceCommentsOpen || post.showComments) && (
        <Box sx={{ px: 2, pb: 2 }}>
          {post.comments.map((c) => (
            <Box key={c.id} sx={{ display: "flex", gap: 1.5, mt: 1.5 }}>
              <PersonAvatar name={c.author.name} initials={c.author.initials} sx={{ width: 32, height: 32, fontSize: 13, bgcolor: "surfaceMuted", color: "primary.dark" }}>
                {c.author.initials}
              </PersonAvatar>
              <Box
                sx={{
                  bgcolor: "surfaceSubtle",
                  borderRadius: 2,
                  px: 1.5,
                  py: 1,
                  flex: 1,
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                  {c.author.name}{" "}
                  <Typography component="span" variant="caption" color="text.secondary">
                    · {c.timeAgo}
                  </Typography>
                </Typography>
                <Typography variant="bodySmall">{c.text}</Typography>
              </Box>
            </Box>
          ))}

          <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
            <PersonAvatar
              name={user.name}
              initials={user.initials}
              src={user.avatarUrl}
              sx={{ width: 32, height: 32, fontSize: 13, bgcolor: "primary.main", color: "primary.contrastText" }}
            >
              {user.initials}
            </PersonAvatar>
            <TextField
              fullWidth
              size="small"
              placeholder="Add a comment…"
              value={post.newCommentDraft}
              onChange={(e) => setCommentDraft(post.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 999 },
                "& .MuiInputBase-input": { fontSize: 14 },
              }}
            />
            <IconButton
              onClick={handleAddComment}
              disabled={!post.newCommentDraft.trim()}
              aria-label="post comment"
              sx={{ transition: "transform 100ms ease", "&:active": { transform: "scale(0.88)" } }}
            >
              <SendOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}

function ReactionBubble({ color }: { color: string }) {
  return (
    <Box
      sx={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        bgcolor: color,
        border: "1.5px solid",
        borderColor: "background.paper",
        display: "inline-block",
      }}
    />
  );
}

function PostActionButton({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      fullWidth
      onClick={onClick}
      sx={{
        color: active ? "primary.main" : "text.secondary",
        fontWeight: 600,
        fontSize: 13,
        textTransform: "none",
        py: 1,
        borderRadius: 1,
        minWidth: 0,
        flex: 1,
        transition: "transform 100ms ease, background-color 120ms ease",
        "&:hover": { bgcolor: "surfaceHover" },
        "&:active": { transform: "scale(0.96)" },
      }}
      startIcon={icon}
    >
      <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
        {label}
      </Box>
    </Button>
  );
}
