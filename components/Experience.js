"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/SectionHeader";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Experience({ experience }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);

      gsap.from(q(".timeline-item"), {
        opacity: 0,
        y: 60,
        stagger: 0.14,
        ease: "power3.out",
        duration: 0.9,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%"
        }
      });

      gsap.fromTo(
        q(".timeline-line"),
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: true
          }
        }
      );
    },
    { scope }
  );

  return (
    <section id="experience" ref={scope} className="section-shell scroll-mt-28 py-24 sm:py-28">
      <div className="section-inner">
        <SectionHeader
          eyebrow="Journey"
          title="A progression built on premium delivery, trusted relationships, and site excellence."
          description="From site execution to leading complex luxury developments, each chapter sharpened both technical discipline and client experience."
        />

        <div className="relative mt-14 pl-8 sm:pl-12">
          <div className="timeline-line absolute bottom-0 left-2 top-0 w-px bg-[linear-gradient(180deg,rgba(212,175,55,0.9),rgba(255,255,255,0.08))] sm:left-4" />
          <div className="space-y-8">
            {experience.map((item) => (
              <div
                key={item.year + item.title}
                className="timeline-item relative rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8"
              >
                <div className="absolute left-[-2.15rem] top-10 h-5 w-5 rounded-full border border-[rgba(212,175,55,0.45)] bg-[var(--background)] shadow-[0_0_0_6px_rgba(212,175,55,0.1)] sm:left-[-2.65rem]" />
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">{item.year}</p>
                <h3 className="font-display mt-3 text-3xl text-white">{item.title}</h3>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-white/68">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
