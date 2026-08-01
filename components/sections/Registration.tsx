"use client";

import { motion } from "framer-motion";
import { Calendar, XCircle, Sparkles } from "lucide-react";

export default function Registration() {
  return (
    <section id="register" className="py-12 md:py-24 px-4 sm:px-6 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 text-[#c9a84c] text-xs font-bold uppercase tracking-widest bg-[#c9a84c]/10 px-4 py-2 rounded-full mb-4 border border-[#c9a84c]/20">
            <Sparkles size={14} />
            <span>Events</span>
          </div>

          <h2 className="text-2xl md:text-5xl font-bold mb-4 text-white">
            No Active <span className="text-[#c9a84c]">Events</span>
          </h2>

          <p className="text-[#7a7270] max-w-2xl mx-auto text-sm md:text-base">
            All events have been completed. Check back later for new
            opportunities to learn, earn, and lead with NextWave Global.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#333333] max-w-md w-full">
              <div className="flex justify-center mb-4">
                <div className="bg-[#c9a84c]/10 p-4 rounded-full border border-[#c9a84c]/20">
                  <Calendar size={32} className="text-[#c9a84c]" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Stay Tuned</h3>
              <p className="text-sm text-[#7a7270]">
                Follow us on social media to be the first to know about upcoming
                events.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
