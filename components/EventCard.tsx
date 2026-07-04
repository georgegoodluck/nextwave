"use client";

import { Event } from "@/types/events";
import { MapPin, Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface EventCardProps {
  event: Event;
  isSelected: boolean;
  onSelect: (event: Event) => void;
}

export function EventCard({ event, isSelected, onSelect }: EventCardProps) {
  const isPast = event.status?.toLowerCase() === "past";
  const isUpcoming = event.status?.toLowerCase() === "upcoming";
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`group cursor-pointer transition-all duration-300 rounded-2xl overflow-hidden border-2 ${
        isPast
          ? "border-[#333333] opacity-60 hover:opacity-80"
          : isSelected
            ? "border-[#c9a84c] shadow-lg shadow-[#c9a84c]/15"
            : "border-[#333333] hover:border-[#c9a84c]/50 hover:shadow-md"
      }`}
      onClick={() => !isPast && onSelect(event)}
    >
      {/* Image */}
      <div className="relative h-48 w-full bg-[#1a1a1a]">
        {event.image && !imgError ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#c9a84c]/10">
            <span className="text-4xl">📚</span>
          </div>
        )}

        {/* Overlay for past events */}
        {isPast && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-black/80 text-white text-sm font-bold px-6 py-2 rounded-full uppercase tracking-wider border border-white/10">
              Event Passed
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
              isPast
                ? "bg-[#2a2a2a] text-[#7a7270] border border-[#333333]"
                : "bg-[#c9a84c] text-[#0d0d0d]"
            }`}
          >
            {event.status}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {event.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 bg-[#1a1a1a]">
        <h3
          className={`font-bold text-lg mb-2 line-clamp-2 ${
            isPast
              ? "text-[#7a7270]"
              : "text-white group-hover:text-[#c9a84c] transition-colors"
          }`}
        >
          {event.title}
        </h3>

        <p className="text-[#7a7270] text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-[#b8b0a8]">
            <CalendarIcon size={15} className="text-[#c9a84c] shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-[#b8b0a8]">
            <Clock size={15} className="text-[#c9a84c] shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-[#b8b0a8]">
            <MapPin size={15} className="text-[#c9a84c] shrink-0" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        {/* Button */}
        <button
          disabled={isPast}
          className={`w-full mt-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 touch-manipulation active:scale-95 ${
            isPast
              ? "bg-[#2a2a2a] text-[#7a7270] cursor-not-allowed"
              : isSelected
                ? "bg-[#c9a84c] text-[#0d0d0d]"
                : "bg-[#2a2a2a] text-[#b8b0a8] hover:bg-[#c9a84c] hover:text-[#0d0d0d]"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!isPast) onSelect(event);
          }}
        >
          {isPast
            ? "Event Completed"
            : isSelected
              ? "Selected ✓"
              : "Register Now"}
        </button>
      </div>
    </div>
  );
}
