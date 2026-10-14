export interface MockGroup {
  id: string;
  name: string;
  initials: string;
  members: number;
  category: string;
  description: string;
  activityAgo: string;
  joinedByConnections?: string;
}

export const GROUPS: MockGroup[] = [
  {
    id: "grp-1",
    name: "React Developers Philippines",
    initials: "RD",
    members: 24800,
    category: "Software Development",
    description:
      "A community for Filipino React engineers to share job leads, code reviews, and the latest ecosystem news — from hooks to server components.",
    activityAgo: "3h",
    joinedByConnections: "Daniel Kim and 12 other connections are members",
  },
  {
    id: "grp-2",
    name: "Design Systems Collective",
    initials: "DS",
    members: 41200,
    category: "Design",
    description:
      "Designers and engineers building component libraries, tokens pipelines, and the governance models that keep them alive.",
    activityAgo: "45m",
    joinedByConnections: "Sofia Reyes is a member",
  },
  {
    id: "grp-3",
    name: "Product Management Asia",
    initials: "PM",
    members: 68500,
    category: "Product Management",
    description:
      "Roadmaps, discovery, and stakeholder wrangling — practical PM discussion for product folks across APAC time zones.",
    activityAgo: "1d",
  },
  {
    id: "grp-4",
    name: "TypeScript Enthusiasts",
    initials: "TS",
    members: 89300,
    category: "Software Development",
    description:
      "Types, generics, and compiler magic. Weekly deep dives on making the type system work for you instead of against you.",
    activityAgo: "2d",
  },
  {
    id: "grp-5",
    name: "Startup Founders Circle",
    initials: "SF",
    members: 32100,
    category: "Entrepreneurship",
    description:
      "First-time and repeat founders comparing notes on fundraising, hiring, and shipping before you're ready.",
    activityAgo: "6h",
  },
  {
    id: "grp-6",
    name: "UX Research Hub",
    initials: "UX",
    members: 19700,
    category: "Design",
    description:
      "Interview scripts, usability testing, and turning messy qualitative data into decisions your team will actually act on.",
    activityAgo: "4h",
  },
];

export const GROUP_CATEGORIES = [
  "All",
  "Software Development",
  "Design",
  "Product Management",
  "Entrepreneurship",
] as const;
