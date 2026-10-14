"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Theme } from "@mui/material/styles";
import { useCurrentUser } from "../../store/auth/store.useAuth";
import PersonAvatar from "../Avatar/PersonAvatar";

const FEATURES = [
  "Get up to 13x more profile views",
  "Stand out for more opportunities",
  "Message anyone with InMail",
  "Attend live talks with industry leaders",
];

const CTA_LABEL = "Try 1 month of Premium for ₱0";
const CTA_NOTE =
  "1-month free trial with 24/7 support. We'll remind you a week before your trial ends.";

// feature | free | business (the highlighted panel is the third column itself)
const GRID_COLUMNS = "minmax(0, 1fr) 120px 168px";

/**
 * Panel fill for one cell of the Business column. Applied per cell so the
 * column is the grid column itself — nothing to keep in sync by hand.
 */
const panelSx = (isFirst: boolean, isLast: boolean) => ({
  bgcolor: "surfaceSubtle",
  borderColor: "border",
  borderStyle: "solid",
  borderWidth: `${isFirst ? 1 : 0}px 1px ${isLast ? 1 : 0}px`,
  borderTopLeftRadius: isFirst ? 3 : 0,
  borderTopRightRadius: isFirst ? 3 : 0,
  borderBottomLeftRadius: isLast ? 3 : 0,
  borderBottomRightRadius: isLast ? 3 : 0,
});

const goldFill = (t: Theme) =>
  t.palette.mode === "light"
    ? "linear-gradient(135deg, #F6D8A0 0%, #E8B04A 100%)"
    : "linear-gradient(135deg, #E8B04A 0%, #D9961A 100%)";

interface PremiumModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PremiumModal({ open, onClose }: PremiumModalProps) {
  const user = useCurrentUser();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      scroll="paper"
      aria-labelledby="premium-modal-title"
      aria-describedby="premium-modal-note"
      slotProps={{
        backdrop: { sx: { backgroundColor: "overlay" } },
        paper: {
          sx: {
            width: { xs: "100%", sm: 880 },
            maxWidth: "100%",
            maxHeight: { xs: "100%", sm: "calc(100vh - 48px)" },
            m: { xs: 0, sm: 3 },
            borderRadius: { xs: 0, sm: 2 },
            bgcolor: "background.default",
          },
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "text.primary",
          opacity: 0.8,
          "&:hover": { opacity: 1 },
        }}
      >
        <CloseRoundedIcon />
      </IconButton>

      <DialogContent sx={{ px: { xs: 2.5, sm: 4 }, py: { xs: 3, sm: 3.5 } }}>
        <Typography
          id="premium-modal-title"
          variant="display"
          sx={{
            fontSize: { xs: "1.5rem", sm: "1.875rem" },
            textAlign: "center",
            px: 3,
          }}
        >
          Grow your career. Your future is worth it.
        </Typography>

        {/* Card, with the avatar straddling its top-left corner */}
        <Box sx={{ position: "relative", mt: 6 }}>
          <Box
            sx={{
              position: "absolute",
              top: -48,
              left: 3,
              zIndex: 1,
            }}
          >
            <Box sx={{ position: "relative" }}>                <PersonAvatar
                  name={user.name}
                  initials={user.initials}
                  src={user.avatarUrl}
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    border: 3,
                    borderColor: "warning.main",
                  }}
                >
                  <PersonRoundedIcon sx={{ fontSize: 30 }} />
                </PersonAvatar>
              <Box
                sx={{
                  position: "absolute",
                  right: -8,
                  bottom: -2,
                  px: 0.5,
                  borderRadius: 0.5,
                  bgcolor: "warning.main",
                  color: "#1A2E1C",
                  border: 2,
                  borderColor: "surfaceElevated",
                  fontFamily: (t) => t.typography.fontFamily,
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  lineHeight: 1.4,
                }}
              >
                in
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              position: "relative",
              bgcolor: "surfaceElevated",
              border: 1,
              borderColor: "border",
              borderRadius: 2,
              pt: 3,
              px: 3,
              pb: 3,
            }}
          >
            <Box sx={{ display: "grid", gridTemplateColumns: GRID_COLUMNS }}>
              <Box />
              <Typography
                variant="label"
                sx={{ textAlign: "center", fontWeight: 600, pb: 2 }}
              >
                Free
              </Typography>
              <Typography
                variant="label"
                sx={{
                  ...panelSx(true, false),
                  display: "flex",
                  justifyContent: "center",
                  pb: 2,
                  fontWeight: 600,
                  color: "warning.main",
                }}
              >
                Business
              </Typography>

              {FEATURES.map((feature, index) => (
                <Box key={feature} sx={{ display: "contents" }}>
                  <Typography variant="body" sx={{ py: 1.75, pr: 2 }}>
                    {feature}
                  </Typography>
                  <Typography
                    variant="body"
                    color="text.disabled"
                    sx={{ py: 1.75, textAlign: "center" }}
                  >
                    —
                  </Typography>
                  <Typography
                    variant="body"
                    sx={{
                      ...panelSx(false, index === FEATURES.length - 1),
                      py: 1.75,
                      display: "flex",
                      justifyContent: "center",
                      color: "warning.main",
                    }}
                  >
                    <CheckRoundedIcon sx={{ fontSize: 20 }} />
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 3.5, textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              px: 4,
              py: 1.75,
              fontSize: "1rem",
              color: "#1A2E1C",
              background: goldFill,
              "&:hover": { background: goldFill, opacity: 0.92 },
            }}
          >
            {CTA_LABEL}
          </Button>

          <Typography
            id="premium-modal-note"
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1.5 }}
          >
            {CTA_NOTE}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}