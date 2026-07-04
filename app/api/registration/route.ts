import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  console.log("🚀 Registration API called");
  
  try {
    const body = await request.json();
    console.log("📦 Request body:", body);
    
    const { fullName, email, phone, eventId } = body;

    // Validate required fields
    if (!fullName || !email || !eventId) {
      console.log("❌ Missing required fields:", { fullName, email, eventId });
      return NextResponse.json(
        { error: "Full name, email, and event ID are required" },
        { status: 400 },
      );
    }

    console.log("🔍 Checking if event exists...");
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      console.log("❌ Event not found:", eventId);
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    console.log("✅ Event found:", event.title);

    // Check capacity
    if (event.registered >= event.capacity) {
      console.log("❌ Event full:", event.registered, "/", event.capacity);
      return NextResponse.json(
        { error: "Event is fully booked" },
        { status: 400 }
      );
    }

    // Check existing registration
    console.log("🔍 Checking for existing registration...");
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        eventId_email: {
          eventId: eventId,
          email: email,
        },
      },
    });

    if (existingRegistration) {
      console.log("❌ Already registered:", email);
      return NextResponse.json(
        { error: "You are already registered for this event" },
        { status: 400 }
      );
    }

    // Create registration
    console.log("📝 Creating registration...");
    const [registration] = await prisma.$transaction([
      prisma.registration.create({
        data: {
          fullName,
          email,
          phone: phone || null,
          eventId,
          status: "confirmed",
        },
      }),
      prisma.event.update({
        where: { id: eventId },
        data: {
          registered: { increment: 1 },
        },
      }),
    ]);

    console.log("✅ Registration successful:", registration.id);

    // Return success response
    return NextResponse.json({
      success: true,
      registration,
      message: "Registration successful!",
    });
    
  } catch (error) {
    console.error("❌ Registration error:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Failed to process registration",
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}