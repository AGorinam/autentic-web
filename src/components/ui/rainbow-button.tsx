import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type RainbowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-14 cursor-pointer items-center rounded-[0.625rem] border-0 bg-[length:200%] px-8 py-2 font-medium text-white transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",

        // Animation styles
        "[animation:rainbow_4s_linear_infinite]",

        // before styles (glow effect)
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:[animation:rainbow_4s_linear_infinite] before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",

        // Background (black in light mode)
        "bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",

        // dark mode colors (black button preserved in dark mode)
        "dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",

        className,
      )}
      {...props}
    >
      <div className="relative z-10 flex items-center justify-center w-full">
        <span>{children}</span>
        <ChevronRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </button>
  );
} 