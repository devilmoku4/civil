import { cn } from "@/lib/utils";

export function Badge({ className, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[rgba(212,175,55,0.28)] bg-[rgba(212,175,55,0.08)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--accent)]",
        className
      )}
      {...props}
    />
  );
}
