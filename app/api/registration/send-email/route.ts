import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, fullName, eventTitle, eventDate, eventVenue } =
      await request.json();

    await resend.emails.send({
      from: "NextWave Global <noreply@nextwaveglobal.com>",
      to: email,
      subject: `Registration Confirmed: ${eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #b08d21;">Registration Confirmed! 🎉</h1>
          <p>Dear ${fullName},</p>
          <p>You're successfully registered for <strong>${eventTitle}</strong>.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Event Details:</h3>
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>Venue:</strong> ${eventVenue}</p>
          </div>
          
          <p>We look forward to having you!</p>
          <p>Best regards,<br/>NextWave Global Team</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
