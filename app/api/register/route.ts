import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, interest } = body;

    // Send confirmation email to user
    await resend.emails.send({
      from: 'NextWave Global <hello@nextwaveglobal.org>',
      to: email,
      subject: 'Welcome to Scholar Reboot! 🎓',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #b08d21;">Welcome to Scholar Reboot, ${fullName}!</h1>
          <p>Thank you for registering for the Scholar Reboot program.</p>
          <p>We're excited to help you excel in your university journey.</p>
          <p>You'll receive further details about the program schedule soon.</p>
          <hr />
          <p style="color: #666;">Best regards,<br/>NextWave Global Team</p>
        </div>
      `,
    });

    // Also notify admin
    await resend.emails.send({
      from: 'NextWave Global <hello@nextwaveglobal.org>',
      to: 'admin@nextwaveglobal.org',
      subject: 'New Registration!',
      html: `
        <p><strong>New registration received:</strong></p>
        <ul>
          <li>Name: ${fullName}</li>
          <li>Email: ${email}</li>
          <li>Interest: ${interest}</li>
        </ul>
      `,
    });

    return NextResponse.json(
      { message: "Registration successful! Check your email." },
      { status: 201 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}