"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar({ siteData }) {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const sections = useMemo(() => siteData.navigation, [siteData.navigation]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0.1
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [sections]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (!element) {
      return;
    }

    const offset = 90;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[110] px-3 pt-3 sm:px-4 sm:pt-4 lg:px-6">
      <motion.div
        initial={false}
        animate={{
          paddingTop: scrolled ? 10 : 16,
          paddingBottom: scrolled ? 10 : 16
        }}
        className={`mx-auto flex max-w-[1680px] items-center justify-between gap-4 rounded-[30px] border px-4 transition-all duration-500 sm:px-6 min-[1450px]:rounded-full ${
          scrolled
            ? "border-white/12 bg-black/55 shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl"
            : "border-white/8 bg-white/[0.06] backdrop-blur-lg"
        }`}
      >
        <button
          type="button"
          onClick={() => scrollToSection("#home")}
          data-cursor="large"
          className="flex min-w-0 items-center gap-3"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[linear-gradient(180deg,rgba(212,175,55,0.18),rgba(255,255,255,0.04))] shadow-[0_10px_30px_rgba(212,175,55,0.15)]">
            <Image
              src={siteData.brand.logo}
              alt={`${siteData.brand.name} logo`}
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
          </span>
          <div className="min-w-0">
            <p className="font-display truncate text-lg text-white sm:text-xl">{siteData.brand.name}</p>
            <p className="hidden text-[10px] uppercase tracking-[0.22em] text-white/50 md:block xl:text-[11px]">
              {siteData.brand.tagline}
            </p>
          </div>
        </button>

        <nav className="hidden items-center gap-4 min-[1450px]:flex 2xl:gap-6">
          {sections.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.href)}
              data-cursor="large"
              className="group relative py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 transition hover:text-white 2xl:text-xs 2xl:tracking-[0.28em]"
            >
              {item.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-px bg-[linear-gradient(90deg,#D4AF37,rgba(255,255,255,0.25))] transition-all duration-300 ${
                  activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </nav>

        <div className="hidden min-[1450px]:block">
          <Button data-cursor="accent" onClick={() => scrollToSection("#contact")}>
            Start Your Project
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          data-cursor="large"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white min-[1450px]:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel fixed bottom-3 right-3 top-3 flex w-[min(92vw,420px)] flex-col rounded-[28px] border-white/10 p-5 sm:p-6"
          >
            <div className="mb-10 flex items-center justify-between">
              <p className="font-display text-2xl text-white">{siteData.brand.name}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-5">
              {sections.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * index }}
                  onClick={() => scrollToSection(item.href)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm uppercase tracking-[0.28em] text-white/85"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <Button className="mt-8 w-full" onClick={() => scrollToSection("#contact")}>
              Book Consultation
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
