export interface MockPerson {
  name: string;
  headline: string;
  initials: string;
  mutual?: string;
  company?: string;
}

export interface MockPost {
  id: string;
  author: MockPerson;
  timeAgo: string;
  text: string;
  image?: string;
  linkPreview?: { title: string; publisher: string };
  reactions: { like: number; celebrate: number; support: number; love: number };
  comments: number;
  reposts: number;
}

export const CURRENT_USER: MockPerson = {
  name: "Alex Morgan",
  initials: "AM",
  headline: "Senior Frontend Engineer at TechCorp | React & TypeScript",
};

export const POSTS: MockPost[] = [
  {
    id: "post-1",
    author: {
      name: "Priya Sharma",
      initials: "PS",
      headline: "Product Manager at Innovate Labs",
    },
    timeAgo: "2h",
    text: "Excited to share that our team just shipped the new onboarding flow! 🎉\n\nWe reduced drop-off by 32% in the first week. Huge thanks to everyone who gave feedback during the beta — this release is as much yours as ours.",
    image: "https://picsum.photos/seed/onboarding/1200/640",
    reactions: { like: 184, celebrate: 41, support: 12, love: 23 },
    comments: 36,
    reposts: 7,
  },
  {
    id: "post-2",
    author: {
      name: "Daniel Kim",
      initials: "DK",
      headline: "Engineering Leader | Building scalable systems",
    },
    timeAgo: "5h",
    text: "Hot take: the best interview question isn't about algorithms.\n\nAsk a candidate to walk you through the last thing they built that they're proud of. You'll learn more in 10 minutes than in 10 whiteboard sessions.",
    linkPreview: {
      title: "Rethinking technical interviews in 2026",
      publisher: "techleaders.dev",
    },
    reactions: { like: 512, celebrate: 18, support: 96, love: 12 },
    comments: 142,
    reposts: 58,
  },
  {
    id: "post-3",
    author: {
      name: "Sofia Reyes",
      initials: "SR",
      headline: "UX Designer at Brightline Studio",
    },
    timeAgo: "1d",
    text: "Design systems are not just component libraries — they're agreements between people.\n\nThe best ones document *decisions*, not just tokens. When a new designer joins, they shouldn't just inherit components; they should inherit the reasoning behind them.\n\nWhat's the most valuable thing your design system documents?",
    reactions: { like: 289, celebrate: 44, support: 21, love: 67 },
    comments: 52,
    reposts: 19,
  },
  {
    id: "post-4",
    author: {
      name: "Marcus Webb",
      initials: "MW",
      headline: "Data Scientist | ML & Analytics",
    },
    timeAgo: "2d",
    text: "Just finished a 6-month deep dive into retrieval-augmented generation for enterprise search. Key lesson: the index matters more than the model.",
    image: "https://picsum.photos/seed/dataviz/1200/640",
    reactions: { like: 421, celebrate: 30, support: 18, love: 9 },
    comments: 88,
    reposts: 34,
  },
  {
    id: "post-5",
    author: {
      name: "Priya Sharma",
      initials: "PS",
      headline: "Product Manager at Innovate Labs",
    },
    timeAgo: "45m",
    text: "Three days offsite with the product team and I'm coming home with 47 sticky notes and zero regrets. 🏔️\n\nBest takeaway: we finally agreed on what *not* to build this quarter. Saying no out loud, in one room, beats a tidy roadmap nobody believes.",
    image: "https://picsum.photos/seed/offsite/1200/640",
    reactions: { like: 126, celebrate: 38, support: 9, love: 17 },
    comments: 24,
    reposts: 5,
  },
  {
    id: "post-6",
    author: {
      name: "Jordan Blake",
      initials: "JB",
      headline: "Staff Engineer at Northwind",
    },
    timeAgo: "3h",
    text: "Spoke at DevWorld this week about scaling a monorepo without slowing everyone down. Slides below in the comments.\n\nThe question that stuck with me from the audience: “what would you delete if you had to cut build times in half?” — nobody reaches for deletion first. We should.",
    image: "https://picsum.photos/seed/stage/1200/640",
    reactions: { like: 342, celebrate: 74, support: 21, love: 30 },
    comments: 61,
    reposts: 47,
  },
  {
    id: "post-7",
    author: {
      name: "Sofia Reyes",
      initials: "SR",
      headline: "UX Designer at Brightline Studio",
    },
    timeAgo: "8h",
    text: "Checkout redesign shipped yesterday: 21 screens down to 9, and support tickets about “where do I pay?” dropped to zero in the first 12 hours.\n\nNot bad for a week of arguing about button labels. 🙂",
    image: "https://picsum.photos/seed/redesign/1200/640",
    reactions: { like: 207, celebrate: 56, support: 14, love: 41 },
    comments: 33,
    reposts: 12,
  },
  {
    id: "post-8",
    author: {
      name: "Elena Petrova",
      initials: "EP",
      headline: "Engineering Manager at Vertex",
    },
    timeAgo: "1d",
    text: "Ended the quarter by promoting two engineers who had been doing the job for a year without the title.\n\nIf someone is already doing the work, the org chart is the only thing lagging behind. Managers: audit your teams for invisible scope before your best people start interviewing elsewhere.",
    reactions: { like: 588, celebrate: 143, support: 67, love: 92 },
    comments: 119,
    reposts: 96,
  },
  {
    id: "post-9",
    author: {
      name: "Amara Osei",
      initials: "AO",
      headline: "Product Designer at Loop",
    },
    timeAgo: "1d",
    text: "Launch day for Loop 2.0! 🚀\n\nEight months, three pivots, one very patient beta group. The part I'm proudest of isn't the UI — it's that we shipped with zero new onboarding steps. Great products should feel like less, not more.",
    image: "https://picsum.photos/seed/launch/1200/640",
    reactions: { like: 311, celebrate: 98, support: 22, love: 54 },
    comments: 47,
    reposts: 18,
  },
  {
    id: "post-10",
    author: {
      name: "Hana Yoshida",
      initials: "HY",
      headline: "Growth Lead at Sproutly",
    },
    timeAgo: "2d",
    text: "Growth experiment of the month: we deleted the discount banner and conversion went *up* 6%.\n\nFriction isn't always the enemy — sometimes hesitation means people actually care about the decision. Measure before you optimize.",
    image: "https://picsum.photos/seed/growth/1200/640",
    reactions: { like: 264, celebrate: 45, support: 39, love: 28 },
    comments: 52,
    reposts: 31,
  },
  {
    id: "post-11",
    author: {
      name: "Ravi Patel",
      initials: "RP",
      headline: "CTO at GreenGrid",
    },
    timeAgo: "3d",
    text: "Our 40MW solar rollout went live this morning — enough clean power for roughly 12,000 homes. ☀️\n\nProud of the team who kept the grid firmware stable through the cutover. Software career pro tip: nothing focuses a code review like knowing the deploy controls real electrons.",
    image: "https://picsum.photos/seed/solar/1200/640",
    reactions: { like: 497, celebrate: 121, support: 44, love: 76 },
    comments: 74,
    reposts: 88,
  },
];

export const NEWS: { title: string; source: string; timeAgo: string }[] = [
  {
    title: "Green energy jobs grow 12% year over year",
    source: "Climate Wire",
    timeAgo: "3h",
  },
  {
    title: "Remote work settles into a hybrid norm",
    source: "Workforce Daily",
    timeAgo: "6h",
  },
  {
    title: "AI copilots reshape the developer workflow",
    source: "Tech Review",
    timeAgo: "1d",
  },
  {
    title: "Mid-size cities lead startup formation",
    source: "Founder Beat",
    timeAgo: "1d",
  },
  {
    title: "Design hiring rebounds in Q3",
    source: "Creative Signal",
    timeAgo: "2d",
  },
];

export const PEOPLE_YOU_MAY_KNOW: MockPerson[] = [
  {
    name: "Jordan Blake",
    initials: "JB",
    headline: "Staff Engineer at Northwind",
    mutual: "8 mutual connections",
  },
  {
    name: "Amara Osei",
    initials: "AO",
    headline: "Product Designer at Loop",
    mutual: "3 mutual connections",
  },
  {
    name: "Ravi Patel",
    initials: "RP",
    headline: "CTO at GreenGrid",
    mutual: "12 mutual connections",
  },
  {
    name: "Elena Petrova",
    initials: "EP",
    headline: "Engineering Manager at Vertex",
    mutual: "5 mutual connections",
  },
];

export const ADD_TO_FEED: MockPerson[] = [
  {
    name: "Tomasz Nowak",
    initials: "TN",
    headline: "Backend Engineer at Cloudsmith",
  },
  {
    name: "Hana Yoshida",
    initials: "HY",
    headline: "Growth Lead at Sproutly",
  },
];