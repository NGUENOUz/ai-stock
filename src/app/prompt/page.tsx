"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ImagePromptCard from "@/components/ImagePromptCard";
import TextPromptCard from "@/components/textPromptCard";
import {
  IconLock,
  IconSparkles,
  IconCrown,
  IconArrowRight,
  IconBellRinging,
  IconSearch,
  IconAdjustmentsHorizontal,
  IconHeart,
  IconShare2,
  IconCopy,
  IconPalette,
  IconLayoutGrid,
  IconChevronDown,
} from "@tabler/icons-react";

import { useAppStore } from "@/store/useAppStore";
import OnboardingTour, { SlideData } from "../../components/OnboardingTour";

// --- Données ---
const FREE_QUOTA_LIMIT = 5;
const PROMPT_CONSUMPTION_KEY = "prompt_consumption_v1";

const initialPrompts = {
  image: [
    {
      id: 101,
      title: "Portrait Cyberpunk Urbain",
      style: "Style Artistique",
      tool: "Midjourney",
      likes: 450,
      imageUrl: "https://picsum.photos/400/300?random=1",
      prompt:
        "Un portrait d'une femme cybernétique dans une ruelle de Tokyo sous la pluie, éclairage néon bleu et rose, détails extrêmes, cinematic lighting, 8k, --ar 3:4",
    },
    {
      id: 102,
      title: "Nature Morte pour Branding Café",
      style: "Commercial",
      tool: "DALL-E 3",
      likes: 210,
      imageUrl: "https://picsum.photos/400/300?random=2",
      prompt:
        "Nature morte de grains de café torréfiés sur une table en bois rustique, lumière douce, style photographique, focus net, pour publicité de marque.",
    },
    {
      id: 103,
      title: "Rendu 3D d'une Chaise Moderne",
      style: "3D Rendu",
      tool: "Blender AI",
      likes: 180,
      imageUrl: "https://picsum.photos/400/300?random=3",
      prompt:
        "Rendu 3D isométrique d'une chaise de bureau ergonomique, couleur vert olive, fond blanc minimaliste, studio lighting, haute résolution.",
    },
  ],
  marketing: [
    {
      id: 201,
      title: "Prompt SEO pour Article de Blog",
      isPremium: true,
      prompt:
        "Rédige une structure H1/H2/H3 et les 5 points clés d'un article de blog sur 'L'impact des taux d'intérêt sur le marché Crypto'. Utilise un ton expert et optimise pour le mot-clé 'taux crypto'.",
    },
    {
      id: 202,
      title: "Prompt pour Campagne Email Froide",
      isPremium: true,
      prompt:
        "Crée un objet d'email et un corps de texte pour une campagne de prospection ciblant les CFOs de PME. L'objectif est de leur vendre notre outil 'Portfolio Optimizer'.",
    },
  ],
  finance: [
    {
      id: 301,
      title: "Analyse Rapide du Sentiment du Marché",
      isPremium: true,
      prompt:
        "Action: Analyse en temps réel. Sujets: Crypto, Tech. Ton: Neutre. Livrer un score de 1 à 10 et un résumé en 3 points.",
    },
  ],
  general: [
    {
      id: 401,
      title: "Génération de Code Python pour Backtesting",
      isPremium: true,
      prompt:
        "Écris un script Python complet utilisant la librairie Pandas pour importer un fichier CSV de données boursières et calculer la moyenne mobile simple (SMA) sur 20 jours.",
    },
  ],
};

const promptCategories = [
  {
    id: "image",
    name: "Génération d'Images",
    icon: IconPalette,
    access: "static",
  },
  {
    id: "marketing",
    name: "Marketing & SEO",
    icon: IconSparkles,
    access: "premium",
  },
  {
    id: "finance",
    name: "Analyse Financière",
    icon: IconLayoutGrid,
    access: "premium",
  },
  {
    id: "general",
    name: "Général & Productivité",
    icon: IconArrowRight,
    access: "premium",
  },
];

const imageStyles = [
  "Tous",
  "Style Artistique",
  "Photographique",
  "3D Rendu",
  "Commercial",
  "Branding",
  "Shooting",
  "Anime",
];

const promptsOnboardingSlides: SlideData[] = [
  {
    title: "L'Usine à Prompts Gold",
    description:
      "Découvrez comment optimiser vos outils IA avec nos prompts statiques et nos stratégies avancées.",
    icon: IconCrown,
  },
  {
    title: "Votre Offre Gratuite",
    description: `Vous avez un quota de ${FREE_QUOTA_LIMIT} prompts par mois dans les catégories "Statiques" pour tester leur puissance. Un compte est requis pour copier.`,
    icon: IconCopy,
  },
  {
    title: "Accès Premium : Illimité",
    description:
      "Passez au Premium pour un accès illimité à toutes les catégories et rejoignez notre communauté.",
    icon: IconSparkles,
  },
];

// --- Mémo quota ---
const readPromptsUsedFromLS = (): number => {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(PROMPT_CONSUMPTION_KEY);
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
};
const writePromptsUsedToLS = (count: number) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROMPT_CONSUMPTION_KEY, String(count));
};

// --- Page principale ---
const PromptsPage: React.FC = () => {
  const { isLoggedIn, userName, subscription, hasSeenTour, setHasSeenTour } = useAppStore();
  const [promptsUsed, setPromptsUsed] = useState<number>(readPromptsUsedFromLS);
  const [activeCategory, setActiveCategory] = useState(promptCategories[0].id);
  const [activeImageStyle, setActiveImageStyle] = useState(imageStyles[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(true);

  const isPremiumUser = subscription !== "Gratuit";
  const PAGE_ID = "prompts";

  // Onboarding : cacher si déjà vu
  useEffect(() => {
    if (hasSeenTour[PAGE_ID]) setShowOnboarding(false);
    else setShowOnboarding(true);
  }, [hasSeenTour]);

  useEffect(() => {
    writePromptsUsedToLS(promptsUsed);
  }, [promptsUsed]);

  // Callback pour fermer le modal
  const handleOnboardingFinish = () => {
    setHasSeenTour(PAGE_ID, true);
    setShowOnboarding(false);
  };

  // Filtrage
  const filterPrompts = useCallback(
    (prompts: any[]) =>
      prompts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.prompt && p.prompt.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [searchTerm]
  );

  let filteredPrompts: any[] = [];
  if ((initialPrompts as any)[activeCategory]) {
    if (activeCategory === "image") {
      filteredPrompts = (initialPrompts as any).image.filter(
        (p: any) => activeImageStyle === "Tous" || p.style === activeImageStyle
      );
    } else {
      filteredPrompts = (initialPrompts as any)[activeCategory];
    }
    filteredPrompts = filterPrompts(filteredPrompts);
  }

  // Gestion quota / premium copy
  const handleRequestCopy = (prompt: any) => {
    if (!isLoggedIn) {
      setHasSeenTour(PAGE_ID, true);
      window.location.href = "/login?redirect=/prompt";
      return;
    }
    if (prompt.isPremium && !isPremiumUser) {
      alert("Ce prompt est réservé aux membres Premium. Rendez-vous sur la page d'abonnement.");
      window.location.href = "/pricing";
      return;
    }
    if (!isPremiumUser && activeCategory === "image") {
      if (promptsUsed >= FREE_QUOTA_LIMIT) {
        alert("Quota mensuel atteint. Passez au Premium pour un accès illimité.");
        return;
      }
      setPromptsUsed((c) => c + 1);
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(prompt.prompt || prompt).then(
        () => {
          alert(`Prompt "${prompt.title ?? "prompt"}" copié dans le presse-papiers !`);
        },
        () => {
          alert("Impossible de copier automatiquement. Sélectionnez et copiez manuellement.");
        }
      );
    } else {
      alert("Votre navigateur ne supporte pas l'API presse-papiers.");
    }
  };

  // ----- UI principale gold -----
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#232420] via-neutral-900 to-[#22211d] text-white px-4 sm:px-8 lg:px-12 py-6 transition-all">
      {/* Onboarding Tour style gold */}
      {showOnboarding && (
        <OnboardingTour
          slides={promptsOnboardingSlides}
          pageTitle="l'Usine à Prompts Gold"
          pageId={PAGE_ID}
          onFinish={handleOnboardingFinish}
        />
      )}

      <div className="flex">
        <aside className="w-64 min-w-[250px] mr-8 hidden lg:block h-fit sticky top-24">
          <h3 className="text-xl font-bold text-yellow-100 mb-4">Catégories</h3>
          <nav className="space-y-2">
            {promptCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveImageStyle(imageStyles[0]);
                }}
                className={`w-full text-left flex items-center p-3 rounded-xl transition duration-300 relative ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-600 text-black font-bold shadow-[0_3px_14px_rgba(255,215,120,0.19)] border border-yellow-400/25"
                    : "bg-white/5 dark:bg-neutral-900/20 text-gray-300 border border-white/10 hover:bg-yellow-100/10"
                }`}
                disabled={!isPremiumUser && cat.access === "premium"}
              >
                <cat.icon className="w-5 h-5 mr-3" />
                {cat.name}
                {cat.access === "premium" && !isPremiumUser && (
                  <IconLock className="w-4 h-4 ml-auto text-red-400" />
                )}
              </button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 w-full lg:w-auto">
          <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/10">
            <div className="max-w-xl">
              <h1 className="text-4xl font-extrabold text-white mb-1">
                Bienvenue, <span className="text-yellow-400">{userName || "Invité"}</span> !
              </h1>
              <p className="text-yellow-100 text-lg mb-4">
                {isPremiumUser
                  ? "Accès illimité à tous les prompts premium Gold."
                  : "Vous êtes sur l'offre gratuite, quota de prompts statiques limité."}
              </p>
            </div>
            {/* <NotificationBell /> */}
          </div>
          {activeCategory === "image" && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-yellow-100 mb-4 flex items-center">
                <IconAdjustmentsHorizontal className="w-6 h-6 mr-2 text-yellow-500" /> Filtrer par Style
              </h2>
              <div className="relative max-w-xs">
                <select
                  value={activeImageStyle}
                  onChange={(e) => setActiveImageStyle(e.target.value)}
                  className="w-full appearance-none bg-white/10 dark:bg-neutral-900/20 text-yellow-100 p-3 pr-10 rounded-xl border border-white/14 focus:border-yellow-500 transition cursor-pointer"
                >
                  {imageStyles.map((style) => (
                    <option key={style} value={style} className="text-black dark:text-white">{style}</option>
                  ))}
                </select>
                <IconChevronDown className="w-5 h-5 absolute top-1/2 right-3 transform -translate-y-1/2 text-yellow-200 pointer-events-none" />
              </div>
              <div className="mt-4 text-gray-400 text-sm">{filteredPrompts.length} prompts trouvés.</div>
            </div>
          )}
          <div className="mb-8">
            <div className="relative">
              <IconSearch className="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-yellow-400" />
              <input
                type="text"
                placeholder={`Rechercher un prompt dans la catégorie "${promptCategories.find(c=>c.id===activeCategory)?.name}"...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 dark:bg-neutral-900/20 text-yellow-100 p-3 pl-10 rounded-xl border border-white/14 focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 transition duration-300"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredPrompts.length > 0 ? (
              filteredPrompts.map((p) =>
                activeCategory === "image" ? (
                  <ImagePromptCard
                    key={p.id}
                    prompt={p}
                    isPremiumUser={isPremiumUser}
                    promptsUsed={promptsUsed}
                    quotaLimit={FREE_QUOTA_LIMIT}
                    onRequestCopy={handleRequestCopy}
                  />
                ) : (
                  <TextPromptCard
                    key={p.id}
                    prompt={p}
                    isPremiumUser={isPremiumUser}
                    promptsUsed={promptsUsed}
                    quotaLimit={FREE_QUOTA_LIMIT}
                    onRequestCopy={handleRequestCopy}
                  />
                )
              )
            ) : (
              <p className="text-gray-500 lg:col-span-3 mt-10">
                Aucun prompt trouvé dans cette sélection.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PromptsPage;
