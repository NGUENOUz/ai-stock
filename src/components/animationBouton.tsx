'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  text,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center px-8 py-4",
        "bg-black text-primary font-bold text-lg rounded-full",
        "border border-white/10 overflow-hidden transition-all duration-300",
        "hover:scale-105 active:scale-95 cursor-pointer shadow-2xl",
        className
      )}
    >
      {/* 1. Effet de brillance au survol (Glow tournant) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-full animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,var(--color-primary)_50%,transparent_100%)] opacity-20" />
      </div>

      {/* 2. Contenu du bouton */}
      <span className="relative z-10 flex items-center gap-3">
        {/* Point vert "Live" pulsant */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>

        {text}

        {/* Flèche animée */}
        <motion.span
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="inline-block"
        >
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.span>
      </span>

      {/* 3. Overlay de finition (Lissage interne) */}
      <div className="absolute inset-px rounded-full bg-black z-0 group-hover:bg-neutral-900 transition-colors duration-300" />
    </button>
  );
};