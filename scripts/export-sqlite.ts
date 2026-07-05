import { PrismaClient } from "@prisma/client";
import fs from "fs";

// Use SQLite client
const sqlitePrisma = new PrismaClient({
  // @ts-ignore - Use the SQLite client
  clientEngineType: "dataproxy",
});

// Override the datasource URL to use SQLite
// @ts-ignore
sqlitePrisma._engineConfig = {
  ...sqlitePrisma._engineConfig,
  datasources: {
    db: {
      url: "file:./prisma/dev.db"
    }
  }
};

async function exportRegistrations() {
  console.log("📤 Exporting registrations from SQLite...");
  
  try {
    // Since we can't easily switch, let's use a different approach
    // Direct database query using better-sqlite3
    console.log("⚠️ Using direct SQLite query method...");
    
    // Alternative: Use the SQLite database directly
    const Database = require('better-sqlite3');
    const db = new Database('./prisma/dev.db');
    
    // Query registrations with event data
    const registrations = db.prepare(`
      SELECT 
        r.id,
        r.eventId,
        r.fullName,
        r.email,
        r.phone,
        r.status,
        r.createdAt,
        r.updatedAt,
        e.id as event_id,
        e.title as event_title,
        e.description as event_description,
        e.category as event_category,
        e.date as event_date,
        e.time as event_time,
        e.venue as event_venue,
        e.capacity as event_capacity,
        e.registered as event_registered,
        e.price as event_price,
        e.speakers as event_speakers,
        e.status as event_status,
        e.image as event_image
      FROM Registration r
      LEFT JOIN Event e ON r.eventId = e.id
      ORDER BY r.createdAt DESC
    `).all();
    
    console.log(`✅ Found ${registrations.length} registrations`);
    
    // Format the data
    const formattedData = registrations.map((r: any) => ({
      id: r.id,
      eventId: r.eventId,
      fullName: r.fullName,
      email: r.email,
      phone: r.phone,
      status: r.status,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      event: {
        id: r.event_id,
        title: r.event_title,
        description: r.event_description,
        category: r.event_category,
        date: r.event_date,
        time: r.event_time,
        venue: r.event_venue,
        capacity: r.event_capacity,
        registered: r.event_registered,
        price: r.event_price,
        speakers: r.event_speakers,
        status: r.event_status,
        image: r.event_image
      }
    }));
    
    // Save to file
    fs.writeFileSync(
      "registrations-backup.json",
      JSON.stringify(formattedData, null, 2)
    );
    
    console.log("📁 Saved to registrations-backup.json");
    
    db.close();
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

exportRegistrations();