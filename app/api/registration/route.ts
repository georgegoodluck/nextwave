import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

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
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    console.log("✅ Event found:", event.title);

    // Check capacity
    if (event.registered >= event.capacity) {
      console.log("❌ Event full:", event.registered, "/", event.capacity);
      return NextResponse.json(
        { error: "Event is fully booked" },
        { status: 400 },
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
        { status: 400 },
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

    // Send emails using Resend
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Use a proper from email - Resend requires a verified domain or onboarding@resend.dev
      const fromEmail =
        process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

      console.log(
        `📧 Sending confirmation email to ${email} from ${fromEmail}`,
      );

      // Send attendee confirmation email
      const attendeeResult = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `🎉 Registration Confirmed: ${event.title}`,
        html: generateAttendeeEmail(
          fullName,
          event.title,
          event.date,
          event.venue,
        ),
      });

      console.log("✅ Attendee email sent:", attendeeResult.data?.id);

      // Send admin notification
      const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [
        "nextwaveglobal509@gmail.com",
      ];

      for (const adminEmail of adminEmails) {
        const adminResult = await resend.emails.send({
          from: fromEmail,
          to: adminEmail.trim(),
          subject: `📋 New Registration: ${fullName} - ${event.title}`,
          html: generateAdminEmail(
            fullName,
            email,
            phone || "Not provided",
            event.title,
            event.date,
            event.venue,
          ),
        });
        console.log(
          `✅ Admin email sent to ${adminEmail}:`,
          adminResult.data?.id,
        );
      }
    } catch (emailError) {
      console.error(
        "⚠️ Email sending failed but registration saved:",
        emailError,
      );
      // Don't fail the registration if email fails
    }

    return NextResponse.json({
      success: true,
      registration,
      message: "Registration successful! Check your email for confirmation.",
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process registration",
      },
      { status: 500 },
    );
  }
}

// Email templates
function generateAttendeeEmail(
  name: string,
  eventTitle: string,
  eventDate: string,
  eventVenue: string,
) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Confirmed</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
          .container { background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { text-align: center; border-bottom: 3px solid #b08d21; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 28px; font-weight: bold; color: #1a1a1a; }
          .logo span { color: #b08d21; }
          .event-details { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #b08d21; }
          .button { display: inline-block; background: #b08d21; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Nextwave <span>Global</span></div>
          </div>
          
          <h2 style="text-align: center;">🎉 Registration Confirmed!</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>You're officially registered for:</p>
          
          <div class="event-details">
            <h3 style="color: #b08d21; margin-top: 0;">📅 ${eventTitle}</h3>
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>Venue:</strong> ${eventVenue}</p>
          </div>
          
          <p>We'll send you more details and access links closer to the date.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://nextwaveglobal.vercel.app/"}" class="button">Visit Website</a>
          </div>
          
          <p>Have questions? Reply to this email or reach out at nextwaveglobal509@gmail.com</p>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} NextWave Global. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateAdminEmail(
  name: string,
  email: string,
  phone: string,
  eventTitle: string,
  eventDate: string,
  eventVenue: string,
) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Registration</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
          .container { background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .badge { display: inline-block; background: #10b981; color: white; padding: 4px 16px; border-radius: 20px; font-size: 12px; }
          .details { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>🆕 New Registration</h2>
          <div class="badge">New Registration</div>
          
          <div class="details">
            <h3>👤 Participant Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Event:</strong> ${eventTitle}</p>
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>Venue:</strong> ${eventVenue}</p>
          </div>
          
          <p style="text-align: center; margin-top: 20px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://nextwaveglobal.vercel.app/"}/admin" style="display: inline-block; background: #b08d21; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
              View Dashboard →
            </a>
          </p>
        </div>
      </body>
    </html>
  `;
}
