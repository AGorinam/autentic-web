import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <div className={cn(
      "inline-block px-4 py-1.5 rounded-full bg-purple-100/80 text-purple-600 text-sm font-medium",
      className
    )}>
      {children}
    </div>
  );
} 