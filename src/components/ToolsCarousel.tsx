"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Flame, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tool {
  name: string;
  desc: string;
  rating: number;
  reviews: string;
  icon: string;
  isFree: boolean;
  tag: string;
  badge?: "popular" | "sponsored";
}

const CAROUSEL_TOOLS: Tool[] = [
  { name: "ChatGPT Plus", desc: "L'assistant IA le plus avancé pour toutes vos tâches.", rating: 4.9, reviews: "2.4k", icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", isFree: true, tag: "Productivité", badge: "popular" },
  { name: "Midjourney", desc: "Créez des images spectaculaires en quelques secondes.", rating: 4.8, reviews: "3.8k", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png", isFree: false, tag: "Image", badge: "popular" },
  { name: "Runway Gen-3", desc: "Créez et éditez des vidéos avec l'IA de nouvelle génération.", rating: 4.7, reviews: "1.2k", icon: "https://a.storyblok.com/f/254425/x/22144358a9/runway-logo.svg", isFree: true, tag: "Vidéo", badge: "sponsored" },
  { name: "Claude 3.5", desc: "L'IA conversationnelle la plus nuancée et précise.", rating: 4.9, reviews: "1.8k", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg", isFree: true, tag: "Productivité", badge: "popular" },
  { name: "Notion AI", desc: "Boostez votre productivité et votre prise de notes.", rating: 4.7, reviews: "1.5k", icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", isFree: true, tag: "Productivité" },
  { name: "Stable Diffusion", desc: "Génération d'images open-source ultra puissante.", rating: 4.6, reviews: "2.1k", icon: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Stable_Diffusion_Logo.png", isFree: true, tag: "Image" },
  { name: "ElevenLabs", desc: "Clonez des voix et créez du contenu audio réaliste.", rating: 4.8, reviews: "890", icon: "https://upload.wikimedia.org/wikipedia/commons/2/2a/ElevenLabs_logo.png", isFree: false, tag: "Audio", badge: "popular" },
  { name: "Perplexity AI", desc: "Le moteur de recherche IA qui cite ses sources.", rating: 4.7, reviews: "1.1k", icon: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Perplexity_AI_logo.png", isFree: true, tag: "Recherche" },
  { name: "Cursor AI", desc: "L'éditeur de code alimenté par l'IA pour les développeurs.", rating: 4.8, reviews: "670", icon: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg", isFree: true, tag: "Code" },
  { name: "Suno AI", desc: "Composez de la musique originale avec l'intelligence artificielle.", rating: 4.6, reviews: "540", icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg", isFree: false, tag: "Audio" },
];

export function ToolsCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const duplicated = [...CAROUSEL_TOOLS, ...CAROUSEL_TOOLS];

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-6 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-semibold text-xs mb-4 border border-orange-100 dark:border-orange-800/50">
              <Flame className="w-3.5 h-3.5" /> Tendances
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Les outils IA les plus populaires</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Découvrez les outils plébiscités par notre communauté de +15 000 créateurs.</p>
          </div>
          <Link href="/liste" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity shrink-0">
            Voir les 1000+ outils <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient edges */}
        <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-slate-50 dark:from-[#0B1120] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-slate-50 dark:from-[#0B1120] to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: isPaused ? undefined : ["0%", "-50%"] }}
          transition={{
            x: { duration: 40, repeat: Infinity, ease: "linear" },
          }}
        >
          {duplicated.map((tool, idx) => (
            <div
              key={`${tool.name}-${idx}`}
              className="w-[300px] shrink-0 bg-white dark:bg-[#0F172A] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
            >
              {/* Badge */}
              {tool.badge && (
                <div className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3",
                  tool.badge === "popular" ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400" : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                )}>
                  {tool.badge === "popular" ? <Flame className="w-3 h-3" /> : <BadgeCheck className="w-3 h-3" />}
                  {tool.badge === "popular" ? "Populaire" : "Sponsorisé"}
                </div>
              )}

              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl p-1.5 border border-slate-100 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-hidden flex items-center justify-center relative shrink-0">
                  <Image src={tool.icon} alt={tool.name} fill className="object-contain p-1.5" unoptimized />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 transition-colors truncate">{tool.name}</h3>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold">{tool.tag}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">{tool.desc}</p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{tool.rating} <span className="text-slate-400 font-normal">({tool.reviews})</span></span>
                </div>
                <span className={cn("text-[10px] font-bold px-2 py-1 rounded-md", tool.isFree ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600" : "bg-orange-50 dark:bg-orange-900/20 text-orange-600")}>
                  {tool.isFree ? "Freemium" : "Payant"}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
