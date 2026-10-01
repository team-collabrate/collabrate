import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Transparent full logo (mark + wordmark) from /brand, so it sits directly on any surface.
export function Logo({ className, imageClassName }: { className?: string; imageClassName?: string }) {
  return (
    <Link href="/" className={cn("flex shrink-0 items-center px-1", className)} aria-label="Collabrate home">
      <Image
        src="/brand/svg/collabrate-full-color.svg"
        alt="Collabrate"
        width={1087}
        height={174}
        priority
        unoptimized
        className={cn("h-8 w-auto", imageClassName)}
      />
    </Link>
  );
}
