"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { UPCOMING_EVENTS } from "@/data/events";

interface EventPopupProps {
  onRegister: (eventId: string) => void;
}

export function EventPopup({ onRegister }: EventPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);

  // Get the next upcoming event
  const nextEvent = UPCOMING_EVENTS.find(
    (event) => event.status?.toLowerCase() === "upcoming",
  );

  useEffect(() => {
    // Check if user has seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("hasSeenEventPopup");

    if (!hasSeenPopup && nextEvent) {
      // Show popup after 1.5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [nextEvent]);

  const handleClose = () => {
    setIsOpen(false);
    setHasSeen(true);
    sessionStorage.setItem("hasSeenEventPopup", "true");
  };

  const handleRegister = () => {
    if (nextEvent) {
      onRegister(nextEvent.id);
      handleClose();
      // Scroll to registration section
      setTimeout(() => {
        const registerSection = document.getElementById("register");
        if (registerSection) {
          registerSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  if (!nextEvent) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-8 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 max-w-125 w-full mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
              aria-label="Close popup"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Image Section */}
            <div className="relative h-48 sm:h-56 w-full">
              {nextEvent.image ? (
                <Image
                  src={nextEvent.image}
                  alt={nextEvent.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-[#B08D21]/20 to-[#B08D21]/10 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-[#B08D21]" />
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-[#B08D21] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  Upcoming Event
                </span>
                <span className="bg-white/90 backdrop-blur-sm text-[#1A1A1A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  FREE
                </span>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-xl sm:text-2xl">
                  {nextEvent.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6">
              {/* Event Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-[#B08D21] shrink-0" />
                  <span>{nextEvent.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-[#B08D21] shrink-0" />
                  <span>{nextEvent.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-[#B08D21] shrink-0" />
                  <span>{nextEvent.venue}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {nextEvent.description}
              </p>

              {/* Speakers */}
              {nextEvent.speakers && nextEvent.speakers.length > 0 && (
                <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Featured Speakers
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {nextEvent.speakers.map((speaker) => (
                      <span
                        key={speaker}
                        className="text-xs bg-white px-3 py-1 rounded-full border border-gray-200 text-gray-700"
                      >
                        {speaker}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRegister}
                  className="flex-1 py-3 bg-[#B08D21] hover:bg-[#9A7A1D] text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Register Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={handleClose}
                  className="py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                >
                  Maybe Later
                </button>
              </div>

              {/* Trust indicator */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#B08D21]" />
                  Free Entry
                </span>
                <span className="w-px h-3 bg-gray-300" />
                <span>Limited Slots</span>
                <span className="w-px h-3 bg-gray-300" />
                <span>Certificate</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
