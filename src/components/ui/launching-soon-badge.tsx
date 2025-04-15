"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface LaunchingSoonBadgeProps {
  className?: string;
  onClick?: () => void;
}

export function LaunchingSoonBadge({ className, onClick }: LaunchingSoonBadgeProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative w-fit cursor-pointer rounded-full bg-purple-100 border border-[#9810fa]/30 px-5 py-2 text-sm font-medium text-purple-600 transition-all hover:bg-purple-200",
        className
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-purple-500" />
        <span className="text-purple-600">Launching Soon —</span> <span className="font-semibold text-purple-600">Join Waitlist</span>
      </span>
    </div>
  );
} 