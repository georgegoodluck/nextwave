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

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 16;
      container.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
    }
  };

  const upcomingPrograms = PROGRAMS.filter(
    (p) =>
      p.status?.toLowerCase() === "upcoming" ||
      p.status?.toLowerCase() === "coming soon",
  );

  return (
    <section
      id="programs"
      className="py-12 md:py-24 px-4 sm:px-6 relative overflow-hidden bg-[#0d0d0d]"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#c9a84c]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 text-[#c9a84c] text-xs font-bold uppercase tracking-widest bg-[#c9a84c]/10 px-4 py-2 rounded-full mb-4 border border-[#c9a84c]/20">
            <Sparkles className="w-4 h-4" />
            <span>Our Initiatives</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 text-white">
            Programs That <span className="text-[#c9a84c]">Transform</span>
          </h2>
          <p className="text-[#7a7270] mt-3 max-w-2xl mx-auto text-sm md:text-base">
            From academic excellence to career building, our initiatives are
            designed to equip you for success.
          </p>

          <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            <div className="flex items-center gap-2 text-[#7a7270] text-xs">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>{upcomingPrograms.length} Upcoming</span>
            </div>
            <div className="w-px h-4 bg-[#333333]" />
            <div className="flex items-center gap-2 text-[#7a7270] text-xs">
              <Users className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span>Virtual & Physical</span>
            </div>
          </div>
        </div>

        {/* Programs Carousel */}
        <div className="relative">
          {/* Desktop Arrows */}
          {!isMobile && showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-[#1a1a1a] hover:bg-[#c9a84c] text-[#b8b0a8] hover:text-[#0d0d0d] p-2.5 rounded-full transition-all border border-[#333333] hover:border-[#c9a84c] shadow-lg hover:scale-110 active:scale-95 touch-manipulation"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          {!isMobile && showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-[#1a1a1a] hover:bg-[#c9a84c] text-[#b8b0a8] hover:text-[#0d0d0d] p-2.5 rounded-full transition-all border border-[#333333] hover:border-[#c9a84c] shadow-lg hover:scale-110 active:scale-95 touch-manipulation"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-custom"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#c9a84c #2a2a2a",
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
                      ? "border-[#c9a84c]/40 bg-gradient-to-br from-[#c9a84c]/10 to-transparent hover:border-[#c9a84c] hover:shadow-2xl hover:shadow-[#c9a84c]/20"
                      : "border-[#333333] bg-[#1a1a1a] hover:border-[#c9a84c]/50 hover:shadow-2xl hover:shadow-[#c9a84c]/10"
                  } hover:-translate-y-2`}
                >
                  {/* Image */}
                  <div className="relative h-40 w-full overflow-hidden">
                    {item.image ? (
                      <>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 260px, 300px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 via-[#0d0d0d]/30 to-transparent" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-[#c9a84c]/30 to-[#c9a84c]/5">
                        {isUpcoming ? "🚀" : "📚"}
                      </div>
                    )}

                    {/* Status */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#c9a84c] bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                        #{index + 1}
                      </span>
                      <StatusBadge status={item.status} />
                    </div>

                    {/* Upcoming Badge */}
                    {isUpcoming && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-[#c9a84c] text-[#0d0d0d] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-[#c9a84c]/50 animate-pulse">
                          <Zap className="w-2.5 h-2.5" />
                          New
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h4 className="text-white font-bold text-base mb-1.5 group-hover:text-[#c9a84c] transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[#7a7270] text-xs leading-relaxed mb-3 line-clamp-2">
                      {item.desc || "An exciting initiative coming your way!"}
                    </p>

                    <div className="space-y-1.5 text-xs border-t border-[#333333] pt-3">
                      <div className="flex items-center gap-2 text-[#b8b0a8]">
                        <CalendarIcon className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
                        <span className="truncate">{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#b8b0a8]">
                        <ClockIcon className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
                        <span className="truncate">{item.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#b8b0a8]">
                        <LocationIcon className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
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
                          }
                        }}
                        className="w-full mt-3 py-2.5 bg-[#c9a84c] hover:bg-[#a8873a] text-[#0d0d0d] rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 active:scale-95 touch-manipulation"
                      >
                        Register Now
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Dots */}
          {isMobile && PROGRAMS.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-3">
              {PROGRAMS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 touch-manipulation ${
                    activeIndex === index
                      ? "w-5 bg-[#c9a84c]"
                      : "w-1.5 bg-[#333333] hover:bg-[#555555]"
                  }`}
                  aria-label={`Go to program ${index + 1}`}
                />
              ))}
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
            className="inline-flex items-center gap-2 text-[#c9a84c] hover:text-[#dbb95c] font-semibold text-sm transition-colors group touch-manipulation"
          >
            <span>Explore all events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: #c9a84c #1a1a1a;
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
          background: #1a1a1a;
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #c9a84c;
          border-radius: 10px;
        }
        @media (max-width: 768px) {
          .scrollbar-custom::-webkit-scrollbar {
            height: 3px;
          }
        }
      `}</style>
    </section>
  );
}
