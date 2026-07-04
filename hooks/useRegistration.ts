import { useState, useCallback } from "react";
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

  const validateForm = useCallback(() => {
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  }, [formData]);

  const handleEventSelect = useCallback((event: Event) => {
    setSelectedEvent((prev) => {
      if (prev?.id === event.id) return prev;
      return event;
    });

    setFormData((prev) => {
      if (prev.eventId === event.id) return prev;

      return {
        ...prev,
        eventId: event.id,
      };
    });

    setError("");
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (error) setError("");
    },
    [error],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      if (!selectedEvent) {
        setError("Please select an event");
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            eventId: selectedEvent.id,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Submission failed");
        }

        setSubmitted(true);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [formData, selectedEvent, validateForm],
  );

  const resetForm = useCallback(() => {
    setSubmitted(false);
    setIsLoading(false);
    setError("");
    setSelectedEvent(null);

    setFormData({
      fullName: "",
      email: "",
      eventId: "",
      phone: "",
    });
  }, []);

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
