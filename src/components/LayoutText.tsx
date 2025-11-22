// src/components/LayoutTextFlip.tsx
"use client";

import React, { useState, useEffect } from "react";
// J'ai remplacé motion/react par framer-motion, qui est la bibliothèque standard.
import { motion, AnimatePresence } from "framer-motion"; 
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  // Adaptation du contenu au thème Prompts Gold
  text = "Découvrez des Prompts Pro testés pour créer des...",
  words = ["Landing Pages", "Images d'IA", "Vidéos 3D", "Modèles Marketing"],
  duration = 3000,
}: {
  text: string;
  words: string[];
  duration?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Nettoyage de l'intervalle si le composant est démonté
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      
      {/* 1. Texte Fixe (Text) */}
      <motion.span
        layoutId="subtext"
        // Classes Responsives: text-2xl sur mobile, jusqu'à text-5xl sur lg
        className="
          text-2xl font-bold tracking-tight text-white drop-shadow-lg
          sm:text-3xl md:text-4xl lg:text-5xl 
        "
      >
        {text}
      </motion.span>

      {/* 2. Mot qui tourne (Words) - Style Gold Premium */}
      <motion.span
        layout
        className={cn(
          "relative w-fit overflow-hidden rounded-xl px-4 py-2 font-sans font-bold tracking-tight shadow-lg transition-colors duration-300",
          // Styles sur fond Sombre
          "bg-neutral-900/70 border border-yellow-400/50 backdrop-blur-sm", 
          // Styles de texte responsives
          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
          // Style de shadow pour l'effet Gold
          "shadow-[0_0_15px_rgba(255,215,100,0.5)]"
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{
              duration: 0.5,
              type: "spring", // Ajout d'une animation type 'spring' pour plus de dynamisme
              damping: 10,
              stiffness: 100
            }}
            // Applique le dégradé Gold uniquement sur le mot tournant
            className="
              inline-block whitespace-nowrap 
              text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4C9] via-[#F5D98A] to-[#C89C36]
            "
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </div>
  );
};