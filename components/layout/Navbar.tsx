"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Mission", id: "pillars" },
  { label: "Programs", id: "programs" },
];

export default function Navbar() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#FDF7E7]/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Nextwave Global Logo"
            width={40}
            height={40}
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
              className="hover:text-[#B08D21] transition"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
