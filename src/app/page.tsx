"use client";
import React, { useEffect } from "react";
import type { NextPage } from "next";
import { cn } from "@/lib/utils";
import { FondCareler } from "../components/fondCareler";
import "../styles/style.scss";
import "../styles/feature.scss";
import "../styles/responsive.scss";

import { motion } from "motion/react";

import { useState } from "react";
import { imagesAI } from "@/bd/imageAI";

import { FeaturesSectionDemo } from "@/components/feuture";
import { AnimatedButton } from "@/components/animationBouton";
import { getFeaturedTools } from "@/lib/supabase/services/service";

import { AiTool } from "@/types/type";
import { AiToolCard } from "@/components/AiToolCard";
import { LayoutTextFlip } from "@/components/LayoutText";
import { ContainerScroll } from "@/components/containerScrool";
import { ThreeDMarquee } from "@/components/maquette";
import { AISocialProof } from "@/components/AiSocialProof";
import { FeatureHighlight } from "../components/FeatureHighlight";
import { PricingSection } from "../components/pricingSection";
import { FaqSection } from "@/components/FaqSetion";
import { FooterCTA } from "@/components/footerSection";

export default function SpotlightPreview() {
  const [featuredTools, setFeaturedTools] = useState<AiTool[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState<string | null>(null);
  const pages = ["PROMPTS", "FORMATIONS", "OUTILS AI"];
  useEffect(() => {
    async function fetchFeaturedTools() {
      setLoadingFeatured(true);
      setErrorFeatured(null);
      try {
        const { data, error } = await getFeaturedTools(8); // Limite à 4 IA en vogue
        if (error) {
          console.error(
            "Erreur lors de la récupération des IA en vogue :",
            error
          );
          setErrorFeatured("Impossible de charger les IA en vogue.");
        } else {
          setFeaturedTools(data || []);
        }
      } catch (err) {
        console.error(
          "Erreur inattendue lors de la récupération des IA en vogue :",
          err
        );
        setErrorFeatured("Erreur inattendue.");
      } finally {
        setLoadingFeatured(false);
      }
    }
    fetchFeaturedTools();
  }, []);

  return (
    <div className="mainContainer">
      <section id="#Acceuil">
        <div className="relative flex h-[40rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
          <div
            className={cn(
              "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
              "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
            )}
          />
        
        <FondCareler
          className="-top-40 left-0 md:-top-20 md:left-60 invisible lineLite"
          fill="white"
        /> 
          <div className="relative z-10 mx-auto w-full max-w-7xl p-20 pt-20 md:pt-0 md:justify-center flex-group ">
            <div className="relative z-20 flex w-full justify-start max-w-7xl mx-auto p-4 pt-1">
              <span className="hereTxtContainer">
                <p className="heroTxt bg-gradient-to-r from-[#FFD70066] via-[#fffbe2aa] to-transparent bg-clip-text text-transparent text-center font-semibold md:text-lg text-base px-4 py-2 rounded-xl drop-shadow-lg border-l-4 border-[#FFD700]">
                  La plateforme AI tout-en-un
                </p>
              </span>
            </div>

            <h1 className="text-center text-transparent font-extrabold md:text-7xl text-5xl bg-clip-text bg-gradient-to-b from-[#ffff] via-[#dddd] to-neutral-400 mb-6 leading-tight heroTitle ">
              La plus grande communaute AI au monde qui regroupe
              <div className="flex justify-center items-center mt-3 gap-2 text-[#FFD700] md:text-4xl text-xl font-bold">
                
                <motion.div className="tops midelText" id="midelText">
                  <LayoutTextFlip text="" words={pages} />
                </motion.div>
              </div>
            </h1>

            <div className="btn scoop">
              <AnimatedButton
                text="Rejoindre"
                onClick={() => console.log("Bouton cliqué!")}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-0 my-10 max-w-10xl rounded-3xl  p-2 ring-1 ring-neutral-700/10  fontImage squellete">
        <ContainerScroll>
          <ThreeDMarquee images={imagesAI} />
        </ContainerScroll>
      </section>

      <AISocialProof />
      <FeaturesSectionDemo />
      <PricingSection />
      <FaqSection />
      <FooterCTA />

      {/*<section className="sectionVog text-center">
        {" "}
         Fond un peu plus sombre que le Hero 
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-2 text-white">
            IA en Vogue de la Semaine
          </h2>
          <span className="sousTitle text-center align-center">
            Découvez les outils qui font forte impression actuellement{" "}
          </span>

          {loadingFeatured ? (
            <div className="text-center text-gray-400">
              Chargement des IA en vedette...
            </div>
          ) : errorFeatured ? (
            <div className="text-center text-red-400">{errorFeatured}</div>
          ) : featuredTools.length === 0 ? (
            <div className="text-center text-gray-400">
              Aucune IA en vogue pour le moment.
            </div>
          ) : (
            <div className="vogAcceuil">
              {/* Grille responsive 
              {featuredTools.map((tool) => (
                <AiToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </section>
      */}

      <section className="topCategories bg-gray"></section>
    </div>
  );
}
