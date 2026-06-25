"use client";

import Image from "next/image";
import { PROGRAMS } from "@/data/programs";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CalendarIcon, ClockIcon, LocationIcon } from "@/components/ui/Icons";

export default function Programs() {
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
            From academic excellence to career building, our initiatives are designed to equip you for success.
          </p>
        </div>

        <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory mask-fade no-scrollbar py-4">
          {PROGRAMS.map((item, index) => (
            <div
              key={item.title}
              className="min-w-[340px] md:min-w-[380px] snap-center rounded-3xl border border-gray-800 bg-gray-900/50 hover:bg-gray-800 transition-all duration-300 hover:border-[#B08D21] hover:-translate-y-2 overflow-hidden group"
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
      </div>
    </section>
  );
}