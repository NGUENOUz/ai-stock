// src/components/FaqSectionClean.tsx (Style Épuré)
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react"; 

// --- Données de la FAQ (Inchangées) ---
const faqItems = [
  {
    question: "Qu'est-ce qui est inclus dans l'Essai Gratuit ?",
    answer: "L'Essai Gratuit vous donne accès à notre plateforme, y compris une sélection limitée d'outils AI, 5 Prompts Pro par mois (pour tester la bibliothèque) et l'accès à nos cours fondamentaux. Vous pouvez passer au Gold Premium à tout moment.",
    isGoldRelated: true,
  },
  {
    question: "Comment fonctionne la 'Bibliothèque de Prompts Pro Illimités' ?",
    answer: "Le plan Gold Premium vous offre un accès illimité à toute notre base de données de prompts, classés par domaine (image, productivité, marketing, etc.). Ces prompts sont testés, optimisés et prêts à être utilisés immédiatement pour garantir des résultats de haute qualité.",
    isGoldRelated: true,
  },
  {
    question: "Puis-je annuler mon abonnement Gold Premium à tout moment ?",
    answer: "Oui, absolument. Tous nos abonnements sont sans engagement. Vous pouvez annuler le renouvellement automatique de votre plan Gold Premium directement depuis votre tableau de bord avant la fin de votre cycle de facturation.",
    isGoldRelated: true,
  },
  {
    question: "Quelle est la différence entre les Formations et les Formations Premium ?",
    answer: "Les formations standard (incluses dans l'essai) couvrent les bases. Les Formations Premium (uniquement dans le plan Gold) sont des cours certifiants, des ateliers pratiques avancés et incluent l'accès à des sessions de coaching mensuelles en direct avec nos experts.",
    isGoldRelated: true,
  },
  {
    question: "Offrez-vous un support pour les problèmes techniques ?",
    answer: "Oui. Les membres Gold Premium bénéficient d'un support prioritaire 24/7 par chat et email. Les utilisateurs de l'essai gratuit ont accès à notre base de connaissances étendue et à la FAQ.",
    isGoldRelated: true,
  },
];

// --- Composant Accordéon Individuel (Style CLEAN) ---

interface FaqItemProps {
  question: string;
  answer: string;
  isGoldRelated: boolean;
}

const FaqItemClean: React.FC<FaqItemProps> = ({ question, answer, isGoldRelated }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-700/50 hover:border-yellow-400/50 transition-colors duration-300">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 text-left"
        initial={false}
      >
        <span 
            className={cn(
                "text-lg md:text-xl font-medium transition-colors duration-300",
                // Titre blanc, sauf si c'est la question Gold qui est ouverte
                isOpen ? "text-white" : "text-gray-300",
                isGoldRelated && "text-white"
            )}
        >
            {isGoldRelated && isOpen && "⭐️ "} {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Icône de flèche : Couleur Gold réservée à l'icône */}
          <ChevronDown className={cn("h-6 w-6 transition-colors duration-300", "text-yellow-400")} />
        </motion.div>
      </motion.button>

      {/* Contenu de la Réponse */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-400 text-base md:text-lg pr-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Composant Principal de la Section FAQ ---

export const FaqSection: React.FC = () => {
  return (
    <section className="bg-black py-40 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre de Section (Maintient du Dégradé Gold) */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#ffff] via-[#dddd] to-[#FFD700] mb-4">
            Questions Fréquentes.
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Trouvez rapidement les informations essentielles sur votre abonnement et nos services.
          </p>
        </div>

        {/* Conteneur de l'Accordéon (Design Clean & Glassmorphism) */}
        <div className="max-w-4xl mx-auto 
            bg-neutral-900/40 backdrop-blur-lg rounded-2xl p-6 md:p-10 
            border border-white/10 shadow-[0_0_50px_rgba(255,215,100,0.05)]"
        >
          {faqItems.map((item, index) => (
            <FaqItemClean key={index} {...item} />
          ))}
        </div>
        
        {/* CTA de Clôture */}
        <div className="text-center mt-20">
            <p className="text-xl text-gray-400 mb-4">
                Vous avez encore des questions ? Nous sommes là pour vous aider.
            </p>
            <a 
               href="#contact"
               className="text-lg font-semibold text-yellow-400 hover:text-yellow-300 transition duration-300 border-b border-yellow-400"
            >
                Contacter l'équipe Gold &rarr;
            </a>
        </div>

      </div>
    </section>
  );
};