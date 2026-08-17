"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FLOATING_TOOLS = [
  { name: "ChatGPT", icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", x: "5%", y: "15%", delay: 0, size: 56 },
  { name: "Midjourney", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png", x: "85%", y: "10%", delay: 0.5, size: 52 },
  { name: "Claude", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg", x: "90%", y: "55%", delay: 1, size: 48 },
  { name: "Runway", icon: "https://a.storyblok.com/f/254425/x/22144358a9/runway-logo.svg", x: "8%", y: "65%", delay: 1.5, size: 44 },
  { name: "Gemini", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg", x: "15%", y: "40%", delay: 0.8, size: 40 },
  { name: "Notion AI", icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", x: "80%", y: "35%", delay: 1.2, size: 44 },
];

export function FloatingToolCards() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
      {FLOATING_TOOLS.map((tool) => (
        <motion.div
          key={tool.name}
          className="absolute pointer-events-auto"
          style={{ left: tool.x, top: tool.y }}
          animate={{
            y: [0, -18, 0, 12, 0],
            rotate: [0, 2, -2, 1, 0],
          }}
          transition={{
            duration: 7 + tool.delay * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: tool.delay,
          }}
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 shadow-lg shadow-slate-200/30 dark:shadow-black/20 hover:scale-110 transition-transform cursor-pointer">
            <div
              className="rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 overflow-hidden flex items-center justify-center relative flex-shrink-0"
              style={{ width: tool.size * 0.6, height: tool.size * 0.6 }}
            >
              <Image src={tool.icon} alt={tool.name} fill className="object-contain p-1.5" unoptimized />
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">{tool.name}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
