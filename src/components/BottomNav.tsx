"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Wand2,
  BookOpen,
  Newspaper,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Config ───────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Outils",    href: "/liste",      icon: Cpu       },
  { label: "Prompts",   href: "/prompt",     icon: Wand2     },
  { label: "Ressources",href: "/ressources", icon: BookOpen  },
  { label: "Blog",      href: "/blog",       icon: Newspaper },
  { label: "Créateurs", href: "/createurs",  icon: Users     },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function BottomNav() {
  const pathname = usePathname();

  // Find active index
  const activeIndex = NAV_ITEMS.findIndex(
    (item) => item.href !== "/" && (pathname === item.href || pathname.startsWith(item.href + "/"))
  );

  // Track previous index for direction-aware animation
  const prevIndexRef = useRef(activeIndex);
  const direction = activeIndex > prevIndexRef.current ? 1 : -1;
  useEffect(() => {
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      className="fixed bottom-0 inset-x-0 z-50 lg:hidden"
    >
      {/* Glass bar */}
      <div className="mx-3 mb-3 rounded-2xl bg-white/80 dark:bg-[#0F172A]/85 backdrop-blur-2xl border border-slate-200/70 dark:border-slate-700/60 shadow-[0_-4px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_30px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-around px-1 py-2 relative">

          {/* Sliding active pill background */}
          {activeIndex >= 0 && (
            <motion.div
              layoutId="bottom-nav-pill"
              className="absolute top-1.5 bottom-1.5 rounded-xl bg-blue-600/10 dark:bg-blue-500/15"
              style={{ width: `${100 / NAV_ITEMS.length}%`, left: `${(activeIndex * 100) / NAV_ITEMS.length}%` }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
          )}

          {NAV_ITEMS.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <NavItem
                key={item.href}
                item={item}
                isActive={isActive}
                totalItems={NAV_ITEMS.length}
              />
            );
          })}
        </div>
      </div>

      {/* iPhone home indicator safe area */}
      <div className="h-safe-area-inset-bottom" />
    </motion.nav>
  );
}

// ─── NavItem ──────────────────────────────────────────────────────────────────

function NavItem({
  item,
  isActive,
  totalItems,
}: {
  item: (typeof NAV_ITEMS)[number];
  isActive: boolean;
  totalItems: number;
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "relative flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl transition-all duration-200 active:scale-90 z-10",
        "focus:outline-none"
      )}
      style={{ width: `${100 / totalItems}%` }}
    >
      {/* Icon with spring bounce on activation */}
      <motion.div
        animate={
          isActive
            ? { scale: [1, 1.25, 1.1], y: [0, -3, 0] }
            : { scale: 1, y: 0 }
        }
        transition={
          isActive
            ? { duration: 0.35, ease: "easeOut" }
            : { duration: 0.2 }
        }
        className="relative"
      >
        {/* Glow dot for active state */}
        {isActive && (
          <motion.div
            layoutId="bottom-nav-glow"
            className="absolute inset-0 -m-2 rounded-full bg-blue-500/20 blur-md"
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />
        )}

        <item.icon
          className={cn(
            "w-5 h-5 transition-colors duration-200 relative z-10",
            isActive
              ? "text-blue-600 dark:text-blue-400"
              : "text-slate-400 dark:text-slate-500"
          )}
          strokeWidth={isActive ? 2.5 : 1.8}
        />
      </motion.div>

      {/* Label */}
      <AnimatePresence mode="wait">
        {isActive ? (
          <motion.span
            key="active-label"
            initial={{ opacity: 0, y: 4, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.85 }}
            transition={{ duration: 0.18 }}
            className="text-[10px] font-black text-blue-600 dark:text-blue-400 tracking-tight leading-none"
          >
            {item.label}
          </motion.span>
        ) : (
          <motion.span
            key="inactive-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-tight leading-none"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Active dot indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400"
          />
        )}
      </AnimatePresence>
    </Link>
  );
}
