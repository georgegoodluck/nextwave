// components/SuccessMessage.tsx
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";
import { Event } from "@/types/events";

interface SuccessMessageProps {
  event: Event;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ event }) => {
  const router = useRouter();

  return (
    <section className="py-24 px-6 text-center bg-white rounded-3xl max-w-2xl mx-auto shadow-sm border border-gray-100">
      <div className="flex justify-center mb-6">
        <CheckCircle size={64} className="text-(--nw-gold)" />
      </div>
      <h2 className="text-3xl font-bold mb-4 text-(--nw-charcoal)">
        Registration Successful! 🎉
      </h2>
      <p className="text-gray-600 mb-4">
        You&apos;re registered for <strong>{event.title}</strong>
      </p>
      <div className="bg-gray-50 p-4 rounded-xl mb-6 text-left">
        <p className="text-sm text-gray-500 mb-2">📅 Event Details:</p>
        <p className="font-medium">{event.date}</p>
        <p className="font-medium">{event.time}</p>
        <p className="font-medium">{event.venue}</p>
      </div>
      <p className="text-gray-500 mb-8">
        Check your email for confirmation and event access details.
      </p>
      <Button variant="outline" onClick={() => router.push("/")}>
        Back to Home
      </Button>
    </section>
  );
};
