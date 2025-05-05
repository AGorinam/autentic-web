"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, ArrowRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");

  // Update active hash when it changes in the URL
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    // Set initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Function to check if a link should be highlighted as active
  const isLinkActive = (href: string) => {
    const hashPart = href.split('#')[1];
    if (!hashPart) return false;
    return activeHash === `#${hashPart}`;
  };

  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Update URL with hash
    window.history.pushState({}, "", `/#${targetId}`);
    setActiveHash(`#${targetId}`);
    
    // Special case for first-feature (Product tab)
    if (targetId === "first-feature") {
      // Using a timeout to ensure DOM is fully loaded
      setTimeout(() => {
        // For mobile specifically
        if (window.innerWidth < 1024) {
          // Try several strategies to find the features section
          
          // 1. Look for specific text content that would only be in the features section
          const findFeaturesByText = () => {
            const allHeadings = Array.from(document.querySelectorAll('h2, h3'));
            for (const heading of allHeadings) {
              if (heading.textContent && 
                  (heading.textContent.includes('Product Teams') || 
                   heading.textContent.includes('features') ||
                   heading.textContent.includes('Built for'))) {
                return heading;
              }
            }
            return null;
          };
          
          // 2. Look for the badge with "Product" text
          const findProductBadge = () => {
            const badges = Array.from(document.querySelectorAll('.badge, [class*="badge"]'));
            for (const badge of badges) {
              if (badge.textContent && badge.textContent.includes('Product')) {
                return badge;
              }
            }
            return null;
          };
          
          // Try different methods to find the target
          const featureHeading = findFeaturesByText();
          const productBadge = findProductBadge();
          
          const targetElement = featureHeading || productBadge;
          
          if (targetElement) {
            // Get closest major container
            const container = targetElement.closest('section') || 
                              targetElement.closest('[class*="feature"]') || 
                              targetElement.closest('div[class*="container"]');
            
            if (container) {
              // Calculate position with sufficient offset to account for header
              const rect = container.getBoundingClientRect();
              const scrollPosition = rect.top + window.pageYOffset - 100;
              
              window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
              });
              return;
            }
          }
          
          // If all else fails, use a hardcoded position that's much further down
          // This number is higher to ensure we get past the chat interface
          window.scrollTo({
            top: 1200, // Much larger value to scroll past the chat
            behavior: 'smooth'
          });
        } else {
          // Desktop handling (unchanged)
          const element = document.getElementById(targetId);
          if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }, 300);
      return;
    }
    
    // For other sections, use the original approach
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container px-4 md:px-6 max-w-[96%] md:max-w-[85%] mx-auto py-4">
        <nav className="flex items-center justify-between rounded-[0.625rem] px-3 sm:px-5 py-2 backdrop-blur-md bg-white/30 border border-slate-300/70 dark:border-slate-700/70 shadow-sm">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">autentic</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/#first-feature"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isLinkActive("/#first-feature")
                  ? "bg-black/5 text-slate-800 font-semibold dark:bg-white/10 dark:text-white"
                  : "text-slate-600 hover:bg-black/5 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              )}
              onClick={(e) => handleHashLinkClick(e, "first-feature")}
            >
              Product
            </Link>
            <Link
              href="/#integrations"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isLinkActive("/#integrations")
                  ? "bg-black/5 text-slate-800 font-semibold dark:bg-white/10 dark:text-white"
                  : "text-slate-600 hover:bg-black/5 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              )}
              onClick={(e) => handleHashLinkClick(e, "integrations")}
            >
              Integrations
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-md bg-transparent px-3 py-2 text-sm font-medium text-slate-600 hover:bg-black/5 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-800 dark:hover:bg-white/90 inline-flex items-center transition-colors"
            >
              Start for free
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-[0.625rem] bg-white/80 backdrop-blur-md border border-slate-300/70 dark:border-slate-700/70 shadow-sm">
            <div className="flex flex-col gap-3">
              <Link
                href="/#first-feature"
                className={cn(
                  "rounded-md px-4 py-2.5 text-sm font-medium text-center transition-colors",
                  isLinkActive("/#first-feature")
                    ? "bg-black/5 text-slate-800 font-semibold dark:bg-white/10 dark:text-white"
                    : "text-slate-600 hover:bg-black/5 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
                onClick={(e) => handleHashLinkClick(e, "first-feature")}
              >
                Product
              </Link>
              <Link
                href="/#integrations"
                className={cn(
                  "rounded-md px-4 py-2.5 text-sm font-medium text-center transition-colors",
                  isLinkActive("/#integrations")
                    ? "bg-black/5 text-slate-800 font-semibold dark:bg-white/10 dark:text-white"
                    : "text-slate-600 hover:bg-black/5 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
                onClick={(e) => handleHashLinkClick(e, "integrations")}
              >
                Integrations
              </Link>
              <hr className="my-2 border-slate-200/50 dark:border-slate-700/50" />
              <Link
                href="/login"
                className="rounded-md bg-transparent px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-black/5 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white text-center transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-slate-800 text-white text-sm px-4 py-2.5 font-semibold flex items-center justify-center transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-800 dark:hover:bg-white/90"
              >
                Start for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
