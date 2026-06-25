import React from "react";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Calendar, Clock, MapPin, Mail } from "lucide-react";
import { Event } from "@/types/events";

interface SuccessMessageProps {
  event: Event;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ event }) => {
  return (
    <section className="py-16 px-6 bg-white rounded-3xl max-w-2xl mx-auto shadow-sm border border-gray-100 mt-3">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-50 p-4 rounded-full">
            <CheckCircle size={64} className="text-(--nw-gold)" />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 text-(--nw-charcoal)">
          Registration Successful! 🎉
        </h2>

        <p className="text-gray-600 mb-6">
          You&apos;re registered for{" "}
          <strong className="text-(--nw-gold)">{event.title}</strong>
        </p>

        <div className="bg-gray-50 p-6 rounded-xl mb-8 text-left">
          <p className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">
            📅 Event Details
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-(--nw-gold)" />
              <span className="font-medium">{event.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-(--nw-gold)" />
              <span className="font-medium">{event.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-(--nw-gold)" />
              <span className="font-medium">{event.venue}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 text-left">
          <div className="flex items-start gap-3">
            <Mail size={18} className="text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800">
                Check your email
              </p>
              <p className="text-xs text-blue-600 mt-1">
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
