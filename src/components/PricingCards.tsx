// src/components/PricingCards.tsx
"use client";
import React from 'react';
import { IconCheck, IconCrown } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const tiers = [
  {
    name: 'Standard',
    priceMonthly: '9,99€',
    priceAnnual: '99,90€', // 20% de réduction annuelle
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
    priceAnnual: '199,90€', // 16% de réduction annuelle
    features: [
      "✅ Accès illimité aux 500+ Prompts Premium",
      "✅ Tous les Prompts à venir (Mises à jour bi-mensuelles)",
      "✅ Catégories et Filtres PRO exclusifs",
      "✅ Copier/Coller en un clic",
      "Support prioritaire",
    ],
    isFeatured: true,
    link: '/checkout/pro',
  },
  {
    name: 'Lifetime',
    priceMonthly: '399€',
    features: [
      "💎 Accès permanent sans frais récurrents",
      "💎 Toutes les fonctionnalités Premium PRO",
      "💎 Accès aux fonctionnalités BÊTA en avance",
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
        <div className="inline-flex rounded-full bg-neutral-800 p-1">
          <button
            onClick={() => setIsAnnual(false)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition",
              !isAnnual ? "bg-yellow-500 text-black shadow-md" : "text-gray-400 hover:text-white"
            )}
          >
            Facturation Mensuelle
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition relative",
              isAnnual ? "bg-yellow-500 text-black shadow-md" : "text-gray-400 hover:text-white"
            )}
          >
            Facturation Annuelle (-20%)
          </button>
        </div>
      </div>

      {/* Cartes de Prix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <div
            key={tier.name}
            className={cn(
              "flex flex-col p-8 rounded-2xl bg-neutral-900 border",
              tier.isFeatured ? "border-yellow-500 shadow-xl shadow-yellow-500/10" : "border-gray-700/70"
            )}
          >
            {/* Tag en vedette */}
            {tier.isFeatured && (
              <div className="self-start px-3 py-1 text-xs font-bold rounded-full bg-yellow-500 text-black mb-4 flex items-center">
                <IconCrown className="w-4 h-4 mr-1" />
                Le plus populaire
              </div>
            )}
            
            <h3 className="text-3xl font-bold mb-2 dark:text-white">{tier.name}</h3>
            
            <p className="text-5xl font-extrabold mb-2 dark:text-white">
              {tier.name === 'Lifetime' 
                ? tier.priceMonthly 
                : isAnnual ? tier.priceAnnual : tier.priceMonthly
              }
            </p>
            
            <p className="text-sm text-gray-400 mb-8">
              {tier.name === 'Lifetime' 
                ? "Paiement unique." 
                : isAnnual ? "Économisez 20% par an." : "Facturé tous les mois."
              }
            </p>

            {/* Bouton d'Action */}
            <Link href={tier.link} passHref className="w-full">
              <button
                className={cn(
                  "w-full py-3 rounded-lg font-bold transition-all text-sm",
                  tier.isFeatured
                    ? "bg-yellow-500 text-black hover:bg-yellow-600 shadow-lg shadow-yellow-500/20"
                    : "bg-neutral-800 text-white hover:bg-neutral-700"
                )}
              >
                {tier.name === 'Standard' ? "Commencer Gratuitement" : "S'abonner Maintenant"}
              </button>
            </Link>

            {/* Liste des fonctionnalités */}
            <ul className="mt-8 space-y-3 flex-grow">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start text-sm text-gray-300">
                  <IconCheck className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}