'use client';
import { GlowEffect } from '@/components/ui/glow-effect';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowEffectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  className?: string;
  colors?: string[];
  mode?: 'rotate' | 'pulse' | 'breathe' | 'colorShift' | 'flowHorizontal' | 'static';
  blur?: 'softest' | 'soft' | 'medium' | 'strong' | 'stronger' | 'strongest' | 'none';
  duration?: number;
  scale?: number;
  icon?: boolean;
}

export function GlowEffectButton({
  children,
  href,
  className,
  colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'],
  mode = 'colorShift',
  blur = 'soft',
  duration = 3,
  scale = 0.9,
  icon = true,
  ...props
}: GlowEffectButtonProps) {
  const buttonContent = (
    <>
      <div className="relative w-full sm:w-auto h-[56px]">
        <GlowEffect
          colors={colors}
          mode={mode}
          blur={blur}
          duration={duration}
          scale={scale}
        />
        <button 
          className={cn(
            'relative inline-flex items-center justify-center w-full sm:w-auto h-full gap-1.5 rounded-[0.625rem] bg-zinc-950 px-6 sm:px-8 text-sm sm:text-base font-medium text-zinc-50 outline outline-1 outline-[#fff2f21f] hover:scale-105 hover:shadow-md transition-all duration-300',
            className
          )}
          {...props}
        >
          {children}
          {icon && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </>
  );

  if (href) {
    return <Link href={href} className="w-full sm:w-auto h-[56px]">{buttonContent}</Link>;
  }

  return buttonContent;
} 