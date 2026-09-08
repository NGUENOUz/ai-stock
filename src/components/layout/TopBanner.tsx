"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && bannerRef.current) {
      document.documentElement.style.setProperty('--banner-height', `${bannerRef.current.offsetHeight}px`);
    } else {
      document.documentElement.style.setProperty('--banner-height', '0px');
    }
    
    // Resize observer to handle window resizing
    if (isVisible && bannerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          document.documentElement.style.setProperty('--banner-height', `${entry.contentRect.height}px`);
        }
      });
      resizeObserver.observe(bannerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        ref={bannerRef}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-gradient-ai text-white overflow-hidden relative z-[60]"
      >
        <div className="max-w-[1400px] mx-auto px-4 py-2 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex-1 flex items-center justify-center text-xs md:text-sm font-bold gap-3">
            <Sparkles className="w-4 h-4 hidden sm:block text-yellow-300" />
            <span>
              Découvrez la nouvelle version d'AI-STOCK. Le Hub Ultime pour les créateurs IA.
            </span>
            <Link href="/feed" className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-white transition-colors flex items-center gap-1 text-[11px] uppercase tracking-wider ml-2">
              Découvrir <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors shrink-0 ml-4"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
