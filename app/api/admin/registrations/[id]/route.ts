import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getEmailService } from "@/lib/resend";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 },
      );
    }

    const validStatuses = ["confirmed", "cancelled", "waitlisted"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const registration = await prisma.registration.update({
      where: { id },
      data: { status },
      include: {
        event: true,
      },
    });

    // Send status update email if needed (using Resend)
    if (status === "confirmed" || status === "cancelled") {
      try {
        const emailService = getEmailService();

        const emailData = {
          email: registration.email,
          fullName: registration.fullName,
          eventTitle: registration.event.title,
          eventDate: registration.event.date,
          eventVenue: registration.event.venue,
        };

        await emailService.sendConfirmationEmail(emailData);
        console.log(`📧 Status update email sent for ${registration.email}`);
      } catch (emailError) {
        console.error("⚠️ Email sending failed:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      registration,
      message: "Status updated successfully",
    });
  } catch (error) {
    console.error("Error updating registration status:", error);
    return NextResponse.json(
      { error: "Failed to update registration status" },
      { status: 500 },
    );
  }
}
