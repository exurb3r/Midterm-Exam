export const ANALYTICS_SUMMARY = {
  impressions: 1204,
  impressionsDelta: "+12.4%",
  profileViews: 137,
  profileViewsDelta: "+8.1%",
  searchAppearances: 89,
  searchAppearancesDelta: "+3.2%",
};

// 12 weeks of impression counts, oldest first.
export const IMPRESSIONS_SERIES = [
  42, 58, 51, 73, 66, 88, 79, 96, 84, 112, 104, 128,
];

// Views split by title/company.
export const VIEWER_ROLES = [
  { role: "Engineering Managers", pct: 34 },
  { role: "Senior Engineers", pct: 27 },
  { role: "Product Managers", pct: 18 },
  { role: "Recruiters", pct: 12 },
  { role: "Founders", pct: 9 },
];

export const POST_PERFORMANCE = [
  {
    id: "p1",
    title: "5 lessons from migrating 200 components to a token pipeline",
    impressions: 642,
    reactions: 88,
    comments: 24,
    reposts: 11,
  },
  {
    id: "p2",
    title: "Accessibility isn't a phase — it's the spec",
    impressions: 431,
    reactions: 57,
    comments: 18,
    reposts: 9,
  },
  {
    id: "p3",
    title: "What 7 years of frontend taught me about code review",
    impressions: 289,
    reactions: 41,
    comments: 12,
    reposts: 4,
  },
];
