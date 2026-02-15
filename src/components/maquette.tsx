"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface ThreeDMarqueeProps {
  images: string[];
  className?: string;
}

export const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({ images, className }) => {
  // On sépare en 4 colonnes
  const columns = Array.from({ length: 4 }, (_, i) => {
    const start = i * Math.ceil(images.length / 4);
    const end = start + Math.ceil(images.length / 4);
    const slice = images.slice(start, end);
    // On double pour le scroll infini fluide
    return [...slice, ...slice];
  });

  return (
    <div className={cn(
      "relative mx-auto h-162.5 w-full overflow-hidden rounded-[2.5rem]",
      "bg-neutral-50/50 backdrop-blur-sm border border-neutral-200/50",
      "shadow-[0_20px_50px_rgba(0,0,0,0.05)]",
      className
    )}>
      
      {/* 1. VIGNETTE & GRADIENTS (L'effet de profondeur) */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_100px_rgba(255,255,255,1)]" />
      <div className="absolute inset-x-0 top-0 z-30 h-32 bg-linear-to-b from-white to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-30 h-32 bg-linear-to-t from-white to-transparent" />

      {/* 2. LE CONTENEUR 3D */}
      <div className="flex size-full items-center justify-center">
        <div className="relative w-full max-w-300 shrink-0 scale-90 lg:scale-110">
          <div
            style={{
              transform: "rotateX(52deg) rotateZ(-12deg) skewX(5deg)",
              transformStyle: "preserve-3d",
            }}
            className="grid grid-cols-4 gap-6 p-4"
          >
            {columns.map((colImages, colIndex) => (
              <motion.div
                key={colIndex}
                initial={{ y: 0 }}
                animate={{ y: colIndex % 2 === 0 ? "-50%" : "0%" }}
                transition={{
                  duration: 25 + colIndex * 2, // Vitesses légèrement différentes pour le réalisme
                  ease: "linear",
                  repeat: Infinity,
                }}
                style={{
                    // On démarre la colonne impaire à -50% pour varier le sens
                    y: colIndex % 2 !== 0 ? "-50%" : "0"
                }}
                className="flex flex-col gap-6"
              >
                {colImages.map((img, imgIndex) => (
                  <motion.div
                    key={imgIndex}
                    whileHover={{ 
                        translateZ: 30, // L'image sort de l'écran au survol
                        rotateX: -5,
                        scale: 1.05 
                    }}
                    className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-white shadow-lg border border-neutral-100 group"
                  >
                    <img
                      src={img}
                      alt="AI Resource"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay de lumière au survol */}
                    <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. AURA DE LUMIÈRE (Point chaud central) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,209,26,0.08)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
};