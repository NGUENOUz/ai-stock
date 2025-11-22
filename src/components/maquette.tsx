// src/components/ThreeDMarquee.tsx
"use client";

import { motion } from "framer-motion"; // Assurez-vous d'utiliser framer-motion si votre ContainerScroll l'utilise
import { cn } from "@/lib/utils";
import React from "react";

// --- Composants de Lignes de Grille (GridLine) ---

interface GridLineProps {
  className?: string;
  offset?: string;
}

const GridLineHorizontal: React.FC<GridLineProps> = ({ className, offset }) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

const GridLineVertical: React.FC<GridLineProps> = ({ className, offset }) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

// --- Composant Principal ThreeDMarquee ---

interface ThreeDMarqueeProps {
  images: string[];
  className?: string;
}

export const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({ images, className }) => {
  // Split the images array into 4 equal parts
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div
      className={cn(
        // Style VisionOS Glass + Lueur subtile
        "mx-auto block h-[600px] overflow-hidden rounded-3xl max-sm:h-100 relative",
        "bg-white/5 dark:bg-neutral-900/15 backdrop-blur-md", // Fond glassmorphism léger
        "border border-white/10 dark:border-white/5", // Bordure translucide
        "shadow-[0_0_40px_rgba(255,215,120,0.2)]", // Lueur Gold subtile
        className,
      )}
    >
      {/* ⭐ AURA LUMINEUSE VISION PRO */}
      <div
        className="
          absolute -inset-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,130,0.1),transparent_70%)]
          opacity-50 pointer-events-none
        "
      ></div>

      <div className="flex size-full items-center justify-center">
        <div className="size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
          <div
            style={{
              transform: "rotateX(50deg) rotateY(0deg) rotateZ(-35deg)",
            }}
            className="relative top-96 right-[50%] grid size-full origin-top-left grid-cols-4 gap-8 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-8"
              >
                <GridLineVertical className="-left-4" offset="80px" />
                {subarray.map((image, imageIndex) => (
                  <div className="relative" key={imageIndex + image}>
                    <GridLineHorizontal className="-top-4" offset="20px" />
                    <motion.img
                      whileHover={{
                        y: -15, 
                        boxShadow: "0 10px 30px rgba(255, 215, 120, 0.7)", 
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      key={imageIndex + image}
                      src={image}
                      alt={`Image ${imageIndex + 1}`}
                      className="
                        aspect-[970/700] rounded-xl object-cover 
                        ring-2 ring-white/30 dark:ring-gray-900/10 
                        hover:ring-yellow-400 hover:ring-4 
                        transition-all duration-300
                      "
                      width={970}
                      height={700}
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};