
'use client'; 

import React from 'react';
import { motion } from 'framer-motion'; 

interface AnimatedButtonProps {
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode; // Pour une icône personnalisée si besoin
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  text,
  onClick,
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className="
        relative
        inline-flex
        items-center
        justify-center
        px-6 py-3
        text-lg
        font-medium
        text-orange-400 /* Couleur du texte */
        bg-black
        rounded-full
        border-2 /* Bordure visible pour l'animation */
        border-solid
        overflow-hidden /* Cache la partie de l'ombre qui dépasse initialement */
        transition-all
        duration-300
        ease-in-out
        focus:outline-none
        focus:ring-2
        cursor-pointer
        focus:ring-orange-500
        focus:ring-offset-2
        hover:scale-105 /* Petit effet de zoom au survol */
        z-0 /* Pour s'assurer que le contenu est au-dessus de l'animation de bordure */
        group /* Permet d'appliquer des styles au survol des éléments enfants */
        animate-[border-pulse_2s_infinite_ease-in-out] /* Applique l'animation de bordure */
      "
    >
      <span className="relative z-10 flex items-center gap-2">
        <span className="
            w-2 h-2 rounded-full bg-green-500 mr-2 /* Point vert */
            group-hover:animate-[arrow-blink_1s_infinite_ease-in-out]
          "
        ></span>
        {text}
        {/* Petite flèche clignotante à droite */}
        <span className="
            inline-block ml-2 transform transition-transform duration-300
            group-hover:translate-x-1
            opacity-0 group-hover:opacity-100 /* Initialement invisible, apparaît au survol */
            animate-[arrow-blink_1s_infinite_ease-in-out] /* Applique l'animation de clignotement */
          "
        >
          &#8594; {/* Caractère de flèche droite */}
        </span>
      </span>
      {/* On peut ajouter une surcouche pour l'effet de glow si la bordure seule ne suffit pas */}
      <span className="
        absolute inset-0
        rounded-full
        pointer-events-none
        bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
        from-transparent via-orange-400/20 to-transparent
        opacity-0
        group-hover:opacity-100
        group-hover:scale-125
        transition-all duration-500 ease-out
        z-0
      "></span>
    </button>
  );
};