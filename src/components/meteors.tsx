"use client";

import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = useMemo(() => new Array(number || 20).fill(true).map(() => ({
    id: Math.floor(Math.random() * 100000),
    top: Math.floor(Math.random() * 100) + "%",
    left: Math.floor(Math.random() * 100) + "%",
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  })), [number]);

  return (
    <>
      {meteors.map((meteor) => (
        <motion.span
          key={meteor.id}
          initial={{ opacity: 0, scale: 0, left: meteor.left, top: meteor.top }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            left: `calc(${meteor.left} - 200px)`,
            top: `calc(${meteor.top} + 200px)`,
          }}
          transition={{
            duration: meteor.duration,
            repeat: Infinity,
            delay: meteor.delay,
            ease: "linear",
          }}
          className={cn(
            "pointer-events-none absolute h-0.5 w-0.5 rounded-[9999px] bg-white shadow-[0_0_0_1px_#ffffff10]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#ffffff] before:to-transparent",
            className
          )}
        />
      ))}
    </>
  );
};
