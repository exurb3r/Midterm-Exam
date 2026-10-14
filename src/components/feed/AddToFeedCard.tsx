"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import { ADD_TO_FEED } from "../../config/mock/feed.mock";
import { useFeedback } from "../feedback/FeedbackProvider";
import PersonAvatar from "../Avatar/PersonAvatar";

function FollowRow({ person }: { person: (typeof ADD_TO_FEED)[number] }) {
  const [following, setFollowing] = useState(false);
  const { showToast } = useFeedback();

  return (
    <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
      <PersonAvatar
        name={person.name}
        initials={person.initials}
        sx={{
          width: 44,
          height: 44,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          fontSize: 16,
        }}
      >
        {person.initials}
      </PersonAvatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 600, fontSize: 14 }} noWrap>
          {person.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "block" }}>
          {person.headline}
        </Typography>
        <Button
          size="small"
          onClick={() => {
            setFollowing((v) => !v);
            showToast(following ? `Unfollowed ${person.name}` : `Following ${person.name}`);
          }}
          startIcon={
            following ? (
              <CheckOutlinedIcon fontSize="small" />
            ) : (
              <NoteAddOutlinedIcon fontSize="small" />
            )
          }
          sx={{
            mt: 0.75,
            borderRadius: 999,
            border: 1,
            px: 1.5,
            py: 0.15,
            minWidth: 0,
            fontSize: 13,
            fontWeight: 600,
            textTransform: "none",
            color: following ? "text.secondary" : "text.primary",
            borderColor: following ? "divider" : "text.secondary",
          }}
        >
          {following ? "Following" : "Follow"}
        </Button>
      </Box>
    </Box>
  );
}

export default function AddToFeedCard() {
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
      <Typography sx={{ fontWeight: 600, fontSize: 15 }}>Add to your feed</Typography>
      <Stack sx={{ mt: 1.5, gap: 2 }}>
        {ADD_TO_FEED.map((person) => (
          <FollowRow key={person.name} person={person} />
        ))}
      </Stack>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          px: 0.5,
          py: 0.5,
          mx: -0.5,
          borderRadius: 1,
          transition: "background-color 150ms ease",
          "&:hover": { bgcolor: "surfaceHover" },
        }}
      >
        <Typography variant="caption" color="text.secondary">
          View all recommendations →
        </Typography>
      </Box>
    </Box>
  );
}
