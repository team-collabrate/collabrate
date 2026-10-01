import { cn } from "@/lib/utils";

/**
 * Generated gradient-mesh surface used in place of a stock photo. Pure CSS:
 * layered radial gradients in the brand palette over a tinted base, plus a
 * film-grain overlay (`.grain` in globals.css). Decorative only.
 */
export function MeshBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("grain pointer-events-none absolute inset-0 overflow-hidden bg-tint-violet", className)}
    >
      <div className="absolute -left-[10%] -top-[20%] h-[70%] w-[60%] rounded-full bg-[#B98CF0] opacity-70 blur-[110px] dark:opacity-35" />
      <div className="absolute right-[-10%] top-[5%] h-[65%] w-[55%] rounded-full bg-[#FFC9A3] opacity-80 blur-[120px] dark:opacity-30" />
      <div className="absolute bottom-[-25%] left-[25%] h-[60%] w-[55%] rounded-full bg-[#F6B5D6] opacity-70 blur-[120px] dark:opacity-30" />
    </div>
  );
}
