"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function splitTitle(title) {
  return title.split(" ").map((word) => `${word} `);
}

export default function Hero({ hero, contact }) {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 800], [0, 140]);
  const cardY = useTransform(scrollY, [0, 800], [0, -60]);

  return (
    <section
      id="home"
      className="curve-divider section-shell scroll-mt-28 overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36"
    >
      <div className="section-inner relative">
        <div className="absolute inset-x-0 top-14 -z-10 h-[520px] rounded-[34px] bg-[radial-gradient(circle_at_20%_15%,rgba(212,175,55,0.16),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.12),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] sm:top-20 sm:h-[680px] sm:rounded-[48px]" />
        <Image
          src="/images/ornament.svg"
          alt=""
          width={420}
          height={420}
          className="pointer-events-none absolute -right-10 top-4 -z-10 hidden opacity-70 lg:block"
        />

        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div className="max-w-3xl min-w-0">
            <Badge>{hero.eyebrow}</Badge>
            <div className="mt-6 flex flex-wrap items-center gap-2.5 text-[10px] uppercase tracking-[0.2em] text-white/55 sm:mt-7 sm:gap-3 sm:text-xs sm:tracking-[0.28em]">
              <span className="rounded-full border border-white/10 px-3 py-2 sm:px-4">{hero.location}</span>
              {hero.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 sm:px-4"
                >
                  {item}
                </span>
              ))}
            </div>

            <h1 className="font-display text-balance mt-7 text-[clamp(3.2rem,11vw,5.6rem)] leading-[0.95] text-white sm:mt-8">
              {splitTitle(hero.title).map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{ opacity: 0, y: 80, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.08 * index
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:mt-8 sm:text-lg sm:leading-8 lg:text-xl"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Button
                data-cursor="accent"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                data-cursor="large"
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {hero.secondaryCta.label}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="mt-10 flex flex-wrap items-center gap-4 text-sm text-white/55 sm:mt-14 sm:gap-6"
            >
              <div className="flex items-center gap-3">
                <MousePointer2 className="h-4 w-4 text-[var(--accent)]" />
                Scroll to discover the portfolio
              </div>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[var(--accent)]" />
                Premium consultations available across India
              </a>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div style={{ y: imageY }} className="relative mx-auto max-w-[620px]">
              <div className="shine-border relative overflow-hidden rounded-[40px]">
                <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.55))]" />
                <div className="absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-black/30 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-md sm:left-6 sm:top-6 sm:px-4 sm:text-[11px] sm:tracking-[0.28em]">
                  Signature Delivery
                </div>
                <Image
                  src={hero.heroImage}
                  alt={hero.title}
                  width={1200}
                  height={1500}
                  priority
                  className="h-[420px] w-full object-cover sm:h-[560px] lg:h-[680px]"
                />
              </div>
            </motion.div>

            <motion.div
              style={{ y: cardY }}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="glass-panel relative mt-4 max-w-sm rounded-[28px] p-5 sm:absolute sm:-bottom-6 sm:left-auto sm:right-6 sm:mt-0 sm:p-7"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
                {hero.spotlight.label}
              </p>
              <h3 className="font-display mt-3 text-2xl text-white">{hero.spotlight.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">{hero.spotlight.description}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
