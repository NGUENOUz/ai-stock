// src/app/prompt/page.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

import { useAppStore, SubscriptionTier } from "@/store/useAppStore";
import OnboardingTour, { SlideData } from "../../components/OnboardingTour";

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

// ----------------------------------
// Premium Gold VisionOS Components !
// ----------------------------------

interface PromptUsageTrackerProps {
  promptsUsed: number;
  quotaLimit: number;
  isPremium: boolean;
}
const PromptUsageTracker: React.FC<PromptUsageTrackerProps> = ({
  promptsUsed,
  quotaLimit,
  isPremium,
}) => {
  if (isPremium) return null;
  const usagePercentage = Math.min(100, (promptsUsed / quotaLimit) * 100);
  const remaining = Math.max(0, quotaLimit - promptsUsed);
  const isCritical = remaining <= 1;
  return (
    <div className="p-5 rounded-2xl bg-white/10 dark:bg-neutral-900/20 border border-white/20 dark:border-white/10 shadow-[0_4px_25px_rgba(255,215,120,0.19)] backdrop-blur-xl sticky top-20 z-10 transition-all duration-500 mb-8">
      <div className="flex justify-between items-center mb-3">
        <h4 className={`text-lg font-bold ${isCritical ? "text-red-400" : "text-yellow-400"}`}>
          Quota Mensuel Gratuit
        </h4>
        <div className="text-xl font-extrabold text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,100,0.25)]">
          <span className={isCritical ? "text-red-400" : ""}>{remaining}</span> / {quotaLimit}
        </div>
      </div>
      <div className="w-full bg-neutral-700/50 rounded-full h-3">
        <div
          style={{ width: `${usagePercentage}%` }}
          className={`h-3 rounded-full transition-all duration-700 ease-out ${
            isCritical
              ? "bg-red-500"
              : "bg-gradient-to-r from-[#FFF4C9] via-[#F5D98A] to-[#C89C36] shadow-[0_0_16px_rgba(255,215,120,0.35)]"
          }`}
        />
      </div>
      <p className="text-xs text-gray-400 mt-2">
        Vous avez utilisé <strong className="text-yellow-400">{promptsUsed}</strong> prompts statiques ce mois-ci. Les prompts Premium sont illimités.
      </p>
      {remaining === 0 && (
        <Link
          href="/pricing"
          className="mt-3 text-sm font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-5 py-2 rounded-lg shadow-[0_3px_15px_rgba(255,215,120,0.32)] hover:shadow-[0_0_24px_rgba(255,224,120,0.59)] flex items-center justify-center transition-all"
        >
          Votre quota est épuisé ! Débloquez l'accès illimité <IconArrowRight className="w-4 h-4 ml-1" />
        </Link>
      )}
    </div>
  );
};

interface AccessRestrictedProps {
  title: string;
  description: string;
  linkPath: string;
  linkText: string;
  isPremiumWall?: boolean;
}
const AccessRestricted: React.FC<AccessRestrictedProps> = ({
  title,
  description,
  linkPath,
  linkText,
  isPremiumWall,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4">
      {isPremiumWall ? (
        <IconCrown className="w-20 h-20 text-[#F5D98A] mb-6 drop-shadow-[0_0_14px_rgba(255,215,100,0.7)]" />
      ) : (
        <IconLock className="w-20 h-20 text-red-500 mb-6" />
      )}
      <h1 className="text-4xl font-extrabold mb-4 text-white">{title}</h1>
      <p className="text-xl text-yellow-500 mb-8 max-w-md">{description}</p>
      <Link
        href={linkPath}
        className="flex items-center bg-gradient-to-br from-[#FFF4C9] via-[#F5D98A] to-[#C89C36] text-black px-8 py-3 rounded-xl font-bold text-lg shadow-[0_4px_20px_rgba(255,215,120,0.45)] hover:shadow-[0_6px_25px_rgba(255,225,150,0.7)] transition-all duration-500"
      >
        {linkText} <IconArrowRight className="w-5 h-5 ml-2" />
      </Link>
    </div>
  );
};

const NotificationBell: React.FC = () => {
  const [hasNew, setHasNew] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      message: "NOUVEAU : 5 prompts ajoutés dans la catégorie 'Analyse Financière'!",
      time: "il y a 2 heures",
    },
    {
      id: 2,
      message: "PROMO : 20% de réduction sur l'abonnement annuel. Valable jusqu'à vendredi !",
      time: "Hier",
    },
    {
      id: 3,
      message: "ÉVÉNEMENT : Rejoignez notre webinaire sur le 'Trading Algo sans code' le 15 Nov.",
      time: "il y a 3 jours",
    },
  ];

      return (
    <div className="relative">
      <button
        className="p-3 rounded-full bg-white/10 dark:bg-neutral-900/20 border border-white/20 dark:border-white/10 shadow-lg hover:shadow-[0_0_18px_rgba(255,215,120,0.18)] transition relative"
        onClick={() => {
          setIsOpen((s) => !s);
          setHasNew(false);
        }}
        aria-label="Notifications"
      >
        <IconBellRinging className="w-6 h-6 text-yellow-400" />
        {hasNew && (
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white/50 dark:bg-neutral-900/80 rounded-xl shadow-2xl border border-white/20 dark:border-white/10 z-50 backdrop-blur-2xl">
          <div className="p-4 text-lg font-bold border-b border-white/10 text-yellow-500">
            Notifications
          </div>
          <ul className="divide-y divide-white/10 max-h-80 overflow-y-auto">
            {notifications.map((n) => (
              <li key={n.id} className="p-3 hover:bg-neutral-700/30 cursor-pointer">
                <p className="text-sm font-medium">{n.message}</p>
                <p className="text-xs text-gray-500 mt-1">{n.time}</p>
              </li>
            ))}
          </ul>
          <div className="p-2 text-center text-xs text-yellow-500 hover:text-yellow-400 cursor-pointer">
            Marquer tout comme lu
          </div>
        </div>
      )}
    </div>
  );
};

type ImagePrompt = typeof initialPrompts.image[0] & { isPremium?: boolean };
interface ImagePromptCardProps {
  prompt: ImagePrompt;
  isPremiumUser: boolean;
  promptsUsed: number;
  quotaLimit: number;
  onRequestCopy: (prompt: ImagePrompt) => void;
}
const ImagePromptCard: React.FC<ImagePromptCardProps> = ({
  prompt,
  isPremiumUser,
  promptsUsed,
  quotaLimit,
  onRequestCopy,
}) => {
  const isLocked = prompt.isPremium && !isPremiumUser;
  const isQuotaReached = !isPremiumUser && promptsUsed >= quotaLimit;

  const truncatedPrompt = isLocked
    ? "Débloquez l'accès Premium pour révéler ce prompt..."
    : isQuotaReached
    ? "Quota épuisé : Souscrivez pour copier ce prompt."
    : `${prompt.prompt.substring(0, 80)}...`;

  return (
    <div
      className={`group relative cursor-pointer rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.18)] flex flex-col h-full bg-white/15 dark:bg-neutral-900/25 border border-white/20 dark:border-white/10 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_26px_rgba(255,215,120,0.33)] ${
        isLocked || isQuotaReached ? "opacity-70 grayscale-[23%]" : ""
      }`}
    >
      {(isLocked || isQuotaReached) && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-4 text-center rounded-3xl">
          <IconLock className="w-10 h-10 text-red-500 mb-2" />
          <p className="font-bold text-lg text-yellow-100 drop-shadow-[0_0_8px_rgba(255,235,125,0.3)]">
            {isLocked ? "ACCÈS PREMIUM" : "QUOTA ÉPUISÉ"}
          </p>
          <Link href="/pricing" className="text-yellow-400 text-sm mt-1 hover:underline">
            Débloquer maintenant
          </Link>
        </div>
      )}

      <div className="relative h-48 w-full">
        <Image
          src={prompt.imageUrl}
          alt={prompt.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="transition duration-700 group-hover:scale-[1.05] group-hover:brightness-110"
        />
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full shadow-[0_0_10px_rgba(255,215,120,0.32)] backdrop-blur-md ${
            isLocked || prompt.isPremium
              ? "bg-gradient-to-br from-[#FFF4C9] via-[#F5D98A] to-[#C89C36] text-black"
              : "bg-black/60 text-white"
          }`}
        >
          {prompt.isPremium && <IconCrown className="w-3 h-3 inline-block mr-1" />}
          {prompt.tool}
        </span>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold mb-1 line-clamp-2 text-white">{prompt.title}</h3>
          <div className="text-xs text-yellow-500 mb-3">{prompt.style}</div>
          <p
            className="text-gray-400 text-sm bg-neutral-900/40 p-3 rounded-lg font-mono mb-4 min-h-[90px] backdrop-blur-[2px]"
            onClick={() => onRequestCopy(prompt)}
          >
            {truncatedPrompt}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-red-400 hover:text-red-500 transition">
              <IconHeart className="w-5 h-5 mr-1 fill-current" /> {prompt.likes}
            </button>
          </div>

          <button
            onClick={() => onRequestCopy(prompt)}
            className={`text-sm flex items-center px-3 py-1.5 rounded-xl font-semibold transition-all duration-300 ${
              isLocked || isQuotaReached
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gradient-to-br from-[#FFF4C9] via-[#F5D98A] to-[#C89C36] text-black hover:scale-[1.05] shadow-[0_3px_10px_rgba(255,215,120,0.16)]"
            }`}
            disabled={isLocked || isQuotaReached}
          >
            <IconCopy className="w-4 h-4 mr-1" />
            {isLocked ? "Premium" : isQuotaReached ? "Épuisé" : "Copier"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface TextPromptCardProps {
  prompt: { id: number; title: string; isPremium?: boolean; prompt: string };
  isPremiumUser: boolean;
  promptsUsed: number;
  quotaLimit: number;
  onRequestCopy: (prompt: any) => void;
}
const TextPromptCard: React.FC<TextPromptCardProps> = (props) => {
  const { prompt, isPremiumUser, promptsUsed, quotaLimit, onRequestCopy } = props;
  const isLocked = prompt.isPremium && !isPremiumUser;
  const isQuotaReached = !isPremiumUser && promptsUsed >= quotaLimit;

  if (isLocked || isQuotaReached) {
    return (
      <ImagePromptCard
        prompt={prompt as ImagePrompt}
        isPremiumUser={isPremiumUser}
        promptsUsed={promptsUsed}
        quotaLimit={quotaLimit}
        onRequestCopy={onRequestCopy}
      />
    );
  }

  return (
    <div className="relative p-6 rounded-3xl border border-white/14 bg-white/10 dark:bg-neutral-900/25 shadow-[0_4px_26px_rgba(255,215,120,0.09)] hover:border-yellow-500/50 transition duration-500">
      <IconCrown className="absolute top-5 right-5 w-7 h-7 text-[#F8D98A] drop-shadow-[0_0_7px_rgba(255,215,100,0.58)]" />
      <h3 className="text-2xl font-semibold mb-3 text-yellow-400">{prompt.title}</h3>
      <p
        className="text-gray-200 text-sm bg-neutral-900/50 p-4 rounded-lg font-mono line-clamp-4 cursor-pointer"
        onClick={() => onRequestCopy(prompt)}
      >
        {prompt.prompt}
        <span className="block text-right text-xs text-yellow-500 mt-2">
          (Clic pour copier le prompt complet)
        </span>
      </p>
      <div className="mt-5 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-red-400 hover:text-red-500 transition">
            <IconHeart className="w-5 h-5 mr-1 fill-current" /> 150
          </button>
          <button className="text-gray-400 hover:text-yellow-400 transition">
            <IconShare2 className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={() => onRequestCopy(prompt)}
          className="text-sm bg-gradient-to-br from-[#FFF4C9] via-[#F5D98A] to-[#C89C36] text-black px-4 py-2 rounded-xl font-bold hover:scale-[1.06] transition-all duration-300 shadow-[0_3px_10px_rgba(255,215,120,0.14)]"
        >
          <IconCopy className="w-4 h-4 mr-1 inline-block" /> Copier le Prompt
        </button>
      </div>
    </div>
  );
};

// ------------
// Main Page
// ------------

const PromptsPage: React.FC = () => {
  const {
    isLoggedIn,
    userName,
    subscription,
    hasSeenTour,
    setHasSeenTour,
    simulateLogin,
  } = useAppStore();

  const [promptsUsed, setPromptsUsed] = useState<number>(readPromptsUsedFromLS);

  const [activeCategory, setActiveCategory] = useState(promptCategories[0].id);
  const [activeImageStyle, setActiveImageStyle] = useState(imageStyles[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);

  const isPremiumUser = subscription !== "Gratuit";
  const PAGE_ID = "prompts";

  useEffect(() => {
    if (!isLoggedIn && !hasSeenTour[PAGE_ID]) {
      setShowOnboarding(true);
    } else {
      setShowOnboarding(false);
    }
  }, [isLoggedIn, hasSeenTour]);

  useEffect(() => {
    writePromptsUsedToLS(promptsUsed);
  }, [promptsUsed]);

  const currentCategoryInfo = promptCategories.find((c) => c.id === activeCategory)!;

  const filterPrompts = useCallback(
    (prompts: any[]) => {
      return prompts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.prompt && p.prompt.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    },
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

    if (!isPremiumUser && currentCategoryInfo.access === "static") {
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

  const handleUpgrade = () => {
    if (!isLoggedIn) {
      window.location.href = "/login?redirect=/pricing";
      return;
    }
    window.location.href = "/pricing";
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <div className="flex">
          {/* Aside Navigation */}
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
                >
                  <cat.icon className="w-5 h-5 mr-3" />
                  {cat.name}
                  {cat.access === "premium" && (
                    <IconLock className="w-4 h-4 ml-auto text-red-400" />
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main */}
          <main className="flex-1 w-full lg:w-auto">
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/10">
              <div className="max-w-xl">
                <h1 className="text-4xl font-extrabold text-white mb-1">
                  Bienvenue, <span className="text-yellow-400">Invité</span> !
                </h1>
                <p className="text-yellow-100 text-lg mb-4">Découvrez l'Usine à Prompts <span className="font-bold text-yellow-400">Gold Edition</span>.</p>
              </div>
              <NotificationBell />
            </div>
            {/* Filtres */}
            {activeCategory === "image" && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-yellow-100 mb-4 flex items-center">
                  <IconAdjustmentsHorizontal className="w-6 h-6 mr-2 text-yellow-500" /> Filtrer par Style
                </h2>
                <div className="relative max-w-xs">
                  <select
                    value={activeImageStyle}
                    onChange={(e) => setActiveImageStyle(e.target.value)}
                    className="w-full appearance-none bg-white/10 dark:bg-neutral-900/20 text-yellow-100 p-3 pr-10 rounded-xl border border-white/14 focus:border-yellow-500 transition cursor-pointer shadow-[0_0_14px_rgba(255,215,120,0.06)]"
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
                  placeholder={`Rechercher un prompt dans la catégorie "${currentCategoryInfo?.name}"...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 dark:bg-neutral-900/20 text-yellow-100 p-3 pl-10 rounded-xl border border-white/14 focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 transition duration-300 shadow-[0_0_10px_rgba(255,215,120,0.04)]"
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
                      isPremiumUser={false}
                      promptsUsed={promptsUsed}
                      quotaLimit={FREE_QUOTA_LIMIT}
                      onRequestCopy={handleRequestCopy}
                    />
                  ) : (
                    <TextPromptCard
                      key={p.id}
                      prompt={p}
                      isPremiumUser={false}
                      promptsUsed={promptsUsed}
                      quotaLimit={FREE_QUOTA_LIMIT}
                      onRequestCopy={handleRequestCopy}
                    />
                  )
                )
              ) : (
                <p className="text-gray-500 lg:col-span-3 mt-10">Aucun prompt trouvé dans cette sélection.</p>
              )}
            </div>
          </main>
        </div>
      );
    }

    // Premium restriction screen
    if (!isPremiumUser && currentCategoryInfo.access === "premium") {
      return (
        <AccessRestricted
          title={`Débloquez ${currentCategoryInfo.name} avec l'abonnement Premium`}
          description={`Accédez à tous les prompts de ${currentCategoryInfo.name}, mis à jour régulièrement, et rejoignez notre communauté privée Gold.`}
          linkPath="/pricing"
          linkText="Voir les Abonnements Gold Premium"
          isPremiumWall={true}
        />
      );
    }

    // Connected, premium or free page
    return (
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
          {/* Quota */}
          <PromptUsageTracker
            promptsUsed={promptsUsed}
            quotaLimit={FREE_QUOTA_LIMIT}
            isPremium={isPremiumUser}
          />
        </aside>
        <main className="flex-1 w-full lg:w-auto">
          <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/10">
            <div className="max-w-xl">
              <h1 className="text-4xl font-extrabold text-white mb-1">
                Bienvenue, <span className="text-yellow-400">{userName}</span> !
              </h1>
              <p className="text-yellow-100 text-lg mb-4">
                Votre statut: <strong className="text-yellow-400">{isPremiumUser ? "Premium Gold" : "Gratuit"}</strong>. Accès à {currentCategoryInfo.name}.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {!isPremiumUser && (
                <button
                  onClick={handleUpgrade}
                  className="text-sm bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-600 text-black px-6 py-2 rounded-xl font-bold hover:scale-105 shadow-[0_4px_20px_rgba(255,215,120,0.25)] transition-all duration-300"
                >
                  Passer au Gold Premium
                </button>
              )}
              <NotificationBell />
            </div>
          </div>
          {/* Filtres */}
          {activeCategory === "image" && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-yellow-100 mb-4 flex items-center">
                <IconAdjustmentsHorizontal className="w-6 h-6 mr-2 text-yellow-500" /> Filtrer par Style
              </h2>
              <div className="relative max-w-xs">
                <select
                  value={activeImageStyle}
                  onChange={(e) => setActiveImageStyle(e.target.value)}
                  className="w-full appearance-none bg-white/10 dark:bg-neutral-900/20 text-yellow-100 p-3 pr-10 rounded-xl border border-white/14 focus:border-yellow-500 transition cursor-pointer shadow-[0_0_14px_rgba(255,215,120,0.07)]"
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
                placeholder={`Rechercher un prompt dans la catégorie "${currentCategoryInfo?.name}"...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 dark:bg-neutral-900/20 text-yellow-100 p-3 pl-10 rounded-xl border border-white/14 focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 transition duration-300 shadow-[0_0_10px_rgba(255,215,120,0.04)]"
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
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#232420] via-neutral-900 to-[#22211d] text-white px-4 sm:px-8 lg:px-12 py-6 transition-all">
      {/* Onboarding */}
      {showOnboarding && !isLoggedIn && (
        <OnboardingTour
          slides={promptsOnboardingSlides}
          pageTitle="l'Usine à Prompts Gold"
          pageId={PAGE_ID}
        />
      )}
      {/* Main Content */}
      {renderContent()}
    </div>
  );
};

export default PromptsPage;
