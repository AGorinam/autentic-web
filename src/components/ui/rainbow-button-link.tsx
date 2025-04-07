import Link from "next/link";
import { RainbowButton } from "@/components/ui/rainbow-button";

interface RainbowButtonLinkProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function RainbowButtonLink({ href, className, children }: RainbowButtonLinkProps) {
  const buttonContent = (
    <RainbowButton className={className}>
      {children}
    </RainbowButton>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return buttonContent;
} 