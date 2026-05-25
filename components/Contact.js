"use client";

import { useState } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function FloatingField({ label, children }) {
  return (
    <label className="relative block">
      {children}
      <span className="pointer-events-none absolute left-4 top-4 text-xs uppercase tracking-[0.26em] text-white/45 transition-all peer-focus:text-[var(--accent)]">
        {label}
      </span>
    </label>
  );
}

export default function Contact({ contact, socials }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const updateField = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Luxury Project Inquiry from ${formData.name || "Website Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nProject Details:\n${formData.message}`
    );

    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-shell scroll-mt-28 py-24 pb-32 sm:py-28 sm:pb-36">
      <div className="section-inner">
        <div className="glass-panel grid gap-10 rounded-[38px] p-6 sm:p-8 lg:grid-cols-[0.88fr_1.12fr] lg:p-10">
          <div className="space-y-8">
            <SectionHeader
              eyebrow="Contact"
              title={contact.title}
              description={contact.description}
            />

            <div className="grid gap-4">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <Mail className="h-5 w-5 text-[var(--accent)]" />
                <p className="mt-4 text-xs uppercase tracking-[0.28em] text-white/45">Email</p>
                <a href={`mailto:${contact.email}`} className="mt-2 block text-lg text-white">
                  {contact.email}
                </a>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <Phone className="h-5 w-5 text-[var(--accent)]" />
                <p className="mt-4 text-xs uppercase tracking-[0.28em] text-white/45">Call</p>
                <a href={`tel:${contact.phone}`} className="mt-2 block text-lg text-white">
                  {contact.phone}
                </a>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <MapPin className="h-5 w-5 text-[var(--accent)]" />
                <p className="mt-4 text-xs uppercase tracking-[0.28em] text-white/45">Studio Base</p>
                <p className="mt-2 text-lg text-white">{contact.address}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="large"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.24em] text-white/75 transition hover:border-[rgba(212,175,55,0.35)] hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[32px] border border-white/10 bg-black/20 p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <FloatingField label="Full Name">
                <Input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={updateField}
                  required
                />
              </FloatingField>
              <FloatingField label="Email Address">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={updateField}
                  required
                />
              </FloatingField>
            </div>

            <div className="mt-4">
              <FloatingField label="Phone Number">
                <Input
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={updateField}
                />
              </FloatingField>
            </div>

            <div className="mt-4">
              <FloatingField label="Project Brief">
                <Textarea
                  name="message"
                  placeholder="Project Brief"
                  value={formData.message}
                  onChange={updateField}
                  required
                />
              </FloatingField>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-sm leading-7 text-white/55">
                This frontend routes the inquiry into your email client so prospects can reach you immediately.
              </p>
              <Button type="submit" data-cursor="accent">
                Send Inquiry
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
