// hooks/useRegistration.ts
import { useState } from "react";
import { Event, FormData } from "@/types/events";

export function useRegistration() {
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
    setFormData((prev) => ({ ...prev, eventId: event.id }));
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
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
      setFormData({ fullName: "", email: "", eventId: "", phone: "" });
      setSelectedEvent(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedEvent(null);
    setError("");
    setSubmitted(false);
  };

  return {
    submitted,
    isLoading,
    error,
    selectedEvent,
    formData,
    handleEventSelect,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
