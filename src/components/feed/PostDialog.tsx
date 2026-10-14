"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeople";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";

import { useCurrentUser } from "../../store/auth/store.useAuth";
import { useFeedStore } from "../../store/feed/store.useFeed";
import PersonAvatar from "../Avatar/PersonAvatar";

interface PostDialogProps {
  open: boolean;
  onClose: () => void;
}

const MEDIA_ICONS = [
  ImageOutlinedIcon,
  YouTubeIcon,
  GifBoxOutlinedIcon,
  ArticleOutlinedIcon,
  EmojiPeopleOutlinedIcon,
  PersonAddAlt1OutlinedIcon,
];

export default function PostDialog({ open, onClose }: PostDialogProps) {
  const user = useCurrentUser();
  const addPost = useFeedStore((s) => s.addPost);
  const [text, setText] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  const canPost = text.trim().length > 0;

  const handlePost = () => {
    if (!canPost) return;
    addPost(text.trim());
    setText("");
    onClose();
    setToastOpen(true);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        slotProps={{ paper: { sx: { borderRadius: 2 } } }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            py: 1.5,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>Create a post</Typography>
          <IconButton size="small" onClick={onClose} aria-label="close dialog">
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 2.5 }}>
          <Stack direction="row" spacing={1.5} sx={{ mb: 2, alignItems: "center" }}>
            <PersonAvatar
              name={user.name}
              initials={user.initials}
              src={user.avatarUrl}
              sx={{
                width: 48,
                height: 48,
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              {user.initials}
            </PersonAvatar>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>{user.name}</Typography>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 999,
                  fontSize: 12,
                  px: 1.25,
                  py: 0.1,
                  minWidth: 0,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Post to anyone
              </Button>
            </Box>
          </Stack>

          <TextField
            autoFocus
            fullWidth
            multiline
            minRows={5}
            placeholder="What do you want to talk about?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="standard"
            sx={{ mb: 1 }}
          />

          <Button
            size="small"
            sx={{ textTransform: "none", color: "primary.main", fontWeight: 600, px: 0.5 }}
            startIcon={<SentimentSatisfiedOutlinedIcon />}
          >
            Add hashtag
          </Button>

          <Stack
            direction="row"
            sx={{ mt: 1.5, justifyContent: "space-between", alignItems: "center" }}
          >
            <Stack direction="row">
              {MEDIA_ICONS.map((Icon, i) => (
                <IconButton key={i} size="small" sx={{ color: "text.secondary" }}>
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
            <Button
              onClick={handlePost}
              disabled={!canPost}
              variant="contained"
              sx={{ px: 3, fontWeight: 600, borderRadius: 999 }}
            >
              Post
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ bottom: { xs: 64, sm: 24 } }}
      >
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>
          Post shared with your network
        </Alert>
      </Snackbar>
    </>
  );
}
