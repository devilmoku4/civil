import { cn } from "@/lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "peer h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 pt-5 text-sm text-white outline-none transition duration-300 placeholder:text-transparent focus:border-[rgba(212,175,55,0.5)] focus:bg-black/35",
        className
      )}
      {...props}
    />
  );
}
