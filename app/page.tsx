"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Pillars from "@/components/sections/Pillars";
import Story from "@/components/sections/Story";
import Programs from "@/components/sections/Programs";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Story />
      <Pillars />
      <Programs />
      <Footer />
    </main>
  );
}
