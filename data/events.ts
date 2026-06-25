import { Event } from "@/types/events";

export const UPCOMING_EVENTS: Event[] = [
  {
    id: "scholar-reboot",
    title: "Scholar Reboot",
    description:
      "A 2-day virtual event featuring real stories and practical strategies to reboot your academic journey. Whether you're bouncing back from low grades or aiming higher, this is for you.",
    category: "Learn",
    date: "October 18, 2025",
    time: "7:00 PM WAT",
    venue: "Virtual (WhatsApp Space)",
    price: "Free",
    speakers: [
      "Amoo Covenant",
      "Omotosho John",
      "Ogunsakin Tobiloba",
      "Adefuye Oreoluwa",
    ],
    status: "Past",
    image: "/events/scholars_reboot.jpg",
  },
  {
    id: "campus2linkedin",
    title: "Campus2LinkedIn",
    description:
      "A one-day free virtual event to help students build strong profiles, connections, and career visibility. Leverage LinkedIn for global opportunities.",
    category: "Learn",
    date: "December 21, 2025",
    time: "7:00 PM WAT",
    venue: "Virtual",
    price: "Free",
    speakers: ["Okewoye Unique", "Bliss Eniobayan"],
    status: "Past",
    image: "/events/campus2linkedin.jpg",
  },
  {
    id: "breaking-into-tech",
    title: "Starting Tech with Limited Resources",
    description:
      "Learn what really matters in the beginning of your tech journey. Practical insights on building products, solving real problems, and navigating the early stages of a tech career.",
    category: "Earn",
    date: "March 25, 2026",
    time: "8:00 PM WAT",
    venue: "Virtual (Telegram)",
    price: "Free",
    speakers: ["Temiloluwa Gboyega"],
    status: "Past",
    image: "/events/breaking_into_tech.jpg",
  },
  {
    id: "academic-excellence-summit",
    title: "Academic Excellence Summit: Exam Warriors",
    description:
      "Master proven study techniques, time management hacks, and exam strategies used by first-class graduates and scholarship winners.",
    category: "Learn",
    date: "August 9, 2026",
    time: "10:00 AM - 3:00 PM WAT",
    venue: "To be announced",
    price: "Free",
    speakers: ["Prof. Funmi Adebayo", "Emeka Nwosu"],
    status: "Upcoming",
    image: "/events/leadership.jpg",
  },
];
