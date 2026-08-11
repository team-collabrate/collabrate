import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, imageClassName }: { className?: string; imageClassName?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 shrink-0", className)} aria-label="Collabrate home">
      <Image
        src="/logo-mark.png"
        alt="Collabrate logo mark"
        width={28}
        height={28}
        priority
        className={cn("h-7 w-7", imageClassName)}
      />
      <span className="text-xl font-semibold tracking-tight text-foreground font-[family-name:var(--font-display)]">
        Collabrate
      </span>
    </Link>
  );
}
