"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExploreIcon from "@mui/icons-material/Explore";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import ForumIcon from "@mui/icons-material/Forum";

import FIlledButton from "../components/Buttons/FIlledButton";
import OutLinedButton from "../components/Buttons/OutLinedButton";
import { APP_NAME, APP_TAGLINE } from "../config/config";
import { useAuthStore, useAuthHydrated } from "../store/auth/store.useAuth";

const FEATURES = [
  {
    icon: <ExploreIcon sx={{ fontSize: 32 }} />,
    title: "Stay in the loop",
    text: "See what your network is building, learning and celebrating — feed first, noise never.",
  },
  {
    icon: <PeopleAltIcon sx={{ fontSize: 32 }} />,
    title: "Grow your community",
    text: "Connect with classmates, colleagues and people who do what you want to do next.",
  },
  {
    icon: <WorkIcon sx={{ fontSize: 32 }} />,
    title: "Find your next role",
    text: "Browse openings matched to who you are — and save the ones you want to come back to.",
  },
  {
    icon: <ForumIcon sx={{ fontSize: 32 }} />,
    title: "Messaging that moves",
    text: "Reach out, follow up and keep every professional conversation in one place.",
  },
];

export default function LandingPage() {
  const router = useRouter();

  const session = useAuthStore((s) => s.session);
  const hydrated = useAuthHydrated();

  // Signed-in users skip the landing page entirely — just like staying logged in to the app.
  useEffect(() => {
    if (hydrated && session) router.replace("/feed");
  }, [hydrated, session, router]);

  // Avoid a flash of the landing page while the (persisted) session hydrates.
  if (!hydrated) return null;

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        bgcolor: "background.default",
        overflowX: "hidden",
      }}
    >
      {/* ── Hero ─────────────────────────────────────────── */}
      <Box
        sx={{
          maxWidth: 1128,
          mx: "auto",
          px: { xs: 2.5, sm: 4 },
          pt: { xs: 4, sm: 8 },
          pb: { xs: 8, sm: 10 },
          display: "flex",
          alignItems: "center",
          gap: { xs: 6, md: 10 },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 2,
              background: (theme) => theme.palette.gradient.primary,
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 22,
              mb: 4,
            }}
          >
            CN
          </Box>

          <Typography
            variant="display"
            sx={{
              fontSize: { xs: "2.4rem", sm: "3.2rem", md: "3.6rem" },
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 640,
            }}
          >
            Welcome to your professional community
          </Typography>
          <Typography
            variant="body"
            color="text.secondary"
            sx={{ mt: 2, maxWidth: 520, fontSize: { xs: 15, sm: 17 } }}
          >
            {APP_NAME} — {APP_TAGLINE.toLowerCase()}. Build your network, showcase your
            work, and find the role your next chapter is waiting for.
          </Typography>

          <Stack direction="row" spacing={1.5} sx={{ mt: 4, flexWrap: "wrap" }}>
            <FIlledButton
              sx={{ borderRadius: 999, py: 1.25, px: 4, textTransform: "none" }}
              onClick={() => router.push("/sign-up")}
            >
              Join now
            </FIlledButton>
            <OutLinedButton
              sx={{ borderRadius: 999, py: 1.25, px: 4, textTransform: "none" }}
              onClick={() => router.push("/sign-in")}
            >
              Sign in
            </OutLinedButton>
          </Stack>
        </Box>

        {/* Backdrop-style right panel, like a professional network's sign-in collage */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            maxWidth: 480,
            borderRadius: 4,
            background: (theme) => theme.palette.gradient.primary,
            p: { xs: 3, sm: 4 },
            color: "#fff",
            boxShadow: (t) => t.shadows[6],
          }}
        >
          <Typography variant="h3" sx={{ color: "inherit", mb: 1 }}>
            This time it&apos;s different
          </Typography>
          <Typography sx={{ opacity: 0.85, fontSize: 15, mb: 3 }}>
            A focused feed, real connections and saved jobs — the best of a professional
            network, without the busywork.
          </Typography>
          <Stack spacing={1.5}>
            {FEATURES.slice(0, 3).map((f) => (
              <Stack
                key={f.title}
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "flex-start" }}
              >
                <Box sx={{ mt: 0.5, opacity: 0.9 }}>{f.icon}</Box>
                <Typography sx={{ fontSize: 15 }}>
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    {f.title}.
                  </Box>{" "}
                  {f.text}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* ── Feature grid ─────────────────────────────────── */}
      <Box sx={{ maxWidth: 1128, mx: "auto", px: { xs: 2.5, sm: 4 }, pb: { xs: 6, sm: 10 } }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          One place for your whole professional life
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: { xs: 2.5, sm: 3 },
          }}
        >
          {FEATURES.map((f) => (
            <Box
              key={f.title}
              sx={{
                bgcolor: "background.paper",
                borderRadius: 3,
                p: { xs: 2.5, sm: 3 },
                border: 1,
                borderColor: "divider",
              }}
            >
              <Box sx={{ color: "primary.main", mb: 1 }}>{f.icon}</Box>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {f.title}
              </Typography>
              <Typography variant="body" color="text.secondary">
                {f.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Final CTA ────────────────────────────────────── */}
      <Box
        sx={{
          bgcolor: "background.paper",
          borderTop: 1,
          borderColor: "divider",
          py: { xs: 5, sm: 7 },
          textAlign: "center",
        }}
      >
        <Typography variant="h2" sx={{ mb: 1 }}>
          Ready when you are
        </Typography>
        <Typography variant="body" color="text.secondary" sx={{ mb: 3 }}>
          Join {APP_NAME} today — the community is already here.
        </Typography>
        <FIlledButton
          component={NextLink}
          href="/sign-up"
          sx={{ borderRadius: 999, py: 1.25, px: 5, textTransform: "none" }}
        >
          Join now
        </FIlledButton>
      </Box>
    </Box>
  );
}
