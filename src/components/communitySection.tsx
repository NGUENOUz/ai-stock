"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Wallet, Trophy, Bell, ArrowUpRight } from "lucide-react";

const topCreators = [
  {
    name: "Léa Dubois",
    role: "Expert Midjourney",
    stats: "45 Prompts • 12k Followers",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lea",
  },
  {
    name: "Alex Kim",
    role: "Workflow Architect",
    stats: "8 Automatisations • 8k Followers",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
];

export const CommunitySection: React.FC = () => {
  return (
    <section className="bg-white py-24 lg:py-40 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="max-w-4xl mb-20">
          <h2 className="text-5xl lg:text-7xl font-black text-black tracking-tighter leading-[0.9]">
            Devenez <span className="text-primary italic">Contributeur.</span> <br />
            Partagez. Vendez. Brillez.
          </h2>
          <p className="mt-8 text-xl text-neutral-500 max-w-2xl leading-relaxed">
            Transformez votre expertise en IA en revenus. Publiez vos meilleurs prompts, formations et workflows, développez votre audience et soyez récompensé.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* 1. Les piliers du contributeur */}
          <div className="lg:col-span-6 space-y-10">
            <ContributorFeature 
              icon={<Wallet className="h-6 w-6 text-black" />}
              title="Monétisez votre savoir-faire"
              description="Vendez vos ressources (formations, workflows) et percevez des revenus sur chaque vente. Nous ne prenons qu'une commission minime."
            />
            <ContributorFeature 
              icon={<Bell className="h-6 w-6 text-black" />}
              title="Bâtissez votre Audience"
              description="Vos abonnés sont notifiés à chaque nouvelle publication. Devenez une référence incontournable de la scène IA."
            />
            <ContributorFeature 
              icon={<Trophy className="h-6 w-6 text-black" />}
              title="Programme 'Elite Creator'"
              description="Chaque année, les meilleurs contributeurs reçoivent des prix d'exception et une mise en avant exclusive sur la plateforme."
            />
            
            <div className="pt-6">
              <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-neutral-800 transition-all shadow-xl shadow-black/10">
                Ouvrir mon compte créateur <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* 2. Visualisation des profils Créateurs */}
          <div className="lg:col-span-6">
            <div className="relative p-8 bg-neutral-50 rounded-[3rem] border border-neutral-100 shadow-inner">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-8 text-center">Top Créateurs du mois</p>
              
              <div className="space-y-4">
                {topCreators.map((creator, i) => (
                  <div key={i} className="bg-white p-5 rounded-[2rem] border border-neutral-100 shadow-sm flex items-center justify-between group hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-4">
                      <img src={creator.avatar} className="w-14 h-14 rounded-full bg-neutral-100 shadow-inner" alt="" />
                      <div>
                        <h4 className="font-bold text-black">{creator.name}</h4>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-tight">{creator.role}</p>
                        <p className="text-[11px] text-neutral-400 mt-1">{creator.stats}</p>
                      </div>
                    </div>
                    <button className="bg-neutral-50 text-black px-4 py-2 rounded-xl text-xs font-bold border border-neutral-200 hover:bg-black hover:text-white transition-all flex items-center gap-2">
                      <UserPlus className="h-3 w-3" /> Suivre
                    </button>
                  </div>
                ))}

                {/* Placeholder pour le futur créateur */}
                <div className="border-2 border-dashed border-neutral-200 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <UserPlus className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-black">C'est ici que vous brillez.</h4>
                  <p className="text-xs text-neutral-400 mt-1">Rejoignez nos +50 contributeurs actifs.</p>
                </div>
              </div>

              {/* Petit badge "Commission" flottant */}
              <div className="absolute -top-4 -right-4 bg-primary text-black px-4 py-2 rounded-full text-xs font-black rotate-12 shadow-lg">
                Seulement 15% de commission
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContributorFeature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex gap-5">
    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center shadow-sm">
      {icon}
    </div>
    <div>
      <h5 className="text-xl font-bold text-black tracking-tight mb-1">{title}</h5>
      <p className="text-neutral-500 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);