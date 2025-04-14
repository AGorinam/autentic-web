"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { features } from '@/lib/data/features';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/badge';

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
    <section ref={sectionRef} className="relative w-full bg-gradient-to-b from-white via-purple-50/30 to-orange-50/30 z-10">
      {/* Title Section */}
      <div className="container px-4 md:px-6 max-w-[96%] md:max-w-[85%] mx-auto relative">
        <div className="text-center max-w-4xl mx-auto pt-8 md:pt-12 pb-4 md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <Badge>Product</Badge>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Powerful{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-600">
              features for
            </span>{" "}
            feedback
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600/90 font-light"
          >
            Everything you need to collect, analyze, and act on customer feedback
          </motion.p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="relative h-[400vh]">
          {/* Sticky Container for Image */}
          <div className="sticky top-0 h-screen w-full flex items-center">
            <div className="container px-4 md:px-6 max-w-[96%] md:max-w-[85%] mx-auto w-full grid grid-cols-2 gap-16 h-full">
              {/* Empty Column for Text */}
              <div className="relative" />

              {/* Media Content */}
              <div className="relative flex items-center h-full">
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border-4 border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700 shadow-md">
                  {/* Background Cover Image */}
                  <Image
                    src="/images/features/cover.png"
                    alt="Background"
                    width={1920}
                    height={1200}
                    className="absolute inset-0 w-full h-full object-cover"
                    quality={90}
                    priority
                  />
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
                        className="w-full h-full object-contain"
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
                    id={index === 0 ? 'first-feature' : undefined}
                    className="min-h-screen flex items-center"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                      transition={{ duration: 0.5 }}
                      className="space-y-8 py-16"
                    >
                      <motion.h2 
                        className="text-4xl font-bold"
                      >
                        {feature.title.split(' ').map((word, i, arr) => {
                          // Apply gradient to the middle word(s)
                          const isMiddle = i > 0 && i < arr.length - 1;
                          return (
                            <span key={i}>
                              {isMiddle ? (
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-600">
                                  {word}{" "}
                                </span>
                              ) : (
                                word + " "
                              )}
                            </span>
                          );
                        })}
                      </motion.h2>
                      <motion.p 
                        className="text-xl text-gray-600/90 font-light max-w-xl leading-relaxed"
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
                            className="flex items-center space-x-4 group"
                          >
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-orange-100 group-hover:from-purple-200 group-hover:to-orange-200 transition-all duration-300 shadow-sm">
                              <ArrowRightIcon className="w-4 h-4 text-purple-600 group-hover:text-orange-600 transition-colors duration-300" />
                            </div>
                            <span className="text-gray-700 text-lg group-hover:text-gray-900 transition-colors duration-300">
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
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">
                  {feature.title.split(' ').map((word, i, arr) => {
                    // Apply gradient to the middle word(s)
                    const isMiddle = i > 0 && i < arr.length - 1;
                    return (
                      <span key={i}>
                        {isMiddle ? (
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-600">
                            {word}{" "}
                          </span>
                        ) : (
                          word + " "
                        )}
                      </span>
                    );
                  })}
                </h2>
                <p className="text-lg text-gray-600/90 font-light leading-relaxed">{feature.subtitle}</p>
                <ul className="space-y-6">
                  {feature.keyPoints.map((point, pointIndex) => (
                    <motion.li
                      key={pointIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: pointIndex * 0.2 }}
                      className="flex items-center space-x-4 group"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-orange-100 group-hover:from-purple-200 group-hover:to-orange-200 transition-all duration-300 shadow-sm">
                        <ArrowRightIcon className="w-4 h-4 text-purple-600 group-hover:text-orange-600 transition-colors duration-300" />
                      </div>
                      <span className="text-gray-700 text-lg group-hover:text-gray-900 transition-colors duration-300">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 shadow-md">
                {/* Background Cover Image */}
                <Image
                  src="/images/features/cover.png"
                  alt="Background"
                  width={800}
                  height={600}
                  className="absolute inset-0 w-[120%] h-[120%] object-cover -translate-x-[10%] -translate-y-[10%]"
                  quality={85}
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <Image
                    src={feature.media.mobile}
                    alt={feature.title}
                    width={800}
                    height={600}
                    className="w-[90%] h-[90%] object-contain"
                    quality={85}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 