// src/components/AISocialProof.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Liste des URLs/noms de chemins vers les logos de vos outils IA
const aiLogos = [
  { name: "OpenAI", src: "/logos/openai.svg" },
  { name: "Claude", src: "/logos/claude.svg" },
  { name: "Midjourney", src: "/logos/midjourney.svg" },
  { name: "Github Copilot", src: "/logos/copilot.svg" },
  { name: "Hugging Face", src: "/logos/huggingface.svg" },
  { name: "Stability AI", src: "/logos/stability-ai.svg" },
];

export const AISocialProof: React.FC = () => {
  return (
    // Conteneur enveloppant pour l'effet de transition
    <div className="relative w-full overflow-hidden squelleton">
      
      {/* EFFET DE TRANSITION (Ombre Liftée) - Ajout d'une ombre Gold subtile pour le style */}
      <div 
        className="
          absolute top-0 left-0 right-0 h-16 md:h-24 
          bg-white/0 dark:bg-black/0 
          // Ombres qui simulent la séparation du bloc blanc par rapport au noir du Héros
          shadow-[0_0_80px_rgba(0,0,0,0.8)] dark:shadow-[0_0_80px_rgba(255,215,100,0.08)] 
          pointer-events-none 
          transform -translate-y-full
          mt-20
        "
      />

      {/* SECTION PRINCIPALE - ⭐ FOND BLANC/CLAIR (Nécessaire pour l'effet de transition) */}
      <section className="bg-white dark:bg-neutral-950 py-16 md:py-24 relative z-10 mt-80 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* TITRE - Maintient de la clarté sur fond clair/sombre */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white mb-2">
                Retrouvez les outils du moment sur la plateforme.
            </h2>
            <p className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-400">
                Formez-vous dessus et discutez-en avec les membres de la communauté.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 md:gap-x-16 md:gap-y-10">
            {aiLogos.map((logo) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center h-10 md:h-12 opacity-80 hover:opacity-100 transition duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  // Assure que les logos restent sombres sur le fond blanc, ou clairs sur le fond sombre
                  className="max-h-full w-auto filter grayscale dark:invert" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};