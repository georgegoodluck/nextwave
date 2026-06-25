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

  // Validation function
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setFormData((prev) => ({ ...prev, eventId: event.id }));
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) return;

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
            phone: formData.phone || "Not provided",
            event: selectedEvent.title,
            event_date: selectedEvent.date,
            event_venue: selectedEvent.venue,
            _subject: `New Event Registration: ${selectedEvent.title} - ${formData.fullName}`,
            _template: "table",
            _captcha: "false",
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Submission failed");
      }

      setSubmitted(true);
      // Don't reset form data completely, keep it for success message
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedEvent(null);
    setError("");
    setSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      eventId: "",
      phone: "",
    });
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
