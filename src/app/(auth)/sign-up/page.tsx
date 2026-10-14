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

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required.").min(2, "Enter your full name."),
  headline: z
    .string()
    .max(120, "Headline must be 120 characters or fewer."),
  location: z
    .string()
    .min(1, "Location is required.")
    .min(3, "Enter a city, region or country."),
  phone: z
    .string()
    .regex(/^[+\d][\d\s().-]{6,}$/, "Enter a valid phone number."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .max(72, "Password must be 72 characters or fewer."),
});

type SignUpValues = z.infer<typeof signUpSchema>;
type SignUpErrors = Partial<Record<keyof SignUpValues, string>>;
type SignUpField = keyof SignUpValues;

const SIGNUP_FIELDS: SignUpField[] = ["name", "headline", "location", "phone", "email", "password"];

function validate(values: SignUpValues): SignUpErrors {
  const result = signUpSchema.safeParse(values);
  if (result.success) return {};
  const errors: SignUpErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof SignUpValues | undefined;
    if (key && !(key in errors)) errors[key] = issue.message;
  }
  return errors;
}

export default function SignUpPage() {
  const router = useRouter();
  const feedback = useFeedback();

  const users = useAuthStore((s) => s.users);
  const session = useAuthStore((s) => s.session);
  const signUp = useAuthStore((s) => s.signUp);

  const hydrated = useAuthHydrated();
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<SignUpField, boolean>>({
    name: false,
    headline: false,
    location: false,
    phone: false,
    email: false,
    password: false,
  });

  // Already signed in? Skip straight to the feed.
  useEffect(() => {
    if (hydrated && session) router.replace("/feed");
  }, [hydrated, session, router]);

  const values: SignUpValues = { name, headline, location, phone, email, password };
  const errors = validate(values);
  const showError = (field: SignUpField) => touched[field] && errors[field];

  const nameError = showError("name");
  const headlineError = showError("headline");
  const locationError = showError("location");
  const phoneError = showError("phone");
  const emailError = showError("email");
  const passwordError = showError("password");
  const canSubmit =
    !submitting && Object.keys(errors).length === 0 && name && email && password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(
      SIGNUP_FIELDS.reduce(
        (acc, f) => ({ ...acc, [f]: true }),
        {} as Record<SignUpField, boolean>
      )
    );
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) return;

    const emailNorm = email.trim();
    if (users.some((u) => u.email === emailNorm)) {
      setFormError(
        "That email already has an account. Sign in instead — or use a different email."
      );
      return;
    }

    setFormError(null);
    setSubmitting(true);
    // UI only — small delay so the submit feels like a real round trip.
    setTimeout(() => {
      signUp({
        name: name.trim(),
        email: emailNorm,
        password,
        headline: headline.trim(),
        location: location.trim(),
        phone: phone.trim(),
      });
      feedback.showToast(`Welcome to ${APP_NAME}, ${name.trim().split(" ")[0]}! 🎉`, "success");
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
          Join {APP_NAME}
        </Typography>
        <Typography variant="body" color="text.secondary" sx={{ mt: 1 }}>
          Create your professional identity and connect with your community
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2} sx={{ mt: 4 }}>
            <TextField
              label="Full name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              error={Boolean(nameError)}
              helperText={nameError ?? " "}
            />
            <TextField
              label="Headline (e.g. Software Engineer at TechCorp)"
              type="text"
              fullWidth
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, headline: true }))}
              error={Boolean(headlineError)}
              helperText={headlineError ?? " "}
            />
            <TextField
              label="City or region (e.g. Manila, PH)"
              type="text"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, location: true }))}
              error={Boolean(locationError)}
              helperText={locationError ?? " "}
            />
            <TextField
              label="Phone number"
              type="tel"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              error={Boolean(phoneError)}
              helperText={phoneError ?? " "}
            />
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
              label="Password (8+ characters)"
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
                {formError.includes("already") && (
                  <>
                    {" "}
                    <Box
                      component={NextLink}
                      href="/sign-in"
                      sx={{
                        color: "primary.main",
                        fontWeight: 600,
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Sign in
                    </Box>
                  </>
                )}
              </Typography>
            )}

            <Typography variant="caption" color="text.secondary">
              By clicking Continue, you agree to the {APP_NAME} User Agreement, Privacy
              Policy, and Cookie Policy. (Demo — everything stays in your browser.)
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
              {submitting ? "Creating account…" : "Continue"}
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
            Join with Google
          </OutLinedButton>
          <OutLinedButton fullWidth sx={{ py: 1, textTransform: "none" }}>
            Join with Apple
          </OutLinedButton>
        </Stack>

        <Typography variant="body" sx={{ mt: 4, textAlign: "center" }}>
          Already on {APP_NAME}?{" "}
          <Box
            component={NextLink}
            href="/sign-in"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Sign in
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
