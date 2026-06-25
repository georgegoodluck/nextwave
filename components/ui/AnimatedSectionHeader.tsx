"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  highlight?: string;
}

export function AnimatedSectionHeader({
  title,
  subtitle,
  icon,
  highlight,
}: AnimatedSectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      {icon && (
        <div className="flex items-center justify-center gap-2 text-[#B08D21] font-bold mb-4">
          {icon}
          <span className="uppercase tracking-widest text-sm">{subtitle}</span>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1A1A1A]">
        {title}
        {highlight && <span className="text-[#B08D21]"> {highlight}</span>}
      </h2>
      {subtitle && !icon && (
        <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}
