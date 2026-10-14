import type { MockPerson } from "./feed.mock";

export type NotificationKind = "reactions" | "comments" | "mentions" | "jobs" | "follows";

export interface MockNotification {
  id: string;
  kind: NotificationKind;
  actor: MockPerson;
  action: string;
  target?: string;
  timeAgo: string;
  unread: boolean;
}

export const NOTIFICATIONS: MockNotification[] = [
  {
    id: "n1",
    kind: "reactions",
    actor: {
      name: "Priya Sharma",
      initials: "PS",
      headline: "Product Manager at Innovate Labs",
    },
    action: "and 41 others reacted to your post about design systems",
    timeAgo: "25m",
    unread: true,
  },
  {
    id: "n2",
    kind: "comments",
    actor: {
      name: "Daniel Kim",
      initials: "DK",
      headline: "Engineering Leader | Building scalable systems",
    },
    action: "commented on your post",
    target: "Couldn't agree more — the framing around decisions over tokens is spot on.",
    timeAgo: "1h",
    unread: true,
  },
  {
    id: "n3",
    kind: "jobs",
    actor: {
      name: "GreenGrid",
      initials: "GG",
      headline: "Clean Energy · 120 employees",
    },
    action: "posted a new job that matches your profile",
    target: "Senior React Developer — Remote (EU)",
    timeAgo: "6h",
    unread: true,
  },
  {
    id: "n4",
    kind: "mentions",
    actor: {
      name: "Sofia Reyes",
      initials: "SR",
      headline: "UX Designer at Brightline Studio",
    },
    action: "mentioned you in a comment",
    target: "You built exactly this kind of token pipeline at TechCorp.",
    timeAgo: "1d",
    unread: false,
  },
  {
    id: "n5",
    kind: "follows",
    actor: {
      name: "Marcus Webb",
      initials: "MW",
      headline: "Data Scientist | ML & Analytics",
    },
    action: "started following you",
    timeAgo: "2d",
    unread: false,
  },
  {
    id: "n6",
    kind: "reactions",
    actor: {
      name: "Hana Yoshida",
      initials: "HY",
      headline: "Growth Lead at Sproutly",
    },
    action: "and 12 others reacted to your comment",
    timeAgo: "3d",
    unread: false,
  },
  {
    id: "n7",
    kind: "comments",
    actor: {
      name: "Omar Haddad",
      initials: "OH",
      headline: "DevOps Engineer at Skyline Cloud",
    },
    action: "replied to your comment",
    target: "The migration guide was exactly what we needed, thank you!",
    timeAgo: "5d",
    unread: false,
  },
];
