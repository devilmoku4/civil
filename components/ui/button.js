import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-[linear-gradient(135deg,rgba(212,175,55,1),rgba(255,236,175,0.92))] text-black shadow-[0_18px_50px_rgba(212,175,55,0.22)] hover:shadow-[0_24px_60px_rgba(212,175,55,0.32)]",
  secondary:
    "border border-white/15 bg-white/5 text-white hover:border-[rgba(212,175,55,0.45)] hover:bg-white/10",
  ghost:
    "bg-transparent text-white hover:bg-white/8"
};

export function Button({ className, variant = "primary", ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-[0.16em] uppercase transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(212,175,55,0.6)] sm:px-6",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
