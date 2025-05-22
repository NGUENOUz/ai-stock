"use client";
import React, { useEffect } from "react";
import type { NextPage } from 'next';
import { cn } from "@/lib/utils";
import { FondCareler } from "../../components/fondCareler";
import "./style.scss";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../../components/navbar";
import { useState } from "react";
import { imagesAI } from "@/bd/imageAI";
import { ThreeDMarquee } from "@/components/maquette";

import { ContainerScroll } from "../../components/containerScrool";
import { FeaturesSectionDemo } from "@/components/feuture";
import { AnimatedButton } from "@/components/animationBouton";
import { getFeaturedTools } from "@/lib/supabase/services/service";

import { AiTool } from "@/types/type";
import { AiToolCard } from "@/components/AiToolCard";

export default function SpotlightPreview() {
  const navItems = [
    {
      name: "Liste des AI",
      link: "#features",
    },
    {
      name: "prompts populaires",
      link: "#pricing",
    },
    {
      name: "Formations",
      link: "#contact",
    },

    {
      name: "Blog",
      link: "#contact",
    },
    {
      name: "Events",
      link: "#contact",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];


  const [featuredTools, setFeaturedTools] = useState<AiTool[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState<string | null>(null);


  useEffect(() => {
    async function fetchFeaturedTools() {
      setLoadingFeatured(true);
      setErrorFeatured(null);
      try {
        const { data, error } = await getFeaturedTools(4); // Limite à 4 IA en vogue
        if (error) {
          console.error('Erreur lors de la récupération des IA en vogue :', error);
          setErrorFeatured('Impossible de charger les IA en vogue.');
        } else {
          setFeaturedTools(data || []);
        }
      } catch (err) {
        console.error('Erreur inattendue lors de la récupération des IA en vogue :', err);
        setErrorFeatured('Erreur inattendue.');
      } finally {
        setLoadingFeatured(false);
      }
    }
    fetchFeaturedTools();
  }, []);


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);




  return (
    <div className="mainContainer">
      <header className="relative w-full">
        <Navbar className="header">
          {/* Desktop Navigation */}
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex items-center gap-4">
              {/* <NavbarButton variant="secondary">Login</NavbarButton> */}
              <NavbarButton variant="gradient">Ajouter Une AI</NavbarButton>
            </div>
          </NavBody>

          {/* Mobile Navigation */}
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">{item.name}</span>
                </a>
              ))}
              <div className="flex w-full flex-col gap-4">
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Book a call
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </header>

      <div className="relative flex h-[40rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
            "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
          )}
        />

        <FondCareler
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0 md:justify-center flex-group">
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-8xl">
            Le plus grand annuaire <br />
            d'IA au monde.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-center text-left font-normal text-neutral-300">
          Découvrez les outils d'intelligence artificielle les plus innovants qui vont transformer votre travail et booster votre productivité." ou "Votre porte d'entrée vers l'univers infini de l'IA. Explorez, apprenez, innovez
          </p>

          <div className="btn scoop">
          <AnimatedButton
          text="Découvrir"
          onClick={() => console.log("Bouton cliqué!")} />
          </div>
        </div>
      </div>



      {/* <section  className="mx-0 my-10 max-w-10xl rounded-3xl  p-2 ring-1 ring-neutral-700/10  fontImage">
     <ContainerScroll>
      <ThreeDMarquee images={imagesAI} />
      </ContainerScroll>
    </section> */}

       <section className="py-16 bg-gray-950 dark:bg-gray-950 z-10 p-40"> {/* Fond un peu plus sombre que le Hero */}
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            IA en Vogue de la Semaine
          </h2>

          {loadingFeatured ? (
            <div className="text-center text-gray-400">Chargement des IA en vedette...</div>
          ) : errorFeatured ? (
            <div className="text-center text-red-400">{errorFeatured}</div>
          ) : featuredTools.length === 0 ? (
            <div className="text-center text-gray-400">Aucune IA en vogue pour le moment.</div>
          ) : (
            <div className="flex spacebetween gap-10 wrap"> {/* Grille responsive */}
              {featuredTools.map((tool) => (
                <AiToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="topCategories">
        <FeaturesSectionDemo />
      </section>
    </div>
  );
}
