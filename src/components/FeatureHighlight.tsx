// src/components/FeatureHighlight.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assurez-vous que cet utilitaire est disponible

// --- URLs d'Images Fictives d'IA (Remplacer par vos captures réelles) ---
const imagePlaceholderUrls = {
  tools: "https://image.pollinations.ai/prompt/Golden,glowing,futuristic,HUD,dashboard,showing,a,list,of,AI,tools,with,status,indicators,and,settings,dark,glassmorphism?width=1000&height=750&seed=25",
  training: "https://image.pollinations.ai/prompt/Golden,glowing,futuristic,HUD,interface,displaying,AI,course,progress,and,certification,status,in,a,dark,glassmorphism,cockpit?width=1000&height=750&seed=26",
  prompts: "https://image.pollinations.ai/prompt/Golden,glowing,futuristic,HUD,screen,showing,AI,prompt,optimization,interface,with,code,snippets,and,results,comparison,dark,glassmorphism?width=1000&height=750&seed=27",
};


// --- Données des Fonctionnalités Clés ---
const highlights = [
  {
    id: 1,
    title: "Le Hub d'Outils AI du Moment (Gold)",
    description: "Accédez instantanément à une bibliothèque d'outils d'IA populaires et spécialisés. Notre plateforme vous fournit l'intégration directe et la gestion centralisée, y compris les fonctionnalités exclusives **Premium Gold**.",
    ctaText: "Découvrir la Bibliothèque AI",
    ctaLink: "#tools",
    imageSrc: imagePlaceholderUrls.tools,
    imageAlt: "Interface de gestion des outils IA",
    reverse: false, // Image à droite
  },
  {
    id: 2,
    title: "Maîtrisez l'IA avec nos Formations Certifiantes",
    description: "Des cours vidéo aux ateliers pratiques, notre catalogue de formations est conçu pour vous faire passer de débutant à expert. Toutes les formations sont incluses dans l'essai gratuit.",
    ctaText: "Explorer les Formations",
    ctaLink: "#courses",
    imageSrc: imagePlaceholderUrls.training,
    imageAlt: "Tableau de bord des formations",
    reverse: true, // Image à gauche
  },
  {
    id: 3,
    title: "Optimisation de Prompts : L'Art du Prompt Engineering",
    description: "Arrêtez de gaspiller des tokens. Notre moteur de Prompt Engineering avancé (disponible en Gold) vous aide à construire, tester et sauvegarder les prompts les plus efficaces pour des résultats parfaits.",
    ctaText: "Affiner vos Prompts (Essai Gratuit)",
    ctaLink: "#prompts",
    imageSrc: imagePlaceholderUrls.prompts,
    imageAlt: "Interface du moteur de Prompt Engineering",
    reverse: false, // Image à droite
  },
];


// --- Composant d'une Ligne de Fonctionnalité (Alternance) ---

const FeatureRow = ({ title, description, ctaText, ctaLink, imageSrc, imageAlt, reverse }: typeof highlights[0]) => (
  <div className={cn(
    "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 md:py-24",
    reverse ? "lg:flex-row-reverse" : "lg:flex-row" // Alternance de l'ordre des colonnes
  )}>
    
    {/* Contenu Texte (Gauche ou Droite) */}
    <motion.div
      initial={{ opacity: 0, x: reverse ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className={cn("text-white", reverse ? "lg:pl-12" : "lg:pr-12")}
    >
      <h3 className="
        text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 
        text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#FFD700] // Touche Gold
        leading-snug
      ">
        {title}
      </h3>
      
      <p className="text-lg md:text-xl text-gray-400 mb-10">
        {description}
      </p>

      {/* Bouton CTA Gold */}
      <motion.a 
         href={ctaLink}
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         className="
            inline-flex items-center gap-2 py-3 px-8 rounded-xl font-semibold text-lg
            bg-gradient-to-br from-[#FFF4C9] via-[#F5D98A] to-[#C89C36]
            text-black shadow-[0_4px_20px_rgba(255,215,120,0.6)] hover:shadow-[0_6px_25px_rgba(255,225,150,0.8)]
            transition-all duration-300 cursor-pointer
         "
      >
        {ctaText} &rarr;
      </motion.a>
    </motion.div>

    {/* Maquette de Produit (Gauche ou Droite) */}
    <motion.div
      initial={{ opacity: 0, x: reverse ? -50 : 50, rotateX: 10 }}
      whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative flex justify-center"
    >
      <div className={cn(
        "p-4 md:p-6 rounded-[2rem] max-w-lg w-full",
        // Glassmorphism (Fond sombre et translucide)
        "bg-white/5 dark:bg-neutral-900/40 backdrop-blur-3xl",
        // Bordure VisionOS
        "border border-white/10 dark:border-white/5",
        // Ombre Gold subtile
        "shadow-[0_25px_75px_rgba(255,215,100,0.2)]" 
      )}>
        {/* L'image de capture elle-même */}
        <img 
          src={imageSrc} 
          alt={imageAlt}
          className="w-full h-auto rounded-xl object-cover"
        />
      </div>
    </motion.div>

  </div>
);


// --- Composant Principal d'Encadrement ---

export const FeatureHighlight: React.FC = () => {
  return (
    <section className="bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre général de la section */}
        <div className="text-center pt-20 pb-10">
           <h2 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#ffff] via-[#dddd] to-[#FFD700] mb-4">
            Tout ce dont vous avez besoin pour dominer l'IA.
          </h2>
           <p className="text-xl text-gray-400">
            Trois piliers fondamentaux pour votre succès : Les Outils, L'Éducation et la Stratégie.
          </p>
        </div>

        {/* Rendu des trois lignes de fonctionnalité */}
        {highlights.map((feature) => (
          <FeatureRow key={feature.id} {...feature} />
        ))}
        
      </div>
    </section>
  );
};