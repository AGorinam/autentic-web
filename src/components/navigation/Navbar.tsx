"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  return (
    <header className="fixed top-6 left-0 right-0 z-50 mx-auto max-w-7xl px-4">
      <div className="rounded-xl shadow-lg transition-[background] duration-[160ms] ease-[var(--ease-out-quad)] backdrop-blur-[var(--header-blur)] bg-[var(--header-bg)] border border-[var(--header-border)]">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-medium text-slate-800 dark:text-white">autentic.ai</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link 
              href="/product" 
              className={cn(
                "rounded-lg px-6 py-2.5 text-sm font-medium transition-colors",
                pathname === "/product" 
                  ? "bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white"
              )}
            >
              Product
            </Link>
            <Link 
              href="/integrations" 
              className={cn(
                "rounded-lg px-6 py-2.5 text-sm font-medium transition-colors",
                pathname === "/integrations" 
                  ? "bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white"
              )}
            >
              Integrations
            </Link>
            <Link 
              href="/about" 
              className={cn(
                "rounded-lg px-6 py-2.5 text-sm font-medium transition-colors",
                pathname === "/about" 
                  ? "bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white"
              )}
            >
              About
            </Link>
          </nav>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="/login" 
              className="rounded-lg bg-transparent px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/signup" 
              className="rounded-[0.625rem] bg-slate-800 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700 dark:bg-white dark:text-slate-800 dark:hover:bg-white/90 inline-flex items-center transition-colors"
            >
              Start for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-2 pb-3 px-4 mb-4 bg-white/95 backdrop-blur-sm border-t border-slate-200 dark:bg-slate-800/95 dark:border-slate-700 rounded-b-xl">
            <div className="flex flex-col gap-3">
              <Link 
                href="/product" 
                className={cn(
                  "rounded-lg px-5 py-2.5 text-sm font-medium text-center transition-colors",
                  pathname === "/product" 
                    ? "bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white"
                )}
              >
                Product
              </Link>
              <Link 
                href="/integrations" 
                className={cn(
                  "rounded-lg px-5 py-2.5 text-sm font-medium text-center transition-colors",
                  pathname === "/integrations" 
                    ? "bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white"
                )}
              >
                Integrations
              </Link>
              <Link 
                href="/about" 
                className={cn(
                  "rounded-lg px-5 py-2.5 text-sm font-medium text-center transition-colors",
                  pathname === "/about" 
                    ? "bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white"
                )}
              >
                About
              </Link>
              <hr className="my-2 border-slate-200 dark:border-slate-700" />
              <Link 
                href="/login" 
                className="rounded-lg bg-transparent px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white text-center transition-colors"
              >
                Log in
              </Link>
              <Link 
                href="/signup" 
                className="rounded-[0.625rem] bg-slate-800 text-white text-sm px-5 py-2.5 font-medium flex items-center justify-center transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-800 dark:hover:bg-white/90"
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