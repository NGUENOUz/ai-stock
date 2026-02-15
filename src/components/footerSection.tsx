"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export const FooterCTA: React.FC = () => {
  return (
    <section className="bg-white py-24 relative overflow-hidden">
      {/* Cercle lumineux en arrière-plan pour l'effet de profondeur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
            relative p-12 md:p-20 rounded-[3rem] text-center
            bg-black border border-white/10
            shadow-[0_24px_80px_rgba(0,0,0,0.2)]
            overflow-hidden
          "
        >
          {/* Badge de rassurance */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-primary text-xs font-bold uppercase tracking-widest mb-8">
            <Sparkles size={14} />
            Ouvert à tous les niveaux
          </div>

          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8">
            L'aventure commence <br />
            <span className="text-primary italic">maintenant.</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Inscrivez-vous gratuitement. Apprenez, utilisez des outils pros, et quand vous serez prêt, <span className="text-white font-bold">devenez contributeur</span> pour monétiser votre talent.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="
                 w-full sm:w-auto inline-flex items-center justify-center gap-3 py-5 px-12 rounded-2xl font-black text-xl
                 bg-primary text-black shadow-[0_20px_40px_rgba(255,209,26,0.3)]
                 transition-all duration-300
               "
            >
              Commencer gratuitement
              <ArrowRight className="h-6 w-6" />
            </motion.button>
          </div>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-neutral-500 font-medium">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Accès immédiat au Dashboard
            </div>
            <div className="hidden md:block text-neutral-700">•</div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Évolution vers profil Créateur à tout moment
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};