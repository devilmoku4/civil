"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function CounterValue({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let frameId;
    const start = performance.now();
    const duration = 1600;

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setCount(Math.floor(value * (1 - Math.pow(1 - progress, 3))));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display text-4xl text-white sm:text-5xl">
      {count}
      {suffix}
    </span>
  );
}

export default function About({ about, stats }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);

      gsap.fromTo(
        q(".about-image"),
        { clipPath: "inset(0 100% 0 0 round 40px)", scale: 1.15 },
        {
          clipPath: "inset(0 0% 0 0 round 40px)",
          scale: 1,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 70%"
          }
        }
      );

      gsap.from(q(".about-card"), {
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 65%"
        }
      });
    },
    { scope }
  );

  return (
    <section id="about" ref={scope} className="section-shell scroll-mt-28 py-24 sm:py-28">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75 }}
          className="glass-panel mb-14 grid gap-6 overflow-hidden rounded-[34px] p-5 sm:p-6 lg:grid-cols-[320px_1fr] lg:items-center"
        >
          <div className="overflow-hidden rounded-[28px]">
            <Image
              src={about.profile.image}
              alt={about.profile.name}
              width={900}
              height={1100}
              className="h-[340px] w-full object-cover sm:h-[420px] lg:h-[360px]"
            />
          </div>

          <div className="px-1 lg:px-4">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
              Meet the Engineer
            </p>
            <h3 className="font-display mt-4 text-3xl text-white sm:text-4xl">
              {about.profile.name}
            </h3>
            <p className="mt-3 text-sm uppercase tracking-[0.24em] text-white/55">
              {about.profile.role}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">
              {about.profile.summary}
            </p>
          </div>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="About"
              title={about.title}
              description={about.description}
            />
            <p className="mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              {about.detail}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <Card key={stat.label} className="about-card rounded-[26px] p-5">
                  <CounterValue value={stat.value} suffix={stat.suffix} />
                  <p className="mt-3 text-sm uppercase tracking-[0.22em] text-white/55">
                    {stat.label}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="about-image relative overflow-hidden rounded-[40px]">
              <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(10,10,10,0.05),rgba(10,10,10,0.62))]" />
              <Image
                src={about.image}
                alt={about.title}
                width={1200}
                height={1400}
                className="h-[580px] w-full object-cover"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.8 }}
              className="glass-panel absolute -bottom-8 left-0 right-0 mx-4 grid gap-4 rounded-[28px] p-4 sm:mx-8 sm:grid-cols-3 sm:p-5"
            >
              {about.cards.map((card) => (
                <div
                  key={card.title}
                  className="about-card rounded-[22px] border border-white/8 bg-black/25 p-4"
                >
                  <p className="font-display text-xl text-white">{card.title}</p>
                  <p className="mt-3 text-sm leading-7 text-white/65">{card.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
