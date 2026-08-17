"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string; // e.g. "from-blue-500/20 to-indigo-500/20"
  iconBg: string;   // e.g. "bg-blue-500"
  delay?: number;
}

export function GlassFeatureCard({ icon, title, description, gradient, iconBg, delay = 0 }: GlassFeatureCardProps) {
  return (
    <div
      className={cn(
        "relative group rounded-3xl p-8 lg:p-10 overflow-hidden transition-all duration-500",
        "bg-white/60 dark:bg-slate-900/40",
        "backdrop-blur-xl",
        "border border-white/40 dark:border-slate-700/40",
        "hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5",
        "hover:-translate-y-1 hover:scale-[1.01]"
      )}
    >
      {/* Gradient background glow */}
      <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br", gradient)} />
      
      {/* Icon */}
      <div className={cn(
        "relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110",
        iconBg
      )}>
        {icon}
      </div>

      {/* Content */}
      <h3 className="relative z-10 text-xl font-extrabold text-slate-900 dark:text-white mb-3">{title}</h3>
      <p className="relative z-10 text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{description}</p>
      
      {/* Decorative corner glow */}
      <div className={cn("absolute -bottom-12 -right-12 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-500", iconBg)} />
    </div>
  );
}
