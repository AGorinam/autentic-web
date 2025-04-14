"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Draggable, DraggableRef } from "@/components/ui/draggable";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { RainbowButtonLink } from "@/components/ui/rainbow-button-link";
import { ChatUI } from "@/components/ui/chat-ui";

export function Hero() {
  const [chatVisible] = useState(true);
  const [chatSize, setChatSize] = useState({ width: 560, height: 550 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState<{ top: number; left: number; right: number; bottom: number } | null>(null);

  // Calculate initial position based on viewport
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 50 });

  // Initial and minimum size for the chat window
  const initialChatSize = { width: 450, height: 600 };
  const minChatSize = { width: 400, height: 550 };
  const maxChatSize = { width: 800, height: 800 };

  // Chat reference to access Draggable methods
  const chatRef = useRef<DraggableRef>(null);

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
            <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black dark:text-white">
              Solve the <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600 animate-gradient">right problems</span>
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
