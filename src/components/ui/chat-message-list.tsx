"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function ChatMessageList({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const listRef = React.useRef<HTMLDivElement>(null)
  
  // No auto-scrolling logic here - we'll handle it in the parent component

  return (
    <div
      ref={listRef}
      className={cn("flex flex-col space-y-3 p-3 w-full", className)}
      {...props}
    >
      {children}
      <div className="h-1" /> {/* Spacer at the bottom */}
    </div>
  )
} 