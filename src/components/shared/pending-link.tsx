"use client";

import { Lock } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { isPending } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Renders a CTA that points at a real link, or a visibly-disabled
 * placeholder state when the href is still PENDING_LINK / PENDING_CALENDLY_LINK.
 * Never fabricates a working URL for a link that hasn't been provided yet.
 */
export function PendingLink({
  href,
  children,
  className,
  variant,
  size,
  pendingLabel = "Link coming soon",
  ...props
}: {
  href: string | undefined;
  children: React.ReactNode;
  className?: string;
  pendingLabel?: string;
} & Omit<ButtonProps, "href">) {
  if (isPending(href)) {
    return (
      <Button
        type="button"
        variant={variant}
        size={size}
        disabled
        data-todo="pending-link"
        aria-disabled="true"
        title={pendingLabel}
        className={cn("opacity-60 cursor-not-allowed", className)}
        {...props}
      >
        <Lock className="size-3.5" />
        {children}
      </Button>
    );
  }

  return (
    <Button variant={variant} size={size} className={className} asChild {...props}>
      <a href={href} target={href!.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {children}
      </a>
    </Button>
  );
}

export function PendingIconLink({
  href,
  icon: IconCmp,
  label,
  className,
}: {
  href: string | undefined;
  icon: React.ElementType;
  label: string;
  className?: string;
}) {
  if (isPending(href)) {
    return (
      <span
        data-todo="pending-link"
        aria-disabled="true"
        title={`${label} link coming soon`}
        className={cn(
          "flex size-11 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground/50 cursor-not-allowed",
          className
        )}
      >
        <IconCmp className="size-4" />
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-purple hover:text-brand-purple",
        className
      )}
    >
      <IconCmp className="size-4" />
    </a>
  );
}
