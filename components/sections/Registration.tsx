"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { CheckCircle, GraduationCap, Send } from "lucide-react";

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Integration logic for Supabase or an API route goes here
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-24 px-6 text-center bg-white rounded-3xl max-w-2xl mx-auto shadow-sm border border-gray-100">
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} className="text-(--nw-gold)" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-(--nw-charcoal)">
          You&apos;re on the list!
        </h2>
        <p className="text-gray-500 mb-8">
          Check your email for details on the next Scholar Reboot cohort. Get
          ready to gain the academic clarity you need.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Back to Home
        </Button>
      </section>
    );
  }

  return (
    <section id="register" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="flex items-center gap-2 text-(--nw-gold) font-bold mb-4">
            <GraduationCap size={20} />
            <span className="uppercase tracking-widest text-sm">
              Join Scholar Reboot
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-6 text-(--nw-charcoal)">
            Ready to excel in your university journey?
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Sign up to receive study strategies and academic clarity through our
            next program cohort. Join the movement that bridges the gap between
            education and real-world opportunities.
          </p>
          <ul className="space-y-4 text-gray-600 font-medium">
            <li className="flex gap-3">
              <span className="text-(--nw-gold) font-bold">✓</span>{" "}
              Holistic growth insights
            </li>
            <li className="flex gap-3">
              <span className="text-(--nw-gold) font-bold">✓</span>{" "}
              Professional networking skills
            </li>
            <li className="flex gap-3">
              <span className="text-(--nw-gold) font-bold">✓</span>{" "}
              Strategies to monetize your skills
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100 space-y-6"
        >
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Full Name
            </label>
            <input
              required
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-(--nw-gold) outline-none transition"
              placeholder="George Goodluck"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
              University Email
            </label>
            <input
              required
              type="email"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-(--nw-gold) outline-none transition"
              placeholder="student@university.edu"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Area of Interest
            </label>
            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-(--nw-gold) outline-none transition">
              <option>Scholar Reboot (Academic Excellence)</option>
              <option>Campus2LinkedIn (Career Growth)</option>
              <option>Skill Monetization (Earn)</option>
            </select>
          </div>
          <Button variant="primary" className="w-full py-4 flex gap-2">
            Secure My Spot <Send size={18} />
          </Button>
        </form>
      </div>
    </section>
  );
}
