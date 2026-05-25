"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";

export default function Testimonials({ testimonials = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!testimonials.length) {
      setActiveIndex(0);
      return;
    }

    setActiveIndex((current) => Math.min(current, testimonials.length - 1));

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 4800);

    return () => window.clearInterval(interval);
  }, [testimonials.length]);

  const testimonial = testimonials[activeIndex] || { name: "", quote: "", role: "" };

  return (
    <section id="testimonials" className="section-shell scroll-mt-28 py-24 sm:py-28">
      <div className="section-inner">
        <SectionHeader
          eyebrow="Testimonials"
          title="Clients remember the calm process as much as the premium result."
          description="These words reflect the trust, clarity, and execution discipline that keep referrals coming."
          align="center"
        />

        <Card className="mx-auto mt-14 max-w-4xl rounded-[34px] p-8 sm:p-10">
          <div className="mb-8 flex items-center justify-between">
            <Quote className="h-10 w-10 text-[var(--accent)]" />
            <div className="flex gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={`${item.name}-${index}`}
                  type="button"
                  data-cursor="large"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex ? "w-10 bg-[var(--accent)]" : "w-2.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
            >
              <p className="font-display text-3xl leading-tight text-white sm:text-4xl">
                "{testimonial.quote}"
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(212,175,55,0.12)] text-lg font-semibold text-[var(--accent)]">
                  {(testimonial.name || "")
                    .split(" ")
                    .map((part) => (part ? part[0] : ""))
                    .join("")}
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm uppercase tracking-[0.22em] text-white/50">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </section>
  );
}
