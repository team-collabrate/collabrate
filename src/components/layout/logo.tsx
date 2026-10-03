import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Vector logo from /brand/svg. `tone="white"` is for dark or photographic surfaces
// (the colour wordmark fades to a pale pink that disappears there).
export function Logo({
  className,
  imageClassName,
  tone = "color",
}: {
  className?: string;
  imageClassName?: string;
  tone?: "color" | "white";
}) {
  return (
    <Link href="/" className={cn("flex min-h-11 shrink-0 items-center px-1", className)} aria-label="Collabrate home">
      <Image
        src={`/brand/svg/collabrate-full-${tone}.svg`}
        alt="Collabrate"
        width={1087}
        height={174}
        priority
        unoptimized
        className={cn("h-8 w-auto transition-opacity duration-300", imageClassName)}
      />
    </Link>
  );
}
