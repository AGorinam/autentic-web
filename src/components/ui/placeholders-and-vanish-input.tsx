"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
  className,
}: {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const startAnimation = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  }, [placeholders.length]);
  
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation(); // Restart the interval when the tab becomes visible
    }
  }, [startAnimation]);

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders, handleVisibilityChange, startAnimation]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<Array<{x: number, y: number, r: number, color: string}>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Adjust canvas size based on device
    const isMobile = window.innerWidth < 768;
    const canvasSize = isMobile ? 400 : 800;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * (isMobile ? 1.5 : 2)}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, isMobile ? 8 : 16, isMobile ? 20 : 40);

    const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
    const pixelData = imageData.data;
    const newData: Array<{x: number, y: number, color: number[]}> = [];

    // Optimize pixel sampling for mobile
    const sampleRate = isMobile ? 2 : 1;
    for (let t = 0; t < canvasSize; t += sampleRate) {
      const i = 4 * t * canvasSize;
      for (let n = 0; n < canvasSize; n += sampleRate) {
        const e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    // Limit the number of particles for better performance
    const maxParticles = isMobile ? 1000 : 2000;
    const particles = newData.slice(0, maxParticles);

    newDataRef.current = particles.map(({ x, y, color }) => ({
      x,
      y,
      r: isMobile ? 0.75 : 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start: number) => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const fps = 60;
    const frameInterval = 1000 / fps;
    
    const animateFrame = (pos: number = 0) => {
      animationFrameId = requestAnimationFrame((currentTime) => {
        // Throttle animation frame rate
        const deltaTime = currentTime - lastTime;
        if (deltaTime < frameInterval) {
          animateFrame(pos);
          return;
        }
        lastTime = currentTime - (deltaTime % frameInterval);

        const isMobile = window.innerWidth < 768;
        const canvasSize = isMobile ? 400 : 800;
        const newArr = [];
        
        // Batch process particles for better performance
        const batchSize = 100;
        for (let batch = 0; batch < newDataRef.current.length; batch += batchSize) {
          const end = Math.min(batch + batchSize, newDataRef.current.length);
          for (let i = batch; i < end; i++) {
            const current = newDataRef.current[i];
            if (current.x < pos) {
              newArr.push(current);
            } else {
              if (current.r <= 0) {
                current.r = 0;
                continue;
              }
              // Reduce random calculations on mobile
              if (isMobile) {
                current.x += Math.random() > 0.5 ? 0.75 : -0.75;
                current.y += Math.random() > 0.5 ? 0.75 : -0.75;
                current.r -= 0.075;
              } else {
                current.x += Math.random() > 0.5 ? 1 : -1;
                current.y += Math.random() > 0.5 ? 1 : -1;
                current.r -= 0.05 * Math.random();
              }
              newArr.push(current);
            }
          }
        }

        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, canvasSize, canvasSize);
          
          // Batch render particles
          ctx.beginPath();
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t;
            if (n > pos) {
              ctx.fillStyle = color;
              ctx.fillRect(n, i, s, s);
            }
          });
          ctx.fill();
        }

        if (newDataRef.current.length > 0) {
          animateFrame(pos - (isMobile ? 6 : 8));
        } else {
          setValue("");
          setAnimating(false);
          cancelAnimationFrame(animationFrameId);
        }
      });
    };
    animateFrame(start);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  };

  // Add touch event handling
  const handleTouchStart = (e: React.TouchEvent<HTMLInputElement>) => {
    // Prevent zooming on double tap
    e.preventDefault();
  };

  // Add cleanup for animation on unmount
  useEffect(() => {
    const canvas = canvasRef.current;
    return () => {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, 800, 800);
        }
      }
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !animating) {
      vanishAndSubmit();
    }
  };

  const vanishAndSubmit = () => {
    setAnimating(true);
    draw();

    const value = inputRef.current?.value || "";
    if (value && inputRef.current) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vanishAndSubmit();
    if (onSubmit) onSubmit(e);
  };
  return (
    <motion.form
      initial={{ boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)" }}
      animate={{
        boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0)", "0 0 0 4px rgba(59, 130, 246, 0.15)", "0 0 0 0 rgba(59, 130, 246, 0)"]
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1
      }}
      className={cn(
        "w-full relative max-w-xl mx-auto bg-white h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 border border-gray-200 hover:border-gray-300 focus-within:ring-2 focus-within:ring-gray-200",
        value && "bg-gray-50 border-gray-200",
        className
      )}
      onSubmit={handleSubmit}
    >
      <canvas
        className={cn(
          "absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-6 origin-top-left filter invert pr-20",
          !animating ? "opacity-0" : "opacity-100"
        )}
        ref={canvasRef}
      />
      <input
        onChange={(e) => {
          if (!animating) {
            setValue(e.target.value);
            if (onChange) onChange(e);
          }
        }}
        onTouchStart={handleTouchStart}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
        type="text"
        placeholder=""
        className={cn(
          "w-full relative text-sm sm:text-base z-50 border-none text-gray-900 bg-transparent h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-8 pr-20 touch-manipulation",
          animating && "text-transparent"
        )}
      />

      <button
        disabled={!value}
        type="submit"
        className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black hover:bg-gray-800 transition duration-200 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white h-4 w-4"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path
            d="M5 12l14 0"
            initial={{
              strokeDasharray: "50%",
              strokeDashoffset: "50%",
            }}
            animate={{
              strokeDashoffset: value ? 0 : "50%",
            }}
            transition={{
              duration: 0.3,
              ease: "linear",
            }}
          />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </motion.svg>
      </button>

      <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              initial={{
                y: 5,
                opacity: 0,
              }}
              key={`current-placeholder-${currentPlaceholder}`}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -15,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "linear",
              }}
              className="text-sm sm:text-base font-normal pl-4 sm:pl-8 text-left w-[calc(100%-2rem)] truncate text-gray-500"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}
