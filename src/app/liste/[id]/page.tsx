"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// Import du composant ToolCard utilisé sur la home
import { ToolCard } from "@/components/ToolCard";
import {
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe,
  Share2,
  Heart,
  Trophy,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

const AiToolDetailPage = ({ params }: any) => {
  const [isLiked, setIsLiked] = useState(false);

  // Simulation de l'outil principal
  const tool = {
    id: 1,
    name: "StockPredict AI",
    category: "Banque & Finance",
    shortDesc: "Précision chirurgicale pour les marchés financiers mondiaux.",
    fullDesc:
      "Propulsé par des algorithmes de Deep Learning de pointe, StockPredict analyse les flux de données en millisecondes pour identifier les opportunités avant le marché. C'est l'outil indispensable pour les traders qui ne laissent rien au hasard.",
    features: [
      {
        title: "Analyse Temps Réel",
        icon: <Zap className="w-5 h-5 text-blue-500" />,
      },
      {
        title: "Sécurité Militaire",
        icon: <ShieldCheck className="w-5 h-5 text-green-500" />,
      },
      {
        title: "Couverture Mondiale",
        icon: <Globe className="w-5 h-5 text-purple-500" />,
      },
      {
        title: "Auto-Apprentissage",
        icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      },
    ],
    price: "Gratuit",
    upvotes: 1240,
    currentRank: 1,
    bannerImage: "https://picsum.photos/1200/800?random=11",
    logo: "https://picsum.photos/160/160?random=1",
    officialSiteUrl: "https://google.com",
  };

  // Simulation d'outils similaires (formatés pour ToolCard)
  const similarTools = [
    {
      id: 2,
      name: "CryptoRadar",
      category: "Finance",
      upvotes: 850,
      logo: "https://picsum.photos/80/80?random=20",
      shortDesc: "Analyse prédictive pour le marché des crypto-actifs.",
    },
    {
      id: 3,
      name: "EquityMind",
      category: "Analytique",
      upvotes: 720,
      logo: "https://picsum.photos/80/80?random=21",
      shortDesc: "Le moteur IA pour votre portefeuille d'actions.",
    },
    {
      id: 4,
      name: "InvestoBot",
      category: "Automation",
      upvotes: 640,
      logo: "https://picsum.photos/80/80?random=22",
      shortDesc: "Automatisez vos investissements en toute simplicité.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] antialiased text-slate-900 selection:bg-primary/10">
      {/* 🟢 TOP NAV */}
      <nav className="sticky top-0 z-[100] w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/liste"
            className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm uppercase tracking-widest">
              Retour
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2.5 rounded-xl border transition-all ${isLiked ? "bg-red-50 border-red-100 text-red-500" : "bg-slate-50 border-slate-100 text-slate-400 hover:text-slate-600"}`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </button>
            <button className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-600 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        {/* 🔵 SECTION TITRE */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16 items-start lg:items-end">
          <div className="relative shrink-0">
            <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl" />
            <Image
              src={tool.logo}
              alt={tool.name}
              width={160}
              height={160}
              className="relative rounded-[2.5rem] border-[6px] border-white shadow-2xl bg-white"
            />
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap gap-3">
              <span className="bg-primary/10 text-primary text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase">
                {tool.category}
              </span>
              <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase flex items-center gap-2">
                <Trophy className="w-3 h-3 text-amber-500" /> Classé N°
                {tool.currentRank}
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-slate-900">
              {tool.name}
            </h1>
            <p className="text-2xl text-slate-400 font-medium max-w-2xl leading-tight">
              {tool.shortDesc}
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-2 shrink-0">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
              Score Popularité
            </span>
            <span className="text-6xl font-black text-primary tracking-tighter italic">
              {tool.upvotes}
              <span className="text-2xl opacity-30">pts</span>
            </span>
          </div>
        </div>

        {/* 🟡 GRILLE DE CONTENU PRINCIPALE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-8 space-y-12">
            <div className="relative aspect-[16/10] rounded-[3.5rem] overflow-hidden bg-slate-100 border-[8px] border-white shadow-2xl shadow-slate-200/50 group">
              <Image
                src={tool.bannerImage}
                alt="Product Preview"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[3.5rem]" />
            </div>

            <section className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Sparkles className="w-24 h-24 text-primary" />
              </div>
              <h2 className="text-3xl font-black mb-8 tracking-tight">
                Pourquoi choisir {tool.name.split(" ")[0]} ?
              </h2>
              <div className="prose prose-slate prose-xl max-w-none">
                <p className="text-slate-500 font-medium leading-relaxed">
                  {tool.fullDesc}
                </p>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tool.features.map((f, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-100 p-8 rounded-[2.8rem] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-slate-400 font-bold text-sm tracking-tight italic">
                    Fonctionnalité vérifiée
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 🔴 SIDEBAR */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-[100px] rounded-full" />
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-12">
                    <span className="text-primary font-black text-sm tracking-[0.3em] uppercase">
                      Offre Actuelle
                    </span>
                    <div className="bg-white/10 px-4 py-1 rounded-full text-[10px] font-black uppercase">
                      LIVE
                    </div>
                  </div>
                  <div className="space-y-2 mb-12">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                      Plan de démarrage
                    </span>
                    <div className="text-6xl font-black italic tracking-tighter text-white">
                      {tool.price}
                    </div>
                  </div>
                  <div className="space-y-5 mb-12">
                    {[
                      "Accès complet à l'API",
                      "Support prioritaire",
                      "Mises à jour à vie",
                    ].map((text) => (
                      <div
                        key={text}
                        className="flex items-center gap-3 text-sm font-bold text-slate-300"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={tool.officialSiteUrl}
                    target="_blank"
                    className="flex items-center justify-center gap-3 w-full bg-primary hover:bg-white text-white hover:text-slate-900 px-8 py-7 rounded-[2rem] font-black text-xl transition-all duration-500 group/btn shadow-xl shadow-primary/20"
                  >
                    Ouvrir l'outil
                    <ArrowUpRight className="w-6 h-6 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 rounded-[2.5rem] p-8 flex items-center gap-6 border border-slate-100">
                <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm leading-tight">
                    Sécurité Certifiée
                  </h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                    Audit de 2026
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* 🚀 SECTION : OUTILS SIMILAIRES (Réutilisation de ToolCard) */}
        <section className="mb-32">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h3 className="text-sm font-black text-primary uppercase tracking-[0.5em] mb-4">
                Exploration
              </h3>
              <h2 className="text-4xl font-black tracking-tight text-slate-900">
                Solutions{" "}
                <span className="italic text-slate-400">similaires</span>
              </h2>
            </div>
            <Link
              href="/liste"
              className="hidden md:flex items-center gap-2 text-slate-400 font-bold hover:text-primary transition-colors"
            >
              Tout voir <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarTools.map((st) => (
              <ToolCard
                key={st.id}
                title={st.name}
                category={st.category}
                description={st.shortDesc}
                rating={st.upvotes}
              />
            ))}
          </div>
        </section>

        {/* 🚀 BLOC AJOUTER UN OUTIL */}
        <section className="mb-24">
          <div className="relative bg-slate-900 rounded-[3rem] p-12 md:p-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] -mr-48 -mt-48" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                  Vous avez créé une{" "}
                  <span className="text-primary italic">solution IA ?</span>
                </h2>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                  Rejoignez plus de 500 outils déjà référencés et augmentez
                  votre visibilité auprès des professionnels de votre secteur.
                </p>
              </div>
              <button className="group flex items-center gap-4 bg-white text-slate-900 px-10 py-6 rounded-2xl font-black text-xl hover:bg-primary hover:text-white transition-all shadow-xl shadow-black/20">
                <PlusCircle className="w-6 h-6" />
                Ajouter mon outil
              </button>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-slate-100 text-center">
          <p className="text-slate-300 font-black text-xs uppercase tracking-[0.5em]">
            © 2026 Directory IA - Excellence Technologique
          </p>
        </footer>
      </main>
    </div>
  );
};

export default AiToolDetailPage;
