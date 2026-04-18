"use client";

import Link from "next/link";
import { Button } from "../ui/Button";

export default function Hero() {
  const scrollToPrograms = () => {
    const programsSection = document.getElementById("programs");
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 px-6 text-center bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
          LEARN. LEAD. <span className="text-(--nw-gold)">EARN.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          NextWave Global is a movement that empowers students to learn, lead,
          and earn in ways that go beyond the classroom.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button variant="primary">Join the Movement</Button>
          </Link>
          <Button variant="outline" onClick={scrollToPrograms}>
            Our Programs
          </Button>
        </div>
      </div>
    </section>
  );
}