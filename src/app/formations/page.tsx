"use client";
import React, { useState, useMemo, useEffect } from "react";
import { TrainingCard } from "../../components/trainingCard";
import { TrainingFilters } from "../../components/trainingFilter";
import { Pagination } from "../../components/pagination";
import OnboardingTour, { SlideData } from "../../components/OnboardingTour";
import { Search, Filter, X } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

// --- Données exemples formations ---
const ALL_TRAININGS = [
  {
    id: "t1",
    title: "Maîtriser le Prompt Engineering — Niveau Expert",
    imageUrl: "https://picsum.photos/seed/prompt1/800/450",
    category: "IA & Prompt",
    language: "Français",
    price: 0,
    durationMinutes: 180,
    numberOfVideos: 15,
    instructor: {
      id: "instr1",
      name: "Alex Dupont",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      bio: "",
    },
    shortDescription: "Devenez autonome dans la conception de prompts puissants et efficaces.",
    longDescription: "Approfondissez les stratégies avancées du prompt engineering.",
    lessons: [],
    isPremium: false,
  },
  {
    id: "t2",
    title: "SEO 2025 — Secrets de RankBrain",
    imageUrl: "https://picsum.photos/seed/seo2025/800/450",
    category: "Marketing",
    language: "Français",
    price: 0,
    durationMinutes: 120,
    numberOfVideos: 10,
    instructor: {
      id: "instr1",
      name: "Alex Dupont",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      bio: "",
    },
    shortDescription: "Comprenez les nouveaux signaux de Google pour dominer les SERP.",
    longDescription: "",
    lessons: [],
    isPremium: false,
  },
  {
    id: "t3",
    title: "Next.js + Tailwind — Web Moderne",
    imageUrl: "https://picsum.photos/seed/nextjs1/800/450",
    category: "Développement Web",
    language: "Anglais",
    price: 0,
    durationMinutes: 300,
    numberOfVideos: 25,
    instructor: {
      id: "instr2",
      name: "Jane Martin",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
      bio: "",
    },
    shortDescription: "Construisez des applications web rapides et scalables.",
    longDescription: "",
    lessons: [],
    isPremium: false,
  },
  {
    id: "t4",
    title: "Stratégie de Contenu avec ChatGPT",
    imageUrl: "https://picsum.photos/seed/chatgpt1/800/450",
    category: "IA & Prompt",
    language: "Français",
    price: 0,
    durationMinutes: 90,
    numberOfVideos: 8,
    instructor: {
      id: "instr3",
      name: "Julien Roy",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
      bio: "",
    },
    shortDescription: "Faites de l’IA votre coéquipier créatif.",
    longDescription: "",
    lessons: [],
    isPremium: false,
  },
  {
    id: "t5",
    title: "Photographie Aérienne — Drone Pro",
    imageUrl: "https://picsum.photos/seed/dronepro1/800/450",
    category: "Création Vidéo",
    language: "Français",
    price: 49,
    durationMinutes: 240,
    numberOfVideos: 18,
    instructor: {
      id: "instr2",
      name: "Jane Martin",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
      bio: "",
    },
    shortDescription: "Maîtrisez le pilotage et la post-production aérienne.",
    longDescription: "",
    lessons: [],
    isPremium: true,
  },
  {
    id: "t6",
    title: "Créer un Business E-commerce Rentable",
    imageUrl: "https://picsum.photos/seed/ecom1/800/450",
    category: "E-commerce",
    language: "Français",
    price: 0,
    durationMinutes: 360,
    numberOfVideos: 30,
    instructor: {
      id: "instr1",
      name: "Alex Dupont",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      bio: "",
    },
    shortDescription: "Lancez, automatisez et scalez votre boutique en ligne.",
    longDescription: "",
    lessons: [],
    isPremium: false,
  },
  {
    id: "t7",
    title: "Fundamentaux de l’Analyse de Données",
    imageUrl: "https://picsum.photos/seed/dataanalyst1/800/450",
    category: "Analyse",
    language: "Anglais",
    price: 0,
    durationMinutes: 100,
    numberOfVideos: 9,
    instructor: {
      id: "instr4",
      name: "Li Wang",
      avatarUrl: "https://i.pravatar.cc/150?img=4",
      bio: "",
    },
    shortDescription: "Analysez, interprétez, décidez avec les datas.",
    longDescription: "",
    lessons: [],
    isPremium: false,
  },
  {
    id: "t8",
    title: "Optimisation de la Productivité",
    imageUrl: "https://picsum.photos/seed/productivity1/800/450",
    category: "Productivité",
    language: "Français",
    price: 0,
    durationMinutes: 60,
    numberOfVideos: 5,
    instructor: {
      id: "instr3",
      name: "Julien Roy",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
      bio: "",
    },
    shortDescription: "Doublez votre efficacité en 30 jours.",
    longDescription: "",
    lessons: [],
    isPremium: false,
  },
  {
    id: "t9",
    title: "Figma pour Designers UI/UX",
    imageUrl: "https://picsum.photos/seed/figma1/800/450",
    category: "Développement Web",
    language: "Anglais",
    price: 0,
    durationMinutes: 140,
    numberOfVideos: 12,
    instructor: {
      id: "instr2",
      name: "Jane Martin",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
      bio: "",
    },
    shortDescription: "Concevez des interfaces modernes et cohérentes.",
    longDescription: "",
    lessons: [],
    isPremium: false,
  },
];
const ALL_CATEGORIES = [
  "IA & Prompt",
  "Marketing",
  "Développement Web",
  "Création Vidéo",
  "E-commerce",
  "Analyse",
  "Productivité"
];
const ALL_LANGUAGES = ["Français", "Anglais"];
const ITEMS_PER_PAGE = 8;

const onboardingSlides: SlideData[] = [
  {
    title: "Formations Gold Edition",
    description: "Accédez à des parcours d'apprentissage immersifs, pensés pour la nouvelle ère de l'IA et du digital.",
    icon: ({ className }) => (
      <svg className={className} width="42" height="42" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" fill="#FFD900"/>
        <path d="M12 7v5l3 2" stroke="#FFF4C9" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Filtres et Navigation Premium",
    description: "Trouvez vos formations avec les filtres avancés et un design premium VisionOS Gold.",
    icon: ({ className }) => (
      <svg className={className} width="36" height="36" viewBox="0 0 24 24">
        <rect x="5" y="4" width="14" height="16" rx="2" fill="#FFDB7A" stroke="#C89C36" strokeWidth="2"/>
      </svg>
    ),
  },
];

export default function FormationsPage() {
  // Hook Zustand pour onboarding persistant et premium
  const { hasSeenTour, setHasSeenTour, subscription } = useAppStore();
  const isPremiumUser = subscription === "Premium" || subscription === "Pro";
  const [filters, setFilters] = useState({ category: "", language: "", price: "all", duration: "all" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Onboarding géré par Zustand : n'affiche PAS le modal si premium ou déjà vu
  const [showOnboarding, setShowOnboarding] = useState(
    !(hasSeenTour.formations) && !isPremiumUser
  );

  useEffect(() => {
    if (hasSeenTour.formations || isPremiumUser) setShowOnboarding(false);
    else setShowOnboarding(true);
  }, [hasSeenTour, isPremiumUser]);

  const handleOnboardingFinish = () => {
    setHasSeenTour("formations", true); // Persiste la fermeture
    setShowOnboarding(false);
  };

  const toggleFilters = () => setIsMobileFiltersOpen(!isMobileFiltersOpen);

  // Filtres (basique)
  const filteredTrainings = useMemo(() => {
    let list = [...ALL_TRAININGS];
    if (filters.category) {
      list = list.filter((t) => t.category === filters.category);
    }
    if (filters.language) {
      list = list.filter((t) => t.language === filters.language);
    }
    if (searchTerm) {
      list = list.filter(
        (t) => t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               t.instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return list;
  }, [filters, searchTerm]);

  const totalPages = Math.ceil(filteredTrainings.length / ITEMS_PER_PAGE);
  const currentTrainings = filteredTrainings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  useEffect(() => setCurrentPage(1), [filters, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#232420] via-neutral-900 to-[#22211d] text-white py-16 px-4 sm:px-8 lg:px-12">
      {/* -------- Onboarding Modal : jamais pour un premium, ni si déjà vu --------- */}
      {showOnboarding && (
        <OnboardingTour
          slides={onboardingSlides}
          pageTitle="la Librairie des Formations"
          pageId="formations"
          onFinish={handleOnboardingFinish}
        />
      )}

      {/* -- Contenu principal -- */}
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-yellow-100 mb-14">
          Explorez Nos Formations
        </h1>

        {/* Ici, tes filtres/search/pagination... */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <aside
            className={`
              lg:col-span-1
              ${isMobileFiltersOpen ? "block fixed top-24 left-4 right-4 z-30" : "hidden"}
              lg:block
              transition-all duration-500
            `}
          >
            <div className="rounded-3xl bg-white/10 dark:bg-neutral-900/25 border border-white/20 dark:border-white/10 backdrop-blur-2xl shadow-[0_4px_45px_rgba(255,215,120,0.19)] px-2 py-5">
              <TrainingFilters
                filters={filters}
                setFilters={setFilters}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                allCategories={ALL_CATEGORIES}
                allLanguages={ALL_LANGUAGES}
              />
            </div>
          </aside>
          {/* Trainings List */}
          <main className="lg:col-span-3">
            <p className="mb-6 text-lg text-yellow-400">
              <span className="font-bold text-[#FFE79A]">{filteredTrainings.length}</span> formation(s) disponible(s)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
              {currentTrainings.map((training) => (
                <TrainingCard key={training.id} training={training} />
              ))}
              {currentTrainings.length === 0 && (
                <p className="col-span-3 text-center text-xl text-yellow-200 py-16 bg-white/10 dark:bg-neutral-900/40 rounded-3xl border font-semibold">
                  ❌ Aucun résultat ne correspond à votre recherche.
                </p>
              )}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
