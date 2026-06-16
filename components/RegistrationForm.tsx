// components/RegistrationForm.tsx
import React from "react";
import { Button } from "@/components/ui/Button";
import { Send, Loader2 } from "lucide-react";
import { Event } from "@/types/events";

interface RegistrationFormProps {
  event: Event;
  formData: {
    fullName: string;
    email: string;
    phone?: string;
  };
  isLoading: boolean;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  event,
  formData,
  isLoading,
  error,
  onChange,
  onSubmit,
  onCancel,
}) => {
  const isFull = event.registered >= event.capacity;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-linear-to-r from-(--nw-gold)/10 to-transparent p-1 rounded-2xl">
        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-(--nw-charcoal) mb-2">
              Register for {event.title}
            </h3>
            <p className="text-gray-500">
              Fill in your details to secure your spot
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={onChange}
                disabled={isLoading}
                required
                placeholder="Akinwole Samson"
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                disabled={isLoading}
                required
                placeholder="you@example.com"
              />
            </div>

            <InputField
              label="Phone Number (Optional)"
              name="phone"
              type="tel"
              value={formData.phone || ""}
              onChange={onChange}
              disabled={isLoading}
              placeholder="+234 123 456 7890"
            />

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex-1 py-4 flex gap-2 items-center justify-center"
                disabled={isLoading || isFull}
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
  );
};

// Input Field Sub-component
interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  disabled = false,
  required = false,
  placeholder,
}) => (
  <div className="space-y-2">
    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
      {label}
      {required && <span className="text-red-600 ml-1">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-(--nw-gold) outline-none transition disabled:opacity-50"
      placeholder={placeholder}
    />
  </div>
);
