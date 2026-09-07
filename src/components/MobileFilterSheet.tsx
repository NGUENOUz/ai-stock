"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  type: "pills" | "select";
  options: FilterOption[];
  value: string | string[];
  onChange: (v: string) => void;
}

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  groups: FilterGroup[];
  onReset?: () => void;
  resultCount?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MobileFilterSheet({
  isOpen,
  onClose,
  title = "Filtres",
  groups,
  onReset,
  resultCount,
}: MobileFilterSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Bottom sheet */}
          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            className="fixed bottom-0 left-0 right-0 z-[80] bg-white dark:bg-[#0F172A] rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <h3 className="font-black text-slate-900 dark:text-white">{title}</h3>
              </div>
              <div className="flex items-center gap-3">
                {onReset && (
                  <button
                    onClick={onReset}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Réinitialiser
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 px-5 py-4 space-y-6">
              {groups.map((group) => (
                <div key={group.id}>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                    {group.label}
                  </p>

                  {group.type === "pills" && (
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((opt) => {
                        const isActive = Array.isArray(group.value) ? group.value.includes(opt.value) : group.value === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => group.onChange(opt.value)}
                            className={cn(
                              "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border transition-all",
                              isActive
                                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300"
                            )}
                          >
                            {isActive && <Check className="w-3.5 h-3.5" />}
                            {opt.label}
                            {opt.count !== undefined && (
                              <span className={cn(
                                "text-[10px] font-bold ml-0.5",
                                isActive ? "text-white/70" : "text-slate-400"
                              )}>
                                {opt.count}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {group.type === "select" && (
                    <div className="grid grid-cols-2 gap-2">
                      {group.options.map((opt) => {
                        const isActive = Array.isArray(group.value) ? group.value.includes(opt.value) : group.value === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => group.onChange(opt.value)}
                            className={cn(
                              "px-4 py-3 rounded-2xl text-sm font-bold border text-left transition-all",
                              isActive
                                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                                : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300"
                            )}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Apply button */}
            <div className="px-5 pb-6 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={onClose}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
              >
                {resultCount !== undefined
                  ? `Voir les ${resultCount} résultats`
                  : "Appliquer les filtres"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Shared mobile search+filter row ─────────────────────────────────────────
// Usage: replace the entire sticky filter bar content on mobile

export function MobileFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Rechercher...",
  onFilterOpen,
  activeFiltersCount = 0,
}: {
  searchValue: string;
  onSearchChange: (v: string) => void;
  searchPlaceholder?: string;
  onFilterOpen: () => void;
  activeFiltersCount?: number;
}) {
  return (
    <div className="flex items-center gap-2 md:hidden">
      {/* Search */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-[#0F172A] border border-slate-200/60 dark:border-slate-800 rounded-full text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-colors shadow-sm"
        />
      </div>

      {/* Filter icon button */}
      <button
        onClick={onFilterOpen}
        className={cn(
          "relative flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full border transition-all shadow-sm",
          activeFiltersCount > 0
            ? "bg-blue-600 border-blue-600 text-white shadow-blue-600/25"
            : "bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
        )}
      >
        <SlidersHorizontal className="w-4 h-4" />
        {activeFiltersCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 border-2 border-white dark:border-[#0F172A] rounded-full text-white text-[9px] font-black flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
      </button>
    </div>
  );
}
