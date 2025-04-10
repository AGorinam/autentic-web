"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container px-4 md:px-6 max-w-[96%] md:max-w-[85%] mx-auto py-4">
        <nav className="flex items-center justify-between rounded-[0.625rem] px-3 sm:px-5 py-2 backdrop-blur-md bg-white/30 border border-slate-300/70 dark:border-slate-700/70 shadow-sm">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-800 dark:text-white">autentic.ai</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/#first-feature"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === "/#first-feature"
                  ? "bg-black/5 text-slate-800 font-semibold dark:bg-white/10 dark:text-white"
                  : "text-slate-600 hover:bg-black/5 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              )}
            >
              Product
            </Link>
            <Link
              href="/#integrations"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === "/#integrations"
                  ? "bg-black/5 text-slate-800 font-semibold dark:bg-white/10 dark:text-white"
                  : "text-slate-600 hover:bg-black/5 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              )}
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
                  pathname === "/#first-feature"
                    ? "bg-black/5 text-slate-800 font-semibold dark:bg-white/10 dark:text-white"
                    : "text-slate-600 hover:bg-black/5 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                Product
              </Link>
              <Link
                href="/#integrations"
                className={cn(
                  "rounded-md px-4 py-2.5 text-sm font-medium text-center transition-colors",
                  pathname === "/#integrations"
                    ? "bg-black/5 text-slate-800 font-semibold dark:bg-white/10 dark:text-white"
                    : "text-slate-600 hover:bg-black/5 hover:text-slate-800 hover:font-semibold dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
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
