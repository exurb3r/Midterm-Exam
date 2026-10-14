"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

import { useCurrentUser } from "../../store/auth/store.useAuth";
import PersonAvatar from "../Avatar/PersonAvatar";
import PostDialog from "./PostDialog";

const COMPOSER_ACTIONS = [
  { label: "Video", icon: <OndemandVideoOutlinedIcon />, color: "#22C55E" },
  { label: "Photo", icon: <ImageOutlinedIcon />, color: "#3B82F6" },
  { label: "Write article", icon: <ArticleOutlinedIcon />, color: "#EC4899" },
];

export default function PostComposer() {
  const user = useCurrentUser();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          border: 1,
          borderColor: (theme) => theme.palette.border,
          borderRadius: 2,
          p: 2,
          transition: "border-color 150ms ease, box-shadow 150ms ease",
          "&:hover": {
            borderColor: (theme) => theme.palette.borderStrong,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          },
        }}
      >
        <Stack direction="row" sx={{ gap: 1.5, alignItems: "center" }}>
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
          <Button
            fullWidth
            disableElevation
            onClick={() => setOpen(true)}
            sx={{
              justifyContent: "flex-start",
              border: 1,
              borderColor: (theme) => theme.palette.borderStrong,
              borderRadius: 999,
              px: 2,
              py: 1.25,
              color: "text.secondary",
              fontWeight: 500,
              textTransform: "none",
              "&:hover": { bgcolor: "surfaceHover", borderColor: "text.primary" },
            }}
          >
            Start a post
          </Button>
        </Stack>

        <Stack
          direction="row"
          sx={{
            mt: 1.5,
            justifyContent: { xs: "space-between", sm: "flex-start" },
            gap: { xs: 0, sm: 1 },
          }}
        >
          {COMPOSER_ACTIONS.map((action) => (
            <Button
              key={action.label}
              startIcon={action.icon}
              onClick={() => setOpen(true)}
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                fontSize: 13,
                textTransform: "none",
                px: { xs: 0.5, sm: 1.5 },
                minWidth: 0,
                "& .MuiButton-startIcon": {
                  color: action.color,
                  mr: { xs: 0.25, sm: 0.75 },
                },
                "&:hover": { bgcolor: "surfaceHover" },
              }}
            >
              {action.label}
            </Button>
          ))}
        </Stack>
      </Box>

      <PostDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
