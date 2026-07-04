import { prisma } from "./prisma";
import { emailService, RegistrationEmailData } from "./email";

export interface RegistrationData {
  fullName: string;
  email: string;
  phone?: string;
  eventId: string;
}

export class RegistrationService {
  async createRegistration(data: RegistrationData) {
    try {
      // Get event details
      const event = await prisma.event.findUnique({
        where: { id: data.eventId },
      });

      if (!event) {
        throw new Error("Event not found");
      }

      // Create registration
      const registration = await prisma.registration.create({
        data: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone || null,
          eventId: data.eventId,
          status: "confirmed",
        },
      });

      // Update event count
      await prisma.event.update({
        where: { id: data.eventId },
        data: {
          registered: { increment: 1 },
        },
      });

      // Send emails (try/catch to not break registration)
      try {
        await this.sendConfirmationEmail({
          name: data.fullName,
          email: data.email,
          phone: data.phone || "",
          eventTitle: event.title,
          eventDate: event.date,
          eventVenue: event.venue,
        });

        await this.sendAdminNotification({
          name: data.fullName,
          email: data.email,
          phone: data.phone || "",
          eventTitle: event.title,
          eventDate: event.date,
          eventVenue: event.venue,
        });
      } catch (emailError) {
        console.error("Email failed but registration saved:", emailError);
      }

      return { success: true, registration };
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  async sendConfirmationEmail(data: RegistrationEmailData) {
    try {
      const html = emailService.generateRegistrationConfirmation(data);
      await emailService.sendEmail({
        to: data.email,
        subject: `Registration Confirmed: ${data.eventTitle} 🎉`,
        html,
      });
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
    }
  }

  async sendAdminNotification(data: RegistrationEmailData) {
    try {
      const html = emailService.generateAdminNotification(data);
      const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [
        "nextwaveglobal509@gmail.com",
      ];

      for (const adminEmail of adminEmails) {
        await emailService.sendEmail({
          to: adminEmail.trim(),
          subject: `New Registration: ${data.name} - ${data.eventTitle}`,
          html,
        });
      }
    } catch (error) {
      console.error("Failed to send admin notification:", error);
    }
  }

  async getRegistrations(filters?: {
    eventId?: string;
    status?: string;
    email?: string;
  }) {
    return await prisma.registration.findMany({
      where: {
        ...(filters?.eventId && { eventId: filters.eventId }),
        ...(filters?.status && { status: filters.status }),
        ...(filters?.email && { email: { contains: filters.email } }),
      },
      include: {
        event: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getRegistrationById(id: string) {
    return await prisma.registration.findUnique({
      where: { id },
      include: {
        event: true,
      },
    });
  }

  async updateRegistrationStatus(
    id: string,
    status: "PENDING" | "CONFIRMED" | "ATTENDED" | "CANCELLED"
  ) {
    return await prisma.registration.update({
      where: { id },
      data: { status },
      include: {
        event: true,
      },
    });
  }

  async getEventStats(eventId: string) {
    const registrations = await prisma.registration.findMany({
      where: { eventId },
    });

    return {
      total: registrations.length,
      pending: registrations.filter((r) => r.status === "PENDING").length,
      confirmed: registrations.filter((r) => r.status === "CONFIRMED").length,
      attended: registrations.filter((r) => r.status === "ATTENDED").length,
      cancelled: registrations.filter((r) => r.status === "CANCELLED").length,
    };
  }

  async getTotalStats() {
    const registrations = await prisma.registration.findMany();

    return {
      total: registrations.length,
      pending: registrations.filter((r) => r.status === "PENDING").length,
      confirmed: registrations.filter((r) => r.status === "CONFIRMED").length,
      attended: registrations.filter((r) => r.status === "ATTENDED").length,
      cancelled: registrations.filter((r) => r.status === "CANCELLED").length,
    };
  }
}

// Create and export instance
const registrationService = new RegistrationService();
export { registrationService };