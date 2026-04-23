"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import {
  CheckCircle,
  GraduationCap,
  Send,
  Loader2,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  eventId: string;
  phone?: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  capacity: number;
  registered: number;
  image?: string;
}

const UPCOMING_EVENTS: Event[] = [
  {
    id: "scholar-reboot-feb-2026",
    title: "Scholar Reboot: Academic Excellence Summit",
    description:
      "Master study techniques, time management, and exam strategies that top students use.",
    date: "February 15, 2026",
    time: "10:00 AM - 4:00 PM WAT",
    venue: "Virtual Event (Zoom)",
    capacity: 500,
    registered: 234,
  },
  {
    id: "campus2linkedin-mar-2026",
    title: "Campus2LinkedIn: Career Growth Workshop",
    description:
      "Build a standout LinkedIn profile, network with professionals, and land internships.",
    date: "March 5, 2026",
    time: "11:00 AM - 3:00 PM WAT",
    venue: "Virtual Event",
    capacity: 300,
    registered: 156,
  },
  {
    id: "skill-monetization-apr-2026",
    title: "Skill Monetization Bootcamp",
    description:
      "Learn how to turn your skills into income streams and start earning as a student.",
    date: "April 12, 2026",
    time: "9:00 AM - 5:00 PM WAT",
    venue: "Virtual Event (Zoom)",
    capacity: 400,
    registered: 289,
  },
];

export default function RegistrationForm() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    eventId: "",
    phone: "",
  });

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setFormData({
      ...formData,
      eventId: event.id,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEvent) {
      setError("Please select an event to register for");
      return;
    }

    if (selectedEvent.registered >= selectedEvent.capacity) {
      setError(
        `Sorry, ${selectedEvent.title} is fully booked. Please select another event.`,
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Send to FormSubmit.co (free email service)
      const response = await fetch(
        "https://formsubmit.co/ajax/nextwaveglobal509@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            event: selectedEvent.title,
            event_date: selectedEvent.date,
            _subject: `New Event Registration: ${selectedEvent.title} - ${formData.fullName}`,
            _template: "table",
            _captcha: "false",
          }),
        },
      );

      if (!response.ok) throw new Error("Submission failed");

      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        eventId: "",
        phone: "",
      });
      setSelectedEvent(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  if (submitted && selectedEvent) {
    return (
      <section className="py-24 px-6 text-center bg-white rounded-3xl max-w-2xl mx-auto shadow-sm border border-gray-100">
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} className="text-(--nw-gold)" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-(--nw-charcoal)">
          Registration Successful! 🎉
        </h2>
        <p className="text-gray-600 mb-4">
          You&apos;re registered for <strong>{selectedEvent.title}</strong>
        </p>
        <div className="bg-gray-50 p-4 rounded-xl mb-6 text-left">
          <p className="text-sm text-gray-500 mb-2">📅 Event Details:</p>
          <p className="font-medium">{selectedEvent.date}</p>
          <p className="font-medium">{selectedEvent.time}</p>
          <p className="font-medium">{selectedEvent.venue}</p>
        </div>
        <p className="text-gray-500 mb-8">
          Check your email for confirmation and event access details.
        </p>
        <Button variant="outline" onClick={() => router.push("/")}>
          Back to Home
        </Button>
      </section>
    );
  }

  return (
    <section id="register" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-(--nw-gold) font-bold mb-4">
            <Calendar size={20} />
            <span className="uppercase tracking-widest text-sm">
              Upcoming Events
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-(--nw-charcoal)">
            Choose Your Path to Excellence
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our transformative events designed to help you excel
            academically, build a thriving career, and monetize your skills.
          </p>
        </div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {UPCOMING_EVENTS.map((event) => (
            <div
              key={event.id}
              className={`border rounded-2xl p-6 transition-all cursor-pointer hover:shadow-lg ${
                selectedEvent?.id === event.id
                  ? "border-(--nw-gold) ring-2 ring-(--nw-gold)/20 bg-gradient-to-br from-white to-(--nw-gold)/5"
                  : "border-gray-200 hover:border-(--nw-gold)/50"
              }`}
              onClick={() => handleEventSelect(event)}
            >
              <div className="flex justify-between items-start mb-4">
                <GraduationCap className="text-(--nw-gold)" size={32} />
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    event.registered >= event.capacity
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {event.registered >= event.capacity
                    ? "Fully Booked"
                    : `${event.capacity - event.registered} spots left`}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-(--nw-charcoal)">
                {event.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4">{event.description}</p>
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
                variant={selectedEvent?.id === event.id ? "primary" : "outline"}
                className="w-full"
                disabled={event.registered >= event.capacity}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEventSelect(event);
                }}
              >
                {event.registered >= event.capacity
                  ? "Sold Out"
                  : selectedEvent?.id === event.id
                    ? "Selected"
                    : "Select Event"}
              </Button>
            </div>
          ))}
        </div>

        {/* Registration Form - Only shows when event is selected */}
        {selectedEvent && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-(--nw-gold)/10 to-transparent p-1 rounded-2xl">
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-(--nw-charcoal) mb-2">
                    Register for {selectedEvent.title}
                  </h3>
                  <p className="text-gray-500">
                    Fill in your details to secure your spot
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Full Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        required
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-(--nw-gold) outline-none transition disabled:opacity-50"
                        placeholder="Akinwole Samson"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Email<span className="text-red-600">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-(--nw-gold) outline-none transition disabled:opacity-50"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-(--nw-gold) outline-none transition disabled:opacity-50"
                      placeholder="+234 123 456 7890"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedEvent(null)}
                      disabled={isLoading}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-1 py-4 flex gap-2 items-center justify-center"
                      disabled={
                        isLoading ||
                        selectedEvent.registered >= selectedEvent.capacity
                      }
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Register Now <Send size={18} />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
