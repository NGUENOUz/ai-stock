// src/app/formations/page.tsx (Mise à Jour)

"use client";
import React, { useState, useMemo, useEffect } from "react";
import { TrainingCard } from "../../components/trainingCard";
import { Pagination } from "../../components/pagination";
import { useAppStore } from "@/store/useAppStore";

// ⭐️ Import du nouveau composant
import { TrainingFilterSection, TrainingFilterState } from "../../components/TrainingFilterSection";
import { Crown, DollarSign } from "lucide-react";
import { DropdownOption } from "@/components/DropdownMenu";

// --- Données des Formations (Inchangées) ---
const ALL_TRAININGS = [
    // ... (Vos données de formation)
    { id: "t1", title: "Maîtriser le Prompt Engineering — Niveau Expert", imageUrl: "https://picsum.photos/seed/t1/600/400", category: "IA & Prompt", language: "Français", price: 0, durationMinutes: 180, numberOfVideos: 15, instructor: { id: "instr1", name: "Alex Dupont", avatarUrl: "https://i.pravatar.cc/150?img=1", bio: "", }, shortDescription: "Devenez autonome dans la conception de prompts puissants et efficaces.", longDescription: "", lessons: [], isPremium: false },
    { id: "t2", title: "SEO 2025 — Secrets de RankBrain", imageUrl: "https://picsum.photos/seed/t2/600/400", category: "Marketing", language: "Français", price: 0, durationMinutes: 120, numberOfVideos: 10, instructor: { id: "instr1", name: "Alex Dupont", avatarUrl: "https://i.pravatar.cc/150?img=1", bio: "", }, shortDescription: "Comprenez les nouveaux signaux de Google pour dominer les SERP.", longDescription: "", lessons: [], isPremium: false },
    { id: "t5", title: "Photographie Aérienne — Drone Pro", imageUrl: "https://picsum.photos/seed/t5/600/400", category: "Création Vidéo", language: "Français", price: 49, durationMinutes: 240, numberOfVideos: 18, instructor: { id: "instr2", name: "Jane Martin", avatarUrl: "https://i.pravatar.cc/150?img=2", bio: "", }, shortDescription: "Maîtrisez le pilotage et la post-production aérienne.", longDescription: "", lessons: [], isPremium: true },
    // ... (Ajouter le reste de ALL_TRAININGS)
    { id: "t9", title: "Figma pour Designers UI/UX", imageUrl: "https://picsum.photos/seed/t9/600/400", category: "Développement Web", language: "Anglais", price: 0, durationMinutes: 140, numberOfVideos: 12, instructor: { id: "instr2", name: "Jane Martin", avatarUrl: "https://i.pravatar.cc/150?img=2", bio: "", }, shortDescription: "Concevez des interfaces modernes et cohérentes.", longDescription: "", lessons: [], isPremium: false },
];

const ALL_CATEGORIES = [
  "IA & Prompt", "Marketing", "Développement Web", "Création Vidéo", "E-commerce", "Analyse", "Productivité"
];
const ALL_LANGUAGES = ["Français", "Anglais"];
const PRICE_OPTIONS = [
    { key: 'all', label: 'Toutes', icon: DollarSign },
    { key: 'free', label: 'Gratuit', icon: DollarSign },
    { key: 'premium', label: 'Premium', icon: Crown },
];
const ITEMS_PER_PAGE = 8;

// Convertir les listes simples en format DropdownOption
const CATEGORY_OPTIONS: DropdownOption[] = [{ key: 'all', label: 'Toutes' }, ...ALL_CATEGORIES.map(c => ({ key: c, label: c }))];
const LANGUAGE_OPTIONS: DropdownOption[] = [{ key: 'all', label: 'Toutes' }, ...ALL_LANGUAGES.map(l => ({ key: l, label: l }))];


export default function FormationsPage() {
    // Correction Zustand: Sélection des propriétés séparément
    const subscription = useAppStore(state => state.subscription);
    const isPremiumUser = subscription === "Premium" || subscription === "Pro";
    
    // ⭐️ Utilisation du nouveau type d'état de filtre
    const [filterState, setFilterState] = useState<TrainingFilterState>({
        category: 'all', 
        language: 'all', 
        price: 'all',
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // --- Logique de Filtrage ---
    const filteredTrainings = useMemo(() => {
        let list = ALL_TRAININGS;
        
        if (filterState.category !== 'all') {
            list = list.filter((t) => t.category === filterState.category);
        }
        if (filterState.language !== 'all') {
            list = list.filter((t) => t.language === filterState.language);
        }
        
        if (filterState.price === 'free') {
             list = list.filter(t => !t.isPremium);
        } else if (filterState.price === 'premium') {
             list = list.filter(t => t.isPremium);
        }
        
        // Filtrage par Recherche (Titre/Instructeur)
        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            list = list.filter(
                (t) => t.title.toLowerCase().includes(lowerCaseSearch) ||
                       t.instructor.name.toLowerCase().includes(lowerCaseSearch)
            );
        }
        
        return list;
    }, [filterState, searchTerm]);

    const totalPages = Math.ceil(filteredTrainings.length / ITEMS_PER_PAGE);
    const currentTrainings = filteredTrainings.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    useEffect(() => setCurrentPage(1), [filterState, searchTerm]);

    return (
        <div className="min-h-screen bg-neutral-950 text-white py-16 px-4 sm:px-8 lg:px-12">
            <div className="container mx-auto px-6 max-w-7xl">
                
                {/* Section Titre/Copywriting */}
                <header className="text-center mb-16 max-w-4xl mx-auto pt-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4 
                        bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300">
                        Votre Bibliothèque de Maîtrise Digitale
                    </h1>
                    <p className="text-xl text-neutral-400 font-light max-w-3xl mx-auto">
                        Accédez à des formations exclusives, conçues par des experts.
                    </p>
                </header>

                {/* ⭐️ INTÉGRATION DU NOUVEAU COMPOSANT DE FILTRE */}
                <TrainingFilterSection
                    titlePlaceholder="Rechercher une formation, un instructeur..."
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterState={filterState}
                    setFilterState={setFilterState}
                    categoryOptions={CATEGORY_OPTIONS}
                    languageOptions={LANGUAGE_OPTIONS}
                    priceOptions={PRICE_OPTIONS}
                />
                
                {/* Trainings List */}
                <main>
                    <p className="mb-6 text-lg text-neutral-400">
                        Résultats: <span className="font-bold text-yellow-300">{filteredTrainings.length}</span> formation(s) disponible(s)
                        {/* {isPremiumUser && <span className="ml-4 text-green-400 font-medium">| Statut: Abonnement Premium</span>} */}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                        {currentTrainings.map((training) => (
                            <TrainingCard key={training.id} training={training} />
                        ))}
                        {currentTrainings.length === 0 && (
                            <p className="col-span-full text-center text-xl text-yellow-200 py-16 bg-neutral-800/80 border border-neutral-700 rounded-3xl font-semibold">
                                ❌ Aucun résultat ne correspond à votre recherche.
                            </p>
                        )}
                    </div>
                    
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}