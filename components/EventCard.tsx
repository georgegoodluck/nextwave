import React from "react";
import { Event } from "@/types/events";
import { Button } from "@/components/ui/Button";
import { Calendar, Clock, MapPin, GraduationCap } from "lucide-react";

interface EventCardProps {
  event: Event;
  isSelected: boolean;
  onSelect: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isSelected,
  onSelect,
}) => {
  const isFull = event.registered >= event.capacity;
  const spotsLeft = event.capacity - event.registered;

  // Calculate percentage for progress bar
  const fillPercentage = Math.min(
    (event.registered / event.capacity) * 100,
    100,
  );

  return (
    <div
      className={`border rounded-2xl p-6 transition-all cursor-pointer hover:shadow-lg ${
        isSelected
          ? "border-(--nw-gold) ring-2 ring-(--nw-gold)/20 bg-linear-to-br from-white to-(--nw-gold)/5"
          : "border-gray-200 hover:border-(--nw-gold)/50"
      }`}
      onClick={() => onSelect(event)}
    >
      <div className="flex justify-between items-start mb-4">
        <GraduationCap className="text-(--nw-gold)" size={32} />
        <span
          className={`text-xs font-bold px-2 py-1 rounded-full ${
            isFull ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
          }`}
        >
          {isFull
            ? "Fully Booked"
            : `${spotsLeft} spot${spotsLeft > 1 ? "s" : ""} left`}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-2 text-(--nw-charcoal) line-clamp-2">
        {event.title}
      </h3>
      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
        {event.description}
      </p>

      {/* Progress bar showing capacity */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-(--nw-gold) h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${fillPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{event.registered} registered</span>
          <span>Capacity: {event.capacity}</span>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          <span>{event.venue}</span>
        </div>
      </div>

      <Button
        variant={isSelected ? "primary" : "outline"}
        className="w-full"
        disabled={isFull}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(event);
        }}
      >
        {isFull ? "Sold Out" : isSelected ? "Selected ✓" : "Select Event"}
      </Button>
    </div>
  );
};
