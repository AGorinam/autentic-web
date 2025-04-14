"use client";

import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function AuroraBackgroundDemo() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-4">Default Aurora Colors</h2>
      <div className="h-64 w-full rounded-lg overflow-hidden">
        <AuroraBackground>
          <div className="flex items-center justify-center h-full">
            <p className="text-xl font-medium">Default Aurora</p>
          </div>
        </AuroraBackground>
      </div>

      <h2 className="text-3xl font-bold mb-4">Custom Aurora Colors - Purple/Pink</h2>
      <div className="h-64 w-full rounded-lg overflow-hidden">
        <AuroraBackground
          colorPrimary="rgba(147, 51, 234, 1)"
          colorSecondary="rgba(236, 72, 153, 1)"
          colorTertiary="rgba(217, 70, 239, 1)"
          colorQuaternary="rgba(192, 132, 252, 1)"
          colorQuinary="rgba(244, 114, 182, 1)"
        >
          <div className="flex items-center justify-center h-full">
            <p className="text-xl font-medium">Purple/Pink Aurora</p>
          </div>
        </AuroraBackground>
      </div>

      <h2 className="text-3xl font-bold mb-4">Custom Aurora Colors - Green/Teal</h2>
      <div className="h-64 w-full rounded-lg overflow-hidden">
        <AuroraBackground
          colorPrimary="rgba(34, 197, 94, 1)"
          colorSecondary="rgba(16, 185, 129, 1)"
          colorTertiary="rgba(20, 184, 166, 1)"
          colorQuaternary="rgba(134, 239, 172, 1)"
          colorQuinary="rgba(110, 231, 183, 1)"
        >
          <div className="flex items-center justify-center h-full">
            <p className="text-xl font-medium">Green/Teal Aurora</p>
          </div>
        </AuroraBackground>
      </div>

      <h2 className="text-3xl font-bold mb-4">Custom Aurora Colors - Orange/Red</h2>
      <div className="h-64 w-full rounded-lg overflow-hidden">
        <AuroraBackground
          colorPrimary="rgba(249, 115, 22, 1)"
          colorSecondary="rgba(239, 68, 68, 1)"
          colorTertiary="rgba(245, 158, 11, 1)"
          colorQuaternary="rgba(251, 146, 60, 1)"
          colorQuinary="rgba(248, 113, 113, 1)"
        >
          <div className="flex items-center justify-center h-full">
            <p className="text-xl font-medium">Orange/Red Aurora</p>
          </div>
        </AuroraBackground>
      </div>
    </div>
  );
} 