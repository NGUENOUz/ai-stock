// src/components/home/LogoMarquee.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  { name: "ChatGPT", url: "/logos/chatgpt.png" },
  { name: "Midjourney", url: "/logos/midjourney.png" },
  { name: "Claude", url: "/logos/claude.png" },
  { name: "Gemini", url: "/logos/gemini.png" },
  { name: "Runway", url: "/logos/runway.png" },
  { name: "Mistral", url: "/logos/mistral.png" },
];

export const LogoMarquee = () => {
  // On double la liste pour créer l'effet infini sans saut
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="relative w-full py-12 overflow-hidden bg-white">
      {/* Gradients de flou sur les bords (Effet Framer) */}
      <div className="absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-white to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-white to-transparent" />

      <motion.div
        className="flex w-max gap-12 items-center"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-8 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl group hover:border-primary/50 transition-colors"
          >
            {/* Placeholder pour les logos si tu n'as pas encore les fichiers images */}
            <div className="w-10 h-10 bg-neutral-200 rounded-lg flex items-center justify-center font-bold text-[10px] text-neutral-400 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
              {logo.name.substring(0, 2)}
            </div>
            <span className="text-lg font-bold text-neutral-600 group-hover:text-black">
              {logo.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};