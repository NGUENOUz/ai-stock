"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Clock, Flame, Image as ImageIcon, Video, Type, Music, Code } from "lucide-react";

interface FeedHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export default function FeedHeader({ activeTab, setActiveTab, activeCategory, setActiveCategory }: FeedHeaderProps) {
  const tabs = [
    { id: "recent", label: "Récents", icon: Clock },
    { id: "trending", label: "Tendances", icon: Flame },
  ];

  const categories = [
    { id: "all", label: "Tout" },
    { id: "image", label: "Images", icon: ImageIcon },
    { id: "video", label: "Vidéos", icon: Video },
    { id: "text", label: "Textes", icon: Type },
    { id: "audio", label: "Audio", icon: Music },
    { id: "code", label: "Code", icon: Code },
  ];

  return (
    <div className="bg-white dark:bg-[#151e32] border border-slate-100 dark:border-slate-800 rounded-3xl p-4 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Main Tabs */}
        <div className="flex bg-slate-50 dark:bg-slate-900/50 p-1 rounded-2xl w-full sm:w-auto overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap",
                activeTab === tab.id 
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" 
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50"
              )}
            >
              <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? (tab.id === 'trending' ? 'text-orange-500' : 'text-primary') : '')} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors",
                activeCategory === cat.id
                  ? "bg-primary text-white"
                  : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
