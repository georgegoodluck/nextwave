import { Resend } from "resend";

export interface ResendEmailData {
  email: string;
  fullName: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  phone?: string;
}

export class ResendEmailService {
  private resend: Resend;
  private fromEmail: string;

  constructor() {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set in environment variables");
    }
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "NextWave Global <noreply@nextwaveglobal.com>";
  }

  async sendConfirmationEmail(data: ResendEmailData): Promise<void> {
    const { email, fullName, eventTitle, eventDate, eventVenue } = data;

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: `Registration Confirmed: ${eventTitle} 🎉`,
        html: this.generateConfirmationHTML(data),
      });

      console.log(`✅ Confirmation email sent to ${email}`);
    } catch (error) {
      console.error("❌ Failed to send confirmation email:", error);
      throw error;
    }
  }

  async sendAdminNotification(data: ResendEmailData): Promise<void> {
    const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [
      "nextwaveglobal509@gmail.com",
    ];

    try {
      const promises = adminEmails.map((adminEmail) =>
        this.resend.emails.send({
          from: this.fromEmail,
          to: adminEmail.trim(),
          subject: `New Registration: ${data.fullName} - ${data.eventTitle}`,
          html: this.generateAdminHTML(data),
        }),
      );

      await Promise.all(promises);
      console.log(
        `✅ Admin notifications sent to ${adminEmails.length} recipients`,
      );
    } catch (error) {
      console.error("❌ Failed to send admin notifications:", error);
      throw error;
    }
  }

  private generateConfirmationHTML(data: ResendEmailData): string {
    const { fullName, eventTitle, eventDate, eventVenue } = data;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Registration Confirmed</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #1a1a1a;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .container {
              background: #ffffff;
              border-radius: 12px;
              padding: 40px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
              border-bottom: 3px solid #b08d21;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              color: #1a1a1a;
            }
            .logo span {
              color: #b08d21;
            }
            .subtitle {
              color: #6b7280;
              font-size: 14px;
              margin-top: 4px;
            }
            .success-icon {
              font-size: 48px;
              text-align: center;
              display: block;
              margin-bottom: 16px;
            }
            h2 {
              text-align: center;
              color: #1a1a1a;
              margin-top: 0;
            }
            .event-details {
              background: #f8f9fa;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              border-left: 4px solid #b08d21;
            }
            .event-details h3 {
              color: #b08d21;
              margin-top: 0;
              font-size: 16px;
            }
            .detail-row {
              display: flex;
              padding: 8px 0;
              border-bottom: 1px solid #e5e5e5;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: 600;
              color: #4b5563;
              min-width: 80px;
              font-size: 14px;
            }
            .value {
              color: #1a1a1a;
              font-size: 14px;
            }
            .highlight {
              color: #b08d21;
              font-weight: 600;
            }
            .info-box {
              background: #fef9e7;
              border-radius: 8px;
              padding: 16px;
              margin: 20px 0;
              border-left: 4px solid #b08d21;
            }
            .info-box p {
              margin: 0;
              font-size: 14px;
              color: #4b5563;
            }
            .button {
              display: inline-block;
              background: #b08d21;
              color: white !important;
              padding: 12px 24px;
              border-radius: 6px;
              text-decoration: none;
              font-weight: 600;
              margin: 20px 0;
              text-align: center;
            }
            .button:hover {
              background: #9a7a1d;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e5e5;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
            }
            .footer a {
              color: #b08d21;
              text-decoration: none;
            }
            @media (max-width: 480px) {
              .container { padding: 20px; }
              .detail-row { flex-direction: column; padding: 6px 0; }
              .label { min-width: auto; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Nextwave <span>Global</span></div>
              <div class="subtitle">Learn. Earn. Lead.</div>
            </div>

            <span class="success-icon">🎉</span>
            <h2>Registration Confirmed!</h2>
            <p style="text-align: center; color: #4b5563;">
              Hi <strong>${fullName}</strong>, you're officially registered for
              <strong class="highlight">${eventTitle}</strong>.
            </p>

            <div class="event-details">
              <h3>📅 Event Details</h3>
              <div class="detail-row">
                <span class="label">Event</span>
                <span class="value"><strong>${eventTitle}</strong></span>
              </div>
              <div class="detail-row">
                <span class="label">Date</span>
                <span class="value">${eventDate}</span>
              </div>
              <div class="detail-row">
                <span class="label">Venue</span>
                <span class="value">${eventVenue}</span>
              </div>
              <div class="detail-row">
                <span class="label">Status</span>
                <span class="value">✅ Confirmed</span>
              </div>
            </div>

            <div class="info-box">
              <p>📌 <strong>What's next?</strong> We'll send you event reminders and access links closer to the date. Stay tuned!</p>
            </div>

            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}" class="button">
                Visit Our Website
              </a>
            </div>

            <p style="font-size: 14px; color: #4b5563;">
              Have questions? Reply to this email or reach out to us at
              <a href="mailto:nextwaveglobal509@gmail.com" style="color: #b08d21;">
                nextwaveglobal509@gmail.com
              </a>
            </p>

            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} NextWave Global. All rights reserved.</p>
              <p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/privacy">Privacy Policy</a>
                &nbsp;•&nbsp;
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/terms">Terms of Service</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private generateAdminHTML(data: ResendEmailData): string {
    const { fullName, email, eventTitle, eventDate, eventVenue, phone } = data;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Registration Alert</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #1a1a1a;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .container {
              background: #ffffff;
              border-radius: 12px;
              padding: 40px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
              border-bottom: 3px solid #b08d21;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              color: #1a1a1a;
            }
            .logo span {
              color: #b08d21;
            }
            .badge {
              display: inline-block;
              background: #10b981;
              color: white;
              padding: 4px 16px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              margin: 10px 0;
            }
            .event-details {
              background: #f8f9fa;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              border-left: 4px solid #10b981;
            }
            .event-details h3 {
              color: #10b981;
              margin-top: 0;
              font-size: 16px;
            }
            .detail-row {
              display: flex;
              padding: 8px 0;
              border-bottom: 1px solid #e5e5e5;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: 600;
              color: #4b5563;
              min-width: 80px;
              font-size: 14px;
            }
            .value {
              color: #1a1a1a;
              font-size: 14px;
            }
            .action-box {
              background: #fef9e7;
              border-radius: 8px;
              padding: 16px;
              margin: 20px 0;
              border-left: 4px solid #b08d21;
            }
            .action-box p {
              margin: 0;
              font-size: 14px;
              color: #4b5563;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e5e5;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
            }
            .footer a {
              color: #b08d21;
              text-decoration: none;
            }
            @media (max-width: 480px) {
              .container { padding: 20px; }
              .detail-row { flex-direction: column; padding: 6px 0; }
              .label { min-width: auto; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Nextwave <span>Global</span></div>
              <div class="subtitle">Admin Notification</div>
            </div>

            <div style="text-align: center;">
              <span class="badge">🆕 NEW REGISTRATION</span>
            </div>

            <h3 style="color: #1a1a1a;">A new participant has registered!</h3>

            <div class="event-details">
              <h3>👤 Participant Details</h3>
              <div class="detail-row">
                <span class="label">Name</span>
                <span class="value"><strong>${fullName}</strong></span>
              </div>
              <div class="detail-row">
                <span class="label">Email</span>
                <span class="value">${email}</span>
              </div>
              ${
                phone
                  ? `
              <div class="detail-row">
                <span class="label">Phone</span>
                <span class="value">${phone}</span>
              </div>
              `
                  : ""
              }
              <div class="detail-row">
                <span class="label">Event</span>
                <span class="value"><strong>${eventTitle}</strong></span>
              </div>
              <div class="detail-row">
                <span class="label">Date</span>
                <span class="value">${eventDate}</span>
              </div>
              <div class="detail-row">
                <span class="label">Venue</span>
                <span class="value">${eventVenue}</span>
              </div>
            </div>

            <div class="action-box">
              <p>📌 <strong>Action Required:</strong> Please review this registration in the admin dashboard.</p>
            </div>

            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/admin" class="button" style="display: inline-block; background: #b08d21; color: white !important; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 10px 0;">
                View Dashboard →
              </a>
            </div>

            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} NextWave Global - Admin Notification</p>
              <p style="font-size: 10px; color: #9ca3af;">
                This is an automated notification. Please do not reply to this email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}

// Singleton instance
let emailServiceInstance: ResendEmailService | null = null;

export function getEmailService(): ResendEmailService {
  if (!emailServiceInstance) {
    emailServiceInstance = new ResendEmailService();
  }
  return emailServiceInstance;
}
