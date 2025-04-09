import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ComparisonItemProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  variant?: "chatgpt" | "fray";
}

const ComparisonItem = ({ title, description, icon, variant = "chatgpt" }: ComparisonItemProps) => {
  return (
    <div className="flex items-start gap-3 mb-6 md:mb-8">
      <div className={cn(
        "mt-1 flex-shrink-0 p-2 flex items-center justify-center",
        variant === "chatgpt" 
          ? "rounded-full bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300" 
          : "rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white"
      )}>
        {icon || (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </div>
      <div>
        <h3 className="font-medium text-base md:text-lg">{title}</h3>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

interface ComparisonCardProps {
  className?: string;
}

export function ComparisonCard({ className }: ComparisonCardProps) {
  return (
    <div className={cn("container max-w-[96%] md:max-w-[85%] mx-auto px-4 md:px-6 relative", className)}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 md:mb-12">
        Chatbots Weren&apos;t Built for Product Discovery.
        <br />
        <span className="text-gradient">Autentic</span> <span className="text-pink-500">Is.</span>
      </h2>

      <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 lg:gap-8 w-full">
        {/* ChatGPT Column */}
        <div className="pb-10 md:pb-0 border border-gray-200 dark:border-zinc-700 rounded-xl p-5 md:p-5 lg:p-6 md:border-b-0 md:bg-white/80 md:dark:bg-zinc-950/80 md:backdrop-blur-sm md:rounded-xl md:shadow-sm w-full">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 mr-3 flex items-center justify-center">
              <Image 
                src="/images/chatgpt_logo.png" 
                alt="ChatGPT Logo"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
            </div>
            <span className="text-xl font-bold">ChatGPT</span>
          </div>

          <ComparisonItem
            title="Understands prompts, not feedback"
            description="Great at generating text, but lacks awareness of real user pain points and Product context"
            variant="chatgpt"
          />

          <ComparisonItem
            title="Works at surface-level"
            description="Can't connect to the tools where your customer voice lives"
            variant="chatgpt"
          />

          <ComparisonItem
            title="High effort, low context"
            description="Doesn't distinguish between a bug report, a feature request, or a feature iteration."
            variant="chatgpt"
          />

          <ComparisonItem
            title="Doesn't speak product"
            description="Useful for writing content, but disconnected from real customer voice"
            variant="chatgpt"
          />
        </div>

        {/* Fray Column */}
        <div className="relative p-5 lg:p-6 rounded-xl bg-gradient-to-br from-purple-100/80 to-indigo-100/80 dark:from-purple-900/30 dark:to-indigo-900/30 backdrop-blur-sm md:shadow-sm overflow-hidden w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/80 to-indigo-100/80 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 mr-3 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md text-white">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2L4 6v12l8 4 8-4V6l-8-4z" />
                </svg>
              </div>
              <span className="text-xl font-bold">autentic.ai</span>
            </div>

            <ComparisonItem
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>}
              title="Understands real user feedback"
              description="Understand user feedback in its original form — identifying intent, frustration, and underlying product needs."
              variant="fray"
            />

            <ComparisonItem
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>}
              title="Finds patterns across noise"
              description="Detects topics, urgency and sentiment across multiple sources — even when feedback is noisy or fragmented."
              variant="fray"
            />

            <ComparisonItem
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>}
              title="Thinks like a Product Manager/Designer"
              description="Classifies feedback like a PM: feature request, iteration and bugs and connects them to product impact"
              variant="fray"
            />

            <ComparisonItem
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>}
              title="Connects directly to your customer voice"
              description="Connects with your feedback sources — sales calls, user interviews, reviews ... — and lets you listen to the original message."
              variant="fray"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 