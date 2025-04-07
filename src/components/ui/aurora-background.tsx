"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import "./aurora-background.css";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen items-center justify-center bg-white dark:bg-zinc-900 text-black dark:text-white transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `absolute -inset-[10px] opacity-75 aurora-element
            [--white:theme(colors.white)] 
            [--black:theme(colors.black)] 
            [--transparent:theme(colors.transparent)]
            [--blue-500:theme(colors.blue.500)]
            [--indigo-500:theme(colors.indigo.500)]
            [--blue-300:theme(colors.blue.300)]
            [--violet-300:theme(colors.violet.300)]
            [--purple-400:theme(colors.purple.400)]
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-500)_15%,var(--purple-400)_20%,var(--violet-300)_25%,var(--blue-300)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:0%_50%,50%_50%]
            filter blur-[15px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:[background-position:50%_50%,0%_50%]
            after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        ></div>
      </div>
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}; 