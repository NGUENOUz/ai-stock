// src/components/FooterCTA.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react"; // Icône de flèche

export const FooterCTA: React.FC = () => {
  return (
    <section className="bg-black py-40 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Conteneur Gold Lumineux */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          
          className="
            p-8 md:p-12 rounded-3xl relative z-10
            bg-neutral-900/50 backdrop-blur-md
            border border-yellow-400/50
            shadow-[0_0_80px_rgba(255,215,100,0.4)]
          "
        >
            {/* Titre Impactant (Dégradé Gold) */}
            <h2 className="
                text-4xl md:text-6xl font-extrabold mb-4 
                text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#FFD700]
                leading-tight
            ">
                Prêt à rejoindre l'élite de l'IA ?
            </h2>
            
            {/* Sous-titre */}
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
                Commencez gratuitement dès aujourd'hui et débloquez la puissance illimitée des Prompts Pro et des Formations Gold.
            </p>

            {/* Bouton CTA Massif Gold */}
            <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="
                  inline-flex items-center gap-3 py-4 px-10 rounded-xl font-bold text-xl
                  bg-gradient-to-br from-[#FFF4C9] via-[#F5D98A] to-[#C89C36]
                  text-black 
                  shadow-[0_8px_30px_rgba(255,215,120,0.8)] hover:shadow-[0_10px_40px_rgba(255,225,150,1)]
                  transition-all duration-500
               "
            >
              Commencer l'Essai Gratuit
              <ArrowRight className="h-6 w-6 ml-2" />
            </motion.button>
            
            {/* Mention légale / Social Proof subtile */}
            <p className="text-sm text-gray-500 mt-6 italic">
                Aucune carte de crédit requise pour l'essai. Accès instantané.
            </p>
        </motion.div>

        {/* ------------------------------------------- */}
        {/* Footer Standard (Mentions légales et Navigation) */}
        {/* ------------------------------------------- */}
        <div className="mt-20 border-t border-neutral-800 pt-10 text-sm text-gray-500">
            <div className="flex justify-center space-x-6 mb-4">
                <a href="#tarifs" className="hover:text-yellow-400 transition">Tarification</a>
                <a href="#features" className="hover:text-yellow-400 transition">Fonctionnalités</a>
                <a href="#faq" className="hover:text-yellow-400 transition">FAQ</a>
                <a href="/mentions" className="hover:text-yellow-400 transition">Mentions Légales</a>
            </div>
            <p>&copy; {new Date().getFullYear()} [Nom de Votre SaaS]. Tous droits réservés.</p>
        </div>

      </div>
    </section>
  );
};