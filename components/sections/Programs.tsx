"use client";

import Image from "next/image";
import { PROGRAMS } from "@/data/programs";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CalendarIcon, ClockIcon, LocationIcon } from "@/components/ui/Icons";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Programs() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll();
      window.addEventListener("resize", checkScroll);
      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="programs" className="py-24 bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#B08D21] text-sm font-bold uppercase tracking-widest">
            Our Initiatives
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Programs That <span className="text-[#B08D21]">Transform</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            From academic excellence to career building, our initiatives are
            designed to equip you for success.
          </p>
        </div>

        <div className="relative">
          {/* Scroll Arrows - Desktop Only */}
          {!isMobile && showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-3 rounded-full backdrop-blur-sm transition-all border border-[#B08D21]/30 hover:border-[#B08D21] shadow-lg"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {!isMobile && showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-3 rounded-full backdrop-blur-sm transition-all border border-[#B08D21]/30 hover:border-[#B08D21] shadow-lg"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-custom"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#B08D21 #2A2A2A",
            }}
          >
            {PROGRAMS.map((item, index) => (
              <div
                key={item.title}
                className="min-w-[300px] sm:min-w-[340px] md:min-w-[380px] snap-center rounded-3xl border border-gray-800 bg-gray-900/50 hover:bg-gray-800 transition-all duration-300 hover:border-[#B08D21] hover:-translate-y-2 overflow-hidden group flex-shrink-0"
              >
                {/* Image Header */}
                <div className="relative h-48 w-full bg-gradient-to-br from-[#B08D21]/20 to-gray-800">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      📚
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-[#B08D21] uppercase tracking-widest">
                      0{index + 1}
                    </span>
                    <StatusBadge status={item.status} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="text-white font-bold text-xl mb-2 group-hover:text-[#B08D21] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  <div className="space-y-2 text-sm border-t border-gray-800 pt-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <CalendarIcon className="w-4 h-4 text-[#B08D21] shrink-0" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <ClockIcon className="w-4 h-4 text-[#B08D21] shrink-0" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <LocationIcon className="w-4 h-4 text-[#B08D21] shrink-0" />
                      <span>{item.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator - Mobile Only */}
          {isMobile && (
            <div className="mt-6 flex justify-center items-center gap-2">
              <div className="h-1 w-12 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-[#B08D21] rounded-full animate-scroll-indicator" />
              </div>
              <span className="text-xs text-gray-500 font-medium">
                Scroll →
              </span>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        /* Custom Scrollbar Styles */
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: #b08d21 #2a2a2a;
        }

        .scrollbar-custom::-webkit-scrollbar {
          height: 6px;
        }

        .scrollbar-custom::-webkit-scrollbar-track {
          background: #2a2a2a;
          border-radius: 10px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #b08d21;
          border-radius: 10px;
          transition: background 0.3s ease;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #d4a92c;
        }

        .scrollbar-custom {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }

        /* Hide scrollbar on mobile while keeping functionality */
        @media (max-width: 768px) {
          .scrollbar-custom::-webkit-scrollbar {
            height: 4px;
          }
          .scrollbar-custom::-webkit-scrollbar-thumb {
            background: #b08d21;
            border-radius: 10px;
          }
        }

        @keyframes scroll-indicator {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .animate-scroll-indicator {
          animation: scroll-indicator 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
