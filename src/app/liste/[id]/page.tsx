// src/app/liste/[id]/page.tsx
"use client";

import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  IconExternalLink,
  IconChevronRight,
  IconCategory,
  IconCoin,
  IconBolt,
  IconAward,
  IconCheck,
  IconArrowUp,
} from "@tabler/icons-react";

// ⚠️ AJUSTEZ LE CHEMIN SELON VOTRE STRUCTURE
// Si vous avez séparé les données dans src/data/ai-tools.ts, utilisez :
// import { allAiTools, AiTool } from '@/data/ai-tools'; 
// Sinon, gardez la définition AiTool et le tableau ici.
// Pour l'exemple, je vais considérer que vous avez gardé les données dans ce fichier.

// --- DÉFINITIONS DE TYPES ET DONNÉES (Si non séparées) ---
interface AiTool {
  id: number;
  name: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  category: string;
  price: string;
  isPremium: boolean;
  currentRank: number;
  upvotes: number;
  isTrending: boolean;
  isNew: boolean;
  logo: string;
  bannerImage: string;
  officialSiteUrl: string;
}

const LOGO_BASE_URL = "https://picsum.photos/40/40?random=";
const BANNER_BASE_URL = "https://picsum.photos/800/400?random=";

const allAiTools: AiTool[] = [
    // ... (Votre liste complète de 8 outils, assurez-vous qu'elle est bien là)
    { id: 1, name: "StockPredict AI", shortDesc: "Prédit les tendances boursières à court terme avec une précision de 90%", fullDesc: "Une solution complète basée sur l'apprentissage profond pour anticiper les mouvements du marché. Idéal pour les investisseurs actifs et les gestionnaires de portefeuille. Il analyse des millions de points de données chaque jour pour fournir des signaux d'achat/vente précis.", features: ["Analyse technique avancée", "Prévisions journalières et hebdomadaires", "API Intégration", "Alertes personnalisées", "Module de backtesting"], category: "Analyse", price: "Gratuit", isPremium: false, currentRank: 1, upvotes: 950, isTrending: true, isNew: false, logo: LOGO_BASE_URL + 1, bannerImage: BANNER_BASE_URL + 11, officialSiteUrl: "https://stockpredict.com" },
    { id: 2, name: "AlgoTrade Pro", shortDesc: "Exécute des stratégies de trading automatisé sans intervention humaine", fullDesc: "Créez, testez et déployez vos robots de trading en quelques clics. Plateforme de backtesting et de paper trading intégrée. Conçu pour minimiser les erreurs humaines et maximiser la vitesse d'exécution.", features: ["Trading 24/7 sur plusieurs marchés", "Backtesting rapide et fiable", "Gestion du risque personnalisée", "Editeur de stratégie par glisser-déposer"], category: "Trading", price: "29€/mois", isPremium: true, currentRank: 4, upvotes: 450, isTrending: true, isNew: true, logo: LOGO_BASE_URL + 2, bannerImage: BANNER_BASE_URL + 22, officialSiteUrl: "https://algotradepro.com" },
    { id: 3, name: "Portfolio Optimizer", shortDesc: "Optimise la diversification de votre portefeuille en fonction de votre profil de risque", fullDesc: "Utilise des algorithmes de Markowitz pour maximiser le rendement ajusté au risque. Suivez les performances en temps réel. Plateforme idéale pour la gestion passive et active.", features: ["Rééquilibrage automatique", "Modélisation Monte Carlo", "Analyse fiscale et sectorielle", "Rapports de performance détaillés"], category: "Gestion", price: "59€/mois", isPremium: true, currentRank: 2, upvotes: 890, isTrending: false, isNew: false, logo: LOGO_BASE_URL + 3, bannerImage: BANNER_BASE_URL + 33, officialSiteUrl: "https://portfolioopt.com" },
    { id: 4, name: "Data Miner", shortDesc: "Collecte et structure des données de marché alternatives et financières", fullDesc: "Une plateforme d'agrégation de données pour les traders quantitatifs. Fournit des signaux alternatifs basés sur les médias sociaux et les rapports économiques.", features: ["Web scraping avancé", "API en temps réel", "Visualisation des données historiques"], category: "Analyse", price: "49€/mois", isPremium: false, currentRank: 3, upvotes: 700, isTrending: false, isNew: true, logo: LOGO_BASE_URL + 4, bannerImage: BANNER_BASE_URL + 44, officialSiteUrl: "https://dataminer.com" },
    { id: 5, name: "News Sentiment AI", shortDesc: "Analyse le sentiment des actualités financières en temps réel", fullDesc: "...", features: ["NLP (Natural Language Processing)", "Score de sentiment agrégé", "Alertes de volatilité"], category: "Actualités", price: "Gratuit", isPremium: false, currentRank: 5, upvotes: 650, isTrending: true, isNew: false, logo: LOGO_BASE_URL + 5, bannerImage: BANNER_BASE_URL + 55, officialSiteUrl: "https://newssentiment.com" },
    { id: 6, name: "Risk Bot", shortDesc: "Évaluation rapide et complète du risque d'un titre", fullDesc: "...", features: ["Notation de risque instantanée", "Historique de risque ajusté"], category: "Gestion", price: "12€/mois", isPremium: false, currentRank: 18, upvotes: 300, isTrending: false, isNew: false, logo: LOGO_BASE_URL + 6, bannerImage: BANNER_BASE_URL + 66, officialSiteUrl: "https://riskbot.com" },
    { id: 7, name: "Tax Planner", shortDesc: "Optimisation fiscale pour les investissements boursiers", fullDesc: "...", features: ["Déclaration simplifiée", "Conseils fiscaux automatisés"], category: "Gestion", price: "Gratuit", isPremium: false, currentRank: 22, upvotes: 250, isTrending: false, isNew: false, logo: LOGO_BASE_URL + 7, bannerImage: BANNER_BASE_URL + 77, officialSiteUrl: "https://taxplanner.com" },
    { id: 8, name: "Forex Watcher", shortDesc: "Surveillance et signaux de trading pour le marché des devises", fullDesc: "...", features: ["Alertes en temps réel", "Stratégies prédéfinies", "Trading social"], category: "Trading", price: "45€/mois", isPremium: true, currentRank: 35, upvotes: 180, isTrending: false, isNew: true, logo: LOGO_BASE_URL + 8, bannerImage: BANNER_BASE_URL + 88, officialSiteUrl: "https://forexwatcher.com" },
];


// --- Composant Carrousel d'Outils Similaires ---

const SimilarToolsCarousel = ({
  currentToolCategory,
  currentToolId,
}: {
  currentToolCategory: string;
  currentToolId: number;
}) => {
  const similarTools = allAiTools.filter(
    (tool) => tool.category === currentToolCategory && tool.id !== currentToolId
  );

  if (similarTools.length === 0) {
    return (
      <p className="text-gray-500 mt-4">
        Aucun outil similaire trouvé dans cette catégorie.
      </p>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-black dark:text-white mb-4 border-b border-gray-200 dark:border-neutral-700 pb-2">
        Outils similaires
      </h3>
      <div className="flex space-x-4 overflow-x-auto pb-4 custom-scrollbar">
        {similarTools.map((tool) => (
          <Link
            href={`/liste/${tool.id}`}
            key={tool.id}
            className="shrink-0 w-72 p-4 bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-700/80 transition duration-200"
          >
            <div className="flex items-center mb-3">
              <Image
                src={tool.logo}
                alt={`Logo de ${tool.name}`}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-lg font-semibold ml-3 text-black dark:text-white">{tool.name}</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-2">
              {tool.shortDesc}
            </p>
            <span className="text-xs mt-2 inline-block text-yellow-500">
              Voir Détails →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};


// --- Composant Principal de la Page de Détail (CORRIGÉ ET SIMPLIFIÉ) ---

/**
 * Cette définition de composant est la plus compatible pour les pages
 * Next.js dynamiques tout en utilisant "use client".
 * On utilise le type Utility 'Readonly' et on définit le type de params
 * directement SANS interface externe, ce qui évite le conflit 'Promise<any>'.
 */
const AiToolDetailPage = ({ params }: any) => {
  const toolId = parseInt(params.id, 10);

  if (isNaN(toolId)) {
    notFound();
  }

  const tool = allAiTools.find((t) => t.id === toolId);

  if (!tool) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white p-4 sm:p-8 lg:p-12">
      {/* Retour à la liste */}
      <Link
        href="/liste"
        className="text-yellow-500 hover:text-yellow-400 transition mb-6 inline-flex items-center"
      >
        <IconChevronRight className="w-5 h-5 mr-1 transform rotate-180" />
        Retour à la liste
      </Link>

      <header className="mb-8 bg-gray-100 dark:bg-neutral-800 p-6 rounded-xl shadow-xl">
        {/* Entête */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <Image
              src={tool.logo}
              alt={`Logo de ${tool.name}`}
              width={64}
              height={64}
              className="rounded-xl border border-yellow-500/50"
            />
            <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white">{tool.name}</h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mt-1">{tool.shortDesc}</p>
            </div>
          </div>
          <button
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200 font-medium flex items-center shrink-0"
            aria-label={`Voter pour ${tool.name}`}
          >
            <IconArrowUp className="w-5 h-5 mr-1" />
            {tool.upvotes} Votes
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-4 mt-6 text-sm">
          <span className="flex items-center bg-gray-200 dark:bg-neutral-700 px-3 py-1 rounded-full text-black dark:text-white">
            <IconCategory className="w-4 h-4 mr-1 text-yellow-500" />{" "}
            {tool.category}
          </span>
          <span className="flex items-center bg-gray-200 dark:bg-neutral-700 px-3 py-1 rounded-full text-black dark:text-white">
            <IconCoin className="w-4 h-4 mr-1 text-green-400" /> {tool.price}
          </span>
          <span className="flex items-center bg-gray-200 dark:bg-neutral-700 px-3 py-1 rounded-full text-black dark:text-white">
            <IconAward className="w-4 h-4 mr-1 text-blue-400" /> Rank #
            {tool.currentRank}
          </span>
          {tool.isPremium && (
            <span className="flex items-center bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold">
              <IconBolt className="w-4 h-4 mr-1" /> Premium
            </span>
          )}
        </div>
      </header>

      {/* Section Détails et CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Section de contenu principal (Description/Fonctionnalités) */}
          <h2 className="text-3xl font-bold mb-4 border-b border-gray-200 dark:border-neutral-700 pb-2">
            Description Complète
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{tool.fullDesc}</p>

          <h2 className="text-3xl font-bold mb-4 border-b border-gray-200 dark:border-neutral-700 pb-2 mt-8">
            Fonctionnalités Clés
          </h2>
          <ul className="space-y-3">
            {tool.features.map((feature, index) => (
              <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                <IconCheck className="w-5 h-5 text-green-500 shrink-0 mt-1 mr-3" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar (Image et CTA) */}
        <aside className="lg:col-span-1 bg-gray-100 dark:bg-neutral-800 p-6 rounded-xl shadow-lg h-fit lg:sticky lg:top-4">
          <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-700">
            <Image
              src={tool.bannerImage}
              alt={`Interface de ${tool.name}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>

          <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Prêt à l'essayer ?</h3>
          <a
            href={tool.officialSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="full-with px-8 py-3 rounded-xl font-bold text-lg
                    bg-linear-to-br from-[#FFF4C9] via-[#F5D98A] to-[#C89C36]
                    text-black shadow-[0_4px_20px_rgba(255,215,120,0.45)]
                    hover:shadow-[0_6px_25px_rgba(255,225,150,0.7)]
                    transition-all duration-500 transform hover:scale-[1.03]"
          >
            <IconExternalLink className="w-5 h-5 inline mr-2 -mt-0.5" /> Visiter le Site Officiel
          </a>

          {/* <div className="mt-4 text-center">
            <Link
              href="/pricing"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-yellow-500 underline"
            >
              Comparer les prix des abonnements
            </Link>
          </div> */}
        </aside>
      </div>

      {/* Carrousel des Outils Similaires */}
      <SimilarToolsCarousel
        currentToolCategory={tool.category}
        currentToolId={tool.id}
      />
    </div>
  );
};

export default AiToolDetailPage;