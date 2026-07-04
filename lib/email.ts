import nodemailer from "nodemailer";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface RegistrationEmailData {
  name: string;
  email: string;
  phone: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      throw new Error("SMTP configuration is missing");
    }

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      await this.transporter.sendMail({
        from:
          process.env.SMTP_FROM ||
          "NextWave Global <noreply@nextwaveglobal.com>",
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>/g, ""),
      });
    } catch (error) {
      console.error("Email sending error:", error);
      throw new Error("Failed to send email");
    }
  }

  generateRegistrationConfirmation(data: RegistrationEmailData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; }
            .container { background: #fdfbf7; border-radius: 12px; padding: 40px; border: 1px solid #e5e5e5; }
            .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #b08d21; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; color: #1a1a1a; }
            .logo span { color: #b08d21; }
            .subtitle { color: #6b7280; font-size: 14px; margin-top: 4px; }
            .event-details { background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .event-details h3 { color: #b08d21; margin-top: 0; font-size: 16px; }
            .detail-row { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid #e5e5e5; }
            .detail-row:last-child { border-bottom: none; }
            .label { font-weight: 600; color: #4b5563; min-width: 80px; font-size: 14px; }
            .value { color: #1a1a1a; font-size: 14px; }
            .success-icon { font-size: 48px; text-align: center; display: block; margin-bottom: 16px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center; color: #6b7280; font-size: 12px; }
            .button { display: inline-block; background: #b08d21; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 20px 0; }
            .highlight { color: #b08d21; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Nextwave <span>Global</span></div>
              <div class="subtitle">Learn. Earn. Lead.</div>
            </div>

            <span class="success-icon">🎉</span>
            <h2 style="text-align: center; color: #1a1a1a;">Registration Confirmed!</h2>
            <p style="text-align: center; color: #4b5563;">
              Hi <strong>${data.name}</strong>, you're officially registered for
              <strong class="highlight">${data.eventTitle}</strong>.
            </p>

            <div class="event-details">
              <h3>📅 Event Details</h3>
              <div class="detail-row">
                <span class="label">Event</span>
                <span class="value">${data.eventTitle}</span>
              </div>
              <div class="detail-row">
                <span class="label">Date</span>
                <span class="value">${data.eventDate}</span>
              </div>
              <div class="detail-row">
                <span class="label">Venue</span>
                <span class="value">${data.eventVenue}</span>
              </div>
              <div class="detail-row">
                <span class="label">Registration</span>
                <span class="value">✓ Confirmed</span>
              </div>
            </div>

            <div style="background: #fef9e7; border-radius: 8px; padding: 16px; margin: 20px 0; border-left: 4px solid #b08d21;">
              <p style="margin: 0; font-size: 14px; color: #4b5563;">
                📌 <strong>What's next?</strong> We'll send you the event link and
                reminders closer to the date. Stay tuned!
              </p>
            </div>

            <div style="text-align: center; margin: 24px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}" class="button">
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
                <a href="#" style="color: #6b7280; text-decoration: none;">Privacy Policy</a>
                &nbsp;•&nbsp;
                <a href="#" style="color: #6b7280; text-decoration: none;">Terms of Service</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  generateAdminNotification(data: RegistrationEmailData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; }
            .container { background: #fdfbf7; border-radius: 12px; padding: 40px; border: 1px solid #e5e5e5; }
            .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #b08d21; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; color: #1a1a1a; }
            .logo span { color: #b08d21; }
            .event-details { background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .detail-row { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid #e5e5e5; }
            .detail-row:last-child { border-bottom: none; }
            .label { font-weight: 600; color: #4b5563; min-width: 80px; font-size: 14px; }
            .value { color: #1a1a1a; font-size: 14px; }
            .badge { display: inline-block; background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Nextwave <span>Global</span></div>
              <div class="subtitle">New Registration Alert</div>
            </div>

            <div style="text-align: center; margin-bottom: 20px;">
              <span class="badge">NEW REGISTRATION</span>
            </div>

            <h3 style="color: #1a1a1a;">A new participant has registered!</h3>

            <div class="event-details">
              <h3>👤 Participant Details</h3>
              <div class="detail-row">
                <span class="label">Name</span>
                <span class="value"><strong>${data.name}</strong></span>
              </div>
              <div class="detail-row">
                <span class="label">Email</span>
                <span class="value">${data.email}</span>
              </div>
              <div class="detail-row">
                <span class="label">Phone</span>
                <span class="value">${data.phone || "Not provided"}</span>
              </div>
              <div class="detail-row">
                <span class="label">Event</span>
                <span class="value"><strong>${data.eventTitle}</strong></span>
              </div>
              <div class="detail-row">
                <span class="label">Date</span>
                <span class="value">${data.eventDate}</span>
              </div>
              <div class="detail-row">
                <span class="label">Venue</span>
                <span class="value">${data.eventVenue}</span>
              </div>
            </div>

            <div style="background: #fef9e7; border-radius: 8px; padding: 16px; margin: 20px 0; border-left: 4px solid #b08d21;">
              <p style="margin: 0; font-size: 14px; color: #4b5563;">
                📌 <strong>Action Required:</strong> Please review this registration and
                mark the participant's status in the dashboard.
              </p>
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

export const emailService = new EmailService();
