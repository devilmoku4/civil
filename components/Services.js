"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Building2, HardHat } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const icons = {
  Building2,
  BriefcaseBusiness,
  HardHat
};

function TiltCard({ service, index }) {
  const [style, setStyle] = useState({});
  const Icon = icons[service.icon] || Building2;

  const handleMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = ((x / bounds.width) - 0.5) * 10;
    const rotateX = (0.5 - y / bounds.height) * 10;

    setStyle({
      transform: `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay: index * 0.12, duration: 0.75 }}
      onMouseMove={handleMove}
      onMouseLeave={() =>
        setStyle({ transform: "perspective(1400px) rotateX(0deg) rotateY(0deg)" })
      }
      data-cursor="large"
      className="shine-border relative rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-7 transition-transform duration-300"
      style={style}
    >
      <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(212,175,55,0.12)] text-[var(--accent)]">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="font-display text-3xl text-white">{service.title}</h3>
      <p className="mt-5 text-sm leading-8 text-white/65">{service.description}</p>
      <div className="mt-8 h-px w-full bg-[linear-gradient(90deg,rgba(212,175,55,0.7),transparent)]" />
      <p className="mt-6 text-xs uppercase tracking-[0.28em] text-white/45">
        Bespoke planning. Flawless delivery.
      </p>
    </motion.article>
  );
}

export default function Services({ services }) {
  return (
    <section id="services" className="section-shell scroll-mt-28 py-24 sm:py-28">
      <div className="section-inner">
        <SectionHeader
          eyebrow="Services"
          title="High-touch engineering services for spaces that need to feel exceptional."
          description="Every service is designed to reduce friction, elevate the finish, and make the client experience feel as premium as the architecture itself."
          align="center"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <TiltCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
