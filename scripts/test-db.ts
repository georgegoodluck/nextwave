import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testDB() {
  console.log("🔍 Testing Supabase connection with Prisma...\n");

  try {
    // Test connection with a raw query
    const result = await prisma.$queryRaw`SELECT NOW() as time, version() as version`;
    console.log("✅ Connected to Supabase!");
    console.log(`   Time: ${result[0].time}`);
    console.log(`   Version: ${result[0].version}\n`);

    // Count events
    const eventCount = await prisma.event.count();
    console.log(`📊 Found ${eventCount} events in database`);

    // List events
    const events = await prisma.event.findMany();
    console.log("\n📋 Events:");
    events.forEach((event) => {
      console.log(`   - ${event.title} (${event.status}) - ${event.registered}/${event.capacity} registered`);
    });

    // Count registrations
    const registrationCount = await prisma.registration.count();
    console.log(`\n📋 Total registrations: ${registrationCount}`);

  } catch (error) {
    console.error("❌ Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testDB();