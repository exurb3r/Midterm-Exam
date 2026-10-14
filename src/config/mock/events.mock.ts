export interface MockEvent {
  id: string;
  title: string;
  organizer: string;
  initials: string;
  dateLabel: string;
  timeLabel: string;
  mode: "Online" | "In person";
  location: string;
  attendees: number;
  attendedByConnections?: string;
  status: "upcoming" | "past";
}

export const EVENTS: MockEvent[] = [
  {
    id: "evt-1",
    title: "Career Nexus Community Meetup — Manila",
    organizer: "Career Nexus Community",
    initials: "CN",
    dateLabel: "Wed, Oct 14, 2026",
    timeLabel: "6:00 PM – 9:00 PM PHT",
    mode: "In person",
    location: "BGC, Taguig",
    attendees: 148,
    attendedByConnections: "Priya Sharma and 5 other connections are going",
    status: "upcoming",
  },
  {
    id: "evt-2",
    title: "Design Systems Roundtable: Tokens at Scale",
    organizer: "Design Systems Collective",
    initials: "DS",
    dateLabel: "Thu, Oct 22, 2026",
    timeLabel: "8:00 PM – 9:30 PM PHT",
    mode: "Online",
    location: "Virtual event",
    attendees: 892,
    attendedByConnections: "Sofia Reyes is going",
    status: "upcoming",
  },
  {
    id: "evt-3",
    title: "Hiring Smart in 2027: What Interviewers Actually Look For",
    organizer: "Tech Leaders Guild",
    initials: "TL",
    dateLabel: "Tue, Nov 3, 2026",
    timeLabel: "10:00 AM – 11:00 AM PHT",
    mode: "Online",
    location: "Virtual event",
    attendees: 1204,
    status: "upcoming",
  },
  {
    id: "evt-4",
    title: "Frontend Performance Clinic",
    organizer: "React Developers Philippines",
    initials: "RD",
    dateLabel: "Sat, Sep 19, 2026",
    timeLabel: "1:00 PM – 4:00 PM PHT",
    mode: "In person",
    location: "Makati City",
    attendees: 96,
    status: "past",
  },
  {
    id: "evt-5",
    title: "From IC to Lead: Career Paths in Engineering",
    organizer: "Tech Leaders Guild",
    initials: "TL",
    dateLabel: "Wed, Aug 26, 2026",
    timeLabel: "7:00 PM – 8:30 PM PHT",
    mode: "Online",
    location: "Virtual event",
    attendees: 1530,
    status: "past",
  },
];

export const EVENT_MODE_FILTERS = ["All", "Online", "In person"] as const;
