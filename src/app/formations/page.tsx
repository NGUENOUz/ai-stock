// src/app/formations/page.tsx
"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Training, Instructor, Lesson } from "@/types/training";
import { TrainingCard } from "../../components/trainingCard";
import { TrainingFilters } from "../../components/trainingFilter";
import { Pagination } from "../../components/pagination";
import OnboardingTour, { SlideData } from "../../components/OnboardingTour";
import { Search, Filter, X } from "lucide-react";

// ------------- DEMO DATA -----------------
const DUMMY_INSTRUCTOR: Instructor = {
  id: "instr1",
  name: "Alex Dupont",
  avatarUrl: "https://i.pravatar.cc/150?img=1",
  bio: "",
};
const getImageUrl = (seed: number) => `https://picsum.photos/seed/${seed}/800/450`;
const LESSONS_PROMPT: Lesson[] = [
  { id: "l1", title: "Introduction au Prompt Engineering", duration: "05:30", isFreePreview: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0" },
  { id: "l2", title: "Comprendre l’Audience & le Cadre", duration: "12:00", isFreePreview: false, videoUrl: "#" },
  { id: "l3", title: "5 Techniques Avancées de Structuration", duration: "20:15", isFreePreview: false, videoUrl: "#" },
  { id: "l4", title: "Atelier : Créer 10 Prompts Précis", duration: "45:00", isFreePreview: false, videoUrl: "#" },
];
const LESSONS_SEO: Lesson[] = [
  { id: "l5", title: "Analyse Sémantique — Module 1", duration: "15:00", isFreePreview: true, videoUrl: "#" },
  { id: "l6", title: "Optimisation On-Page 2025", duration: "18:30", isFreePreview: false, videoUrl: "#" },
];
const ALL_TRAININGS: Training[] = [
  { id: "t1", title: "Maîtriser le Prompt Engineering — Niveau Expert", imageUrl: getImageUrl(10), category: "IA & Prompt", language: "Français", price: 0, durationMinutes: 180, numberOfVideos: 15, instructor: DUMMY_INSTRUCTOR, shortDescription: "Devenez autonome dans la conception de prompts puissants et efficaces.", longDescription: "", lessons: LESSONS_PROMPT, isPremium: false },
  { id: "t2", title: "SEO 2025 — Secrets de RankBrain", imageUrl: getImageUrl(20), category: "Marketing", language: "Français", price: 0, durationMinutes: 120, numberOfVideos: 10, instructor: DUMMY_INSTRUCTOR, shortDescription: "Comprenez les nouveaux signaux de Google pour dominer les SERP.", longDescription: "", lessons: LESSONS_SEO, isPremium: false },
  { id: "t3", title: "Next.js + Tailwind — Web Moderne", imageUrl: getImageUrl(30), category: "Développement Web", language: "Anglais", price: 0, durationMinutes: 300, numberOfVideos: 25, instructor: DUMMY_INSTRUCTOR, shortDescription: "Construisez des applications rapides et scalables.", longDescription: "", lessons: LESSONS_PROMPT, isPremium: false },
  { id: "t4", title: "Stratégie de Contenu avec ChatGPT", imageUrl: getImageUrl(40), category: "IA & Prompt", language: "Français", price: 0, durationMinutes: 90, numberOfVideos: 8, instructor: DUMMY_INSTRUCTOR, shortDescription: "Faites de l’IA votre coéquipier créatif.", longDescription: "", lessons: LESSONS_SEO, isPremium: false },
  { id: "t5", title: "Photographie Aérienne — Drone Pro", imageUrl: getImageUrl(50), category: "Création Vidéo", language: "Français", price: 0, durationMinutes: 240, numberOfVideos: 18, instructor: DUMMY_INSTRUCTOR, shortDescription: "Maîtrisez le pilotage et la post-production aérienne.", longDescription: "", lessons: LESSONS_PROMPT, isPremium: true },
  { id: "t6", title: "Créer un Business E-commerce Rentable", imageUrl: getImageUrl(60), category: "E-commerce", language: "Français", price: 0, durationMinutes: 360, numberOfVideos: 30, instructor: DUMMY_INSTRUCTOR, shortDescription: "Lancez, automatisez et scalez avec méthode.", longDescription: "", lessons: LESSONS_SEO, isPremium: false },
  { id: "t7", title: "Fundamentaux de l’Analyse de Données", imageUrl: getImageUrl(70), category: "Analyse", language: "Anglais", price: 0, durationMinutes: 100, numberOfVideos: 9, instructor: DUMMY_INSTRUCTOR, shortDescription: "Analysez, interprétez, décidez.", longDescription: "", lessons: LESSONS_PROMPT, isPremium: false },
  { id: "t8", title: "Optimisation de la Productivité", imageUrl: getImageUrl(80), category: "Productivité", language: "Français", price: 0, durationMinutes: 60, numberOfVideos: 5, instructor: DUMMY_INSTRUCTOR, shortDescription: "Doublez votre efficacité en 30 jours.", longDescription: "", lessons: LESSONS_SEO, isPremium: false },
  { id: "t9", title: "Figma pour Designers UI/UX", imageUrl: getImageUrl(90), category: "Développement Web", language: "Anglais", price: 0, durationMinutes: 140, numberOfVideos: 12, instructor: DUMMY_INSTRUCTOR, shortDescription: "Concevez des interfaces modernes et cohérentes.", longDescription: "", lessons: LESSONS_SEO, isPremium: false },
];

// --------- Onboarding Slides ----------
const onboardingSlides: SlideData[] = [
  {
    title: "Formations Gold Edition",
    description:
      "Accédez à des parcours d'apprentissage immersifs, pensés pour la nouvelle ère de l'IA et du digital. Filtres premium, expériences visuelles riches, contenus actualisés – tout l'univers Gold VisionOS pour booster vos compétences.",
    icon: ({ className }: { className: string }) => (
      <svg className={className} width="42" height="42" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#FFD900"/><path d="M12 7v5l3 2" stroke="#FFF4C9" strokeWidth="2" strokeLinecap="round" /></svg>
    ),
  },
  {
    title: "Naviguez, filtrez… sur-mesure",
    description:
      "Trouvez rapidement vos prochaines formations grâce aux filtres dorés, la recherche instantanée, et une interface intuitive. Naviguez en toute fluidité, côté desktop comme mobile.",
    icon: ({ className }: { className: string }) => (
      <svg className={className} width="42" height="42" viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="16" rx="2" fill="#FFDB7A" stroke="#C89C36" strokeWidth="2"/></svg>
    ),
  },
  {
    title: "Premium & Badge Or",
    description:
      "Distinguez les contenus premium Gold d’un simple coup d’œil grâce au badge Or, un effet glass, et des avantages réservés aux membres.",
    icon: ({ className }: { className: string }) => (
      <svg className={className} width="37" height="37" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 13.97L18.18 20.02L12 16.77L5.82 20.02L7 13.97L2 9.27L8.91 8.26L12 2Z" fill="#F8D98A"/></svg>
    ),
  },
];

// --------- UTILS -----------
const getAllUniqueOptions = (trainings: Training[], key: keyof Training) =>
  Array.from(new Set(trainings.map((t) => t[key] as string)));
const ALL_CATEGORIES = getAllUniqueOptions(ALL_TRAININGS, "category");
const ALL_LANGUAGES = getAllUniqueOptions(ALL_TRAININGS, "language");
const ITEMS_PER_PAGE = 8;

// --------- Mobile Filter ---------
const MobileFilterHeader = ({
  searchTerm,
  setSearchTerm,
  isFiltersOpen,
  toggleFilters,
}: any) => (
  <div className="lg:hidden p-4 bg-white/15 dark:bg-neutral-900/20 border border-white/20 dark:border-white/10 backdrop-blur-xl shadow-[0_4px_25px_rgba(255,215,120,0.19)] rounded-2xl mb-6 sticky top-4 z-20">
    <div className="flex items-center gap-4">
      <div className="flex-grow relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400" />
        <input
          type="text"
          placeholder="Rechercher une formation…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 dark:bg-neutral-800/20 border border-white/20 dark:border-white/10 text-gray-900 dark:text-yellow-100 placeholder-yellow-200 outline-none focus:ring-2 focus:ring-yellow-400/70"
        />
      </div>
      <button
        onClick={toggleFilters}
        className="p-3 bg-gradient-to-br from-[#FFF4C9] via-[#F5D98A] to-[#C89C36] text-black rounded-full shadow-lg hover:scale-105 transition-transform border border-white/20"
      >
        {isFiltersOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
      </button>
    </div>
  </div>
);

// --------- Main Page -------------
export default function FormationsPage() {
  const [filters, setFilters] = useState({
    category: "",
    language: "",
    price: "all",
    duration: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true); // Affichage du tour au chargement

  // Fermer onboarding lors d'une action (idéalement tracker ici le statut pour chaque utilisateur)
  const handleOnboardingFinish = () => setShowOnboarding(false);

  const toggleFilters = () => setIsMobileFiltersOpen(!isMobileFiltersOpen);

  // --------------- FILTRAGE ---------------
  const filteredTrainings = useMemo(() => {
    let list = ALL_TRAININGS;
    if (searchTerm) {
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    list = list.filter((t) => {
      const matchCategory = !filters.category || t.category === filters.category;
      const matchLanguage = !filters.language || t.language === filters.language;
      let matchDuration = true;
      if (filters.duration !== "all") {
        const [min, max] = filters.duration.split("-").map(Number);
        matchDuration = max
          ? t.durationMinutes >= min && t.durationMinutes <= max
          : t.durationMinutes >= min;
      }
      let matchPrice = true;
      if (filters.price !== "all") {
        if (filters.price === "premium") matchPrice = t.isPremium === true;
        else if (filters.price === "0") matchPrice = t.price === 0 && !t.isPremium;
        else {
          const [min, max] = filters.price.split("-").map(Number);
          matchPrice = max ? t.price >= min && t.price <= max : t.price >= min;
        }
      }
      return matchCategory && matchLanguage && matchPrice && matchDuration;
    });
    return list;
  }, [filters, searchTerm]);

  // -------- PAGINATION --------
  const totalPages = Math.ceil(filteredTrainings.length / ITEMS_PER_PAGE);
  const currentTrainings = filteredTrainings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );
  useEffect(() => setCurrentPage(1), [filters, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#232420] via-neutral-900 to-[#22211d] text-white py-16 px-4 sm:px-8 lg:px-12">
      {/* -------- Onboarding Modal --------- */}
      {showOnboarding && (
        <OnboardingTour
          slides={onboardingSlides}
          pageTitle="la Librairie des Formations"
          pageId="formations"
        />
      )}

      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-yellow-100 mb-14 tracking-tight drop-shadow-[0_0_24px_rgba(255,215,120,0.15)]">
          Explorez Nos Formations
        </h1>
        <MobileFilterHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isFiltersOpen={isMobileFiltersOpen}
          toggleFilters={toggleFilters}
        />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar Filters Premium Glass */}
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
                <p className="col-span-3 text-center text-xl text-yellow-200 py-16 bg-white/10 dark:bg-neutral-900/40 backdrop-blur-xl rounded-3xl border border-yellow-100/20 font-semibold shadow-[0_0_40px_rgba(255,215,120,0.11)]">
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
