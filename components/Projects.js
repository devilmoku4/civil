"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarRange, ChevronLeft, ChevronRight, MapPin, Ruler, X } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ProjectModal({ project, onClose }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const previous = () =>
    setActiveImage((current) => (current === 0 ? project.images.length - 1 : current - 1));
  const next = () => setActiveImage((current) => (current + 1) % project.images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[130] bg-black/85 px-4 py-6 backdrop-blur-xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-[36px]"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">{project.category}</p>
            <h3 className="font-display mt-2 text-3xl text-white">{project.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-cursor="large"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid flex-1 gap-8 overflow-y-auto p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="relative overflow-hidden rounded-[30px]">
              <Image
                src={project.images[activeImage]}
                alt={project.title}
                width={1400}
                height={900}
                className="h-[360px] w-full object-cover sm:h-[440px]"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                <button
                  type="button"
                  onClick={previous}
                  data-cursor="large"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white backdrop-blur-md"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  data-cursor="large"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white backdrop-blur-md"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {project.images.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  onClick={() => setActiveImage(index)}
                  data-cursor="large"
                  className={`overflow-hidden rounded-[18px] border ${
                    activeImage === index ? "border-[var(--accent)]" : "border-white/10"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${project.title} preview ${index + 1}`}
                    width={400}
                    height={300}
                    className="h-24 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-base leading-8 text-white/72">{project.summary}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                <CalendarRange className="h-5 w-5 text-[var(--accent)]" />
                <p className="mt-4 text-xs uppercase tracking-[0.28em] text-white/45">Status</p>
                <p className="mt-2 text-lg text-white">{project.year}</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                <MapPin className="h-5 w-5 text-[var(--accent)]" />
                <p className="mt-4 text-xs uppercase tracking-[0.28em] text-white/45">Location</p>
                <p className="mt-2 text-lg text-white">{project.location}</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                <Ruler className="h-5 w-5 text-[var(--accent)]" />
                <p className="mt-4 text-xs uppercase tracking-[0.28em] text-white/45">Scope</p>
                <p className="mt-2 text-lg text-white">{project.area}</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {project.details.map((item) => (
                <div
                  key={item}
                  className="rounded-[20px] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-7 text-white/68"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects({ projects }) {
  const scope = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);

      gsap.from(q(".project-card"), {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        ease: "power3.out",
        duration: 0.95,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 65%"
        }
      });
    },
    { scope }
  );

  return (
    <section id="projects" ref={scope} className="section-shell scroll-mt-28 py-24 sm:py-28">
      <div className="section-inner">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Projects"
            title="Signature builds curated to feel immediate, elevated, and unforgettable."
            description="Each project is presented as a visual sales story, with space, engineering logic, and finish quality working together."
          />
          <Button
            variant="secondary"
            data-cursor="large"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Discuss Your Project
          </Button>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              whileHover={{ y: -8 }}
              className={`project-card group relative overflow-hidden rounded-[34px] border border-white/10 ${
                index === 0 ? "lg:row-span-2" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                data-cursor="large"
                className="block h-full w-full text-left"
              >
                <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.82))]" />
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  width={1200}
                  height={1000}
                  className={`h-full w-full object-cover transition duration-[1600ms] group-hover:scale-110 ${
                    index === 0 ? "min-h-[620px]" : "min-h-[300px]"
                  }`}
                />
                <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8">
                  <div className="mb-5 flex flex-wrap gap-3">
                    {project.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} className="bg-black/30 text-white">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
                    {project.category}
                  </p>
                  <h3 className="font-display mt-3 text-3xl text-white sm:text-4xl">{project.title}</h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">{project.summary}</p>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
