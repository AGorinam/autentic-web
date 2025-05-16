"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container px-4 md:px-6 max-w-[96%] md:max-w-[85%] mx-auto py-4">
        <nav className="flex items-center justify-between rounded-[0.625rem] px-3 sm:px-5 py-2 backdrop-blur-md bg-white/30 border border-slate-300/70 dark:border-slate-700/70 shadow-sm">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 relative">
              <Image
                src="/images/logo-autentic-1.svg"
                alt="Autentic Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <span className="text-3xl font-extrabold text-black tracking-tight hidden sm:inline">
              autentic
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Navigation items are commented out */}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            {/* Login link is commented out */}
            <Link
              href="/signup"
              className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-800 dark:hover:bg-white/90 inline-flex items-center transition-colors"
            >
              <span className="hidden sm:inline">Book a demo</span>
              <span className="sm:hidden">Demo</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
