import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface GetStartedButtonProps {
  href?: string;
  className?: string;
}

export function GetStartedButton({ href, className }: GetStartedButtonProps) {
  const buttonContent = (
    <Button 
      className={`group relative overflow-hidden h-[56px] text-base px-8 cursor-pointer ${className || ""}`} 
      size="lg"
    >
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
        Start building
      </span>
      <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/4 place-items-center transition-all duration-500 bg-primary-foreground/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-black-500">
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </Button>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return buttonContent;
} 