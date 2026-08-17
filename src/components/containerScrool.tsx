// src/components/ContainerScroll.tsx
"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <div className="flex items-center justify-center relative p-2 md:p-4 w-full" ref={containerRef}>
      <div className="w-full relative" style={{ perspective: "1000px" }}>
        <motion.div
          style={{ rotateX: rotate, scale }}
          className="framer-card w-full mx-auto aspect-[4/3] md:aspect-[16/11] p-2 bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl overflow-hidden rounded-[2rem]"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};