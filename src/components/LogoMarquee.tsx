// src/components/home/LogoMarquee.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const logos = [
  { name: "ChatGPT", abbr: "Ch" },
  { name: "Midjourney", abbr: "Mj" },
  { name: "Claude", abbr: "Cl" },
  { name: "Gemini", abbr: "Ge" },
  { name: "Runway", abbr: "Rw" },
  { name: "Mistral", abbr: "Mi" },
  { name: "Perplexity", abbr: "Px" },
  { name: "ElevenLabs", abbr: "El" },
];

export const LogoMarquee = () => {
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="relative w-full py-10 overflow-hidden bg-slate-50 dark:bg-[#0B1120]">
      {/* Gradient fades */}
      <div className="absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-slate-50 dark:from-[#0B1120] to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-slate-50 dark:from-[#0B1120] to-transparent" />

      <motion.div
        className="flex w-max gap-10 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 rounded-2xl group hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
          >
            <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center font-bold text-[10px] text-slate-400 dark:text-slate-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {logo.abbr}
            </div>
            <span className="text-base font-bold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              {logo.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};