// src/components/home/ToolCard.tsx
"use client";

import React from "react";
import { ArrowUpRight, Star, Sparkles } from "lucide-react";
import Image from "next/image";

interface ToolCardProps {
  title: string;
  category: string;
  description: string;
  rating: number;
}

export const ToolCard = ({ title, category, description, rating }: ToolCardProps) => {
  return (
    <div className="group relative cursor-pointer">
      {/* Glow effect au hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-primary-600 to-primary opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 rounded-2xl" />
      
      <div className="relative bg-white border border-neutral-200 rounded-xl p-6 flex flex-col gap-4 shadow-premium hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
        {/* Header de la carte : Icone + Badge */}
        <div className="flex justify-between items-start">
          <div className="relative w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center font-black text-xl text-neutral-600 ring-2 ring-neutral-100 group-hover:ring-primary/30 group-hover:bg-primary group-hover:text-black group-hover:scale-110 transition-all duration-300">
            {title[0]}
            {/* Sparkle effect */}
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-100 text-xs font-bold group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            {rating}
          </div>
        </div>

        {/* Contenu Texte */}
        <div>
          <h3 className="text-xl font-bold text-black flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
            {title}
            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          </h3>
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3 group-hover:text-primary-600 transition-colors">{category}</p>
          <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed group-hover:text-neutral-800 transition-colors">
            {description}
          </p>
        </div>

        {/* Footer de la carte */}
        <div className="mt-auto pt-4 border-t border-neutral-100 flex justify-between items-center group-hover:border-primary/20 transition-colors">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest group-hover:text-primary transition-colors">Voir l'outil</span>
          <div className="h-2 w-2 rounded-full bg-neutral-200 group-hover:bg-primary group-hover:scale-150 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};