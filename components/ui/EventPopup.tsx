"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Zap,
  Users,
  Gift,
  ShoppingBag,
  Star,
  CheckCircle,
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
      const timer = setTimeout(() => setIsOpen(true), 1500);
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
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 max-w-[400px] w-full mx-auto bg-[#1a1a1a] rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden border border-[#333333]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#c9a84c] to-[#a8873a] px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#0d0d0d]">
                <ShoppingBag className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wide">
                  Register Now
                </span>
              </div>
              <button
                onClick={handleClose}
                className="text-[#0d0d0d]/70 hover:text-[#0d0d0d] transition-colors p-1 touch-manipulation"
                aria-label="Close popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex gap-4">
                {/* Event Image */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-[#0d0d0d] border border-[#333333]">
                  {nextEvent.image ? (
                    <Image
                      src={nextEvent.image}
                      alt={nextEvent.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5">
                      <Sparkles className="w-6 h-6 text-[#c9a84c]" />
                    </div>
                  )}
                  <div className="absolute top-1 right-1 bg-green-500 text-[#0d0d0d] text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                    FREE
                  </div>
                </div>

                {/* Event Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className="bg-[#c9a84c]/10 text-[#c9a84c] text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {nextEvent.category}
                    </span>
                    <span className="bg-green-500/20 text-green-400 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5 border border-green-500/20">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      Trending
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-white leading-tight line-clamp-1">
                    {nextEvent.title}
                  </h3>
                  <p className="text-xs text-[#7a7270] mt-0.5 line-clamp-2">
                    {nextEvent.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-[#7a7270]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#c9a84c]" />
                      <span>{nextEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#c9a84c]" />
                      <span>{nextEvent.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#333333]">
                <div>
                  <p className="text-[10px] text-[#7a7270]">Price</p>
                  <p className="font-bold text-[#c9a84c] text-lg">FREE</p>
                </div>
                <button
                  onClick={handleRegister}
                  className="px-6 py-2.5 bg-[#c9a84c] hover:bg-[#a8873a] text-[#0d0d0d] font-bold rounded-lg transition-all flex items-center gap-2 text-sm shadow-lg shadow-[#c9a84c]/25 hover:shadow-[#c9a84c]/40 active:scale-95 touch-manipulation"
                >
                  <span>Get It Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Speakers */}
              {nextEvent.speakers && nextEvent.speakers.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#333333]">
                  <p className="text-[10px] font-semibold text-[#7a7270] uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-[#c9a84c]" />
                    Speakers
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {nextEvent.speakers.map((speaker) => (
                      <span
                        key={speaker}
                        className="text-[10px] bg-[#0d0d0d] px-2.5 py-1 rounded-full border border-[#333333] text-[#b8b0a8]"
                      >
                        {speaker}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Badges */}
              <div className="mt-3 pt-3 border-t border-[#333333] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1 text-[9px] text-green-400">
                    <CheckCircle className="w-3 h-3" />
                    Free Entry
                  </span>
                  <span className="flex items-center gap-1 text-[9px] text-purple-400">
                    <Gift className="w-3 h-3" />
                    Certificate
                  </span>
                </div>
                <span className="text-[9px] text-[#7a7270]">
                  {nextEvent.venue}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#0d0d0d] px-5 py-2.5 flex items-center justify-between border-t border-[#333333]">
              <span className="text-[10px] text-[#7a7270]">
                Powered by NextWave Global
              </span>
              <span className="text-[10px] text-[#7a7270] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Open for registration
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
