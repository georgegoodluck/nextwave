"use client";

import Image from "next/image";
import { PROGRAMS } from "@/data/programs";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CalendarIcon, ClockIcon, LocationIcon } from "@/components/ui/Icons";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"; // ✅ Removed unused Calendar, Link

export default function Programs() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  // Touch drag handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const container = scrollContainerRef.current;
    if (container) {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const container = scrollContainerRef.current;
    if (container) {
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Get upcoming programs count
  const upcomingPrograms = PROGRAMS.filter(
    (p) =>
      p.status?.toLowerCase() === "upcoming" ||
      p.status?.toLowerCase() === "coming soon",
  );

  return (
    <section
      id="programs"
      className="py-16 md:py-24 bg-[#1A1A1A] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-16">
          <span className="text-[#B08D21] text-xs md:text-sm font-bold uppercase tracking-widest">
            Our Initiatives
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            Programs That <span className="text-[#B08D21]">Transform</span>
          </h2>
          <p className="text-gray-400 mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base px-4">
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
            className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-custom"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#B08D21 #2A2A2A",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {PROGRAMS.map((item, index) => {
              const isUpcoming =
                item.status?.toLowerCase() === "upcoming" ||
                item.status?.toLowerCase() === "coming soon";

              return (
                <div
                  key={item.title}
                  className={`min-w-[280px] sm:min-w-[320px] md:min-w-[380px] snap-center rounded-2xl md:rounded-3xl border ${
                    isUpcoming
                      ? "border-[#B08D21]/50 bg-[#B08D21]/10"
                      : "border-gray-800 bg-gray-900/50"
                  } hover:bg-gray-800 transition-all duration-300 hover:border-[#B08D21] hover:-translate-y-2 overflow-hidden group flex-shrink-0 ${
                    isUpcoming ? "shadow-lg shadow-[#B08D21]/10" : ""
                  }`}
                >
                  {/* Image Header */}
                  <div className="relative h-40 sm:h-48 w-full bg-gradient-to-br from-[#B08D21]/20 to-gray-800">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl sm:text-6xl bg-gradient-to-br from-[#B08D21]/30 to-[#B08D21]/5">
                        {isUpcoming ? "🚀" : "📚"}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-[#B08D21] uppercase tracking-widest">
                        0{index + 1}
                      </span>
                      <StatusBadge status={item.status} />
                    </div>
                    {isUpcoming && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-[#B08D21] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                          🔥 New
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <h4 className="text-white font-bold text-lg sm:text-xl mb-1.5 group-hover:text-[#B08D21] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                      {item.desc ||
                        "An exciting initiative coming your way. Stay tuned for more details!"}
                    </p>

                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm border-t border-gray-800 pt-3 sm:pt-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B08D21] shrink-0" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <ClockIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B08D21] shrink-0" />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <LocationIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B08D21] shrink-0" />
                        <span>{item.venue}</span>
                      </div>
                    </div>

                    {isUpcoming && (
                      <button
                        onClick={() => {
                          const registerSection =
                            document.getElementById("register");
                          if (registerSection) {
                            registerSection.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }}
                        className="w-full mt-3 sm:mt-4 py-2 sm:py-2.5 bg-[#B08D21] hover:bg-[#9A7A1D] text-white rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                      >
                        Register Now
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Scroll Indicator */}
          {isMobile && (
            <div className="mt-4 flex flex-col items-center gap-1">
              <div className="flex items-center gap-3">
                <div className="h-1 w-16 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-[#B08D21] rounded-full animate-scroll-indicator" />
                </div>
                <span className="text-[10px] text-gray-500 font-medium animate-pulse">
                  Swipe →
                </span>
              </div>
              <p className="text-[10px] text-gray-600">
                {upcomingPrograms.length} program
                {upcomingPrograms.length > 1 ? "s" : ""} available
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        /* Custom Scrollbar Styles */
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: #b08d21 #2a2a2a;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          cursor: grab;
        }

        .scrollbar-custom:active {
          cursor: grabbing;
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

        @media (max-width: 768px) {
          .scrollbar-custom::-webkit-scrollbar {
            height: 3px;
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
