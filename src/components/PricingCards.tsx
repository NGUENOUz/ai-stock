// src/components/PricingCards.tsx
"use client";
import React from 'react';
import { Check, Crown, Zap, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const tiers = [
  {
    name: 'Standard',
    priceMonthly: '9,99€',
    priceAnnual: '99,90€',
    features: [
      "Accès aux Prompts Populaires (Non Premium)",
      "Recherche et Filtres de base",
      "Support standard par email",
      "5 Prompts Premium gratuits (un essai)"
    ],
    isFeatured: false,
    link: '/signup',
  },
  {
    name: 'Premium PRO',
    priceMonthly: '19,99€',
    priceAnnual: '199,90€',
    features: [
      "Accès illimité aux 500+ Prompts Premium",
      "Tous les Prompts à venir (Mises à jour bi-mensuelles)",
      "Catégories et Filtres PRO exclusifs",
      "Copier/Coller en un clic",
      "Support prioritaire",
    ],
    isFeatured: true,
    link: '/checkout/pro',
  },
  {
    name: 'Lifetime',
    priceMonthly: '399€',
    features: [
      "Accès permanent sans frais récurrents",
      "Toutes les fonctionnalités Premium PRO",
      "Accès aux fonctionnalités BÊTA en avance",
      "Badge 'Membre Fondateur' sur votre profil",
      "Consultation 1-to-1 (30 min) avec un expert"
    ],
    isFeatured: false,
    link: '/checkout/lifetime',
  },
];

export default function PricingCards() {
  const [isAnnual, setIsAnnual] = React.useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      
      {/* Toggle Mensuel/Annuel */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-full bg-neutral-100 p-1 border border-neutral-200 shadow-sm">
          <button
            onClick={() => setIsAnnual(false)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300",
              !isAnnual ? "bg-primary text-black shadow-md scale-105" : "text-neutral-600 hover:text-black"
            )}
          >
            Mensuel
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 relative",
              isAnnual ? "bg-primary text-black shadow-md scale-105" : "text-neutral-600 hover:text-black"
            )}
          >
            Annuel
            <span className="ml-1.5 text-xs font-black">-20%</span>
            {isAnnual && <Zap className="absolute -top-1 -right-1 w-4 h-4 text-primary animate-pulse" />}
          </button>
        </div>
      </div>

      {/* Cartes de Prix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="group relative"
          >
            {/* Glow effect pour featured */}
            {tier.isFeatured && (
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary-600 to-primary opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500 rounded-2xl" />
            )}
            
            <div
              className={cn(
                "relative flex flex-col p-8 rounded-2xl bg-white border transition-all duration-300",
                tier.isFeatured 
                  ? "border-primary shadow-premium ring-2 ring-primary/20 hover:shadow-glow hover:-translate-y-2" 
                  : "border-neutral-200 shadow-premium hover:shadow-xl hover:-translate-y-2"
              )}
            >
              {/* Tag en vedette */}
              {tier.isFeatured && (
                <div className="inline-flex items-center self-start px-3 py-1.5 text-xs font-bold rounded-full bg-primary text-black mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Crown className="w-3.5 h-3.5 mr-1.5" />
                  Le plus populaire
                  <Star className="w-3 h-3 ml-1 animate-pulse" />
                </div>
              )}
              
              <h3 className="text-2xl font-extrabold mb-2 text-black group-hover:text-primary transition-colors duration-300">{tier.name}</h3>
              
              <div className="mb-6">
                <p className="text-5xl font-black text-black group-hover:scale-105 transition-transform duration-300 inline-block">
                  {tier.name === 'Lifetime' 
                    ? tier.priceMonthly 
                    : isAnnual ? tier.priceAnnual : tier.priceMonthly
                  }
                </p>
                <p className="text-sm text-neutral-500 mt-2">
                  {tier.name === 'Lifetime' 
                    ? "Paiement unique" 
                    : isAnnual ? "par an" : "par mois"
                  }
                </p>
              </div>

              {/* Bouton d'Action */}
              <Link href={tier.link} className="w-full mb-8">
                <button
                  className={cn(
                    "w-full py-3.5 rounded-full font-bold transition-all text-sm active:scale-95 relative overflow-hidden group/btn",
                    tier.isFeatured
                      ? "bg-primary text-black hover:bg-primary-600 shadow-md hover:shadow-glow"
                      : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                  )}
                >
                  {/* Shine effect */}
                  {tier.isFeatured && (
                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                      <div className="absolute -inset-full animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0%,white_50%,transparent_100%)] opacity-20" />
                    </div>
                  )}
                  <span className="relative z-10">
                    {tier.name === 'Standard' ? "Commencer" : "S'abonner"}
                  </span>
                </button>
              </Link>

              {/* Liste des fonctionnalités */}
              <ul className="space-y-3 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-neutral-600 group-hover:text-neutral-800 transition-colors">
                    <Check className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}