"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Hero() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="py-24 px-6 text-center"
    >
      <motion.h1
        variants={item}
        className="text-8xl font-black tracking-tighter mb-6"
      >
        LEARN. <span className="text-(--nw-gold)">EARN.</span> LEAD.
      </motion.h1>

      <motion.p
        variants={item}
        className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
      >
        NextWave Global is a movement that empowers students to thrive beyond
        the classroom.
      </motion.p>

      <motion.div variants={item} className="flex gap-4 justify-center">
        <Button variant="primary">Join the Movement</Button>
      </motion.div>
    </motion.section>
  );
}
