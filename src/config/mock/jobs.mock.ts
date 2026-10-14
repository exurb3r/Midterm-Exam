export interface MockJob {
  id: string;
  title: string;
  company: string;
  initials: string;
  location: string;
  workplaceType: "Remote" | "Hybrid" | "On-site";
  postedAgo: string;
  applicants: number;
  salary?: string;
  easyApply: boolean;
  promoted: boolean;
  matchScore: number;
  description: string;
  requirements: string[];
  benefits: string[];
  industry: string;
}

export const JOBS: MockJob[] = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    company: "TechCorp",
    initials: "TC",
    location: "San Francisco, CA",
    workplaceType: "Hybrid",
    postedAgo: "2d",
    applicants: 34,
    salary: "$150K – $190K/yr",
    easyApply: true,
    promoted: true,
    matchScore: 92,
    industry: "Software Development",
    description:
      "We're looking for a senior frontend engineer to lead the modernization of our customer-facing web platform. You'll work with React, TypeScript, and a mature design system used by 40+ engineers.",
    requirements: [
      "5+ years of frontend experience with React and TypeScript",
      "Deep understanding of accessibility and performance",
      "Experience mentoring mid-level engineers",
    ],
    benefits: ["Health, dental & vision", "401(k) match", "Learning budget", "Hybrid schedule"],
  },
  {
    id: "job-2",
    title: "Product Designer, Design Systems",
    company: "Loop",
    initials: "LO",
    location: "Remote (US)",
    workplaceType: "Remote",
    postedAgo: "5d",
    applicants: 87,
    easyApply: false,
    promoted: false,
    matchScore: 71,
    industry: "Design",
    description:
      "Loop is hiring a product designer to own our design system documentation, token pipeline, and cross-team contribution model.",
    requirements: [
      "4+ years in product design with systems experience",
      "Fluency in Figma variables and component APIs",
      "Strong writing and documentation skills",
    ],
    benefits: ["Fully remote", "Equity", "Home office stipend"],
  },
  {
    id: "job-3",
    title: "Frontend Engineer, Growth",
    company: "Sproutly",
    initials: "SP",
    location: "Austin, TX",
    workplaceType: "On-site",
    postedAgo: "1w",
    applicants: 12,
    salary: "$120K – $145K/yr",
    easyApply: true,
    promoted: false,
    matchScore: 84,
    industry: "Marketing Technology",
    description:
      "Own experiments end-to-end: build landing pages, run A/B tests, and ship features that move activation metrics for a fast-growing consumer product.",
    requirements: [
      "3+ years with React",
      "Experience with experimentation platforms",
      "Comfort with analytics tooling",
    ],
    benefits: ["Health coverage", "Free lunch", "Commuter benefits"],
  },
  {
    id: "job-4",
    title: "Engineering Manager, Web Platform",
    company: "Vertex",
    initials: "VX",
    location: "New York, NY",
    workplaceType: "Hybrid",
    postedAgo: "3d",
    applicants: 56,
    easyApply: false,
    promoted: true,
    matchScore: 65,
    industry: "Financial Services",
    description:
      "Lead two squads (8 engineers) building the web platform powering our advisor dashboard. Focus on delivery, mentorship, and technical strategy.",
    requirements: [
      "2+ years of engineering management",
      "Strong React and TypeScript background",
      "Experience with regulated environments a plus",
    ],
    benefits: ["Health, dental & vision", "401(k)", "Parental leave", "Annual bonus"],
  },
  {
    id: "job-5",
    title: "Senior React Developer",
    company: "GreenGrid",
    initials: "GG",
    location: "Remote (EU)",
    workplaceType: "Remote",
    postedAgo: "6h",
    applicants: 9,
    salary: "€85K – €110K/yr",
    easyApply: true,
    promoted: false,
    matchScore: 88,
    industry: "Clean Energy",
    description:
      "Build the monitoring dashboards energy operators use to manage solar and wind fleets in real time. React, WebSockets, and lots of data-dense UI.",
    requirements: [
      "4+ years with React",
      "Experience with real-time data visualization",
      "Interest in climate tech",
    ],
    benefits: ["Fully remote", "Mission-driven team", "32 days PTO"],
  },
  {
    id: "job-6",
    title: "UI Engineer",
    company: "Pixelforge",
    initials: "PF",
    location: "Seattle, WA",
    workplaceType: "Hybrid",
    postedAgo: "2w",
    applicants: 41,
    easyApply: false,
    promoted: false,
    matchScore: 59,
    industry: "Gaming",
    description:
      "Craft pixel-perfect interfaces for our creator tools. You care about the last 2% of polish that makes interfaces feel alive.",
    requirements: [
      "3+ years shipping consumer UI",
      "Motion and interaction design sensibility",
      "CSS mastery",
    ],
    benefits: ["Health coverage", "Game studio discounts", "Flexible hours"],
  },
];

export const JOB_FILTER_OPTIONS = {
  workplaceType: ["All", "Remote", "Hybrid", "On-site"] as const,
  easyApply: "Easy Apply",
};
