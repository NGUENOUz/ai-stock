"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, Moon, Sun, Plus } from "lucide-react";
import { useTheme } from "next-themes";

interface TopbarProps {
  showAddButton?: boolean;
}

export default function Topbar({ showAddButton = false }: TopbarProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-20 bg-white dark:bg-[#0B1120] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-30">
      
      {/* Search Bar */}
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        
        {showAddButton && (
          <button className="hidden sm:flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        )}

        <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4 ml-2">
          {/* Theme Toggle */}
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mounted && theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <button className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0B1120]" />
          </button>
        </div>

      </div>
    </header>
  );
}
