import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// One flat fill with a hairline shadow, no gradient. Shared by the light home
// page and the dark kept pages, so nothing here assumes a background colour.
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue",
  {
    variants: {
      variant: {
        primary: "bg-brand-blue text-white shadow-[0_1px_2px_rgba(7,9,26,0.16)] hover:bg-brand-blue-hover",
        ghost: "border border-brand-muted/50 bg-transparent text-current hover:border-current",
        hero: "bg-brand-blue text-white shadow-[0_1px_2px_rgba(7,9,26,0.16)] hover:bg-brand-blue-hover",
      },
      size: {
        sm: "min-h-9 px-4 text-sm",
        md: "min-h-11 px-5 text-sm",
        lg: "min-h-12 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
