// src/components/LayoutText.tsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LayoutTextFlip = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className="relative inline-block overflow-hidden h-[1.2em] min-w-[300px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.32, 0, 0.67, 0] }}
          className="absolute inset-0 flex justify-center text-primary font-black italic uppercase"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};