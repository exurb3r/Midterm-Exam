"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CURRENT_USER } from "../../config/mock/feed.mock";

export interface AuthUser {
  name: string;
  email: string;
  headline: string;
  location: string;
  phone: string;
  company: string;
  role: string;
  password: string;
  joinedAt: string;
}

export interface AuthSession {
  name: string;
  email: string;
  joinedAt: string;
}

export interface AuthProfileDraft {
  name: string;
  headline: string;
  location: string;
  phone: string;
  company: string;
  role: string;
}

interface AuthState {
  users: AuthUser[];
  session: AuthSession | null;
  signUp: (draft: SignUpDraft) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  updateProfile: (draft: Partial<AuthProfileDraft>, sessionEmail: string) => void;
}

export interface SignUpDraft {
  name: string;
  email: string;
  password: string;
  headline?: string;
  location?: string;
  phone?: string;
}

export function initialsFor(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      users: [],
      session: null,

      signUp: (draft) =>
        set((state) => {
          const now = new Date().toISOString();
          const user: AuthUser = {
            name: draft.name,
            email: draft.email,
            password: draft.password,
            headline: draft.headline || `Brand-new member of Career Nexus`,
            location: draft.location || "",
            phone: draft.phone || "",
            company: "",
            role: "",
            joinedAt: now,
          };
          return {
            users: [...state.users.filter((u) => u.email !== draft.email), user],
            session: { name: draft.name, email: draft.email, joinedAt: now },
          };
        }),

      signIn: (email, password) =>
        set((state) => {
          const user = state.users.find((u) => u.email === email);
          if (!user || user.password !== password) return state;
          return {
            session: {
              name: user.name,
              email: user.email,
              joinedAt: new Date().toISOString(),
            },
          };
        }),

      signOut: () => set({ session: null }),

      updateProfile: (draft, sessionEmail) =>
        set((state) => {
          const exists = state.users.some((u) => u.email === sessionEmail);
          if (!exists) return state;
          return {
            users: state.users.map((u) =>
              u.email === sessionEmail ? { ...u, ...draft } : u
            ),
            session:
              draft.name !== undefined && state.session
                ? { ...state.session, name: draft.name }
                : state.session,
          };
        }),
    }),
    {
      name: "career-nexus-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ users: state.users, session: state.session }),
      // Hydrate manually after mount (see Providers) to avoid SSR mismatch.
      skipHydration: true,
    }
  )
);

/** Non-persisted flag: flips true once the persisted auth state has been rehydrated (see Providers). */
export const useAuthHydration = create<{ authReady: boolean; setAuthReady: (v: boolean) => void }>(
  (set) => ({
    authReady: false,
    setAuthReady: (v) => set({ authReady: v }),
  })
);

/** True once the persisted auth state has been rehydrated from localStorage. */
export function useAuthHydrated() {
  return useAuthHydration((s) => s.authReady);
}

/**
 * The signed-in user's live profile, falling back to the mock CURRENT_USER
 * while signed out so mock-browsing the dashboard still looks complete.
 */
export function useCurrentUser() {
  const session = useAuthStore((s) => s.session);
  const users = useAuthStore((s) => s.users);
  const user =
    session ? users.find((u) => u.email === session.email) ?? null : null;

  if (!user) {
    return {
      name: CURRENT_USER.name,
      headline: CURRENT_USER.headline,
      initials: CURRENT_USER.initials,
      avatarUrl: "/pfp/pfp5.png",
      location: "Santa Maria, Central Luzon",
      phone: "",
      company: "",
      role: "",
      signedIn: false,
    };
  }

  return {
    name: user.name,
    headline: user.headline,
    initials: initialsFor(user.name) || "CN",
    avatarUrl: "/pfp/pfp5.png",
    location: user.location || "Santa Maria, Central Luzon",
    phone: user.phone,
    company: user.company,
    role: user.role,
    signedIn: true,
  };
}
