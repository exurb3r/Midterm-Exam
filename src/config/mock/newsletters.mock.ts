export interface MockNewsletter {
  id: string;
  title: string;
  publisher: string;
  initials: string;
  subscribers: string;
  cadence: string;
  description: string;
  latestIssue: string;
  latestIssueAgo: string;
}

export const NEWSLETTERS: MockNewsletter[] = [
  {
    id: "nl-1",
    title: "Tech Career Pulse",
    publisher: "Career Nexus Editorial",
    initials: "TC",
    subscribers: "1.2M",
    cadence: "Weekly",
    description:
      "Hiring trends, salary data, and the skills rising fastest — the five-minute read before you plan your next move.",
    latestIssue: "The skills hiring managers stopped asking for",
    latestIssueAgo: "2d",
  },
  {
    id: "nl-2",
    title: "The React Report",
    publisher: "Frontend Weekly Media",
    initials: "RR",
    subscribers: "486K",
    cadence: "Weekly",
    description:
      "One deep dive on the React ecosystem every Friday: releases, patterns, and the libraries worth your time.",
    latestIssue: "Server Components in production: 6 months later",
    latestIssueAgo: "5d",
  },
  {
    id: "nl-3",
    title: "Design Ops Digest",
    publisher: "Brightline Studio",
    initials: "DO",
    subscribers: "152K",
    cadence: "Biweekly",
    description:
      "How real teams run design systems — governance, contribution models, and the tooling that holds it together.",
    latestIssue: "When to split your component library",
    latestIssueAgo: "1w",
  },
  {
    id: "nl-4",
    title: "Job Search Playbook",
    publisher: "Career Nexus Community",
    initials: "JS",
    subscribers: "740K",
    cadence: "Biweekly",
    description:
      "Interview prep, negotiation scripts, and resume teardowns from recruiters who review thousands of applications.",
    latestIssue: "Answering the salary-expectations question",
    latestIssueAgo: "3d",
  },
  {
    id: "nl-5",
    title: "Leadership Notes",
    publisher: "Tech Leaders Guild",
    initials: "LN",
    subscribers: "298K",
    cadence: "Monthly",
    description:
      "Essays on engineering management from people who've done the job — no productivity-hustle fluff.",
    latestIssue: "Your first 90 days as a manager",
    latestIssueAgo: "2w",
  },
];
