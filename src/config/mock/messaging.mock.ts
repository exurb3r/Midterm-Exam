import type { MockPerson } from "./feed.mock";

export interface MockMessage {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
}

export interface MockConversation {
  id: string;
  person: MockPerson;
  unread: number;
  lastActive: string;
  messages: MockMessage[];
}

export const CONVERSATIONS: MockConversation[] = [
  {
    id: "conv-1",
    person: {
      name: "Priya Sharma",
      initials: "PS",
      headline: "Product Manager at Innovate Labs",
    },
    unread: 2,
    lastActive: "Active now",
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Hey! Did you see the onboarding numbers we shipped last week?",
        time: "10:02",
      },
      {
        id: "m2",
        from: "me",
        text: "Just went through the report — 32% drop-off reduction is huge. Congrats!",
        time: "10:05",
      },
      {
        id: "m3",
        from: "them",
        text: "Thanks! We're planning the next iteration and I'd love your input on the empty states.",
        time: "10:07",
      },
      {
        id: "m4",
        from: "them",
        text: "Do you have 30 minutes tomorrow?",
        time: "10:07",
      },
    ],
  },
  {
    id: "conv-2",
    person: {
      name: "Daniel Kim",
      initials: "DK",
      headline: "Engineering Leader | Building scalable systems",
    },
    unread: 0,
    lastActive: "Active 2h ago",
    messages: [
      {
        id: "m1",
        from: "them",
        text: "That interview post blew up — 140 comments and counting 😅",
        time: "Yesterday",
      },
      { id: "m2", from: "me", text: "Deserved. The reply threads are gold.", time: "Yesterday" },
      {
        id: "m3",
        from: "them",
        text: "Want to co-write a follow-up on take-home assignments?",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "conv-3",
    person: {
      name: "Sofia Reyes",
      initials: "SR",
      headline: "UX Designer at Brightline Studio",
    },
    unread: 1,
    lastActive: "Active 1d ago",
    messages: [
      {
        id: "m1",
        from: "me",
        text: "Loved your design systems post — the 'document decisions' framing is exactly right.",
        time: "Mon",
      },
      {
        id: "m2",
        from: "them",
        text: "Thank you! I'm turning it into a talk. Will share the deck when it's done.",
        time: "Mon",
      },
      {
        id: "m3",
        from: "them",
        text: "Also — are you speaking at this year's FrontendConf?",
        time: "Tue",
      },
    ],
  },
  {
    id: "conv-4",
    person: {
      name: "Marcus Webb",
      initials: "MW",
      headline: "Data Scientist | ML & Analytics",
    },
    unread: 0,
    lastActive: "Active 3d ago",
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Sent you the RAG evaluation notebook. The index ablation results start at cell 42.",
        time: "Fri",
      },
      { id: "m2", from: "me", text: "Perfect, thanks Marcus. Will dig in this weekend.", time: "Fri" },
    ],
  },
  {
    id: "conv-5",
    person: {
      name: "Ravi Patel",
      initials: "RP",
      headline: "CTO at GreenGrid",
    },
    unread: 0,
    lastActive: "Active 1w ago",
    messages: [
      {
        id: "m1",
        from: "them",
        text: "We're opening a senior frontend role. Can I send you the JD?",
        time: "Sep 28",
      },
      { id: "m2", from: "me", text: "Sure — and happy to share it around too.", time: "Sep 28" },
    ],
  },
];
