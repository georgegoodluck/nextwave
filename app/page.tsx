"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Pillars from "@/components/sections/Pillars";
import Story from "@/components/sections/Story";
import Programs from "@/components/sections/Programs";
import Registration from "@/components/sections/Registration";
import Footer from "@/components/layout/Footer";
import { EventPopupWrapper } from "@/components/ui/EventPopupWrapper";

export default function Home() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleRegister = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Story />
      <Pillars />
      <Programs />
      <Registration autoSelectEventId={selectedEventId} />
      <Footer />

      {/* Event Popup */}
      <EventPopupWrapper onRegister={handleRegister} />
    </main>
  );
}