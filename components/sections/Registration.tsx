"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { UPCOMING_EVENTS } from "@/data/events";
import { useRegistration } from "@/hooks/useRegistration";
import { EventCard } from "@/components/EventCard";
import { RegistrationForm } from "@/components/RegistrationForm";
import { SuccessMessage } from "@/components/SuccessMessage";

export default function Registration() {
  const {
    submitted,
    isLoading,
    error,
    selectedEvent,
    formData,
    handleEventSelect,
    handleChange,
    handleSubmit,
    resetForm,
  } = useRegistration();

  // Show success message after registration
  if (submitted && selectedEvent) {
    return <SuccessMessage event={selectedEvent} />;
  }

  return (
    <section id="register" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-(--nw-gold) font-bold mb-4">
            <Calendar size={20} />
            <span className="uppercase tracking-widest text-sm">
              Upcoming Events
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-(--nw-charcoal)">
            Choose Your Path to Excellence
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our transformative events designed to help you excel
            academically, build a thriving career, and monetize your skills.
          </p>
        </div>

        {/* Event Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {UPCOMING_EVENTS.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isSelected={selectedEvent?.id === event.id}
              onSelect={handleEventSelect}
            />
          ))}
        </div>

        {/* Registration Form */}
        {selectedEvent && (
          <RegistrationForm
            event={selectedEvent}
            formData={formData}
            isLoading={isLoading}
            error={error}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        )}
      </div>
    </section>
  );
}
