"use client";

import { Event } from "@/types/events";
import { Users, MapPin, Calendar as CalendarIcon, Clock } from "lucide-react";
import Image from "next/image";

interface EventCardProps {
  event: Event;
  isSelected: boolean;
  onSelect: (event: Event) => void;
}

export function EventCard({ event, isSelected, onSelect }: EventCardProps) {
  return (
    <div
      className={`group cursor-pointer transition-all duration-300 rounded-2xl overflow-hidden border-2 ${
        isSelected
          ? "border-[#B08D21] shadow-lg shadow-[#B08D21]/20"
          : "border-gray-200 hover:border-[#B08D21]/50 hover:shadow-md"
      }`}
      onClick={() => onSelect(event)}
    >
      {/* Image */}
      <div className="relative h-48 w-full bg-gray-100">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FDF7E7] to-[#B08D21]/10">
            <span className="text-4xl">📚</span>
          </div>
        )}
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
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
      <div className="p-5 bg-white">
        <h3 className="font-bold text-[#1A1A1A] text-lg mb-2 line-clamp-2 group-hover:text-[#B08D21] transition-colors">
          {event.title}
        </h3>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarIcon size={15} className="text-[#B08D21] shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={15} className="text-[#B08D21] shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={15} className="text-[#B08D21] shrink-0" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users size={15} className="text-[#B08D21] shrink-0" />
            <span>
              {event.registered} / {event.capacity} registered
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-[#B08D21] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(event.registered / event.capacity) * 100}%` }}
            />
          </div>
        </div>

        {/* Select Button */}
        <button
          className={`w-full mt-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
            isSelected
              ? "bg-[#B08D21] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-[#B08D21] hover:text-white"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(event);
          }}
        >
          {isSelected ? "Selected ✓" : "Register Now"}
        </button>
      </div>
    </div>
  );
}
