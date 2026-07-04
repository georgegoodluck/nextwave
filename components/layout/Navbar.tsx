"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Mission", id: "pillars" },
  { label: "Programs", id: "programs" },
  { label: "Events", id: "register" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-[#333333]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition touch-manipulation"
          >
            <Image
              src="/logo.png"
              alt="Nextwave Global Logo"
              width={36}
              height={36}
              className="w-9 h-9 md:w-10 md:h-10"
              priority
            />
            <span className="text-lg md:text-xl font-bold tracking-tighter text-white">
              Nextwave{" "}
              <span className="text-[#c9a84c] font-medium">Global</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-[#b8b0a8]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.id)}
                className="hover:text-[#c9a84c] transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c9a84c] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#b8b0a8] hover:text-[#c9a84c] transition p-2 touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-[#0d0d0d]/98 backdrop-blur-xl transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "64px" }}
      >
        <div className="flex flex-col gap-2 p-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.id)}
              className="w-full text-left py-4 px-4 text-sm font-semibold uppercase tracking-widest text-[#b8b0a8] hover:text-[#c9a84c] hover:bg-[#1a1a1a] rounded-xl transition-all touch-manipulation active:scale-98"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}