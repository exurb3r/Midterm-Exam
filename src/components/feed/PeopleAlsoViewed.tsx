"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import OutLinedButton from "../Buttons/OutLinedButton";

import { PEOPLE_YOU_MAY_KNOW } from "../../config/mock/feed.mock";
import PersonAvatar from "../Avatar/PersonAvatar";

export default function PeopleAlsoViewed() {
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
      <Typography variant="bodySmall" color="text.secondary">
        People you may know
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          mt: 1.5,
        }}
      >
        {PEOPLE_YOU_MAY_KNOW.map((person) => (
          <Stack key={person.name} sx={{ alignItems: "center", textAlign: "center" }}>
            <PersonAvatar
              name={person.name}
              initials={person.initials}
              sx={{
                width: 64,
                height: 64,
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              {person.initials}
            </PersonAvatar>
            <Typography variant="caption" sx={{ mt: 0.75, fontWeight: 600 }}>
              {person.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {person.headline}
            </Typography>
            <OutLinedButton
              size="small"
              sx={{
                mt: 1,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 600,
                px: 2.5,
              }}
            >
              Connect
            </OutLinedButton>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
