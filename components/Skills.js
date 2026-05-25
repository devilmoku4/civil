"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";

function SkillBar({ skill, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });

  return (
    <Card className="rounded-[28px] border-white/8 bg-white/[0.04] p-5">
      <div ref={ref} className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-2xl text-white">{skill.name}</p>
          <p className="mt-2 max-w-md text-sm leading-7 text-white/60">{skill.description}</p>
        </div>
        <span className="text-lg font-semibold text-[var(--accent)]">{skill.value}%</span>
      </div>
      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/8">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isInView ? 1 : 0 }}
          transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left center", width: `${skill.value}%` }}
          className="h-full rounded-full bg-[linear-gradient(90deg,#D4AF37,rgba(255,255,255,0.92))]"
        />
      </div>
    </Card>
  );
}

export default function Skills({ skills }) {
  return (
    <section id="skills" className="section-shell scroll-mt-28 py-24 sm:py-28">
      <div className="section-inner grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-8">
          <SectionHeader eyebrow="Skills" title={skills.title} description={skills.intro} />
          <Card className="rounded-[30px] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
              Design + Delivery
            </p>
            <p className="font-display mt-4 text-3xl leading-tight text-white">
              Premium outcomes need elegant engineering under every visible surface.
            </p>
            <p className="mt-5 text-sm leading-7 text-white/65">
              My workflow stays detail-rich from planning and vendor alignment to
              finishing sequences and final handover polish.
            </p>
          </Card>
        </div>

        <div className="grid gap-4">
          {skills.items.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
