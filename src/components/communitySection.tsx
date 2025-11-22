// src/components/CommunitySection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { User, MessageSquare, Briefcase } from "lucide-react";

// --- Données Fictives des Membres Gold ---
const goldMembers = [
  {
    name: "Léa Dubois",
    role: "Prompt Engineer Senior",
    specialty: "Midjourney & Stratégie Marketing",
    avatar: "https://image.pollinations.ai/prompt/professional,woman,cyberpunk,avatar,golden,lighting,dark,background?width=100&height=100&seed=101",
  },
  {
    name: "Alex Kim",
    role: "Développeur IA / GPT",
    specialty: "Intégration API & Automatisation",
    avatar: "https://image.pollinations.ai/prompt/professional,man,futuristic,glasses,neon,gold,avatar,dark,background?width=100&height=100&seed=102",
  },
  {
    name: "Sofia Rossi",
    role: "Créatrice Contenu Vidéo",
    specialty: "GenAI Vidéo & Scripting",
    avatar: "https://image.pollinations.ai/prompt/creative,female,avatar,gold,and,blue,light,dark,background,technical?width=100&height=100&seed=103",
  },
  {
    name: "Marc Sarr",
    role: "Expert en Productivité",
    specialty: "Notion AI & Organisation de Workflow",
    avatar: "https://image.pollinations.ai/prompt/male,expert,avatar,hoodie,golden,glow,dark,background,focused?width=100&height=100&seed=104",
  },
];

// --- Composant Carte Membre (Glassmorphism) ---
const MemberCard: React.FC<typeof goldMembers[0]> = ({ name, role, specialty, avatar }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
    className="
      p-6 rounded-xl text-center flex flex-col items-center
      bg-neutral-800/40 backdrop-blur-md border border-yellow-400/20
      shadow-[0_4px_30px_rgba(255,215,100,0.1)]
      transition-all duration-300 hover:scale-[1.03]
    "
  >
    <img 
      src={avatar} 
      alt={`Avatar de ${name}`} 
      className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-yellow-400 p-0.5"
    />
    <h4 className="text-lg font-bold text-white mb-1">{name}</h4>
    <p className="text-sm text-yellow-400 font-semibold mb-2">{role}</p>
    <p className="text-xs text-gray-400">{specialty}</p>
  </motion.div>
);

// --- Composant de l'Avantage Clé ---
const CommunityFeature: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="flex space-x-4 items-start"
    >
        <div className="flex-shrink-0 p-3 rounded-full bg-yellow-400/20">
            {icon}
        </div>
        <div>
            <h5 className="text-xl font-bold text-white mb-1">{title}</h5>
            <p className="text-gray-400">{description}</p>
        </div>
    </motion.div>
);


// --- Composant Principal de la Communauté ---

export const CommunitySection: React.FC = () => {
  return (
    <section className="bg-black py-20 md:py-32 relative mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titre de Section */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#ffff] via-[#dddd] to-[#FFD700] mb-4">
            Rejoignez la Communauté Gold des Pionniers de l'IA.
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto">
            Plus qu'une plateforme : un réseau exclusif de professionnels et d'experts en Prompt Engineering, formation et développement IA.
          </p>
        </div>

        {/* Contenu - Avantages Clés et Visualisation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* 1. Avantages de la Communauté */}
            <div className="space-y-12">
                <CommunityFeature 
                    icon={<User className="h-6 w-6 text-yellow-400" />}
                    title="Coaching et Mentorat Privé"
                    description="Accédez à des sessions mensuelles en direct avec nos experts pour décortiquer vos projets et optimiser vos stratégies IA."
                />
                 <CommunityFeature 
                    icon={<MessageSquare className="h-6 w-6 text-yellow-400" />}
                    title="Espace de Co-Création Exclusif"
                    description="Échangez des prompts, des techniques, et collaborez sur des projets révolutionnaires avec les membres les plus avancés de la communauté Gold."
                />
                 <CommunityFeature 
                    icon={<Briefcase className="h-6 w-6 text-yellow-400" />}
                    title="Opportunités d'Affaires"
                    description="Découvrez des opportunités de freelance, de partenariat et des offres d'emploi exclusives au sein du réseau Gold."
                />
                
                {/* CTA Intégré */}
                <div className="pt-8 pl-4">
                    <motion.a 
                       href="#pricing"
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       className="
                            inline-flex items-center gap-2 py-3 px-8 rounded-xl font-semibold text-lg
                            bg-gradient-to-br from-[#FFF4C9] via-[#F5D98A] to-[#C89C36]
                            text-black shadow-[0_4px_20px_rgba(255,215,120,0.6)]
                            transition-all duration-300 cursor-pointer
                        "
                    >
                        Rejoindre le Réseau Gold &rarr;
                    </motion.a>
                </div>

            </div>

            {/* 2. Grille de Membres Fictifs */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-2 gap-6 p-6 bg-neutral-900/40 rounded-2xl border border-white/10"
            >
                {goldMembers.map((member, index) => (
                    <MemberCard key={index} {...member} />
                ))}
                {/* Carte de Motivation/Clôture */}
                 <div className="
                    col-span-2 p-6 rounded-xl text-center flex flex-col items-center justify-center h-full
                    bg-yellow-400/10 border border-yellow-400/40
                    shadow-xl text-white
                ">
                    <h4 className="text-2xl font-extrabold text-yellow-300">Votre Profil ici.</h4>
                    <p className="text-sm text-gray-300 mt-2">Devenez l'un de nos prochains experts à succès.</p>
                </div>
            </motion.div>

        </div>
        
      </div>
    </section>
  );
};