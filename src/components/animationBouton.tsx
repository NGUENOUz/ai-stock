'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  text,
  onClick,
  className,
  variant = 'primary',
}) => {
  const isPrimary = variant === 'primary';

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center px-8 py-4",
        "font-bold text-base rounded-full overflow-hidden",
        "transition-all duration-300 active:scale-95 shadow-premium",
        isPrimary 
          ? "bg-primary text-white hover:bg-primary-600 hover:shadow-glow" 
          : "bg-white text-black border border-neutral-200 hover:bg-neutral-50",
        className
      )}
    >
      {/* Effet de brillance au survol */}
      {isPrimary && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
          <div className="absolute -inset-full animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0%,white_50%,transparent_100%)]" />
        </div>
      )}

      {/* Contenu */}
      <span className="relative z-10 flex items-center gap-3">
        {/* Point live pulsant */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
        </span>

        {text}

        {/* Flèche animée */}
        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </button>
  );
};