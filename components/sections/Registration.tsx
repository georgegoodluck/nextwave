"use client";

import React, { useState, useEffect } from "react";
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
  CheckCircle,
} from "lucide-react";
import { UPCOMING_EVENTS } from "@/data/events";
import { useRegistration } from "@/hooks/useRegistration";
import { EventCard } from "@/components/EventCard";
import { RegistrationForm } from "@/components/RegistrationForm";
import { SuccessMessage } from "@/components/SuccessMessage";

interface RegistrationProps {
  autoSelectEventId?: string | null;
}

export default function Registration({ autoSelectEventId }: RegistrationProps) {
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-select event from popup
  useEffect(() => {
    if (autoSelectEventId) {
      const event = UPCOMING_EVENTS.find((e) => e.id === autoSelectEventId);
      if (event && event.status?.toLowerCase() !== "past") {
        handleEventSelect(event);
        // Auto expand on mobile
        if (isMobile) {
          setExpandedEvent(event.id);
        }
      }
    }
  }, [autoSelectEventId, handleEventSelect, isMobile]);

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
    <section id="register" className="py-12 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-[#B08D21] font-bold mb-3 md:mb-4">
            <Sparkles size={16} className="md:w-5 md:h-5" />
            <span className="uppercase tracking-widest text-[10px] md:text-sm">
              Join Our Events
            </span>
          </div>
          <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 text-[#1A1A1A]">
            Choose Your Path to{" "}
            <span className="text-[#B08D21]">Excellence</span>
          </h2>
          <p className="text-xs md:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Join our transformative events designed to help you excel
            academically, build a thriving career, and monetize your skills.
          </p>
        </motion.div>

        {/* Stats Bar - Mobile Optimized */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-12">
          <div className="bg-gray-50 rounded-xl p-2.5 md:p-4 text-center border border-gray-100">
            <div className="text-[#B08D21] font-bold text-base md:text-2xl">
              {activeEvents.length}
            </div>
            <div className="text-[10px] md:text-sm text-gray-600 font-medium">
              Total
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 md:p-4 text-center border border-gray-100">
            <div className="text-[#B08D21] font-bold text-base md:text-2xl">
              {upcomingCount}
            </div>
            <div className="text-[10px] md:text-sm text-gray-600 font-medium">
              Upcoming
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 md:p-4 text-center border border-gray-100">
            <div className="text-[#B08D21] font-bold text-base md:text-2xl">
              FREE
            </div>
            <div className="text-[10px] md:text-sm text-gray-600 font-medium">
              All Free
            </div>
          </div>
          <div className="hidden md:block bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
            <div className="text-[#B08D21] font-bold text-2xl">🎓</div>
            <div className="text-sm text-gray-600 font-medium">
              Certificates
            </div>
          </div>
        </div>

        {/* Events Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-16">
          {activeEvents.map((event, index) => {
            const isUpcoming = event.status?.toLowerCase() === "upcoming";

            return (
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
                      className={`bg-white rounded-2xl border-2 p-3 transition-all ${
                        selectedEvent?.id === event.id
                          ? "border-[#B08D21] shadow-lg shadow-[#B08D21]/10"
                          : isUpcoming
                            ? "border-[#B08D21]/30 hover:border-[#B08D21]/50"
                            : "border-gray-200 hover:border-[#B08D21]/50"
                      } ${isUpcoming ? "bg-linear-to-r from-[#B08D21]/5 to-transparent" : ""}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                isUpcoming
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {event.status}
                            </span>
                            <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                              {event.category}
                            </span>
                            {isUpcoming && (
                              <span className="text-[10px] font-bold text-[#B08D21] bg-[#B08D21]/10 px-2 py-0.5 rounded-full animate-pulse">
                                🔥
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-sm text-[#1A1A1A] leading-tight">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-gray-500">
                            <Calendar size={12} className="text-[#B08D21]" />
                            <span>{event.date}</span>
                          </div>
                        </div>
                        <div className="ml-2 shrink-0">
                          {expandedEvent === event.id ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
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
                        <div className="bg-gray-50 rounded-2xl p-3 mt-1.5 mx-1 border border-gray-200">
                          <p className="text-xs text-gray-600 mb-2 line-clamp-3">
                            {event.description}
                          </p>
                          <div className="space-y-1.5 text-xs">
                            <div className="flex items-center gap-1.5 text-gray-600">
                              <Clock
                                size={12}
                                className="text-[#B08D21] shrink-0"
                              />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-600">
                              <MapPin
                                size={12}
                                className="text-[#B08D21] shrink-0"
                              />
                              <span className="line-clamp-1">
                                {event.venue}
                              </span>
                            </div>
                            {event.speakers && event.speakers.length > 0 && (
                              <div className="flex items-start gap-1.5 text-gray-600">
                                <Users
                                  size={12}
                                  className="text-[#B08D21] mt-0.5 shrink-0"
                                />
                                <span className="text-[10px] line-clamp-2">
                                  {event.speakers.join(", ")}
                                </span>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => handleEventSelect(event)}
                            className={`w-full mt-2.5 py-2 rounded-xl font-semibold text-xs transition-colors ${
                              selectedEvent?.id === event.id
                                ? "bg-[#B08D21] text-white"
                                : isUpcoming
                                  ? "bg-[#B08D21] text-white hover:bg-[#9A7A1D]"
                                  : "bg-gray-200 text-gray-600 cursor-not-allowed"
                            }`}
                            disabled={!isUpcoming}
                          >
                            {selectedEvent?.id === event.id
                              ? "Selected ✓"
                              : isUpcoming
                                ? "Register Now"
                                : "Coming Soon"}
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
            );
          })}
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
              <div className="bg-gray-50 rounded-2xl md:rounded-3xl p-3 md:p-8 border border-gray-200 shadow-lg">
                {/* Mobile: Selected event banner */}
                <div className="md:hidden mb-3 p-3 bg-white rounded-xl border border-[#B08D21]/20 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                        Selected Event
                      </p>
                      <p className="font-bold text-[#B08D21] text-sm">
                        {selectedEvent.title}
                      </p>
                      <p className="text-[10px] text-gray-600">
                        {selectedEvent.date}
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-[#B08D21]" />
                  </div>
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

        {/* Call to Action - Mobile Optimized */}
        {!selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 md:mt-12"
          >
            <div className="bg-linear-to-r from-[#B08D21]/10 to-[#B08D21]/5 rounded-2xl p-4 md:p-8 border border-[#B08D21]/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#B08D21]" />
                <span className="font-bold text-sm md:text-base text-[#1A1A1A]">
                  Why Join?
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 mt-3 md:mt-4">
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 justify-center bg-white/50 rounded-xl px-3 py-2">
                  <Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#B08D21]" />
                  <span>Learn from experts</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 justify-center bg-white/50 rounded-xl px-3 py-2">
                  <Target className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#B08D21]" />
                  <span>Build skills</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 justify-center bg-white/50 rounded-xl px-3 py-2">
                  <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#B08D21]" />
                  <span>Network globally</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
