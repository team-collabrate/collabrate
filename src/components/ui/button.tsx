import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-[--color-brand-purple]",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset] hover:shadow-lg hover:-translate-y-0.5",
        gradient:
          "text-white bg-[linear-gradient(90deg,#FF9F43,#F7686F,#CF6CAD,#B154B3,#8A2BE2)] bg-[length:200%_auto] hover:bg-[position:100%_0] shadow-[0_8px_30px_-6px_rgba(138,43,226,0.55)] hover:shadow-[0_12px_40px_-4px_rgba(138,43,226,0.7)] hover:-translate-y-0.5",
        outline:
          "border border-border bg-transparent hover:bg-surface hover:-translate-y-0.5",
        ghost: "hover:bg-surface",
        glass:
          "backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:-translate-y-0.5",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
