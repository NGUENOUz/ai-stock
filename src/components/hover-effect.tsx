"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    icon: React.ReactNode;
    colorClass: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item.link}
          key={item.link + idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-slate-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div className="rounded-2xl h-full w-full p-4 overflow-hidden bg-white dark:bg-[#0F172A] border border-slate-100 dark:border-slate-800 group-hover:border-slate-300 dark:group-hover:border-slate-700 relative z-20 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300">
            <div className="relative z-50">
              <div className="p-2">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", item.colorClass)}>
                  {item.icon}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-lg tracking-wide">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 tracking-wide leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
