"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Draggable, DraggableRef } from "@/components/ui/draggable";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { RainbowButtonLink } from "@/components/ui/rainbow-button-link";
import { ChatUI } from "@/components/ui/chat-ui";
import { LaunchingSoonBadge } from "@/components/ui/launching-soon-badge";

interface FeedbackSource {
  text: string;
  icon: string;
  brand: string;
}

export function Hero() {
  const [chatVisible] = useState(true);
  const [chatSize, setChatSize] = useState({ width: 560, height: 550 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState<{ top: number; left: number; right: number; bottom: number } | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // Calculate initial position based on viewport
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 50 });

  // Initial and minimum size for the chat window
  const initialChatSize = { width: 450, height: 600 };
  const minChatSize = { width: 400, height: 550 };
  const maxChatSize = { width: 800, height: 800 };

  // Chat reference to access Draggable methods
  const chatRef = useRef<DraggableRef>(null);

  // Rotating text for feedback sources with icons
  const [sourceIndex, setSourceIndex] = useState(0);
  
  const feedbackSources = useMemo<FeedbackSource[]>(
    () => [
      { text: "Sales calls", icon: "/images/integrations/gong.png", brand: "Gong" },
      { text: "CS tickets", icon: "/images/integrations/zendesk.svg", brand: "Zendesk" },
      { text: "Emails", icon: "/images/integrations/gmail.svg", brand: "Gmail" },
      { text: "CS calls", icon: "/images/integrations/intercom.svg", brand: "Intercom" },
      { text: "Reviews", icon: "/images/integrations/appstore.svg", brand: "App Store" }
    ],
    []
  );

  // Update source index on interval
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (sourceIndex === feedbackSources.length - 1) {
        setSourceIndex(0);
      } else {
        setSourceIndex(sourceIndex + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [sourceIndex, feedbackSources]);

  // Update bounds when window is resized
  useEffect(() => {
    const updateBounds = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth < 768;

        setBounds({
          top: isMobile ? -200 : -400, // Adjusted for mobile
          left: isMobile ? 20 : 0, // Added margin for mobile
          right: isMobile ? 20 : (rect.width - 50), // Added margin for mobile
          bottom: rect.height - 100,
        });
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  useEffect(() => {
    const calculateInitialPosition = () => {
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // For mobile, center horizontally and adjust vertical position
        const availableWidth = window.innerWidth - 40; // Account for margins
        const centerX = (availableWidth - initialChatSize.width) / 2;
        setInitialPosition({ 
          x: Math.max(20, centerX), // Ensure minimum margin
          y: 50 // Keep chat more visible on mobile
        });
      } else {
        // For larger screens, position it to the right
        const rightPosition = window.innerWidth * 0.85 - initialChatSize.width;
        setInitialPosition({ x: rightPosition, y: -250 });
      }
    };

    calculateInitialPosition();
    window.addEventListener('resize', calculateInitialPosition);
    return () => window.removeEventListener('resize', calculateInitialPosition);
  }, [initialChatSize.width]);

  // Handler for chat resize
  const handleChatResize = (newSize: { width: number; height: number }) => {
    setChatSize(newSize);
  };

  // Reset chat size to initial dimensions
  const resetChatSize = () => {
    setChatSize(initialChatSize);
    if (chatRef.current && chatRef.current.resetSize) {
      chatRef.current.resetSize();
    }
  };

  return (
    <AuroraBackground className="w-full pt-20 pb-24 md:pb-20 lg:pb-24 overflow-hidden">
      <div ref={heroRef} className="container px-4 md:px-6 max-w-[96%] md:max-w-[85%] mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
          {/* Left column with text content */}
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left pt-12 md:pt-16">
            <div className="mb-2 flex justify-center lg:justify-start">
              <LaunchingSoonBadge />
            </div>
            <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tighter text-black dark:text-white text-center lg:text-left">
              Convert your
              <div className="relative h-[1.3em] w-full my-4 overflow-hidden">
                {feedbackSources.map((source, index) => (
                  <motion.div
                    key={index}
                    className="absolute left-0 right-0 text-center lg:text-left text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600 animate-gradient flex items-center justify-center lg:justify-start"
                    initial={{ opacity: 0, y: "-100%" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      sourceIndex === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: sourceIndex > index ? "-100%" : "100%",
                            opacity: 0,
                          }
                    }
                  >
                    <div 
                      className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-white border-2 border-gray-200 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:border-gray-300 mr-4"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <Image 
                        src={source.icon} 
                        alt={source.brand} 
                        fill 
                        className="object-contain p-2.5" 
                      />
                      {showTooltip && sourceIndex === index && (
                        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white text-black text-sm rounded-xl px-4 py-3 whitespace-nowrap shadow-lg border border-gray-200 flex flex-col items-center">
                          <span className="font-medium">{source.brand}</span>
                          <span className="text-gray-500 text-xs">{source.text}</span>
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-gray-200 rotate-45"></div>
                        </div>
                      )}
                    </div>
                    <span className="whitespace-nowrap">{source.text}</span>
                  </motion.div>
                ))}
              </div>
              <div className="text-spektr-cyan-50">into product feedback</div>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl max-w-[720px] mx-auto lg:mx-0 font-medium text-gray-700 dark:text-gray-200">
              autentic imports product feedback from support tickets, sales calls, interviews, and more — turning it into insights you can chat with.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start w-full">
              <RainbowButtonLink
                href="#demo"
                className="w-full sm:w-auto"
              >
                Start building
              </RainbowButtonLink>
              <Link
                href="#video"
                className="w-full sm:w-auto h-[56px] flex items-center justify-center luma-button bg-white text-black dark:bg-zinc-800 dark:text-white px-8 py-0 text-base rounded-[0.625rem] border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 hover:shadow-md hover:scale-105 transition-all duration-300"
              >
                Watch video
              </Link>
            </div>
          </div>

          {/* Right column with the chat mockup */}
          <div className="lg:ml-auto flex items-start justify-center lg:justify-end relative h-[800px] w-full" style={{ zIndex: 30 }}>
            {/* Draggable chat mockup */}
            {chatVisible && (
              <Draggable
                ref={chatRef}
                bounds={bounds}
                dragHandleSelector=".drag-handle"
                initialPosition={initialPosition}
                initialSize={initialChatSize}
                minSize={minChatSize}
                maxSize={maxChatSize}
                resizable={true}
                className="transition-opacity duration-500 opacity-100"
                onResize={handleChatResize}
              >
                <div className="w-full h-full rounded-[0.625rem] overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 bg-white flex flex-col">
                  {/* Top navigation bar - macOS style - make it work with draggable */}
                  <div className="bg-white p-3 border-b flex justify-between items-center drag-handle cursor-grab select-none hover:bg-gray-50 transition-colors">
                    <div className="flex space-x-2">
                      <div className="h-2.5 w-2.5 bg-red-400 rounded-full"></div>
                      <div className="h-2.5 w-2.5 bg-yellow-400 rounded-full"></div>
                      <div className="h-2.5 w-2.5 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-500 select-none">autentic.ai <span className="text-[10px] opacity-50">{Math.round(chatSize.width)}×{Math.round(chatSize.height)}</span></div>
                    <div className="w-16 flex justify-end items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          resetChatSize();
                        }}
                        className="mr-2 text-[10px] text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full px-1.5 py-0.5 transition-colors cursor-pointer"
                        title="Reset size"
                      >
                        Reset
                      </button>
                      <div className="h-1.5 w-5 bg-gray-300 rounded mr-1 mt-1" aria-hidden="true" title="Drag to move"></div>
                    </div>
                  </div>

                  {/* ChatUI component */}
                  <div className="flex-grow flex overflow-hidden">
                    <ChatUI />
                  </div>
                </div>
              </Draggable>
            )}
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
