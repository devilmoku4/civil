import { Badge } from "@/components/ui/badge";

export default function SectionHeader({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <Badge>{eyebrow}</Badge>
      <h2 className="font-display gold-line mt-5 text-4xl leading-tight text-white sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-8 text-base leading-8 text-white/70 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
