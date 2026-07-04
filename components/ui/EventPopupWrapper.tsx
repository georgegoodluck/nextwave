"use client";

import { EventPopup } from "./EventPopup";

interface EventPopupWrapperProps {
  onRegister: (eventId: string) => void;
}

export function EventPopupWrapper({ onRegister }: EventPopupWrapperProps) {
  return <EventPopup onRegister={onRegister} />;
}
