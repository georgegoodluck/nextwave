import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const eventId = searchParams.get("eventId");

    const where: any = {};
    if (status) where.status = status;
    if (eventId) where.eventId = eventId;

    const registrations = await prisma.registration.findMany({
      where,
      include: {
        event: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ registrations: registrations || [] });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { registrations: [], error: "Failed to fetch registrations" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Registration ID required" },
        { status: 400 },
      );
    }

    const registration = await prisma.registration.findUnique({
      where: { id },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 },
      );
    }

    await prisma.$transaction([
      prisma.registration.delete({
        where: { id },
      }),
      prisma.event.update({
        where: { id: registration.eventId },
        data: {
          registered: { decrement: 1 },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting registration:", error);
    return NextResponse.json(
      { error: "Failed to delete registration" },
      { status: 500 },
    );
  }
}
