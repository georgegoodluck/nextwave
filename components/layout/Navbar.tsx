"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#FDF7E7] backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Nextwave Global Logo"
            width={62}
            height={62}
            className="rounded-sm"
            style={{ width: "auto", height: "auto" }}
            priority
          />
          <span className="text-xl font-bold tracking-tighter text-(--nw-charcoal)">
            Nextwave{" "}
            <span className="text-(--nw-gold) font-medium">Global</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-gray-600">
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-(--nw-gold) transition cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("pillars")}
            className="hover:text-(--nw-gold) transition cursor-pointer"
          >
            Mission
          </button>
          <button
            onClick={() => scrollToSection("programs")}
            className="hover:text-(--nw-gold) transition cursor-pointer"
          >
            Programs
          </button>
        </div>

        {/* Action Button */}
        <Link href="/register">
          <button className="bg-(--nw-charcoal) text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-black transition shadow-lg cursor-pointer">
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  );
}
