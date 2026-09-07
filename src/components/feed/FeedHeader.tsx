"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal } from "lucide-react";

interface FeedHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export default function FeedHeader({ activeTab, setActiveTab, activeCategory, setActiveCategory }: FeedHeaderProps) {

  return (
    <div className="sticky top-16 lg:top-0 z-40 bg-[#F8FAFC]/90 dark:bg-[#0B1120]/90 backdrop-blur-xl border-y border-slate-200/50 dark:border-slate-800/50 py-3 shadow-sm transition-all mb-6">
      <div className="flex items-center gap-4">
        {/* Search Bar - Pill Style */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Rechercher une publication..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0F172A] border border-slate-200/60 dark:border-slate-800 rounded-full text-sm font-medium focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
          />
        </div>
        
        {/* Filter Button - Circular */}
        <button 
          className="w-11 h-11 shrink-0 rounded-full bg-white dark:bg-[#0F172A] border border-slate-200/60 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
