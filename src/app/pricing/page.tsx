"use client";
import Link from "next/link";
import { IconCrown, IconSparkles, IconUser, IconCheck, IconArrowRight, IconBook, IconUsers, IconStars } from "@tabler/icons-react";
import { useAppStore } from "@/store/useAppStore";

const benefits = [
  {
    title: "Prompts illimités",
    description: "Accédez à toute la bibliothèque de prompts Gold, sans aucune limite ni quota.",
    icon: IconSparkles,
  },
  {
    title: "Formations exclusives",
    description: "Sujets IA, automatisation, productivité, SEO, développement... catalogue complet inclus.",
    icon: IconBook,
  },
  {
    title: "Communauté privée",
    description: "Rejoignez le Discord Gold, webinars mensuels, support expert, entraide et échanges.",
    icon: IconUsers,
  },
  {
    title: "Nouveaux ajouts priorisés",
    description: "Prompts, modules et formations ajoutés chaque mois – suggestions prioritaires pour les membres gold.",
    icon: IconStars,
  },
  {
    title: "Badge Gold",
    description: "Valorisez votre profil, accédez à des fonctionnalités avancées et événements privés.",
    icon: IconCrown,
  }
];

export default function PricingGoldPage() {
  const { subscription } = useAppStore();
  const isPremium = subscription === "Premium" || subscription === "Pro";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232420] via-[#191710] to-[#181402] px-2 pb-14 pt-6 text-white">
      <div className="max-w-4xl mx-auto pt-10 text-center flex flex-col items-center">
        <span className="inline-block px-4 py-1 bg-gradient-to-r from-[#FFD700BB] to-[#C89C36CC] text-black text-xs tracking-widest rounded-full font-bold shadow-lg uppercase mb-4">
          Edition Gold Premium
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 text-gold-200 drop-shadow-[0_2px_16px_rgba(255,215,70,0.17)]">
          Passez à l’abonnement <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#FFD700] via-[#FFBF00] to-[#AB8507]">Gold</span>
        </h1>
        <p className="text-lg mb-7 text-gold-100/90 max-w-2xl">
          Boostez votre productivité sur l’IA, l’auto, le no-code, le dev, le marketing, et ouvrez-vous les portes de la communauté privée Gold VisionOS. 
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10 justify-center my-10">
        {/* CARD PRICING - GRATUIT */}
        <div className="flex-1 bg-gradient-to-br from-[#23221888] to-[#111015] border border-white/15 rounded-3xl shadow-lg p-7 min-w-[260px] max-w-[370px] flex flex-col items-center relative overflow-hidden">
          <span className="absolute top-7 right-5 px-4 py-1 bg-gold-700/40 text-gold-100 text-xs rounded-full font-bold tracking-widest shadow-md opacity-90">Gratuit</span>
          <div className="text-4xl font-bold mb-1 text-gold-100">0€</div>
          <div className="mb-5 text-xs text-gray-300">A vie • Accès limité</div>
          <ul className="text-left space-y-2 my-5 text-sm text-gold-50">
            <li><IconCheck className="inline mb-1 mr-2 text-gold-600 w-5 h-5" /> 5 prompts image/mois</li>
            <li><IconCheck className="inline mb-1 mr-2 text-gold-600 w-5 h-5" /> Aperçu de formations Gold</li>
            <li><IconCheck className="inline mb-1 mr-2 text-gold-600 w-5 h-5" /> Aucun CB requise</li>
            <li className="line-through text-gold-200/65">Communauté privée</li>
            <li className="line-through text-gold-200/65">Mises à jour prioritaires</li>
            <li className="line-through text-gold-200/65">Formations complètes</li>
          </ul>
          {!isPremium && (
            <Link
              href="/signup"
              className="mt-8 px-7 py-2 rounded-2xl bg-gradient-to-br from-white/80 to-gold-100/40 text-black font-bold hover:scale-[1.035] shadow transition"
            >
              Essayer gratuitement
            </Link>
          )}
        </div>

        {/* CARD PRICING - GOLD */}
        <div className="flex-1 bg-gradient-to-br from-[#FFD70022] via-[#EEC35533] to-[#181402DD] border-2 border-[#FFD93C88] rounded-3xl shadow-2xl p-8 min-w-[280px] max-w-[390px] flex flex-col items-center scale-105 relative overflow-hidden">
          <span className="absolute top-7 right-5 flex items-center gap-2 bg-gradient-to-r from-[#FFD700] to-[#C89C36] px-4 py-1 rounded-full font-bold shadow-md uppercase text-black tracking-widest text-xs">
            <IconCrown className="w-4 h-4 mr-1 text-[#B6910A]" /> Gold
          </span>
          <div className="flex justify-center mt-1 mb-5">
            <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#FFD700] via-[#FFBF00] to-[#AB8507] drop-shadow">15 €/mois</span>
          </div>
          <div className="mb-7 text-xs text-gold-300 font-bold">Sans engagement – résiliable à tout moment</div>
          <ul className="text-left space-y-2 my-3 text-sm text-gold-100 font-medium">
            {benefits.map((b, idx) => (
              <li key={b.title} className="flex items-center">
                <b.icon className="w-5 h-5 mr-2 text-[#FFD700]" /> {b.title}
              </li>
            ))}
          </ul>
          <Link
            href="https://chariow.com/puls/mon-pulse-id" // Remplace par ton vrai lien chariow pulse
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 px-8 py-3 rounded-2xl bg-gradient-to-br from-[#FFD700] via-[#FFBF00] to-[#B6910A] text-black font-extrabold text-lg flex items-center shadow-[0_4px_30px_rgba(220,197,70,0.16)] hover:scale-[1.045] transition-all"
          >
            <IconCrown className="w-6 h-6 mr-2" /> Passer au Gold <IconArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="mt-20 max-w-3xl mx-auto text-center text-gold-100/85">
        <h2 className="text-2xl font-bold mb-3 text-[#FFD93C]">Un nouveau standard IA, productivité et communauté</h2>
        <p className="text-gold-100/85 text-lg">
          Misez sur une expérience premium : accès sans limite, échanges directs avec des experts, nouveautés chaque mois, et un espace où partager, apprendre et progresser avec la crème de la communauté IA francophone.
        </p>
      </div>
    </div>
  );
}
