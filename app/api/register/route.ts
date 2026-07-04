import { NextRequest, NextResponse } from "next/server";
import { registrationService } from "@/lib/registration";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      event: eventTitle,
      event_date: eventDate,
      event_venue: eventVenue,
      event_id: eventId,
    } = body;

    // Validate required fields
    if (!name || !email || !eventTitle || !eventDate || !eventVenue) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Create registration
    const result = await registrationService.createRegistration({
      fullName: name,
      email,
      phone: phone || "",
      eventId: eventId || "unknown",
      eventTitle,
      eventDate,
      eventVenue,
    });

    return NextResponse.json({
      success: true,
      message: "Registration successful!",
      registration: result.registration,
    });
  } catch (error) {
    console.error("Registration API error:", error);

    return NextResponse.json(
      {
        error: "Failed to process registration. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const eventId = searchParams.get("eventId");
    const status = searchParams.get("status");
    const email = searchParams.get("email");

    // You might want to add authentication here
    // For now, we'll return data
    const registrations = await registrationService.getRegistrations({
      eventId: eventId || undefined,
      status: status || undefined,
      email: email || undefined,
    });

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error("GET registrations error:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 },
    );
  }
}
