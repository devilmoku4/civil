"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

function Lightbox({ items, activeIndex, setActiveIndex, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const previous = () =>
    setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  const next = () => setActiveIndex((current) => (current + 1) % items.length);
  const currentItem = items[activeIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/88 px-4 py-6 backdrop-blur-xl"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-5xl overflow-hidden rounded-[34px] border border-white/10 bg-black/55"
      >
        <button
          type="button"
          onClick={onClose}
          data-cursor="large"
          className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white"
        >
          <X className="h-5 w-5" />
        </button>
        <Image
          src={currentItem.image}
          alt={currentItem.title}
          width={1600}
          height={1100}
          className="h-[70vh] w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.78))] p-6 sm:p-8">
          <div>
            <p className="font-display text-3xl text-white">{currentItem.title}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.28em] text-white/60">Gallery Frame</p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={previous}
              data-cursor="large"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              data-cursor="large"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery({ gallery }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="gallery" className="section-shell scroll-mt-28 py-24 sm:py-28">
      <div className="section-inner">
        <SectionHeader
          eyebrow="Gallery"
          title={gallery.title}
          description={gallery.intro}
          align="center"
        />

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {gallery.items.map((item, index) => (
            <motion.button
              key={item.image}
              type="button"
              data-cursor="large"
              onClick={() => setActiveIndex(index)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.06 }}
              className="group mb-5 block w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/5 text-left"
            >
              <div className="overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={900}
                  height={1200}
                  className="h-auto w-full transition duration-[1200ms] group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <p className="font-display text-2xl text-white">{item.title}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.28em] text-white/50">
                  Click for lightbox view
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null ? (
          <Lightbox
            items={gallery.items}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onClose={() => setActiveIndex(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
