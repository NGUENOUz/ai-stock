// src/components/AiToolCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ExternalLink, Sparkles } from "lucide-react";
import { AiTool } from "../types/type";

interface AiToolCardProps {
  tool: AiTool;
}

export const AiToolCard: React.FC<AiToolCardProps> = ({ tool }) => {
  const defaultLogo = "/path/to/default-ai-logo.svg";
  
  const getPricingBadgeClass = (model: string | null) => {
    switch (model) {
      case "Gratuit":
        return "badge-success";
      case "Essai Gratuit":
        return "badge-info";
      case "Freemium":
        return "badge-warning";
      case "Payant":
        return "badge-error";
      default:
        return "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase bg-neutral-100 text-neutral-600 border border-neutral-200";
    }
  };

  const truncateDescription = (text: string | null, maxLength: number) => {
    if (!text) return "Aucune description disponible.";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="group relative">
      {/* Glow effect au hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-primary-600 to-primary opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 rounded-2xl" />
      
      <Link href={`/${tool.slug}`} className="block relative">
        <div className="bg-white border border-neutral-200 rounded-xl p-6 h-full flex flex-col shadow-premium hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
          {/* Header: Logo + Nom + Badge */}
          <div className="flex items-start gap-4 mb-4">
            <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-neutral-50 flex items-center justify-center ring-2 ring-neutral-100 group-hover:ring-primary/30 transition-all duration-300">
              {tool.logo_url ? (
                <Image
                  src={tool.logo_url}
                  height={56}
                  width={56}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                  alt={`${tool.name} logo`}
                />
              ) : (
                <span className="text-lg font-black text-neutral-400 uppercase">
                  {tool.name.substring(0, 2)}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-black truncate group-hover:text-primary transition-colors duration-300">
                  {tool.name}
                </h3>
                {tool.is_featured && (
                  <div className="relative">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 animate-pulse" />
                    <Sparkles className="w-3 h-3 text-primary absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>
              <span className={getPricingBadgeClass(tool.pricing)}>
                {tool.pricing || "N/A"}
              </span>
            </div>
          </div>

          {/* Banner */}
          {tool.ban_url && (
            <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden bg-neutral-50">
              <Image
                src={tool.ban_url}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                alt={`${tool.name} banner`}
              />
              {/* Overlay gradient au hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-neutral-600 mb-4 flex-grow line-clamp-2 group-hover:text-neutral-800 transition-colors">
            {truncateDescription(tool.description_short ?? null, 100)}
          </p>

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            <button className="flex-1 bg-transparent border-2 border-neutral-200 text-neutral-800 px-4 py-2.5 rounded-lg text-sm font-bold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 active:scale-95">
              Détails
            </button>
            {tool.website_url && (
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  window.open(tool.website_url, '_blank');
                }}
                className="flex-1 bg-primary text-black px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-primary-600 hover:shadow-glow transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group/btn"
              >
                Visiter
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
