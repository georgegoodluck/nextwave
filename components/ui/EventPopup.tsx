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
  Users,
  Bell,
  Gift,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { UPCOMING_EVENTS } from "@/data/events";

interface EventPopupProps {
  onRegister: (eventId: string) => void;
}

export function EventPopup({ onRegister }: EventPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  const nextEvent = UPCOMING_EVENTS.find(
    (event) => event.status?.toLowerCase() === "upcoming",
  );

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenEventPopup");
    if (!hasSeenPopup && nextEvent) {
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [nextEvent]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenEventPopup", "true");
  };

  const handleRegister = () => {
    if (nextEvent) {
      onRegister(nextEvent.id);
      handleClose();
      setTimeout(() => {
        const section = document.getElementById("register");
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "center" });
          section.classList.add("ring-4", "ring-[#B08D21]", "ring-offset-4");
          setTimeout(() => {
            section.classList.remove(
              "ring-4",
              "ring-[#B08D21]",
              "ring-offset-4",
            );
          }, 3000);
        }
      }, 300);
    }
  };

  if (!nextEvent) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 max-w-[400px] w-full mx-auto bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag Handle */}
            <div className="md:hidden w-12 h-1 bg-gray-300 rounded-full mx-auto mt-2 mb-1" />

            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Header Image */}
            <div className="relative h-44 w-full">
              {nextEvent.image ? (
                <Image
                  src={nextEvent.image}
                  alt={nextEvent.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#B08D21]/30 to-[#B08D21]/5 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-[#B08D21] opacity-50" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-[#B08D21] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Bell className="w-3 h-3" />
                  Upcoming
                </span>
                <span className="bg-white/95 text-[#1A1A1A] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Gift className="w-3 h-3 text-[#B08D21]" />
                  FREE
                </span>
              </div>

              {/* Title */}
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-bold text-lg drop-shadow-lg">
                  {nextEvent.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-white/80 text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{nextEvent.date}</span>
                  <span className="w-1 h-1 bg-white/40 rounded-full" />
                  <Clock className="w-3.5 h-3.5" />
                  <span>{nextEvent.time}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Quick Info */}
              <div className="flex items-center gap-3 mb-3 text-xs">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <MapPin className="w-3.5 h-3.5 text-[#B08D21]" />
                  <span className="truncate">{nextEvent.venue}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Users className="w-3.5 h-3.5 text-[#B08D21]" />
                  <span>Limited</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                {nextEvent.description}
              </p>

              {/* Speakers */}
              {nextEvent.speakers && nextEvent.speakers.length > 0 && (
                <div className="mb-3 p-2.5 bg-gradient-to-r from-[#B08D21]/5 to-transparent rounded-lg border border-[#B08D21]/10">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#B08D21]" />
                    Speakers
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {nextEvent.speakers.map((speaker) => (
                      <span
                        key={speaker}
                        className="text-[10px] bg-white px-2.5 py-1 rounded-full border border-gray-200 text-gray-700"
                      >
                        {speaker}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex gap-2">
                <button
                  onClick={handleRegister}
                  className="flex-1 py-3 bg-[#B08D21] hover:bg-[#9A7A1D] text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#B08D21]/30 hover:shadow-[#B08D21]/50 hover:scale-[1.02] active:scale-95 text-sm"
                >
                  <span>Secure Your Spot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors text-sm"
                >
                  Later
                </button>
              </div>

              {/* Trust */}
              <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2 text-[10px] text-gray-400">
                <span className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full text-green-700">
                  <Zap className="w-3 h-3 text-[#B08D21]" />
                  Free
                </span>
                <span className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full text-blue-700">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </span>
                <span className="flex items-center gap-1 bg-purple-50 px-2 py-0.5 rounded-full text-purple-700">
                  <Gift className="w-3 h-3" />
                  Certificate
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
