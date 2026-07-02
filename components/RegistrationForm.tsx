"use client";

import { Event } from "@/types/events";
import { FormData } from "@/types/events";
import { X, User, Mail, Phone, Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

interface RegistrationFormProps {
  event: Event;
  formData: FormData;
  isLoading: boolean;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function RegistrationForm({
  event,
  formData,
  isLoading,
  error,
  onChange,
  onSubmit,
  onCancel,
}: RegistrationFormProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 md:mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">
            Register for
          </h3>
          <p className="text-[#B08D21] font-semibold text-base md:text-lg">
            {event.title}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Close registration"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Event Summary - Mobile Optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6 p-3 md:p-4 bg-white rounded-xl border border-gray-100">
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
          <Calendar size={14} className="text-[#B08D21] shrink-0" />
          <span className="truncate">{event.date}</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
          <Clock size={14} className="text-[#B08D21] shrink-0" />
          <span className="truncate">{event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 sm:col-span-2">
          <MapPin size={14} className="text-[#B08D21] shrink-0" />
          <span className="truncate">{event.venue}</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 sm:col-span-2">
          <span className="font-semibold text-[#B08D21] bg-[#B08D21]/10 px-3 py-0.5 rounded-full">
            {event.price}
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onChange}
              required
              className="w-full pl-9 pr-3 py-2.5 md:py-3 bg-white border border-gray-200 rounded-xl focus:border-[#B08D21] focus:ring-2 focus:ring-[#B08D21]/20 outline-none transition-all text-sm md:text-base"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
              className="w-full pl-9 pr-3 py-2.5 md:py-3 bg-white border border-gray-200 rounded-xl focus:border-[#B08D21] focus:ring-2 focus:ring-[#B08D21]/20 outline-none transition-all text-sm md:text-base"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5">
            Phone Number{" "}
            <span className="text-gray-400 text-xs">(Optional)</span>
          </label>
          <div className="relative">
            <Phone
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone || ""}
              onChange={onChange}
              className="w-full pl-9 pr-3 py-2.5 md:py-3 bg-white border border-gray-200 rounded-xl focus:border-[#B08D21] focus:ring-2 focus:ring-[#B08D21]/20 outline-none transition-all text-sm md:text-base"
              placeholder="+234 800 000 0000"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 md:p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs md:text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 md:py-4 bg-[#B08D21] hover:bg-[#9A7A1D] text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 md:h-5 md:w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Registering...
            </>
          ) : (
            <>
              Complete Registration
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-3 md:mt-4">
          By registering, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
}
