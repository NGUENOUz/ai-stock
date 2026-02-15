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
    <div className="flex items-center justify-center relative p-2 md:p-20" ref={containerRef}>
      <div className="w-full relative" style={{ perspective: "1000px" }}>
        <motion.div
          style={{ rotateX: rotate, scale }}
          className="framer-card w-full mx-auto h-[30rem] md:h-[45rem] p-4 bg-white/80 backdrop-blur-xl border-white/40 shadow-2xl overflow-hidden"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};