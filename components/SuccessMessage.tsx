import React from "react";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Calendar, Clock, MapPin, Mail } from "lucide-react";
import { Event } from "@/types/events";

interface SuccessMessageProps {
  event: Event;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ event }) => {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 bg-[#1a1a1a] rounded-2xl md:rounded-3xl max-w-2xl mx-auto border border-[#333333] mt-3">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-[#c9a84c]/10 p-4 rounded-full border border-[#c9a84c]/20">
            <CheckCircle size={48} className="text-[#c9a84c]" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
          Registration Successful! 🎉
        </h2>

        <p className="text-[#b8b0a8] mb-6 text-sm md:text-base">
          You&apos;re registered for{" "}
          <strong className="text-[#c9a84c]">{event.title}</strong>
        </p>

        <div className="bg-[#0d0d0d] p-4 md:p-6 rounded-xl mb-6 md:mb-8 text-left border border-[#333333]">
          <p className="text-xs font-bold text-[#7a7270] mb-3 uppercase tracking-wider">
            📅 Event Details
          </p>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-3 text-[#b8b0a8]">
              <Calendar size={16} className="text-[#c9a84c] shrink-0" />
              <span className="font-medium">{event.date}</span>
            </div>
            <div className="flex items-center gap-3 text-[#b8b0a8]">
              <Clock size={16} className="text-[#c9a84c] shrink-0" />
              <span className="font-medium">{event.time}</span>
            </div>
            <div className="flex items-center gap-3 text-[#b8b0a8]">
              <MapPin size={16} className="text-[#c9a84c] shrink-0" />
              <span className="font-medium">{event.venue}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#c9a84c]/5 border border-[#c9a84c]/20 rounded-xl p-3 md:p-4 mb-6 md:mb-8 text-left">
          <div className="flex items-start gap-3">
            <Mail size={16} className="text-[#c9a84c] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#c9a84c]">
                Check your email
              </p>
              <p className="text-xs text-[#b8b0a8] mt-1">
                We&apos;ve sent confirmation details and access information to
                your email.
              </p>
            </div>
          </div>
        </div>

        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Back to Home
        </Button>
      </div>
    </section>
  );
};
