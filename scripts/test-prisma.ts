import { prisma } from "../lib/prisma";

async function testPrisma() {
  console.log("🔍 Testing Prisma with Supabase...\n");

  try {
    // Count events
    const eventCount = await prisma.event.count();
    console.log(`✅ Found ${eventCount} events in database`);

    // List events
    const events = await prisma.event.findMany();
    events.forEach((event) => {
      console.log(`   - ${event.title} (${event.status})`);
    });

    console.log("\n✅ Prisma connection successful!");

  } catch (error) {
    console.error("❌ Prisma error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrisma();