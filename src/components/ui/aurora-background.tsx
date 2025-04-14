"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import "./aurora-background.css";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  colorPrimary?: string;
  colorSecondary?: string;
  colorTertiary?: string;
  colorQuaternary?: string;
  colorQuinary?: string;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  colorPrimary = "rgba(59, 130, 246, 1)",
  colorSecondary = "rgba(99, 102, 241, 1)",
  colorTertiary = "rgba(168, 85, 247, 0.9)",
  colorQuaternary = "rgba(139, 92, 246, 0.9)",
  colorQuinary = "rgba(93, 169, 255, 0.9)",
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
            `absolute -inset-[10px] opacity-60 aurora-element
            [--white:theme(colors.white)] 
            [--black:theme(colors.black)] 
            [--transparent:theme(colors.transparent)]`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
          style={{
            '--color-primary': colorPrimary,
            '--color-secondary': colorSecondary,
            '--color-tertiary': colorTertiary,
            '--color-quaternary': colorQuaternary,
            '--color-quinary': colorQuinary,
            '--aurora': `repeating-linear-gradient(100deg, var(--color-primary) 10%, var(--color-secondary) 15%, var(--color-tertiary) 20%, var(--color-quaternary) 25%, var(--color-quinary) 30%)`,
            '--white-gradient': 'repeating-linear-gradient(100deg, var(--white) 0%, var(--white) 7%, var(--transparent) 10%, var(--transparent) 12%, var(--white) 16%)',
            '--dark-gradient': 'repeating-linear-gradient(100deg, var(--black) 0%, var(--black) 7%, var(--transparent) 10%, var(--transparent) 12%, var(--black) 16%)',
            backgroundImage: 'var(--white-gradient), var(--aurora)',
            backgroundSize: '300%, 200%',
            backgroundPosition: '0% 50%, 50% 50%',
            filter: 'blur(20px)',
          } as React.CSSProperties}
        >
          <div 
            className="absolute inset-0 opacity-70 mix-blend-soft-light pointer-events-none will-change-transform dark:invert-0 invert"
            style={{
              backgroundImage: 'var(--white-gradient), var(--aurora)',
              backgroundSize: '200%, 100%',
              backgroundPosition: '70% 50%, 0% 50%',
              backgroundAttachment: 'fixed',
              filter: 'blur(5px)',
            } as React.CSSProperties}
          ></div>
        </div>
      </div>
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}; 