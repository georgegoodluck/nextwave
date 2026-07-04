import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.registration.deleteMany();
  await prisma.event.deleteMany();

  const events = [
    {
      id: "scholar-reboot",
      title: "Scholar Reboot",
      description:
        "A 2-day virtual event featuring real stories and practical strategies to reboot your academic journey.",
      category: "Learn",
      date: "October 18, 2025",
      time: "7:00 PM WAT",
      venue: "Virtual (WhatsApp Space)",
      capacity: 500,
      registered: 0,
      price: "Free",
      speakers: JSON.stringify([
        "Amoo Covenant",
        "Omotosho John",
        "Ogunsakin Tobiloba",
        "Adefuye Oreoluwa",
      ]),
      status: "Past",
      image: "/events/scholars_reboot.jpg",
    },
    {
      id: "campus2linkedin",
      title: "Campus2LinkedIn",
      description:
        "A one-day free virtual event to help students build strong profiles, connections, and career visibility.",
      category: "Learn",
      date: "December 21, 2025",
      time: "7:00 PM WAT",
      venue: "Virtual",
      capacity: 300,
      registered: 0,
      price: "Free",
      speakers: JSON.stringify(["Okewoye Unique", "Bliss Eniobayan"]),
      status: "Past",
      image: "/events/campus2linkedin.jpg",
    },
    {
      id: "breaking-into-tech",
      title: "Starting Tech with Limited Resources",
      description:
        "Learn what really matters in the beginning of your tech journey.",
      category: "Earn",
      date: "March 25, 2026",
      time: "8:00 PM WAT",
      venue: "Virtual (Telegram)",
      capacity: 300,
      registered: 0,
      price: "Free",
      speakers: JSON.stringify(["Temiloluwa Gboyega"]),
      status: "Past",
      image: "/events/breaking_into_tech.jpg",
    },
    {
      id: "leadership-in-action",
      title: "Leadership In Action",
      description:
        "Building Influence, Creating Impact & Driving Growth as a Student.",
      category: "Lead",
      date: "July 18, 2026",
      time: "7:00 PM - 9:00 PM WAT",
      venue: "Virtual (Google Meet)",
      capacity: 500,
      registered: 0,
      price: "Free",
      speakers: JSON.stringify(["Dr. Bush", "Senator"]),
      status: "Upcoming",
      image: "/events/leadership.jpg",
    },
  ];

  for (const event of events) {
    await prisma.event.create({
      data: event,
    });
    console.log(`✅ Created event: ${event.title}`);
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });