// src/app/formations/page.tsx

"use client";
import React, { useState, useMemo, useEffect } from "react";
import { TrainingCard } from "../../components/trainingCard";
import { Pagination } from "../../components/pagination";
import { useAppStore } from "@/store/useAppStore";
import { TrainingFilterSection, TrainingFilterState } from "../../components/TrainingFilterSection";
import { Crown, DollarSign, BookOpen, GraduationCap } from "lucide-react";
import { DropdownOption } from "@/components/DropdownMenu";
import { apiClient } from "@/lib/api-client";
import { Training } from "@/types/training";

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

const CATEGORY_OPTIONS: DropdownOption[] = [{ key: 'all', label: 'Toutes' }, ...ALL_CATEGORIES.map(c => ({ key: c, label: c }))];
const LANGUAGE_OPTIONS: DropdownOption[] = [{ key: 'all', label: 'Toutes' }, ...ALL_LANGUAGES.map(l => ({ key: l, label: l }))];

export default function FormationsPage() {
    const subscription = useAppStore(state => state.subscription);
    const isPremiumUser = subscription === "Premium" || subscription === "Pro";
    
    const [filterState, setFilterState] = useState<TrainingFilterState>({
        category: 'all', 
        language: 'all', 
        price: 'all',
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Charger les formations depuis l'API
    useEffect(() => {
        const fetchTrainings = async () => {
            setIsLoading(true);
            try {
                const result = await apiClient.getTrainings({
                    search: searchTerm || undefined,
                    category: filterState.category !== 'all' ? filterState.category : undefined,
                    language: filterState.language !== 'all' ? filterState.language : undefined,
                    price: filterState.price !== 'all' ? filterState.price : undefined,
                    page: currentPage,
                    limit: ITEMS_PER_PAGE,
                });

                setTrainings(result.data);
                setTotalPages(result.pagination.totalPages);
                setTotalCount(result.pagination.total);
            } catch (error) {
                console.error('Erreur lors du chargement des formations:', error);
                setTrainings([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrainings();
    }, [filterState, searchTerm, currentPage]);

    // Réinitialiser la page lors du changement de filtres
    useEffect(() => {
        setCurrentPage(1);
    }, [filterState, searchTerm]);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
           

            {/* Main Content */}
            <section className="py-16">
                <div className="container mx-auto px-6 max-w-7xl">
                    {/* Filtres */}
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
                    
                    {/* Résultats */}
                    <div className="mb-8">
                        <p className="text-sm text-neutral-600">
                            <span className="font-bold text-black">{totalCount}</span> formation(s) trouvée(s)
                        </p>
                    </div>
                    
                    {/* Loading */}
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <>
                            {/* Grid */}
                            {trainings.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                                    {trainings.map((training) => (
                                        <TrainingCard key={training.id} training={training} />
                                    ))}
                                </div>
                            ) : (
                                <div className="framer-card p-12 text-center">
                                    <BookOpen className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-black mb-2">Aucun résultat</h3>
                                    <p className="text-neutral-600">Essayez de modifier vos filtres ou votre recherche.</p>
                                </div>
                            )}
                            
                            {/* Pagination */}
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
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}