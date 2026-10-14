export interface FaqCategory {
  id: string;
  label: string;
  icon: string;
}

export interface MockFaq {
  id: string;
  category: string;
  question: string;
  answer: string;
  related?: string[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  { id: "cat-all", label: "All", icon: "📋" },
  { id: "cat-account", label: "Account", icon: "👤" },
  { id: "cat-network", label: "Network", icon: "🤝" },
  { id: "cat-jobs", label: "Jobs", icon: "💼" },
  { id: "cat-privacy", label: "Privacy & Safety", icon: "🔒" },
];

export const FAQS: MockFaq[] = [
  {
    id: "faq-1",
    category: "Account",
    question: "How do I change my password?",
    answer:
      "Go to Settings → Sign in & security and open the “Change password” section. You'll verify your current password once, then set the new one. For this UI concept, the toggle is interactive but nothing is stored.",
    related: ["Two-step verification", "Account recovery"],
  },
  {
    id: "faq-2",
    category: "Account",
    question: "Can I use Career Nexus in dark mode?",
    answer:
      "Yes — open the Me menu in the top navigation and flip the Dark mode switch, or go to Settings → Display. Your preference is remembered between visits.",
    related: ["Display settings", "Accessibility"],
  },
  {
    id: "faq-3",
    category: "Network",
    question: "How do connection requests work?",
    answer:
      "When you invite someone, they receive a notification and can accept or ignore. You can add a note with your invite — personalized notes roughly double the acceptance rate. Pending invitations live under My Network → Invitations.",
    related: ["Withdraw an invitation", "Follow vs. connect"],
  },
  {
    id: "faq-4",
    category: "Network",
    question: "What's the difference between following and connecting?",
    answer:
      "Connections are mutual — both of you see each other's posts and can message. Following is one-way: you see someone's public posts in your feed without a mutual link. You can follow anyone; connections usually come from a real introduction.",
    related: ["Managing followers"],
  },
  {
    id: "faq-5",
    category: "Jobs",
    question: "What does “Easy Apply” mean?",
    answer:
      "Easy Apply submits your profile details to the employer with one click — no external site. Applications you send are tracked under My Items. Regular applications open the company's own hiring page.",
    related: ["Saved jobs", "Application status"],
  },
  {
    id: "faq-6",
    category: "Jobs",
    question: "How are job recommendations ranked?",
    answer:
      "They blend your profile skills, past roles, and activity with the job's requirements and workplace type. The “% match” chip shows how closely a posting aligns with your profile right now.",
    related: ["Job alerts", "Open to work"],
  },
  {
    id: "faq-7",
    category: "Privacy & Safety",
    question: "Who can see my profile activity?",
    answer:
      "Under Settings → Visibility you control whether your network sees when you're active, who can view your connections, and whether profile edits are broadcast. Every toggle in this concept mirrors the real setting names.",
    related: ["Public profile", "Blocking"],
  },
  {
    id: "faq-8",
    category: "Privacy & Safety",
    question: "How do I report a post or account?",
    answer:
      "Open the ••• menu on any post and choose “Report”. For profiles, use the ••• next to their name. Reports are reviewed in order of potential harm; you can also block the account from the same menu.",
    related: ["Blocking accounts", "Harassment policy"],
  },
  {
    id: "faq-9",
    category: "Account",
    question: "How do I close my account?",
    answer:
      "Settings → Account preferences → Close account. You'll choose a reason and can reactivate within 14 days by signing back in. (In this UI concept nothing is actually deleted.)",
    related: ["Download your data"],
  },
];
