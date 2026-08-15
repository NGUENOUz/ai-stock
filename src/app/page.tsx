"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// Composants existants — tous conservés
import { LayoutTextFlip } from "@/components/LayoutText";
import { AnimatedButton } from "@/components/animationBouton";
import { ThreeDMarquee } from "@/components/maquette";
import { ContainerScroll } from "@/components/containerScrool";
import { FeaturesSectionDemo } from "@/components/feuture";
import { FooterCTA } from "@/components/footerSection";
import { CommunitySection } from "@/components/communitySection";
import { LogoMarquee } from "@/components/LogoMarquee";
import { ToolsGridMigrated } from "@/components/ToolsGridMigrated";

// Données
import { imagesAI } from "@/bd/imageAI";

// Icônes
import { ArrowRight, Star, Sparkles, Zap, Bot, Wand2, Brain, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── PAGES FLIP ──────────────────────────────────────────────────────────────
const FLIP_WORDS = ["PROMPTS", "OUTILS IA", "RESSOURCES", "WORKFLOWS"];

// ─── LOGOS FLOTTANTS AUTOUR DU HERO ──────────────────────────────────────────
// Positionnés à gauche et à droite du Hero centré
const FLOATING_LOGOS = [
  // Gauche
  { label: "ChatGPT", abbr: "GP", color: "bg-emerald-100 text-emerald-700", side: "left", top: "15%", delay: 0 },
  { label: "Midjourney", abbr: "MJ", color: "bg-violet-100 text-violet-700", side: "left", top: "42%", delay: 0.6 },
  { label: "Notion AI", abbr: "NA", color: "bg-slate-100 text-slate-700", side: "left", top: "68%", delay: 1.1 },
  // Droite
  { label: "Runway", abbr: "RW", color: "bg-rose-100 text-rose-700", side: "right", top: "18%", delay: 0.3 },
  { label: "Gemini", abbr: "GM", color: "bg-blue-100 text-blue-700", side: "right", top: "45%", delay: 0.9 },
  { label: "Claude", abbr: "CL", color: "bg-orange-100 text-orange-700", side: "right", top: "70%", delay: 1.4 },
];

// Composant carte logo flottante
function FloatingLogo({ label, abbr, color, top, delay, side }: typeof FLOATING_LOGOS[0]) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 + delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "absolute hidden xl:flex items-center gap-2.5 px-4 py-2.5",
        "bg-white/80 dark:bg-slate-800/70 backdrop-blur-md border border-white/60 dark:border-slate-600/30",
        "rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] z-20",
        side === "left" ? "right-0 translate-x-6" : "left-0 -translate-x-6"
      )}
      style={{ top }}
    >
      {/* Float up/down anim subtile */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3 + delay * 0.5, ease: "easeInOut" }}
        className="flex items-center gap-2.5"
      >
        <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center font-black text-[10px]", color)}>
          {abbr}
        </div>
        <span className="text-xs font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">{label}</span>
      </motion.div>
    </motion.div>
  );
}

// ─── SECTION DIVIDER WITH GRADIENT ───────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
      <Sparkles className="w-3 h-3" />
      {children}
    </div>
  );
}

// ─── SCROLL REVEAL WRAPPER ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="relative w-full bg-white dark:bg-[#0F172A] overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════════════════
          HERO SECTION — structure existante conservée, enrichie
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">

        {/* — Fond : grille subtile + blobs — */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {/* Grille carrée */}
          <div
            className="absolute inset-0 dark:opacity-[0.06] opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#1E40AF 1px,transparent 1px),linear-gradient(90deg,#1E40AF 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* Masque radial pour fondre la grille vers les bords */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 50%, white 100%)",
            }}
          />
          {/* Blob lumière haut-centre */}
          <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/8 dark:bg-primary/5 rounded-full blur-[140px]" />
        </div>

        {/* — Logos flottants gauche (zone absolue relative au texte) — */}
        <div className="absolute left-0 top-0 h-full w-[22%] xl:w-[25%] hidden xl:block">
          {FLOATING_LOGOS.filter(l => l.side === "left").map((l) => (
            <FloatingLogo key={l.label} {...l} />
          ))}
        </div>

        {/* — Logos flottants droite — */}
        <div className="absolute right-0 top-0 h-full w-[22%] xl:w-[25%] hidden xl:block">
          {FLOATING_LOGOS.filter(l => l.side === "right").map((l) => (
            <FloatingLogo key={l.label} {...l} />
          ))}
        </div>

        {/* — Contenu centré (structure d'origine) — */}
        <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center max-w-4xl">

          {/* Badge live */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm shadow-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              La plateforme AI tout-en-un
            </span>
          </motion.div>

          {/* H1 — exactement comme l'original, typographie XXL */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[3.2rem] sm:text-[4rem] md:text-[5.5rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.02] mb-3"
          >
            La plus grande communauté <br />
            <span className="text-slate-300 dark:text-slate-600 italic font-semibold text-[0.85em]">
              au monde qui regroupe
            </span>
          </motion.h1>

          {/* Flip Text — conservé tel quel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h-20 flex items-center justify-center mb-10"
          >
            <div className="text-primary text-3xl md:text-5xl font-black tracking-tighter">
              <LayoutTextFlip words={FLIP_WORDS} />
            </div>
          </motion.div>

          {/* Boutons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12"
          >
            <AnimatedButton text="Rejoindre AI-STOCK" onClick={() => {}} />
            <Link
              href="/liste"
              className="h-14 px-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 backdrop-blur-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all text-sm flex items-center gap-2"
            >
              Explorer le catalogue <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Social proof / stats rapides */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["bg-blue-500","bg-violet-500","bg-emerald-500","bg-amber-500"].map((c, i) => (
                  <div key={i} className={cn("w-7 h-7 rounded-full border-2 border-white dark:border-slate-900", c)} />
                ))}
              </div>
              <span><strong className="text-slate-900 dark:text-white">+15k</strong> membres</span>
            </div>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 hidden sm:block" />
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              <span className="font-bold text-slate-900 dark:text-white">4.9</span>
              <span className="text-slate-400">/ 5</span>
            </div>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 hidden sm:block" />
            <span><strong className="text-slate-900 dark:text-white">800+</strong> outils référencés</span>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          LOGO MARQUEE — "Ils sont sur AI-STOCK"
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="border-y border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20">
        <LogoMarquee />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION MARQUEE 3D — "Nos ressources populaires"
          (les vraies captures d'écran de l'application dans ThreeDMarquee)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 bg-white dark:bg-[#0F172A] overflow-hidden">
        {/* Blob derrière */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 dark:bg-primary/3 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 mb-12 relative z-10">
          <Reveal className="text-center max-w-2xl mx-auto">
            <SectionLabel>L'interface en action</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-4">
              Nos ressources <span className="text-primary italic">populaires</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
              Des outils, des prompts et des ressources soigneusement sélectionnés par notre communauté de professionnels.
            </p>
          </Reveal>
        </div>

        {/* Container 3D scroll avec les vraies images */}
        <ContainerScroll>
          <ThreeDMarquee images={imagesAI} />
        </ContainerScroll>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          TOOLS GRID — Catalogue dynamique
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800">
        <ToolsGridMigrated />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          FEATURES BENTO — "Au-delà des outils"
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-white dark:bg-[#0F172A]">
        <div className="container mx-auto px-6 pt-12">
          <Reveal>
            <SectionLabel>Pourquoi AI-STOCK</SectionLabel>
          </Reveal>
        </div>
        <FeaturesSectionDemo />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          COMMUNITY SECTION — Contributeurs
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0F172A]">
        <CommunitySection />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <FooterCTA />
    </div>
  );
}
