export default function Footer({ siteData }) {
  return (
    <footer className="border-t border-white/8 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl text-white">{siteData.brand.name}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.24em] text-white/45">
            {siteData.brand.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.24em] text-white/55">
            {siteData.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="large"
                className="transition hover:text-[var(--accent)]"
              >
                {social.label}
              </a>
            ))}
          </div>
          <p className="text-sm text-white/35">
            © 2026 {siteData.brand.name}. Crafted for a premium client experience.
          </p>
        </div>
      </div>
    </footer>
  );
}
