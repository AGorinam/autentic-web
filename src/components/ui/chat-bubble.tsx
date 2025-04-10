"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received"
  children: React.ReactNode
}

export function ChatBubble({
  className,
  variant = "received",
  children,
  ...props
}: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 p-2",
        variant === "sent" ? "flex-row-reverse" : "flex-row",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface ChatBubbleAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  fallback: string
}

export function ChatBubbleAvatar({
  className,
  src,
  fallback,
  ...props
}: ChatBubbleAvatarProps) {
  return (
    <div
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium border border-transparent hover:border-gray-200 transition-colors overflow-hidden",
        className
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={fallback}
          width={32}
          height={32}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        fallback
      )}
    </div>
  )
}

interface ChatBubbleMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received"
  isLoading?: boolean
}

export function ChatBubbleMessage({
  className,
  variant = "received",
  isLoading = false,
  children,
  ...props
}: ChatBubbleMessageProps) {
  return (
    <div
      className={cn(
        "max-w-[85%] rounded-lg px-3 py-2 text-sm",
        variant === "sent"
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-muted shadow-sm",
        isLoading && "animate-pulse",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="flex space-x-1">
          <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
          <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
          <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
        </div>
      ) : (
        children
      )}
    </div>
  )
} 