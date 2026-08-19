import React from "react";
import { cn } from "@/lib/utils";

// Define the type for a single social media / tool item
export interface SocialItem {
  href: string;
  ariaLabel: string;
  tooltip: string;
  svgUrl: string;
  color: string;
}

// Define the props for the SocialTooltip component
export interface SocialTooltipProps extends React.HTMLAttributes<HTMLUListElement> {
  items: SocialItem[];
}

const SocialTooltip = React.forwardRef<HTMLUListElement, SocialTooltipProps>(
  ({ className, items, ...props }, ref) => {
    // Base styles for the component
    const baseIconStyles =
      "relative flex items-center justify-center w-12 h-12 rounded-full bg-background overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg";
    const baseSvgStyles =
      "relative z-10 w-7 h-7 text-foreground transition-colors duration-300 ease-in-out group-hover:text-white";
    const baseFilledStyles =
      "absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full";
    // Glass tooltip, positioned above the icon (not below) so it never gets
    // clipped by whatever sits under the row, and never reuses the brand
    // color already used for the icon's hover fill.
    const baseTooltipStyles =
      "glass absolute top-[-38px] left-1/2 -translate-x-1/2 px-2.5 py-1.5 text-xs font-medium text-foreground whitespace-nowrap rounded-md shadow-sm opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:top-[-46px] z-20";

    return (
      <ul
        ref={ref}
        className={cn("flex items-center justify-center gap-4", className)}
        {...props}
      >
        {items.map((item, index) => (
          <li key={index} className="relative group">
            <a
              href={item.href}
              aria-label={item.ariaLabel}
              className={cn(baseIconStyles)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={cn(baseFilledStyles)}
                style={{ backgroundColor: item.color }}
              />
              <img
                src={item.svgUrl}
                alt={item.ariaLabel}
                className={cn(baseSvgStyles)}
              />
            </a>
            <div className={cn(baseTooltipStyles)}>{item.tooltip}</div>
          </li>
        ))}
      </ul>
    );
  }
);
SocialTooltip.displayName = "SocialTooltip";

export { SocialTooltip };
