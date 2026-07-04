import { NextRequest, NextResponse } from "next/server";
import { registrationService } from "@/lib/registration";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const { status } = await request.json();

    if (!["PENDING", "CONFIRMED", "ATTENDED", "CANCELLED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const registration = await registrationService.updateRegistrationStatus(
      id,
      status,
    );

    return NextResponse.json({ success: true, registration });
  } catch (error) {
    console.error("Error updating registration:", error);
    return NextResponse.json(
      { error: "Failed to update registration" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    // Add delete logic if needed
    // await registrationService.deleteRegistration(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting registration:", error);
    return NextResponse.json(
      { error: "Failed to delete registration" },
      { status: 500 },
    );
  }
}
