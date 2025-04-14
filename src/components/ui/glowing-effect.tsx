'use client';

import { cn } from '@/lib/utils';
import { GlowEffect } from '@/components/ui/glow-effect';

interface GlowingEffectProps {
  glow: boolean;
  disabled?: boolean;
  className?: string;
}

export function GlowingEffect({
  glow,
  disabled = false,
  className,
}: GlowingEffectProps) {
  if (!glow || disabled) return null;
  
  return (
    <GlowEffect 
      className={cn("absolute inset-0 opacity-30", className)}
      colors={['#8B5CF6', '#A855F7', '#6366F1', '#C084FC']} // Purple/indigo colors
      mode="static"
      blur="none"
      scale={1.05}
      duration={4}
    />
  );
} 