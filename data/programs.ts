export interface Program {
  title: string;
  desc: string;
  date: string;
  time: string;
  venue: string;
  status: "Upcoming" | "Past" | "Coming Soon";
}

export const PROGRAMS: Program[] = [
  {
    title: "Scholar Reboot",
    desc: "Academic clarity and strategy.",
    date: "18th October, 2025",
    time: "7pm",
    venue: "Virtual Event",
    status: "Past",
  },
  {
    title: "Campus2LinkedIn",
    desc: "Professional networking and branding.",
    date: "21st December, 2025",
    time: "7pm",
    venue: "Virtual Event",
    status: "Past",
  },
  {
    title: "Starting Tech with limited resources",
    desc: "Building, shipping, and learning.",
    date: "25th March, 2026",
    time: "8pm",
    venue: "Virtual Event",
    status: "Upcoming",
  },
  {
    title: "Global Fellowship",
    desc: "Cross-border academic collaboration.",
    date: "Coming Soon",
    time: "TBA",
    venue: "Virtual & Physical",
    status: "Coming Soon",
  },
];
