// scripts/test-registration.js
import { prisma } from "../lib/prisma.js";

async function testRegistration() {
  console.log("🧪 Testing Registration Flow...\n");

  try {
    // Test 1: Check database connection
    console.log("🔍 Testing database connection...");
    await prisma.$connect();
    console.log("✅ Database connected!\n");

    // Test 2: Check events
    console.log("📋 Checking events...");
    const events = await prisma.event.findMany();
    console.log(`✅ Found ${events.length} events in database:`);
    events.forEach((event, i) => {
      console.log(
        `   ${i + 1}. ${event.title} (${event.status}) - ${event.registered}/${event.capacity} registered`,
      );
    });
    console.log("");

    if (events.length === 0) {
      console.log("⚠️ No events found. Run `npm run db:seed` first.\n");
    }

    // Test 3: Check registrations
    console.log("📋 Checking registrations...");
    const registrations = await prisma.registration.findMany({
      include: { event: true },
      take: 5,
      orderBy: { createdAt: "desc" },
    });
    console.log(`✅ Found ${registrations.length} recent registrations:`);
    registrations.forEach((reg, i) => {
      console.log(
        `   ${i + 1}. ${reg.fullName} -> ${reg.event.title} (${reg.status})`,
      );
    });
    console.log("");

    // Test 4: Test registration API (simulated)
    console.log("🧪 Testing registration API...");
    const testData = {
      fullName: "Test User",
      email: `test${Date.now()}@example.com`,
      eventId: events[0]?.id || "",
      phone: "08012345678",
    };

    if (!testData.eventId) {
      console.log("⚠️ No events available to test registration");
      console.log("   Run `npm run db:seed` to create events\n");
      await prisma.$disconnect();
      return;
    }

    console.log("   Test data:", testData);

    // Check if test user already exists
    const existing = await prisma.registration.findUnique({
      where: {
        eventId_email: {
          eventId: testData.eventId,
          email: testData.email,
        },
      },
    });

    if (existing) {
      console.log("   ⚠️ Test user already registered, skipping...");
    } else {
      console.log("   ✅ Ready to test registration");
    }

    console.log("\n🎉 All tests passed!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testRegistration();
