// src/app/prompts/premium/page.tsx

import React from 'react';
import { Metadata } from 'next';
// ⚠️ Assurez-vous d'avoir une structure pour vos cartes de prix
import PricingCards from '../../../components/PricingCards'; 
import PremiumHero from '../../../components/PremiumHero'; 
import FeaturesList from '../../../components/FeaturesList'; // Nouveau composant à créer
import HeroImage from '../../../components/HeroImage';

export const metadata: Metadata = {
  title: "Débloquez les Prompts AI Premium | AI-Stock",
  description: "Accédez à des milliers de prompts exclusifs, testés et optimisés pour les professionnels. Boostez votre productivité instantanément.",
};

export default function PremiumPromptsLandingPage() {
  return (
    // Utilisez un conteneur qui s'étend sur toute la largeur (le layout.tsx gère déjà le pt-20)
    <div className="flex flex-col items-center justify-center min-h-screen pt-12 md:pt-24 dark:bg-black">
      
      {/* 1. SECTION HERO AVEC COPYWRITING ET APERÇU */}
      <PremiumHero />
      <HeroImage />

      {/* 2. SECTION AVANTAGES */}
      <section className="w-full max-w-5xl py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 dark:text-white">
          Pourquoi passer au Premium ?
        </h2>
        <FeaturesList /> {/* Nous allons définir ce composant ensuite */}
      </section>

      {/* 3. SECTION PRIX / APPEL À L'ACTION */}
      <section id="pricing" className="w-full max-w-7xl py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 dark:text-white">
          Choisissez votre plan
        </h2>
        {/* Assurez-vous que PricingCards est importé et bien stylisé */}
        <PricingCards />
      </section>

    </div>
  );
}