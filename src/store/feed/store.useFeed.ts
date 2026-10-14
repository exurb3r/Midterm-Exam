"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { POSTS, CURRENT_USER, type MockPost } from "../../config/mock/feed.mock";
import { useAuthStore } from "../auth/store.useAuth";

/** The signed-in user's profile for authoring posts/comments; falls back to the mock user while signed out. */
function currentUserAuthor(): { name: string; initials: string; headline: string } {
  const { session, users } = useAuthStore.getState();
  const user = session ? users.find((u) => u.email === session.email) : undefined;
  if (!user) {
    return {
      name: CURRENT_USER.name,
      initials: CURRENT_USER.initials,
      headline: CURRENT_USER.headline,
    };
  }
  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  return { name: user.name, initials: initials || "CN", headline: user.headline };
}

export interface FeedComment {
  id: string;
  author: { name: string; initials: string };
  text: string;
  timeAgo: string;
}

export interface FeedPost extends Omit<MockPost, "comments"> {
  liked: boolean;
  following: boolean;
  repostedByMe: boolean;
  saved: boolean;
  showComments: boolean;
  comments: FeedComment[];
  newCommentDraft: string;
}

interface FeedState {
  posts: FeedPost[];
  addPost: (text: string, image?: string) => void;
  toggleLike: (id: string) => void;
  toggleFollow: (id: string) => void;
  toggleRepost: (id: string) => void;
  toggleSave: (id: string) => void;
  toggleComments: (id: string) => void;
  setCommentDraft: (id: string, draft: string) => void;
  addComment: (id: string) => void;
}

let commentCounter = 100;

/** "45m" / "2h" / "3d" → minutes, so the feed can render newest first. */
function timeAgoMinutes(timeAgo: string): number {
  const match = timeAgo.match(/^(\d+)\s*(m|h|d|w)$/);
  if (!match) return Number.MAX_SAFE_INTEGER;
  const value = Number(match[1]);
  const unit = match[2];
  const perUnit = unit === "m" ? 1 : unit === "h" ? 60 : unit === "d" ? 60 * 24 : 60 * 24 * 7;
  return value * perUnit;
}

function seed(posts: MockPost[]): FeedPost[] {
  return [...posts]
    .sort((a, b) => timeAgoMinutes(a.timeAgo) - timeAgoMinutes(b.timeAgo))
    .map((p, i) => ({
      ...p,
      liked: false,
      following: i % 2 === 0,
      repostedByMe: false,
      saved: false,
      showComments: false,
      comments:
        p.id === "post-1"
          ? [
              {
                id: "c1",
                author: { name: "Daniel Kim", initials: "DK" },
                text: "Love this — the beta feedback loop really paid off.",
                timeAgo: "1h",
              },
            ]
          : [],
      newCommentDraft: "",
    }));
}

export const useFeedStore = create<FeedState>()(
  persist(
    (set) => ({
  posts: seed(POSTS),

  addPost: (text, image) =>
    set((state) => ({
      posts: [
        {
          id: `post-${Date.now()}`,
          author: currentUserAuthor(),
          timeAgo: "now",
          text,
          image,
          reactions: { like: 0, celebrate: 0, support: 0, love: 0 },
          reposts: 0,
          liked: false,
          following: true,
          repostedByMe: false,
          saved: false,
          showComments: false,
          comments: [],
          newCommentDraft: "",
        },
        ...state.posts,
      ],
    })),

  toggleLike: (id) =>
    set((state) => ({
      posts: state.posts.map((p) => {
        if (p.id !== id) return p;
        const dir = p.liked ? -1 : 1;
        return {
          ...p,
          liked: !p.liked,
          reactions: { ...p.reactions, like: p.reactions.like + dir },
        };
      }),
    })),

  toggleFollow: (id) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id ? { ...p, following: !p.following } : p
      ),
    })),

  toggleRepost: (id) =>
    set((state) => ({
      posts: state.posts.map((p) => {
        if (p.id !== id) return p;
        return {
          ...p,
          repostedByMe: !p.repostedByMe,
          reposts: p.reposts + (p.repostedByMe ? -1 : 1),
        };
      }),
    })),

  toggleSave: (id) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id ? { ...p, saved: !p.saved } : p
      ),
    })),

  toggleComments: (id) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id ? { ...p, showComments: !p.showComments } : p
      ),
    })),

  setCommentDraft: (id, draft) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id ? { ...p, newCommentDraft: draft } : p
      ),
    })),

  addComment: (id) =>
    set((state) => ({
      posts: state.posts.map((p) => {
        if (p.id !== id) return p;
        const draft = p.newCommentDraft.trim();
        if (!draft) return p;
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: `c-${commentCounter++}`,
              author: currentUserAuthor(),
              text: draft,
              timeAgo: "now",
            },
          ],
          newCommentDraft: "",
        };
      }),
    })),
  }),
    {
      name: "career-nexus-feed",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      // v0 (4 mock posts) → v1 (11 posts): keep the user's likes/saves/comments
      // and any posts they created, adopt the new mock content.
      migrate: (persistedState) => {
        const persisted = persistedState as Partial<FeedState> | undefined;
        const oldPosts: FeedPost[] = persisted?.posts ?? [];
        const mockIds = new Set(POSTS.map((p) => p.id));
        const userPosts = oldPosts.filter((p) => !mockIds.has(p.id));
        const merged = seed(POSTS).map((fresh) => {
          const prior = oldPosts.find((p) => p.id === fresh.id);
          if (!prior) return fresh;
          return {
            ...fresh,
            liked: prior.liked,
            following: prior.following,
            repostedByMe: prior.repostedByMe,
            saved: prior.saved,
            showComments: prior.showComments,
            comments: prior.comments,
            newCommentDraft: prior.newCommentDraft,
          };
        });
        return { ...persisted, posts: [...userPosts, ...merged] } as FeedState;
      },
      // Hydrate manually after mount (see Providers) to avoid SSR mismatch.
      skipHydration: true,
    }
  )
);
