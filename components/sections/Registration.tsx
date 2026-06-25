"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Sparkles } from "lucide-react";
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

  if (submitted && selectedEvent) {
    return <SuccessMessage event={selectedEvent} />;
  }

  return (
    <section id="register" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-[#B08D21] font-bold mb-4">
            <Sparkles size={20} />
            <span className="uppercase tracking-widest text-sm">
              Join Our Events
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1A1A1A]">
            Choose Your Path to{" "}
            <span className="text-[#B08D21]">Excellence</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our transformative events designed to help you excel
            academically, build a thriving career, and monetize your skills.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {UPCOMING_EVENTS.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <EventCard
                event={event}
                isSelected={selectedEvent?.id === event.id}
                onSelect={handleEventSelect}
              />
            </motion.div>
          ))}
        </div>

        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RegistrationForm
              event={selectedEvent}
              formData={formData}
              isLoading={isLoading}
              error={error}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancel={resetForm}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
