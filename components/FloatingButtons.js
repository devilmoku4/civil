"use client";

import { motion } from "framer-motion";
import { MessageCircleMore, PhoneCall } from "lucide-react";

export default function FloatingButtons({ waHref = "https://wa.me/919876543210", telHref = "tel:+919876543210" }) {
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3 sm:bottom-8 sm:right-8">
      <motion.a
        href={waHref}
        target="_blank"
        rel="noreferrer"
        data-cursor="accent"
        className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/35 bg-emerald-500/20 text-emerald-200 shadow-[0_18px_45px_rgba(16,185,129,0.25)] backdrop-blur-xl"
        animate={{
          scale: [1, 1.07, 1],
          boxShadow: [
            "0 18px 45px rgba(16,185,129,0.25)",
            "0 22px 60px rgba(16,185,129,0.4)",
            "0 18px 45px rgba(16,185,129,0.25)"
          ]
        }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <MessageCircleMore className="h-5 w-5" />
      </motion.a>
      <motion.a
        href={telHref}
        data-cursor="accent"
        className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(212,175,55,0.35)] bg-[rgba(212,175,55,0.16)] text-[var(--accent)] shadow-[0_18px_45px_rgba(212,175,55,0.22)] backdrop-blur-xl"
        whileHover={{ y: -4 }}
      >
        <PhoneCall className="h-5 w-5" />
      </motion.a>
    </div>
  );
}
