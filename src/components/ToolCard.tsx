// src/components/home/ToolCard.tsx
"use client";

import React from "react";
import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";

interface ToolCardProps {
  title: string;
  category: string;
  description: string;
  rating: number;
}

export const ToolCard = ({ title, category, description, rating }: ToolCardProps) => {
  return (
    <div className="framer-card p-6 flex flex-col gap-4 group cursor-pointer">
      {/* Header de la carte : Icone + Badge */}
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center font-bold text-xl group-hover:bg-primary group-hover:text-black transition-colors duration-300">
          {title[0]}
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-neutral-50 border border-neutral-100 text-[10px] font-bold">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          {rating}
        </div>
      </div>

      {/* Contenu Texte */}
      <div>
        <h3 className="text-xl font-bold text-black flex items-center gap-2">
          {title}
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </h3>
        <p className="text-xs font-medium text-primary uppercase tracking-wider mb-2">{category}</p>
        <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Footer de la carte */}
      <div className="mt-auto pt-4 border-t border-neutral-50 flex justify-between items-center">
        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Voir l'outil</span>
        <div className="h-1.5 w-1.5 rounded-full bg-neutral-200 group-hover:bg-primary transition-colors" />
      </div>
    </div>
  );
};