import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const events = await prisma.event.count();
    const registrations = await prisma.registration.count();
    
    const recentRegs = await prisma.registration.findMany({
      take: 5,
      include: { event: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      database: "Supabase (PostgreSQL)",
      counts: { events, registrations },
      recentRegistrations: recentRegs.map(r => ({
        name: r.fullName,
        email: r.email,
        event: r.event.title,
        status: r.status,
        createdAt: r.createdAt
      }))
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}