"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { z } from "zod";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import FIlledButton from "../../../components/Buttons/FIlledButton";
import OutLinedButton from "../../../components/Buttons/OutLinedButton";
import { APP_NAME } from "../../../config/config";
import { useFeedback } from "../../../components/feedback/FeedbackProvider";
import {
  useAuthStore,
  useAuthHydrated,
} from "../../../store/auth/store.useAuth";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be at least 8 characters."),
});

type SignInValues = z.infer<typeof signInSchema>;
type SignInErrors = Partial<Record<keyof SignInValues, string>>;

function validate(values: SignInValues): SignInErrors {
  const result = signInSchema.safeParse(values);
  if (result.success) return {};
  const errors: SignInErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof SignInValues | undefined;
    if (key && !(key in errors)) errors[key] = issue.message;
  }
  return errors;
}

export default function SignInPage() {
  const router = useRouter();
  const feedback = useFeedback();

  const users = useAuthStore((s) => s.users);
  const session = useAuthStore((s) => s.session);
  const signIn = useAuthStore((s) => s.signIn);

  const hydrated = useAuthHydrated();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [touched, setTouched] = useState({ email: false, password: false });

  // Already signed in? Skip straight to the feed.
  useEffect(() => {
    if (hydrated && session) router.replace("/feed");
  }, [hydrated, session, router]);

  const values: SignInValues = { email, password };
  const errors = validate(values);
  const showError = (field: keyof SignInValues) => touched[field] && errors[field];

  const emailError = showError("email");
  const passwordError = showError("password");
  const canSubmit =
    !submitting && Object.keys(errors).length === 0 && email !== "" && password !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) return;

    const user = users.find((u) => u.email === email.trim());
    if (!user) {
      setFormError(
        "We couldn't find an account with that email. Join now to create one."
      );
      return;
    }
    if (user.password !== password) {
      setFormError("Incorrect password. Please try again.");
      return;
    }

    setFormError(null);
    setSubmitting(true);
    // UI only — small delay so the submit feels like a real round trip.
    setTimeout(() => {
      signIn(email.trim(), password);
      feedback.showToast(`Welcome back, ${user.name.split(" ")[0]}!`, "success");
      router.replace("/feed");
    }, 800);
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        px: { xs: 2, sm: 4 },
        pt: { xs: 2, sm: 5 },
        pb: 8,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <Typography variant="display" sx={{ fontSize: { xs: "2rem", sm: "2.5rem" } }}>
          Sign in
        </Typography>
        <Typography variant="body" color="text.secondary" sx={{ mt: 1 }}>
          Stay updated on your professional world
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2} sx={{ mt: 4 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              error={Boolean(emailError)}
              helperText={emailError ?? " "}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              error={Boolean(passwordError)}
              helperText={passwordError ?? " "}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((v) => !v)}
                        edge="end"
                        aria-label={showPassword ? "hide password" : "show password"}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {formError && (
              <Typography variant="bodySmall" sx={{ color: "error.main" }}>
                {formError}
                {formError.includes("find an account") && (
                  <>
                    {" "}
                    <Box
                      component={NextLink}
                      href="/sign-up"
                      sx={{
                        color: "primary.main",
                        fontWeight: 600,
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Join now
                    </Box>
                  </>
                )}
              </Typography>
            )}

            <Typography
              component={NextLink}
              href="/sign-in"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                alignSelf: "flex-start",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Forgot password?
            </Typography>

            <FIlledButton
              type="submit"
              fullWidth
              disabled={!canSubmit}
              sx={{
                py: 1.25,
                borderRadius: 999,
                "&:disabled": { opacity: 0.6 },
              }}
              startIcon={
                submitting ? <CircularProgress size={18} color="inherit" /> : undefined
              }
            >
              {submitting ? "Signing in…" : "Sign in"}
            </FIlledButton>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="caption" color="text.secondary">
            or
          </Typography>
        </Divider>

        <Stack spacing={1.5}>
          <OutLinedButton fullWidth sx={{ py: 1, textTransform: "none" }}>
            Sign in with Google
          </OutLinedButton>
          <OutLinedButton fullWidth sx={{ py: 1, textTransform: "none" }}>
            Sign in with Apple
          </OutLinedButton>
        </Stack>

        <Typography variant="body" sx={{ mt: 4, textAlign: "center" }}>
          New to {APP_NAME}?{" "}
          <Box
            component={NextLink}
            href="/sign-up"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Join now
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
