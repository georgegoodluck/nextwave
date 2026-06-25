"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Mission", id: "pillars" },
  { label: "Programs", id: "programs" },
  { label: "Events", id: "register" }, // Added events link
];

export default function Navbar() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#FDF7E7]/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <Image
            src="/logo.png"
            alt="Nextwave Global Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-xl font-bold tracking-tighter text-[#1A1A1A]">
            Nextwave <span className="text-[#B08D21] font-medium">Global</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-gray-600">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.id)}
              className="hover:text-[#B08D21] transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile menu button - Optional */}
        <button
          className="md:hidden text-gray-600 hover:text-(--nw-gold) transition"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
