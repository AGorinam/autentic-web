"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { features } from '@/lib/data/features';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function FeatureHighlights() {
  const [activeFeature, setActiveFeature] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const { top: sectionTop, bottom: sectionBottom } = sectionRef.current.getBoundingClientRect();
      const windowMiddle = window.innerHeight / 2;

      // Only process scroll if section is in view
      if (sectionTop <= windowMiddle && sectionBottom >= windowMiddle) {
        // Find which feature section is currently in view
        let activeIndex = 0;
        featureRefs.current.forEach((ref, index) => {
          if (ref) {
            const { top, bottom } = ref.getBoundingClientRect();
            const middle = window.innerHeight / 2;
            if (top <= middle && bottom >= middle) {
              activeIndex = index;
            }
          }
        });
        setActiveFeature(activeIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-gradient-to-b from-white to-gray-50/50">
      {/* Title Section */}
      <div className="container px-4 md:px-6 max-w-[96%] md:max-w-[85%] mx-auto">
        <div className="text-center max-w-4xl mx-auto pt-16 md:pt-24 pb-8 md:pb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Powerful features for <span className="text-gradient">better feedback</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 font-light"
          >
            Everything you need to collect, analyze, and act on customer feedback
          </motion.p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="relative h-[400vh]">
          {/* Sticky Container for Image */}
          <div className="sticky top-0 h-screen w-full">
            <div className="container px-4 md:px-6 max-w-[96%] md:max-w-[85%] mx-auto w-full grid grid-cols-2 gap-16 h-full">
              {/* Empty Column for Text */}
              <div className="relative" />

              {/* Media Content */}
              <div className="relative flex items-center h-full">
                <div className="relative w-full aspect-[16/10] rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg border border-gray-100">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ 
                        opacity: activeFeature === index ? 1 : 0,
                        scale: activeFeature === index ? 1 : 0.95
                      }}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        "absolute inset-0 flex items-center justify-center p-4",
                        activeFeature === index ? "pointer-events-auto" : "pointer-events-none"
                      )}
                    >
                      <Image
                        src={feature.media.desktop}
                        alt={feature.title}
                        width={1920}
                        height={1200}
                        className="w-full h-full object-contain rounded-lg shadow-md border border-gray-100"
                        quality={90}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling Content */}
          <div className="absolute top-0 left-0 w-full">
            <div className="container px-4 md:px-6 max-w-[96%] md:max-w-[85%] mx-auto grid grid-cols-2 gap-16">
              {/* Text Content Column */}
              <div className="relative">
                {features.map((feature, index) => (
                  <div
                    key={feature.id}
                    ref={(el) => {
                      featureRefs.current[index] = el;
                    }}
                    className="min-h-screen flex items-center"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6 py-16"
                    >
                      <motion.h2 
                        className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
                      >
                        {feature.title}
                      </motion.h2>
                      <motion.p 
                        className="text-xl text-gray-600 font-light max-w-xl"
                      >
                        {feature.subtitle}
                      </motion.p>
                      <motion.ul className="space-y-6 mt-8">
                        {feature.keyPoints.map((point, pointIndex) => (
                          <motion.li
                            key={pointIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                            transition={{ delay: pointIndex * 0.1 }}
                            className="flex items-center space-x-3 group"
                          >
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200">
                              <ArrowRightIcon className="w-4 h-4 text-blue-500" />
                            </div>
                            <span className="text-gray-700 text-lg group-hover:text-gray-900 transition-colors duration-200">
                              {point}
                            </span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  </div>
                ))}
              </div>
              {/* Empty Column for Image */}
              <div className="relative" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden container px-4 md:px-6 max-w-[96%] md:max-w-[85%] mx-auto">
        <div className="space-y-16 py-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                  {feature.title}
                </h2>
                <p className="text-lg text-gray-600 font-light">{feature.subtitle}</p>
                <ul className="space-y-6">
                  {feature.keyPoints.map((point, pointIndex) => (
                    <motion.li
                      key={pointIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: pointIndex * 0.2 }}
                      className="flex items-center space-x-3 group"
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200">
                        <ArrowRightIcon className="w-4 h-4 text-blue-500" />
                      </div>
                      <span className="text-gray-700 text-lg group-hover:text-gray-900 transition-colors duration-200">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg border border-gray-100 p-4">
                <Image
                  src={feature.media.mobile}
                  alt={feature.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-contain rounded-lg shadow-md border border-gray-100"
                  quality={85}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 