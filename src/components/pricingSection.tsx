// src/components/PricingSection.tsx (RÉVISÉ)
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Données des Plans de Tarification (GRATUIT & GOLD UNIQUEMENT) ---
const monthlyPlans = [
  {
    name: "Essai Gratuit",
    description: "Découvrez notre plateforme et notre bibliothèque de prompts pro, sans engagement.",
    price: "0€",
    period: "/ mois",
    monthlyPrice: 0,
    features: [
      "Accès limité aux outils AI",
      "✅ 5 Prompts Pro par mois (Bibliothèque)",
      "Accès aux cours fondamentaux (non-Premium)",
      "Support standard via la FAQ",
      "❌ Formations Premium exclues",
      "❌ Communauté Gold Privée exclue",
    ],
    isGold: false,
    cta: "Commencer Gratuitement",
    ctaColor: "bg-white text-black hover:bg-gray-200",
  },
  {
    name: "Gold Premium",
    description: "Le plan ultime : Prompts illimités, Formations Premium et Communauté d'experts.",
    monthlyPrice: 149, // Prix mensuel de référence
    features: [
      "Toutes les fonctionnalités du plan Gratuit",
      "✅ Prompts Pro Illimités (pour tous les domaines)",
      "✅ Toutes les Formations Premium & Certifiantes",
      "✅ Accès à la Communauté Gold Privée",
      "✅ Coaching Stratégique Mensuel (Live)",
      "Support Prioritaire 24/7",
    ],
    isGold: true,
    cta: "Rejoindre le Club Gold",
    ctaColor: "bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 text-white shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:shadow-[0_6px_25px_rgba(139,92,246,0.6)]",
  },
];

// --- Composant de Carte de Prix (Glassmorphism Gold) ---

type MonthlyPlan = (typeof monthlyPlans)[number];

type PricingCardProps = MonthlyPlan & {
    yearlyDiscount: number;
    isAnnual: boolean;
};

const PricingCard: React.FC<PricingCardProps> = ({ 
    name, 
    monthlyPrice, 
    description, 
    features, 
    isGold, 
    cta, 
    ctaColor, 
    yearlyDiscount,
    isAnnual 
}) => {

    const currentPrice = isAnnual 
        ? Math.round(monthlyPrice * 12 * (1 - yearlyDiscount / 100)) 
        : monthlyPrice;
    
    const displayPrice = monthlyPrice === 0 ? "0€" : `${currentPrice}€`;
    const displayPeriod = monthlyPrice === 0 ? "/ mois" : isAnnual ? "/ an" : "/ mois";
    const discountText = isAnnual && isGold ? `Économisez ${yearlyDiscount}%` : null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        
        className={cn(
          "p-6 md:p-8 rounded-3xl border flex flex-col h-full",
          "bg-neutral-800/30 dark:bg-neutral-900/40 backdrop-blur-lg",
          isGold 
            ? "border-purple-400/50 shadow-[0_0_40px_rgba(139,92,246,0.3)] z-10"
            : "border-white/10 shadow-xl",
          isAnnual && isGold && "transform scale-[1.05] border-purple-500/80"
        )}
      >
        {isGold && discountText && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-purple-600 text-white font-bold text-sm shadow-lg">
                {discountText}
            </div>
        )}

        <div className="grow">
          <h3 className={cn("text-2xl font-bold mb-2", isGold ? "text-purple-400" : "text-white")}>
            {name}
          </h3>
          <p className="text-gray-400 mb-6">{description}</p>
          
          <div className="mb-8">
            <span className="text-5xl font-extrabold text-white">
              {displayPrice}
            </span>
            <span className="text-gray-400 text-lg">{displayPeriod}</span>
            {isAnnual && monthlyPrice !== 0 && (
                 <p className="text-sm text-gray-500 mt-1">soit {Math.round(currentPrice / 12)}€ / mois facturé annuellement</p>
            )}
          </div>

          <ul className="space-y-3 mb-10 text-gray-300">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className={cn("mr-2 text-xl", feature.includes('❌') ? 'text-red-500' : isGold ? "text-purple-400" : "text-green-400")}>
                  {feature.includes('❌') ? '❌' : '✓'}
                </span>
                <span className={feature.includes('❌') ? 'line-through opacity-70' : ''}>
                  {feature.replace('❌ ', '').replace('✅ ', '')}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Bouton CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "mt-auto w-full py-3 px-6 rounded-xl font-bold transition-all duration-300",
            ctaColor
          )}
        >
          {cta}
        </motion.button>
      </motion.div>
    );
};


// --- Composant Principal de la Section Tarification ---

export const PricingSection: React.FC = () => {
    const [isAnnual, setIsAnnual] = useState(false); // État pour basculer Annuel/Mensuel
    const yearlyDiscount = 20; // 20% de réduction pour l'annuel

    // Filtrer pour n'afficher que les plans pertinents
    const displayPlans = monthlyPlans.filter(p => p.monthlyPrice === 0 || p.isGold);

  return (
    <section className="bg-black py-20 md:py-32 relative mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre de Section */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-b from-white via-gray-300 to-purple-400 mb-4">
            Choisissez le Plan qui Transformera votre Travail.
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Démarrez gratuitement pour tester nos prompts, ou passez au Gold Premium pour l'accès illimité.
          </p>
        </div>

        {/* 🔄 TOGGLE Mensuel / Annuel */}
        <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-full bg-neutral-800 p-1">
                <button
                    onClick={() => setIsAnnual(false)}
                    className={cn(
                        "py-2 px-6 rounded-full text-sm font-semibold transition-colors duration-300",
                        isAnnual ? "text-gray-400" : "bg-purple-600 text-white shadow-md"
                    )}
                >
                    Mensuel
                </button>
                <button
                    onClick={() => setIsAnnual(true)}
                    className={cn(
                        "py-2 px-6 rounded-full text-sm font-semibold transition-colors duration-300 relative",
                        isAnnual ? "bg-purple-600 text-white shadow-md" : "text-gray-400"
                    )}
                >
                    Annuel
                    <span className="absolute -top-3 right-0 bg-red-600 text-white text-xs font-bold px-2 rounded-full transform rotate-3">
                        -{yearlyDiscount}%
                    </span>
                </button>
            </div>
        </div>


        {/* 💳 Grille des Cartes de Prix (Affiche Gratuit et Gold) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch max-w-4xl mx-auto">
          {displayPlans.map((plan, index) => (
            <PricingCard 
                key={index} 
                {...plan} 
                yearlyDiscount={yearlyDiscount} 
                isAnnual={isAnnual}
            />
          ))}
        </div>
        
        {/* 🕒 Rappel de l'Essai Gratuit */}
        <p className="text-center mt-16 text-gray-500 italic">
            Tous les plans incluent un essai gratuit de 7 jours (sauf si stipulé autrement).
        </p>

      </div>
    </section>
  );
};