"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface CursorGlowProps {
  gradientClasses: string;
}

export default function CursorGlow({ gradientClasses }: CursorGlowProps) {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Vérifie si la souris est au-dessus du conteneur (avec une marge de tolérance)
        if (
          e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom
        ) {
          setIsHovered(true);
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        } else {
          setIsHovered(false);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-500 cursor-none [&_*]:cursor-none ${
        isHovered ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Halo flou (Glow) */}
      <motion.div
        animate={{
          x: mousePosition.x - 125, // Centrage pour un cercle de 250px
          y: mousePosition.y - 125,
        }}
        transition={{ type: "tween", ease: "circOut", duration: 0.2 }}
        className={`absolute w-[250px] h-[250px] rounded-full blur-[60px] dark:blur-[50px] opacity-15 dark:opacity-70 bg-gradient-to-tr ${gradientClasses}`}
      />

      {/* Point Central du Custom Cursor (Immédiat) */}
      <motion.div
        animate={{
          x: mousePosition.x - 4, // 8px de large -> offset de 4
          y: mousePosition.y - 4,
        }}
        transition={{ duration: 0 }} // Pas de délai pour une précision parfaite
        className="absolute w-2 h-2 bg-primary rounded-full z-50 pointer-events-none shadow-[0_0_10px_rgba(59,130,246,0.8)]"
      />

      {/* Anneau du Custom Cursor (Élastique) */}
      <motion.div
        animate={{
          x: mousePosition.x - 16, // 32px de large -> offset de 16
          y: mousePosition.y - 16,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
        className="absolute w-8 h-8 border-[1.5px] border-primary/60 dark:border-primary/80 rounded-full z-50 pointer-events-none"
      />
    </div>
  );
}
