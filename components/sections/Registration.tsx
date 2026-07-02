"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Sparkles,
  Users,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Zap,
  Award,
  Target,
  ArrowRight,
} from "lucide-react";
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

  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  // Filter out past events - only show upcoming events for registration
  const activeEvents = UPCOMING_EVENTS.filter(
    (event) => event.status?.toLowerCase() !== "past",
  );

  // Get upcoming events count
  const upcomingCount = activeEvents.filter(
    (e) => e.status?.toLowerCase() === "upcoming",
  ).length;

  if (submitted && selectedEvent) {
    return <SuccessMessage event={selectedEvent} />;
  }

  return (
    <section id="register" className="py-16 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-[#B08D21] font-bold mb-4">
            <Sparkles size={18} className="md:w-5 md:h-5" />
            <span className="uppercase tracking-widest text-xs md:text-sm">
              Join Our Events
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-[#1A1A1A]">
            Choose Your Path to{" "}
            <span className="text-[#B08D21]">Excellence</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Join our transformative events designed to help you excel
            academically, build a thriving career, and monetize your skills.
          </p>
        </motion.div>

        {/* Stats Bar - Mobile Friendly */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
          <div className="bg-gray-50 rounded-xl p-3 md:p-4 text-center border border-gray-100">
            <div className="text-[#B08D21] font-bold text-lg md:text-2xl">
              {activeEvents.length}
            </div>
            <div className="text-xs md:text-sm text-gray-600 font-medium">
              Total Events
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 md:p-4 text-center border border-gray-100">
            <div className="text-[#B08D21] font-bold text-lg md:text-2xl">
              {upcomingCount}
            </div>
            <div className="text-xs md:text-sm text-gray-600 font-medium">
              Upcoming
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 md:p-4 text-center border border-gray-100 col-span-2 md:col-span-2">
            <div className="text-[#B08D21] font-bold text-lg md:text-2xl">
              FREE
            </div>
            <div className="text-xs md:text-sm text-gray-600 font-medium">
              All Events Free
            </div>
          </div>
        </div>

        {/* Events Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-16">
          {activeEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              {/* Mobile Expand/Collapse */}
              <div className="md:hidden">
                <button
                  onClick={() =>
                    setExpandedEvent(
                      expandedEvent === event.id ? null : event.id,
                    )
                  }
                  className="w-full text-left"
                >
                  <div
                    className={`bg-white rounded-2xl border-2 p-4 transition-all ${
                      selectedEvent?.id === event.id
                        ? "border-[#B08D21] shadow-lg shadow-[#B08D21]/10"
                        : "border-gray-200 hover:border-[#B08D21]/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase ${
                              event.status?.toLowerCase() === "upcoming"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {event.status}
                          </span>
                          <span className="text-xs font-medium text-gray-500">
                            {event.category}
                          </span>
                        </div>
                        <h3 className="font-bold text-base text-[#1A1A1A]">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <Calendar size={14} className="text-[#B08D21]" />
                          <span>{event.date}</span>
                        </div>
                      </div>
                      <div className="ml-2">
                        {expandedEvent === event.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedEvent === event.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-gray-50 rounded-2xl p-4 mt-2 mx-1 border border-gray-200">
                        <p className="text-sm text-gray-600 mb-3">
                          {event.description}
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={14} className="text-[#B08D21]" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin size={14} className="text-[#B08D21]" />
                            <span className="line-clamp-1">{event.venue}</span>
                          </div>
                          {event.speakers && event.speakers.length > 0 && (
                            <div className="flex items-start gap-2 text-gray-600">
                              <Users
                                size={14}
                                className="text-[#B08D21] mt-0.5"
                              />
                              <span className="text-xs">
                                {event.speakers.join(", ")}
                              </span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleEventSelect(event)}
                          className="w-full mt-3 py-2.5 bg-[#B08D21] text-white rounded-xl font-semibold text-sm hover:bg-[#9A7A1D] transition-colors"
                        >
                          {selectedEvent?.id === event.id
                            ? "Selected ✓"
                            : "Register Now"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop Event Card */}
              <div className="hidden md:block">
                <EventCard
                  event={event}
                  isSelected={selectedEvent?.id === event.id}
                  onSelect={handleEventSelect}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Registration Form - Mobile Optimized */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="bg-gray-50 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-gray-200 shadow-lg">
                {/* Mobile: Show selected event banner */}
                <div className="md:hidden mb-4 p-3 bg-white rounded-xl border border-gray-200">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Selected Event
                  </p>
                  <p className="font-bold text-[#B08D21]">
                    {selectedEvent.title}
                  </p>
                  <p className="text-xs text-gray-600">{selectedEvent.date}</p>
                </div>

                <RegistrationForm
                  event={selectedEvent}
                  formData={formData}
                  isLoading={isLoading}
                  error={error}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  onCancel={resetForm}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action - Mobile */}
        {!selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 md:mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-[#B08D21]/10 to-[#B08D21]/5 rounded-2xl p-6 md:p-8 border border-[#B08D21]/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-[#B08D21]" />
                <span className="font-bold text-[#1A1A1A]">Why Join?</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 justify-center">
                  <Award className="w-4 h-4 text-[#B08D21]" />
                  <span>Learn from experts</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 justify-center">
                  <Target className="w-4 h-4 text-[#B08D21]" />
                  <span>Build skills</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 justify-center">
                  <Users className="w-4 h-4 text-[#B08D21]" />
                  <span>Network</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
