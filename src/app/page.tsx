"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Star, Sparkles, CheckCircle2, ChevronRight, Play,
  Users, LayoutGrid, Zap, TrendingUp, Search, PenTool, Database,
  Flame
} from "lucide-react";

// Composants
import { LogoMarquee } from "@/components/LogoMarquee";
import { FooterCTA } from "@/components/footerSection";
import { HoverEffect } from "@/components/hover-effect";
import { Counter } from "@/components/counter";
import { AnimatedFilters } from "@/components/animated-filters";
import { AnimatedDashboardBars } from "@/components/animated-bars";
import { Meteors } from "@/components/meteors";
import { FloatingToolCards } from "@/components/FloatingToolCards";
import { ToolsCarousel } from "@/components/ToolsCarousel";
import { GlassFeatureCard } from "@/components/GlassFeatureCard";

// Données
import { imagesAI } from "@/bd/imageAI";
import { cn } from "@/lib/utils";

// ─── Animation helper ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Données Mockées ─────────────────────────────────────────────────────────
const MOCK_TOOLS = [
  { name: "ChatGPT Plus", desc: "L'assistant IA le plus avancé pour toutes vos tâches.", rating: 4.9, reviews: "2.4k", icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", isFree: true, tag: "Productivité" },
  { name: "Midjourney", desc: "Créez des images spectaculaires en quelques secondes.", rating: 4.8, reviews: "3.8k", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png", isFree: false, tag: "Image" },
  { name: "Runway", desc: "Créez et éditez des vidéos avec l'IA de nouvelle génération.", rating: 4.7, reviews: "1.2k", icon: "https://a.storyblok.com/f/254425/x/22144358a9/runway-logo.svg", isFree: true, tag: "Vidéo" },
  { name: "Notion AI", desc: "Boostez votre productivité et votre prise de notes.", rating: 4.7, reviews: "1.5k", icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", isFree: true, tag: "Productivité" },
  { name: "Claude 3.5", desc: "L'IA conversationnelle la plus nuancée et précise.", rating: 4.9, reviews: "1.8k", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg", isFree: true, tag: "Productivité" },
  { name: "Stable Diffusion", desc: "Génération d'images open-source ultra puissante.", rating: 4.6, reviews: "2.1k", icon: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Stable_Diffusion_Logo.png", isFree: true, tag: "Image" },
  { name: "ElevenLabs", desc: "Clonez des voix et créez du contenu audio réaliste.", rating: 4.8, reviews: "890", icon: "https://upload.wikimedia.org/wikipedia/commons/2/2a/ElevenLabs_logo.png", isFree: false, tag: "Audio" },
  { name: "Perplexity AI", desc: "Le moteur de recherche IA qui cite ses sources.", rating: 4.7, reviews: "1.1k", icon: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Perplexity_AI_logo.png", isFree: true, tag: "Recherche" },
];

const MOCK_BLOGS = [
  { title: "Les 10 tendances IA à suivre en 2024", tag: "ACTUALITÉ", time: "12 min", author: "Sarah A.", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" },
  { title: "Comment créer des prompts qui cartonnent", tag: "ASTUCE", time: "8 min", author: "Thomas D.", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800" },
  { title: "Le guide ultime pour débuter avec Midjourney", tag: "GUIDE", time: "15 min", author: "Alex M.", img: "https://images.unsplash.com/photo-1686191128892-3b37013ba081?auto=format&fit=crop&q=80&w=800" },
];

const QUICK_ACCESS = [
  { title: "Outils IA", description: "Trouvez les meilleurs outils classés par catégories.", icon: <Zap className="w-6 h-6" />, colorClass: "bg-blue-100 text-blue-600 dark:bg-blue-900/30", link: "/liste" },
  { title: "Prompts", description: "Des prompts optimisés pour chaque besoin créatif.", icon: <Search className="w-6 h-6" />, colorClass: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30", link: "/prompt" },
  { title: "Ressources", description: "Guides, templates, formations et assets à fort impact.", icon: <Database className="w-6 h-6" />, colorClass: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30", link: "/ressources" },
  { title: "Blog", description: "Actualités, astuces et retours d'expérience sur l'IA.", icon: <PenTool className="w-6 h-6" />, colorClass: "bg-purple-100 text-purple-600 dark:bg-purple-900/30", link: "/blog" },
];

// ─── BookIcon helper ─────────────────────────────────────────────────────────
function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  LANDING PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function LandingPage() {
  return (
    <div className="w-full bg-slate-50 dark:bg-[#0B1120] font-sans text-slate-900 dark:text-white overflow-x-hidden relative">
      {/* Grid Pattern Background */}
      <div className="pointer-events-none fixed inset-0 z-0 w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO SECTION — Titre centré + cartes flottantes
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
        {/* Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-blue-500/15 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Floating tool cards */}
        <FloatingToolCards />

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          {/* Badge */}
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm mb-8 border border-blue-100 dark:border-blue-800 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Nouveau : +1 000 outils IA référencés
            </div>
          </Reveal>

          {/* Title */}
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              L'arsenal ultime pour{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                vos créations IA
              </span>.
            </h1>
          </Reveal>

          {/* Subtitle */}
          <Reveal delay={0.2}>
            <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Outils, prompts, ressources et communauté de créateurs — tout ce dont vous avez besoin pour booster vos projets IA.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.3} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/liste" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-base">
              Explorer <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/signup" className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-base">
              Nous rejoindre
            </Link>
          </Reveal>

          {/* Social proof */}
          <Reveal delay={0.4} className="flex items-center justify-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <Image src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="User" width={40} height={40} />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">+15k</strong> créateurs et professionnels
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. LOGO MARQUEE
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-xs mb-0">Ils utilisent AI-STOCK</p>
        </div>
        <LogoMarquee />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          3. OUTILS POPULAIRES — Carousel auto-scroll
      ═══════════════════════════════════════════════════════════════════ */}
      <ToolsCarousel />

      {/* ═══════════════════════════════════════════════════════════════════
          4. FONCTIONNALITÉS — Glassmorphism Grid
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-20 relative">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <Reveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-semibold text-xs mb-4 border border-indigo-100 dark:border-indigo-800/50">
              <Sparkles className="w-3.5 h-3.5" /> Pourquoi AI-STOCK ?
            </div>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
              Tout pour créer avec l'IA, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">au même endroit</span>.
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Explorez, créez et monétisez — notre plateforme centralise les meilleurs outils et ressources IA.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            <Reveal delay={0}>
              <GlassFeatureCard
                icon={<Search className="w-6 h-6" />}
                title="Découvrez les meilleurs outils"
                description="Explorez +1 000 outils IA classés par catégorie, notés et testés par la communauté. Trouvez l'outil parfait en quelques clics."
                gradient="from-blue-500/10 to-cyan-500/10"
                iconBg="bg-gradient-to-br from-blue-500 to-blue-600"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <GlassFeatureCard
                icon={<Sparkles className="w-6 h-6" />}
                title="Créez avec des prompts pro"
                description="Des milliers de prompts optimisés pour l'image, la vidéo, le texte et le code. Copiez, adaptez, créez."
                gradient="from-indigo-500/10 to-purple-500/10"
                iconBg="bg-gradient-to-br from-indigo-500 to-indigo-600"
              />
            </Reveal>
            <Reveal delay={0.2}>
              <GlassFeatureCard
                icon={<TrendingUp className="w-6 h-6" />}
                title="Monétisez votre talent"
                description="Devenez contributeur : vendez vos prompts, templates et ressources. Rejoignez +500 créateurs qui génèrent des revenus."
                gradient="from-emerald-500/10 to-teal-500/10"
                iconBg="bg-gradient-to-br from-emerald-500 to-emerald-600"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          5. ACCÈS RAPIDE — HoverEffect cards
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 py-10 relative z-10">
        <HoverEffect items={QUICK_ACCESS} />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          6. EXPLOREZ LES OUTILS IA — Filtres + Grille
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 py-20">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Explorez les outils IA</h2>
              <p className="text-slate-500 dark:text-slate-400">Trouvez l'outil parfait parmi des milliers de solutions testées par la communauté.</p>
            </div>
            <Link href="/liste" className="text-blue-600 font-bold hover:underline flex items-center gap-1 shrink-0">
              Voir tous les outils <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <AnimatedFilters />
        </Reveal>

        {/* Tool cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-8">
          {MOCK_TOOLS.map((tool, idx) => (
            <Reveal key={tool.name} delay={0.05 * idx}>
              <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl mb-4 p-1.5 border border-slate-100 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-hidden flex items-center justify-center relative">
                  <Image src={tool.icon} alt={tool.name} fill className="object-contain p-2" unoptimized />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mb-3">{tool.tag}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 h-10">{tool.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{tool.rating} <span className="text-slate-400 dark:text-slate-500 font-normal">({tool.reviews})</span></span>
                  </div>
                  <span className={cn("text-xs font-bold px-2 py-1 rounded-md", tool.isFree ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600" : "bg-orange-50 dark:bg-orange-900/30 text-orange-600")}>
                    {tool.isFree ? "Freemium" : "Payant"}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="text-center">
          <Link href="/liste" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity">
            Voir les 1000+ outils <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          7. BENTO GRID — Prompts + Ressources + CTA Contributeur
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 py-20">
        {/* Row 1: Prompts (2/3) + Ressources (1/3) */}
        <div className="grid lg:grid-cols-5 gap-6 mb-6">
          {/* Prompts — large card */}
          <Reveal className="lg:col-span-3 bg-blue-600 rounded-[2rem] p-8 lg:p-10 text-white relative overflow-hidden shadow-xl shadow-blue-600/20 group">
            <Meteors number={25} />
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-extrabold mb-3 transition-transform group-hover:translate-x-1">Prompts prêts à l'emploi</h3>
              <p className="text-blue-100 mb-8 text-sm lg:text-base max-w-lg">Accédez à des milliers de prompts optimisés pour l'image, la vidéo, le texte, le code et plus.</p>

              <div className="bg-blue-900/40 rounded-xl border border-white/10 p-5 font-mono text-sm mb-8 max-w-md">
                <div className="flex items-center gap-2 mb-3 text-blue-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs">prompt</span>
                </div>
                <p className="text-blue-50">/imagine ultra realistic futuristic city at sunset, cinematic lighting, volumetric fog...</p>
              </div>

              <Link href="/prompt" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
                Explorer les prompts <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          {/* Ressources */}
          <Reveal delay={0.1} className="lg:col-span-2 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 flex flex-col relative overflow-hidden shadow-sm">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">Ressources premium</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Guides, templates, formations, assets... Gagnez du temps et montez en compétences.</p>

            <div className="flex-1 relative flex items-center justify-center mb-8 min-h-[160px]">
              <div className="absolute w-40 h-52 bg-indigo-500 rounded-xl transform rotate-6 scale-95 shadow-xl" />
              <div className="absolute w-40 h-52 bg-blue-500 rounded-xl transform -rotate-3 scale-100 shadow-xl flex items-center justify-center flex-col text-white p-4">
                <BookIcon className="w-8 h-8 mb-2 opacity-80" />
                <span className="font-bold text-center text-sm">Guide Ultimate Midjourney</span>
              </div>
            </div>

            <Link href="/ressources" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
              Découvrir les ressources <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        {/* Row 2: CTA Contributeur — full width */}
        <Reveal delay={0.15}>
          <div className="bg-gradient-to-r from-blue-100 via-blue-50 to-indigo-50 dark:from-blue-900/30 dark:via-blue-900/15 dark:to-indigo-900/15 border border-blue-200/60 dark:border-blue-800/40 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mb-3 flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-blue-600" /> Envie de partager vos créations ?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-base lg:text-lg max-w-2xl leading-relaxed">
                Rejoignez notre communauté de créateurs. Proposez vos meilleurs prompts, gagnez en visibilité et générez des revenus en vendant vos créations exclusives.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 shrink-0 w-full md:w-auto">
              <Link href="/signup" className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors w-full md:w-auto shadow-lg shadow-blue-600/25">
                Devenir Contributeur <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative border-2 border-white dark:border-[#0B1120]">
                      <Image src={`https://i.pravatar.cc/150?img=${i + 20}`} alt="user" fill />
                    </div>
                  ))}
                </div>
                Rejoignez +500 créateurs
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          8. CTA PARTENAIRE — Split screen
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 py-12">
        <Reveal className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col lg:flex-row items-stretch">
          <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-semibold text-xs mb-6 border border-emerald-100 dark:border-emerald-800/50 w-fit">
              <TrendingUp className="w-3.5 h-3.5" /> Pour les créateurs d'outils
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Vous créez un outil IA ?</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg">Promouvez-le auprès de milliers de créateurs et professionnels sur AI-STOCK.</p>
            <ul className="space-y-4 mb-8">
              {["Mise en avant sponsorisée", "Audience qualifiée", "Résultats mesurables"].map(item => (
                <li key={item} className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md flex items-center gap-2 w-fit">
              Devenir partenaire <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:w-1/2 bg-slate-50 dark:bg-[#0B1120] p-10 lg:p-16 w-full border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 flex items-center justify-center">
            <div className="bg-white dark:bg-[#0F172A] w-full max-w-md rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Visibilité de votre outil</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Vues</div>
                  <div className="text-xl font-black text-slate-900 dark:text-white"><Counter value={48.7} />K</div>
                  <div className="text-xs text-emerald-500 font-bold flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1" /> 3.1%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Clics</div>
                  <div className="text-xl font-black text-slate-900 dark:text-white"><Counter value={12.3} />K</div>
                  <div className="text-xs text-emerald-500 font-bold flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1" /> 4.2%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Conversions</div>
                  <div className="text-xl font-black text-slate-900 dark:text-white"><Counter value={512} /></div>
                  <div className="text-xs text-emerald-500 font-bold flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1" /> 6.1%</div>
                </div>
              </div>
              <AnimatedDashboardBars />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          9. BLOG
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 py-20">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Derniers articles du blog</h2>
              <p className="text-slate-500 dark:text-slate-400">Restez à jour avec les dernières actualités et analyses sur l'IA.</p>
            </div>
            <Link href="/blog" className="px-6 py-3 border border-slate-200 dark:border-slate-800 text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold rounded-xl flex items-center gap-2 transition-colors shrink-0">
              Voir tout le blog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_BLOGS.map((blog, i) => (
            <Reveal key={i} delay={0.1 * i} className="group cursor-pointer">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4">
                <Image src={blog.img} alt={blog.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-md uppercase">{blog.tag}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">{blog.time}</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4 group-hover:text-blue-600 transition-colors leading-snug">{blog.title}</h3>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                  <Image src={`https://i.pravatar.cc/150?img=${i + 20}`} alt={blog.author} fill />
                </div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{blog.author}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          10. BANNIÈRE STATS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-blue-600 py-14">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-white text-center divide-x divide-white/20">
            {[
              { icon: <Users className="w-6 h-6" />, value: 20000, label: "Membres actifs" },
              { icon: <LayoutGrid className="w-6 h-6" />, value: 12000, label: "Outils référencés" },
              { icon: <Zap className="w-6 h-6" />, value: 8000, label: "Prompts prêts à l'emploi" },
              { icon: <Database className="w-6 h-6" />, value: 2000, label: "Ressources disponibles" },
              { icon: <Star className="w-6 h-6" />, value: 500, label: "Contributeurs" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={0.1 * i} className="px-4">
                <div className="flex justify-center mb-3 opacity-80">{stat.icon}</div>
                <div className="text-2xl lg:text-3xl font-black mb-1"><Counter value={stat.value} />+</div>
                <div className="text-xs font-semibold uppercase tracking-wider opacity-80">{stat.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          11. FOOTER CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <FooterCTA />
    </div>
  );
}
