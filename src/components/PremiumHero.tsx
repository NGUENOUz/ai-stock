// src/components/PremiumHero.tsx

import React from 'react';
import Link from 'next/link';
// Importez le nouveau composant de fond
import { BackgroundLines } from './BackgroundLines';
import HeroImage from './HeroImage';

export default function PremiumHero() {
  return (
    // 🎯 ENVELOPPEZ TOUT LE CONTENU HERO AVEC BackgroundLines
    <BackgroundLines className="h-[90vh] md:h-[600px] flex items-center justify-center">
        {/* Le contenu est centré et mis en z-index au-dessus de l'animation */}
        <div className="text-center max-w-6xl px-4 z-20 relative pt-9 pb-10"> 
          
          {/* COPYWRITING - Titre de Conversion */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 dark:text-white">
            Arrêtez de gaspiller votre <span className="text-yellow-500">temps</span>.<br/> Obtenez des <span className="text-yellow-500">résultats parfaits</span>.
          </h1>

          {/* COPYWRITING - Sous-titre */}
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Accédez instantanément aux **500+ Prompts Premium** testés par nos experts pour l'IA, garantissant une qualité et une pertinence inégalées dans tous vos projets.
          </p>

          {/* Bouton d'Action */}
          <Link href="#pricing" passHref>
            <button className="px-12 py-4 text-lg font-bold rounded-full bg-yellow-500 text-black hover:bg-yellow-600 transition-all shadow-xl">
              Débloquez l'accès maintenant →
            </button>
          </Link>

          
        </div>
    </BackgroundLines>
  );
}