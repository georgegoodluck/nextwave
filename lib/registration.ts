import { PrismaClient } from "@prisma/client";
import { emailService, RegistrationEmailData } from "./email";

const prisma = new PrismaClient();

export interface RegistrationData {
  fullName: string;
  email: string;
  phone?: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
}

export class RegistrationService {
  async createRegistration(data: RegistrationData) {
    try {
      // Save to database
      const registration = await prisma.registration.create({
        data: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone || null,
          eventId: data.eventId,
          eventTitle: data.eventTitle,
          eventDate: data.eventDate,
          eventVenue: data.eventVenue,
          status: "PENDING",
        },
      });

      // Send confirmation email to participant
      await this.sendConfirmationEmail(data);

      // Send notification email to admin
      await this.sendAdminNotification(data);

      return { success: true, registration };
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  private async sendConfirmationEmail(data: RegistrationEmailData) {
    const html = emailService.generateRegistrationConfirmation(data);

    await emailService.sendEmail({
      to: data.email,
      subject: `Registration Confirmed: ${data.eventTitle} 🎉`,
      html,
    });
  }

  private async sendAdminNotification(data: RegistrationEmailData) {
    const html = emailService.generateAdminNotification(data);

    // Send to multiple admin emails
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
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getRegistrationById(id: string) {
    return await prisma.registration.findUnique({
      where: { id },
    });
  }

  async updateRegistrationStatus(
    id: string,
    status: "PENDING" | "CONFIRMED" | "ATTENDED" | "CANCELLED",
  ) {
    return await prisma.registration.update({
      where: { id },
      data: { status },
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

export const registrationService = new RegistrationService();
