"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const FILTERS = [
  { id: "all", label: "Tous les outils", count: "1000+" },
  { id: "image", label: "Image", count: "230+" },
  { id: "video", label: "Vidéo", count: "180+" },
  { id: "text", label: "Texte", count: "210+" },
  { id: "audio", label: "Audio", count: "120+" },
  { id: "productivity", label: "Productivité", count: "200+" },
];

export function AnimatedFilters() {
  const [active, setActive] = useState("all");

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      {FILTERS.map((filter) => {
        const isActive = active === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => setActive(filter.id)}
            className={cn(
              "relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300",
              isActive
                ? "text-white"
                : "bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-blue-600 rounded-xl shadow-md shadow-blue-600/20 z-0"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center">
              {filter.label} 
              <span className={cn("font-normal ml-1", isActive ? "opacity-70" : "text-slate-400 dark:text-slate-500")}>
                {filter.count}
              </span>
            </span>
          </button>
        );
      })}
      <button className="w-10 h-10 flex items-center justify-center bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
