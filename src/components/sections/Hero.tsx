"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowUpIcon } from '@/components/ui/icons';

// Add new interface for logo data
interface LogoData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface FeedbackSource {
  text: string;
  icon: string;
  brand: string;
}

// Add new LogoCarousel component
const LogoCarousel = () => {
  const logos: LogoData[] = [
    { src: "/images/integrations/gong.png", alt: "Gong", width: 28, height: 28 },
    { src: "/images/integrations/zendesk.svg", alt: "Zendesk", width: 28, height: 28 },
    { src: "/images/integrations/gmail.svg", alt: "Gmail", width: 28, height: 28 },
    { src: "/images/integrations/intercom.svg", alt: "Intercom", width: 28, height: 28 },
    { src: "/images/integrations/appstore.svg", alt: "App Store", width: 28, height: 28 },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mt-4">
      <h3 className="text-center text-mid font-medium text-gray-500 dark:text-gray-400 mb-1">
        Integrates with:
      </h3>
      <div className="relative overflow-hidden px-8">
        <div className="flex space-x-6 animate-scroll py-4">
          {[...logos, ...logos, ...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center bg-white dark:bg-white rounded-[16px] p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.03)] cursor-pointer hover:scale-105 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.03)] transition-all duration-200"
              style={{ width: '52px', height: '52px' }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="object-contain max-h-full opacity-80 hover:opacity-100 transition-all duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // Rotating text for feedback sources with icons
  const [sourceIndex, setSourceIndex] = useState(0);
  
  const feedbackSources = useMemo<FeedbackSource[]>(
    () => [
      { text: "calls", icon: "/images/integrations/gong.png", brand: "Gong" },
      { text: "tickets", icon: "/images/integrations/zendesk.svg", brand: "Zendesk" },
      { text: "emails", icon: "/images/integrations/gmail.svg", brand: "Gmail" },
      { text: "issues", icon: "/images/integrations/intercom.svg", brand: "Intercom" },
      { text: "reviews", icon: "/images/integrations/appstore.svg", brand: "App Store" }
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

  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Add mobile detection function
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      typeof window !== 'undefined' ? window.navigator.userAgent : ''
    );
  };

  const FIXED_PREFIX = 'Ask autentic ';
  const placeholderSuffixes = useMemo(() => [
    'what users think about the onboarding process...',
    'what users love about the new product...',
    'to summarize our latest user interviews...',
    'to identify feature requests...',
    'what users think about the new feature...'
  ], []);

  useEffect(() => {
    // Only autofocus on desktop devices
    if (!isMobileDevice() && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const typeWriter = () => {
      const currentText = placeholderSuffixes[placeholderIndex];
      
      if (!isDeleting) {
        setCurrentPlaceholder(currentText.substring(0, currentPlaceholder.length + 1));
        
        if (currentPlaceholder.length === currentText.length) {
          // Start deleting after a shorter pause
          setTimeout(() => setIsDeleting(true), 1000);
          return;
        }
      } else {
        setCurrentPlaceholder(currentPlaceholder.substring(0, currentPlaceholder.length - 1));
        
        if (currentPlaceholder.length === 0) {
          setIsDeleting(false);
          setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderSuffixes.length);
          return;
        }
      }
    };

    const timeout = setTimeout(typeWriter, isDeleting ? 40 / 1.5 : 40);
    return () => clearTimeout(timeout);
  }, [currentPlaceholder, isDeleting, placeholderIndex, placeholderSuffixes]);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const handleSubmit = () => {
    if (input.trim()) {
      // Here we'll redirect to the app with the input as a query parameter
      window.location.href = `/app/chat?q=${encodeURIComponent(input)}`;
    }
  };

  return (
    <AuroraBackground className="w-full pt-0 sm:pt-4 md:pt-32 pb-16 md:pb-20 lg:pb-24 overflow-hidden">
      <div ref={heroRef} className="container px-4 md:px-6 max-w-[96%] md:max-w-[85%] mx-auto -mt-10 sm:mt-0">
        <div className="flex flex-col items-center justify-center">
          {/* Centered content */}
          <div className="flex flex-col justify-center space-y-4 md:space-y-8 text-center max-w-4xl mx-auto">
            <h1 className="text-[32px] leading-tight xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black sm:font-bold tracking-tighter text-black dark:text-white text-center">
              Convert your
              <div className="relative h-[1.6em] xs:h-[2em] sm:h-[1.3em] w-full my-0.5 xs:my-1 sm:my-4 overflow-hidden">
                {feedbackSources.map((source, index) => (
                  <motion.div
                    key={index}
                    className="absolute left-0 right-0 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600 animate-gradient flex items-center justify-center"
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
                      className="group relative w-12 xs:w-16 h-12 xs:h-16 flex-shrink-0 mr-3 xs:mr-4 cursor-pointer"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <div className="absolute inset-0 rounded-xl bg-white border-2 border-gray-200 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-gray-300"></div>
                      <Image 
                        src={source.icon} 
                        alt={source.brand} 
                        width={64}
                        height={64}
                        className="absolute inset-0 object-contain p-2 xs:p-3 z-10" 
                      />
                      {showTooltip && sourceIndex === index && (
                        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white text-black text-sm rounded-xl px-4 py-3 whitespace-nowrap shadow-lg border border-gray-200 flex flex-col items-center">
                          <span className="font-medium">{source.brand}</span>
                          <span className="text-gray-500 text-xs">{source.text}</span>
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-gray-200 rotate-45"></div>
                        </div>
                      )}
                    </div>
                    <span className="whitespace-nowrap text-[32px] xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl">{source.text}</span>
                  </motion.div>
                ))}
              </div>
              <div className="text-spektr-cyan-50">into Product Feedback</div>
            </h1>
            <p className="text-mid sm:text-xl text-gray-600 dark:text-gray-300 mb-4 md:mb-8">
              Chat with your sources and know what users love
            </p>
          </div>

          {/* Demo Input Section */}
          <div className="w-full max-w-3xl mx-auto mt-4 md:mt-8">
            <div className="relative w-full group">
              <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
              <div className="absolute -inset-[1px] rounded-xl bg-background" />
              <div className="absolute inset-0 rounded-xl border-clock-animation"></div>
              <Textarea
                ref={textareaRef}
                placeholder={FIXED_PREFIX + currentPlaceholder}
                value={input}
                onChange={handleInput}
                className="textarea-black-focus relative min-h-[140px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-xl text-base bg-background py-4 px-4 border-transparent shadow-[0_2px_6px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_6px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 transition-all duration-300"
                style={{
                  paddingTop: '20px',
                  paddingBottom: '85px',
                  maxWidth: '100%',
                }}
                onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
                  if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                    event.preventDefault();
                    handleSubmit();
                  }
                }}
              />

              <style jsx global>{`
                .textarea-black-focus:focus {
                  --tw-ring-color: oklch(0 0 0);
                }
              `}</style>

              <style jsx global>{`
                @keyframes border-clock-animation {
                  0% {
                    border-width: 2px;
                    border-top-color: rgba(99, 102, 241, 0.8); /* indigo */
                    border-right-color: rgba(0, 0, 0, 0.1);
                    border-bottom-color: rgba(0, 0, 0, 0.1);
                    border-left-color: rgba(0, 0, 0, 0.1);
                    box-shadow: 0 -3px 10px rgba(99, 102, 241, 0.4);
                  }
                  12.5% {
                    border-width: 2px;
                    border-top-color: rgba(139, 92, 246, 0.8); /* violet */
                    border-right-color: rgba(99, 102, 241, 0.8); /* indigo */
                    border-bottom-color: rgba(0, 0, 0, 0.1);
                    border-left-color: rgba(0, 0, 0, 0.1);
                    box-shadow: 3px -3px 10px rgba(139, 92, 246, 0.4);
                  }
                  25% {
                    border-width: 2px;
                    border-top-color: rgba(0, 0, 0, 0.1);
                    border-right-color: rgba(192, 132, 252, 0.8); /* purple */
                    border-bottom-color: rgba(0, 0, 0, 0.1);
                    border-left-color: rgba(0, 0, 0, 0.1);
                    box-shadow: 3px 0 10px rgba(192, 132, 252, 0.4);
                  }
                  37.5% {
                    border-width: 2px;
                    border-top-color: rgba(0, 0, 0, 0.1);
                    border-right-color: rgba(216, 180, 254, 0.8); /* fuchsia */
                    border-bottom-color: rgba(192, 132, 252, 0.8); /* purple */
                    border-left-color: rgba(0, 0, 0, 0.1);
                    box-shadow: 3px 3px 10px rgba(216, 180, 254, 0.4);
                  }
                  50% {
                    border-width: 2px;
                    border-top-color: rgba(0, 0, 0, 0.1);
                    border-right-color: rgba(0, 0, 0, 0.1);
                    border-bottom-color: rgba(244, 114, 182, 0.8); /* pink */
                    border-left-color: rgba(0, 0, 0, 0.1);
                    box-shadow: 0 3px 10px rgba(244, 114, 182, 0.4);
                  }
                  62.5% {
                    border-width: 2px;
                    border-top-color: rgba(0, 0, 0, 0.1);
                    border-right-color: rgba(0, 0, 0, 0.1);
                    border-bottom-color: rgba(236, 72, 153, 0.8); /* pink-500 */
                    border-left-color: rgba(244, 114, 182, 0.8); /* pink */
                    box-shadow: -3px 3px 10px rgba(236, 72, 153, 0.4);
                  }
                  75% {
                    border-width: 2px;
                    border-top-color: rgba(0, 0, 0, 0.1);
                    border-right-color: rgba(0, 0, 0, 0.1);
                    border-bottom-color: rgba(0, 0, 0, 0.1);
                    border-left-color: rgba(147, 51, 234, 0.8); /* purple-600 */
                    box-shadow: -3px 0 10px rgba(147, 51, 234, 0.4);
                  }
                  87.5% {
                    border-width: 2px;
                    border-top-color: rgba(79, 70, 229, 0.8); /* indigo-600 */
                    border-right-color: rgba(0, 0, 0, 0.1);
                    border-bottom-color: rgba(0, 0, 0, 0.1);
                    border-left-color: rgba(67, 56, 202, 0.8); /* indigo-700 */
                    box-shadow: -3px -3px 10px rgba(79, 70, 229, 0.4);
                  }
                  100% {
                    border-width: 2px;
                    border-top-color: rgba(99, 102, 241, 0.8); /* indigo */
                    border-right-color: rgba(0, 0, 0, 0.1);
                    border-bottom-color: rgba(0, 0, 0, 0.1);
                    border-left-color: rgba(0, 0, 0, 0.1);
                    box-shadow: 0 -3px 10px rgba(99, 102, 241, 0.4);
                  }
                }

                .border-clock-animation {
                  border-style: solid;
                  border-color: rgba(0, 0, 0, 0.1);
                  animation: border-clock-animation 8s linear infinite;
                }

                @media (prefers-color-scheme: dark) {
                  @keyframes border-clock-animation {
                    0% {
                      border-width: 2px;
                      border-top-color: rgba(99, 102, 241, 0.8); /* indigo */
                      border-right-color: rgba(255, 255, 255, 0.1);
                      border-bottom-color: rgba(255, 255, 255, 0.1);
                      border-left-color: rgba(255, 255, 255, 0.1);
                      box-shadow: 0 -3px 10px rgba(99, 102, 241, 0.4);
                    }
                    12.5% {
                      border-width: 2px;
                      border-top-color: rgba(139, 92, 246, 0.8); /* violet */
                      border-right-color: rgba(99, 102, 241, 0.8); /* indigo */
                      border-bottom-color: rgba(255, 255, 255, 0.1);
                      border-left-color: rgba(255, 255, 255, 0.1);
                      box-shadow: 3px -3px 10px rgba(139, 92, 246, 0.4);
                    }
                    25% {
                      border-width: 2px;
                      border-top-color: rgba(255, 255, 255, 0.1);
                      border-right-color: rgba(192, 132, 252, 0.8); /* purple */
                      border-bottom-color: rgba(255, 255, 255, 0.1);
                      border-left-color: rgba(255, 255, 255, 0.1);
                      box-shadow: 3px 0 10px rgba(192, 132, 252, 0.4);
                    }
                    37.5% {
                      border-width: 2px;
                      border-top-color: rgba(255, 255, 255, 0.1);
                      border-right-color: rgba(216, 180, 254, 0.8); /* fuchsia */
                      border-bottom-color: rgba(192, 132, 252, 0.8); /* purple */
                      border-left-color: rgba(255, 255, 255, 0.1);
                      box-shadow: 3px 3px 10px rgba(216, 180, 254, 0.4);
                    }
                    50% {
                      border-width: 2px;
                      border-top-color: rgba(255, 255, 255, 0.1);
                      border-right-color: rgba(255, 255, 255, 0.1);
                      border-bottom-color: rgba(244, 114, 182, 0.8); /* pink */
                      border-left-color: rgba(255, 255, 255, 0.1);
                      box-shadow: 0 3px 10px rgba(244, 114, 182, 0.4);
                    }
                    62.5% {
                      border-width: 2px;
                      border-top-color: rgba(255, 255, 255, 0.1);
                      border-right-color: rgba(255, 255, 255, 0.1);
                      border-bottom-color: rgba(236, 72, 153, 0.8); /* pink-500 */
                      border-left-color: rgba(244, 114, 182, 0.8); /* pink */
                      box-shadow: -3px 3px 10px rgba(236, 72, 153, 0.4);
                    }
                    75% {
                      border-width: 2px;
                      border-top-color: rgba(255, 255, 255, 0.1);
                      border-right-color: rgba(255, 255, 255, 0.1);
                      border-bottom-color: rgba(255, 255, 255, 0.1);
                      border-left-color: rgba(147, 51, 234, 0.8); /* purple-600 */
                      box-shadow: -3px 0 10px rgba(147, 51, 234, 0.4);
                    }
                    87.5% {
                      border-width: 2px;
                      border-top-color: rgba(79, 70, 229, 0.8); /* indigo-600 */
                      border-right-color: rgba(255, 255, 255, 0.1);
                      border-bottom-color: rgba(255, 255, 255, 0.1);
                      border-left-color: rgba(67, 56, 202, 0.8); /* indigo-700 */
                      box-shadow: -3px -3px 10px rgba(79, 70, 229, 0.4);
                    }
                    100% {
                      border-width: 2px;
                      border-top-color: rgba(99, 102, 241, 0.8); /* indigo */
                      border-right-color: rgba(255, 255, 255, 0.1);
                      border-bottom-color: rgba(255, 255, 255, 0.1);
                      border-left-color: rgba(255, 255, 255, 0.1);
                      box-shadow: 0 -3px 10px rgba(99, 102, 241, 0.4);
                    }
                  }
                }
              `}</style>

              <div className="absolute right-4 bottom-4 flex flex-row justify-end items-center gap-2">
                <Badge 
                  className="bg-white dark:bg-zinc-900 flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200 dark:border-zinc-800 rounded-lg"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  2 sources
                </Badge>
                <Button
                  className="rounded-full size-10 flex items-center justify-center bg-zinc-950 hover:bg-black dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors duration-200 border-none"
                  onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                  }}
                  disabled={input.length === 0}
                >
                  <ArrowUpIcon size={18} className="text-white" />
                </Button>
              </div>
            </div>

            <div className="mt-6 sm:mt-4 flex gap-2 justify-center overflow-x-auto scrollbar-none pb-1">
              <button
                onClick={() => setInput("What users think about the onboarding process?")}
                className="flex-shrink-0 bg-white dark:bg-zinc-900 flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200 dark:border-zinc-800 rounded-[0.625rem] hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md hover:scale-105 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
              >
                Onboarding feedback
              </button>
              <button
                onClick={() => setInput("Summarize our latest user interviews")}
                className="flex-shrink-0 bg-white dark:bg-zinc-900 flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200 dark:border-zinc-800 rounded-[0.625rem] hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md hover:scale-105 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
              >
                Feature requests
              </button>
              <button
                onClick={() => setInput("What do users love about the new product?")}
                className="hidden sm:flex flex-shrink-0 bg-white dark:bg-zinc-900 items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200 dark:border-zinc-800 rounded-[0.625rem] hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md hover:scale-105 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
              >
                New Product Feedback
              </button>
            </div>
          </div>

          {/* LogoCarousel */}
          <LogoCarousel />
        </div>
      </div>
    </AuroraBackground>
  );
}

// Modify the animation styles
const styles = `
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  .animate-scroll {
    animation: scroll 40s linear infinite;
  }
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
