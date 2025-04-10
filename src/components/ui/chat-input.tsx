"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function ChatInput({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  // Auto resize the textarea as content is added
  const handleInput = React.useCallback(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [])

  React.useEffect(() => {
    handleInput()
    window.addEventListener("resize", handleInput)
    return () => window.removeEventListener("resize", handleInput)
  }, [handleInput])

  return (
    <textarea
      ref={textareaRef}
      onInput={handleInput}
      rows={1}
      className={cn(
        "flex w-full resize-none bg-transparent text-sm shadow-none outline-none placeholder:text-muted-foreground focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
} 