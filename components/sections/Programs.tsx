"use client";

import Image from "next/image";
import { PROGRAMS } from "@/data/programs";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CalendarIcon, ClockIcon, LocationIcon } from "@/components/ui/Icons";
import { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

export default function Programs() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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

      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 16;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(index);
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

  const handleTouchEnd = () => setIsDragging(false);

  const upcomingPrograms = PROGRAMS.filter(
    (p) =>
      p.status?.toLowerCase() === "upcoming" ||
      p.status?.toLowerCase() === "coming soon",
  );

  return (
    <section
      id="programs"
      className="py-16 md:py-24 bg-[#1A1A1A] text-white relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#B08D21]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 text-[#B08D21] text-xs md:text-sm font-bold uppercase tracking-widest bg-[#B08D21]/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Our Initiatives</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            Programs That <span className="text-[#B08D21]">Transform</span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            From academic excellence to career building, our initiatives are
            designed to equip you for success.
          </p>

          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>{upcomingPrograms.length} Upcoming</span>
            </div>
            <div className="w-px h-4 bg-gray-700" />
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <Users className="w-3.5 h-3.5 text-[#B08D21]" />
              <span>Virtual & Physical</span>
            </div>
          </div>
        </div>

        {/* Programs Carousel */}
        <div className="relative">
          {/* Arrows */}
          {!isMobile && showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-[#B08D21] text-white p-2.5 rounded-full transition-all border border-[#B08D21]/30 hover:border-[#B08D21] shadow-lg hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          {!isMobile && showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-[#B08D21] text-white p-2.5 rounded-full transition-all border border-[#B08D21]/30 hover:border-[#B08D21] shadow-lg hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Scroll Container - Fixed width cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-custom"
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
                  className={`w-[260px] sm:w-[280px] md:w-[300px] snap-center rounded-xl md:rounded-2xl border transition-all duration-500 overflow-hidden group flex-shrink-0 ${
                    isUpcoming
                      ? "border-[#B08D21]/40 bg-gradient-to-br from-[#B08D21]/10 to-transparent hover:border-[#B08D21] hover:shadow-2xl hover:shadow-[#B08D21]/20"
                      : "border-gray-800 bg-gray-900/50 hover:border-[#B08D21]/50 hover:shadow-2xl hover:shadow-[#B08D21]/10"
                  } hover:-translate-y-2`}
                >
                  {/* Image - Fixed height */}
                  <div className="relative h-40 w-full overflow-hidden">
                    {item.image ? (
                      <>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-[#B08D21]/30 to-[#B08D21]/5">
                        {isUpcoming ? "🚀" : "📚"}
                      </div>
                    )}

                    {/* Status */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#B08D21] bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                        #{index + 1}
                      </span>
                      <StatusBadge status={item.status} />
                    </div>

                    {/* Upcoming Badge */}
                    {isUpcoming && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-[#B08D21] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-[#B08D21]/50 animate-pulse">
                          <Zap className="w-2.5 h-2.5" />
                          New
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content - Compact */}
                  <div className="p-4">
                    <h4 className="text-white font-bold text-base mb-1.5 group-hover:text-[#B08D21] transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">
                      {item.desc || "An exciting initiative coming your way!"}
                    </p>

                    <div className="space-y-1.5 text-xs border-t border-gray-800 pt-3">
                      <div className="flex items-center gap-2 text-gray-300">
                        <CalendarIcon className="w-3.5 h-3.5 text-[#B08D21] shrink-0" />
                        <span className="truncate">{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <ClockIcon className="w-3.5 h-3.5 text-[#B08D21] shrink-0" />
                        <span className="truncate">{item.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <LocationIcon className="w-3.5 h-3.5 text-[#B08D21] shrink-0" />
                        <span className="truncate">{item.venue}</span>
                      </div>
                    </div>

                    {isUpcoming && (
                      <button
                        onClick={() => {
                          const section = document.getElementById("register");
                          if (section) {
                            section.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            });
                            section.classList.add(
                              "ring-4",
                              "ring-[#B08D21]",
                              "ring-offset-4",
                            );
                            setTimeout(() => {
                              section.classList.remove(
                                "ring-4",
                                "ring-[#B08D21]",
                                "ring-offset-4",
                              );
                            }, 3000);
                          }
                        }}
                        className="w-full mt-3 py-2 bg-[#B08D21] hover:bg-[#9A7A1D] text-white rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 group/btn hover:shadow-lg hover:shadow-[#B08D21]/30"
                      >
                        Register Now
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Dots */}
          {isMobile && (
            <div className="flex justify-center gap-1.5 mt-3">
              {PROGRAMS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const container = scrollContainerRef.current;
                    if (container) {
                      const cardWidth = container.children[0]?.clientWidth || 0;
                      const gap = 16;
                      container.scrollTo({
                        left: index * (cardWidth + gap),
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-5 bg-[#B08D21]"
                      : "w-1.5 bg-gray-600 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Mobile Swipe Hint */}
          {isMobile && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="h-1 w-10 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-[#B08D21] rounded-full animate-scroll-indicator" />
              </div>
              <span className="text-[10px] text-gray-500 animate-pulse">
                Swipe →
              </span>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 md:mt-12">
          <button
            onClick={() => {
              const section = document.getElementById("register");
              if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="inline-flex items-center gap-2 text-[#B08D21] hover:text-[#D4A92C] font-semibold text-sm transition-colors group"
          >
            <span>Explore all events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
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
          height: 4px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: #2a2a2a;
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #b08d21;
          border-radius: 10px;
        }
        @media (max-width: 768px) {
          .scrollbar-custom::-webkit-scrollbar {
            height: 3px;
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
