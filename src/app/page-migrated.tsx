"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Composants existants
import { LayoutTextFlip } from "@/components/LayoutText";
import { AnimatedButton } from "@/components/animationBouton";
import { ThreeDMarquee } from "@/components/maquette";
import { ContainerScroll } from "@/components/containerScrool";
import { FeaturesSectionDemo } from "@/components/feuture";
import { FooterCTA } from "@/components/footerSection";
import { CommunitySection } from "@/components/communitySection";
import { LogoMarquee } from '../components/LogoMarquee';
import { ToolsGridMigrated } from "@/components/ToolsGridMigrated";

// Données
import { imagesAI } from "@/bd/imageAI";

// ✅ NOUVEAU : Client API au lieu de Supabase direct
import { apiClient } from "@/lib/api-client";
import { AiTool } from "@/types/type";

/**
 * ✅ VERSION MIGRÉE : Page d'accueil avec API-First
 * 
 * CHANGEMENTS :
 * - ❌ AVANT : import { getFeaturedTools } from '@/lib/supabase/services/service'
 * - ✅ MAINTENANT : import { apiClient } from '@/lib/api-client'
 * 
 * AVANTAGES :
 * - Sécurisé (API côté serveur)
 * - Validation automatique (Zod)
 * - Type-safe (TypeScript)
 * - Business logic centralisée
 */
export default function AIStockLandingMigrated() {
  const [featuredTools, setFeaturedTools] = useState<AiTool[]>([]);
  const [loading, setLoading] = useState(true);
  const pages = ["PROMPTS", "FORMATIONS", "OUTILS IA", "WORKFLOWS"];

  useEffect(() => {
    async function fetchTools() {
      try {
        setLoading(true);
        
        // ✅ NOUVEAU : Utilisation du client API
        const tools = await apiClient.getFeaturedTools(8);
        setFeaturedTools(tools);
        
        // ❌ ANCIEN CODE (commenté pour référence) :
        // const { data } = await getFeaturedTools(8);
        // if (data) setFeaturedTools(data);
        
      } catch (error) {
        console.error('Erreur lors du chargement des outils:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTools();
  }, []);

  return (
    <div className="relative w-full bg-white selection:bg-primary/30">
      {/* --- HERO SECTION (STYLE FRAMER) --- */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* Background : Grille discrète et aura de lumière jaune */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-primary/10 rounded-full blur-[120px] -z-10" />
        </div>

        <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
          {/* Badge Nouveauté */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-100 bg-white shadow-premium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
              La plateforme AI tout-en-un
            </span>
          </motion.div>

          {/* Titre Principal H1 */}
          <h1 className="text-5xl md:text-[5.5rem] font-extrabold tracking-tight text-black leading-[1.05] mb-6">
            La plus grande communauté <br />
            <span className="text-neutral-400 italic font-medium">
              au monde qui regroupe
            </span>
          </h1>

          {/* Animation Flip Text */}
          <div className="h-20 flex items-center justify-center mb-10">
            <div className="text-primary text-3xl md:text-5xl font-black tracking-tighter uppercase italic">
              <LayoutTextFlip words={pages} />
            </div>
          </div>

          {/* Boutons d'Action */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <AnimatedButton text="Rejoindre AI-STOCK" onClick={() => {}} />
            <button className="h-14 px-10 rounded-2xl border border-neutral-200 bg-white font-bold hover:bg-neutral-50 transition-all text-neutral-600">
              Déposer un outil
            </button>
          </div>
        </div>
      </section>

      <LogoMarquee />
      
      {/* ✅ NOUVEAU : Composant migré avec API */}
      <ToolsGridMigrated />

      {/* --- SECTION MARQUEE (SCROLL) --- */}
      <section className="relative py-20 bg-white overflow-hidden">
        <h2 className="text-3xl font-bold text-black mb-4 max-w-7xl mx-auto px-6">
          Nos ressources populaires
        </h2>
        <ContainerScroll>
          <ThreeDMarquee images={imagesAI} />
        </ContainerScroll>
      </section>

      {/* --- PREUVE SOCIALE & FEATURES --- */}
      <div className="bg-white space-y-32 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-neutral-50 rounded-[3rem] p-8 md:p-16 border border-neutral-100">
            <FeaturesSectionDemo />
          </div>
        </div>

        <CommunitySection />
      </div>

      <FooterCTA />
    </div>
  );
}
