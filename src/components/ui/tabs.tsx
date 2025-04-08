"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  // Always maintain the original tabs order for display
  const [displayOrder, setDisplayOrder] = useState<Tab[]>(propTabs);

  const handleTabClick = (idx: number) => {
    // Just update the active tab without reordering
    setActive(propTabs[idx]);
    
    // Create a new array with the clicked tab first but keep others visible
    const newOrder = [...propTabs];
    const selectedTab = newOrder.splice(idx, 1)[0];
    newOrder.unshift(selectedTab);
    setDisplayOrder(newOrder);
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full gap-2",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              handleTabClick(idx);
            }}
            className={cn(
              "relative px-5 py-2.5 rounded-[0.625rem] transition-all duration-200 cursor-pointer",
              active.value !== tab.value && "hover:bg-gray-100 dark:hover:bg-zinc-900",
              tabClassName
            )}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-gray-100 dark:bg-zinc-800/30 rounded-[0.625rem]",
                  activeTabClassName
                )}
              />
            )}

            <span className="relative block text-black dark:text-white font-medium">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={displayOrder}
        active={active}
        key={active.value}
        className={cn("mt-32", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  active,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
}) => {
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => {
        const isActiveTab = tab.value === active.value;
        
        return (
          <motion.div
            key={tab.value}
            layoutId={tab.value}
            style={{
              scale: isActiveTab ? 1 : 1 - (idx * 0.05),
              top: idx * -30,
              zIndex: isActiveTab ? 10 : 10 - idx,
              opacity: isActiveTab ? 1 : 0.9 - (idx * 0.1),
              transformOrigin: "center top",
            }}
            animate={{
              y: isActiveTab ? [0, 20, 0] : 0,
            }}
            className={cn("w-full h-full absolute top-0 left-0", className)}
          >
            {tab.content}
          </motion.div>
        );
      })}
    </div>
  );
};
