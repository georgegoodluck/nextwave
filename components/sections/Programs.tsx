"use client";

import { PROGRAMS, Program } from "@/data/programs";

export default function Programs() {
  return (
    <section id="programs" className="py-24 bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center">
          Our Initiatives
        </h2>

        {/* Container with fade mask and snap behavior */}
        <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory mask-fade no-scrollbar py-4">
          {PROGRAMS.map((item, index) => (
            <div
              key={item.title}
              className="min-w-[320px] md:min-w-100 snap-center p-10 rounded-3xl border border-gray-800 bg-gray-900/50 hover:bg-gray-800 transition-all duration-300 hover:border-[#B08D21] hover:-translate-y-2 cursor-pointer"
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-bold text-[#B08D21] uppercase tracking-widest">
                  0{index + 1}
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    item.status === "Upcoming"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : item.status === "Coming Soon"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h4 className="text-white font-bold text-2xl mb-3">
                {item.title}
              </h4>
              <p className="text-gray-400 leading-relaxed mb-4">{item.desc}</p>

              {/* Event Details */}
              <div className="space-y-2 text-sm border-t border-gray-800 pt-4 mt-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <svg
                    className="w-4 h-4 text-[#B08D21]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <svg
                    className="w-4 h-4 text-[#B08D21]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{item.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <svg
                    className="w-4 h-4 text-[#B08D21]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{item.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
