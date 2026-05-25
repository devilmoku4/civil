"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[120] h-[3px] origin-left bg-[linear-gradient(90deg,#D4AF37,rgba(255,255,255,0.92))]"
      style={{ scaleX }}
    />
  );
}
