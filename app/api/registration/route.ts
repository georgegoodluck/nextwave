import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, eventId } = body;

    // Validate required fields
    if (!fullName || !email || !eventId) {
      return NextResponse.json(
        { error: "Full name, email, and event ID are required" },
        { status: 400 },
      );
    }

    // Check if event exists and has capacity
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (event.registered >= event.capacity) {
      return NextResponse.json(
        { error: "Event is fully booked" },
        { status: 400 },
      );
    }

    // Check if already registered
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        eventId_email: {
          eventId: eventId,
          email: email,
        },
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: "You are already registered for this event" },
        { status: 400 },
      );
    }

    // Create registration and update event count in a transaction
    const [registration] = await prisma.$transaction([
      prisma.registration.create({
        data: {
          fullName,
          email,
          phone: phone || null,
          eventId,
        },
      }),
      prisma.event.update({
        where: { id: eventId },
        data: {
          registered: { increment: 1 },
        },
      }),
    ]);

    // Send confirmation email (don't await to avoid blocking)
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/registrations/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: body.email,
        fullName: body.fullName,
        eventTitle: event.title,
        eventDate: event.date,
        eventVenue: event.venue,
      }),
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      registration,
      message: "Registration successful!",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    const where = eventId ? { eventId } : {};

    const registrations = await prisma.registration.findMany({
      where,
      include: {
        event: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 },
    );
  }
}
