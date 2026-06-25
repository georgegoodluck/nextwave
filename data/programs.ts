export interface Program {
  title: string;
  desc: string;
  date: string;
  time: string;
  venue: string;
  status: "Upcoming" | "Past" | "Coming Soon";
  image?: string;
}

export const PROGRAMS: Program[] = [
  {
    title: "Scholar Reboot",
    desc: "Academic clarity and strategy for students aiming higher.",
    date: "18th October, 2025",
    time: "7:00 PM",
    venue: "Virtual Event",
    status: "Past",
    image: "/events/scholars_reboot.jpg",
  },
  {
    title: "Campus2LinkedIn",
    desc: "Professional networking and branding for global opportunities.",
    date: "21st December, 2025",
    time: "7:00 PM",
    venue: "Virtual Event",
    status: "Past",
    image: "/events/campus2linkedin.jpg",
  },
  {
    title: "Starting Tech with Limited Resources",
    desc: "Building, shipping, and learning what really matters in tech.",
    date: "25th March, 2026",
    time: "8:00 PM",
    venue: "Virtual Event",
    status: "Upcoming",
    image: "/events/breaking_into_tech.jpg",
  },
  {
    title: "Global Fellowship",
    desc: "Cross-border academic collaboration and cultural exchange.",
    date: "Coming Soon",
    time: "TBA",
    venue: "Virtual & Physical",
    status: "Coming Soon",
  },
];
