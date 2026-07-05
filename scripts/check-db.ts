import { prisma } from "../lib/prisma";

async function checkDB() {
  console.log("🔍 Checking which database Prisma is using...\n");
  
  try {
    // Check database type by trying to get connection info
    const result = await prisma.$queryRaw`SELECT 'PostgreSQL' as db_type, version() as version`;
    console.log("✅ Connected to:", result);
    console.log(`   Database Type: ${result[0].db_type}`);
    console.log(`   Version: ${result[0].version}`);
    
    // Count events
    const eventCount = await prisma.event.count();
    console.log(`\n📊 Events: ${eventCount}`);
    
    // Count registrations
    const regCount = await prisma.registration.count();
    console.log(`📊 Registrations: ${regCount}`);
    
    // Show recent registrations
    if (regCount > 0) {
      const registrations = await prisma.registration.findMany({
        take: 5,
        include: { event: true },
        orderBy: { createdAt: 'desc' }
      });
      console.log("\n📋 Recent Registrations:");
      registrations.forEach((reg) => {
        console.log(`   - ${reg.fullName} -> ${reg.event.title} (${reg.status})`);
      });
    }
    
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDB();