import type { MockPerson } from "./feed.mock";

export interface Invitation {
  id: string;
  person: MockPerson;
  timeAgo: string;
}

export interface NetworkSuggestion {
  id: string;
  person: MockPerson;
  mutual: string;
}

export const INVITATIONS: Invitation[] = [
  {
    id: "inv-1",
    person: {
      name: "Tomasz Nowak",
      initials: "TN",
      headline: "Backend Engineer at Cloudsmith",
    },
    timeAgo: "3h",
  },
  {
    id: "inv-2",
    person: {
      name: "Hana Yoshida",
      initials: "HY",
      headline: "Growth Lead at Sproutly",
    },
    timeAgo: "1d",
  },
  {
    id: "inv-3",
    person: {
      name: "Omar Haddad",
      initials: "OH",
      headline: "DevOps Engineer at Skyline Cloud",
    },
    timeAgo: "2d",
  },
];

export const NETWORK_SUGGESTIONS: NetworkSuggestion[] = [
  {
    id: "sug-1",
    person: {
      name: "Jordan Blake",
      initials: "JB",
      headline: "Staff Engineer at Northwind",
    },
    mutual: "8 mutual connections",
  },
  {
    id: "sug-2",
    person: {
      name: "Amara Osei",
      initials: "AO",
      headline: "Product Designer at Loop",
    },
    mutual: "3 mutual connections",
  },
  {
    id: "sug-3",
    person: {
      name: "Ravi Patel",
      initials: "RP",
      headline: "CTO at GreenGrid",
    },
    mutual: "12 mutual connections",
  },
  {
    id: "sug-4",
    person: {
      name: "Elena Petrova",
      initials: "EP",
      headline: "Engineering Manager at Vertex",
    },
    mutual: "5 mutual connections",
  },
  {
    id: "sug-5",
    person: {
      name: "Chris Doyle",
      initials: "CD",
      headline: "Data Analyst at Brightpath",
    },
    mutual: "2 mutual connections",
  },
  {
    id: "sug-6",
    person: {
      name: "Mei Lin",
      initials: "ML",
      headline: "Frontend Engineer at Pixelforge",
    },
    mutual: "6 mutual connections",
  },
];
