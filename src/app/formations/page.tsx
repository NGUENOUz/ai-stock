"use client";
import React, { useState, useMemo } from 'react';
import { Training, Instructor, Lesson } from '@/types/training'; // Assurez-vous que ce chemin est correct
import { TrainingCard } from '../../components/trainingCard'; // Ajustez le chemin si nécessaire
import { TrainingFilters } from '../../components/trainingFilter'; // Ajustez le chemin si nécessaire
import { Pagination } from '../../components/pagination'; // Ajustez le chemin si nécessaire

// Import des icônes pour le mobile
import { Search, Filter, X } from 'lucide-react'; 

// --- DONNÉES DE DÉMONSTRATION (Gardées pour la cohérence) ---

// Formateur unique pour l'exemple
const DUMMY_INSTRUCTOR: Instructor = {
    id: 'instr1',
    name: 'Alex Dupont',
    avatarUrl: 'https://i.pravatar.cc/150?img=1', // Placeholder avatar
    bio:""
};

// Fonction utilitaire pour générer des URL d'images aléatoires
const getImageUrl = (seed: number) => `https://picsum.photos/seed/${seed}/800/450`; 

// Leçons de démo pour une seule formation
const LESSONS_PROMPT: Lesson[] = [
    { id: 'l1', title: 'Introduction au Prompt Engineering', duration: '05:30', isFreePreview: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0' },
    { id: 'l2', title: 'Comprendre le Rôle et l\'Audience', duration: '12:00', isFreePreview: false, videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_2?rel=0' },
    { id: 'l3', title: 'Les 5 Techniques Avancées de Cadrage', duration: '20:15', isFreePreview: false, videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_3?rel=0' },
    { id: 'l4', title: 'Workshop: Création de 10 Prompts Ciblés', duration: '45:00', isFreePreview: false, videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_4?rel=0' },
];

// Leçons de démo pour une autre formation
const LESSONS_SEO: Lesson[] = [
    { id: 'l5', title: 'Analyse sémantique (Module 1)', duration: '15:00', isFreePreview: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0' },
    { id: 'l6', title: 'Optimisation On-Page pour Google', duration: '18:30', isFreePreview: false, videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_6?rel=0' },
];


const ALL_TRAININGS: Training[] = [
    { id: 't1', title: 'Maîtriser le Prompt Engineering (Niveau Expert)', imageUrl: getImageUrl(10), category: 'IA & Prompt', language: 'Français', price: 0, durationMinutes: 180, numberOfVideos: 15, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Apprenez les techniques de prompt les plus avancées pour des résultats IA parfaits.', longDescription: 'Description longue et détaillée de la formation Prompt Engineering...', lessons: LESSONS_PROMPT,isPremium:false },
    { id: 't2', title: 'SEO 2025: Les Secrets de Google RankBrain', imageUrl: getImageUrl(20), category: 'Marketing', language: 'Français', price: 0, durationMinutes: 120, numberOfVideos: 10, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Découvrez comment optimiser votre site pour les algorithmes de recherche modernes.', longDescription: 'Description longue et détaillée de la formation SEO...', lessons: LESSONS_SEO ,isPremium:false},
    { id: 't3', title: 'Next.js & Tailwind CSS pour Développeurs', imageUrl: getImageUrl(30), category: 'Développement Web', language: 'Anglais', price: 0, durationMinutes: 300, numberOfVideos: 25, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Construisez des applications web rapides et modernes avec le stack de développement du moment.', longDescription: 'Description longue et détaillée de la formation Next.js...', lessons: LESSONS_PROMPT,isPremium:false },
    { id: 't4', title: 'Stratégie de Contenu avec ChatGPT', imageUrl: getImageUrl(40), category: 'IA & Prompt', language: 'Français', price: 0, durationMinutes: 90, numberOfVideos: 8, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Utilisez ChatGPT comme un véritable coéquipier pour générer du contenu percutant.', longDescription: 'Description longue et détaillée de la formation ChatGPT...', lessons: LESSONS_SEO ,isPremium:false},
    { id: 't5', title: 'Photographie Aérienne par Drone', imageUrl: getImageUrl(50), category: 'Création Vidéo', language: 'Français', price: 0, durationMinutes: 240, numberOfVideos: 18, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Maîtrisez le pilotage de drone et la post-production pour des images époustouflantes.', longDescription: 'Description longue et détaillée de la formation Drone...', lessons: LESSONS_PROMPT,isPremium:true },
    { id: 't6', title: 'Création de Business E-commerce', imageUrl: getImageUrl(60), category: 'E-commerce', language: 'Français', price: 0, durationMinutes: 360, numberOfVideos: 30, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Lancez, automatisez et scalez votre propre boutique en ligne rentable.', longDescription: 'Description longue et détaillée de la formation E-commerce...', lessons: LESSONS_SEO ,isPremium:false},
    { id: 't7', title: 'Fundamentaux de l\'Analyse de Données', imageUrl: getImageUrl(70), category: 'Analyse', language: 'Anglais', price:0, durationMinutes: 100, numberOfVideos: 9, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Introduction aux outils et méthodes d\'analyse pour prendre des décisions éclairées.', longDescription: 'Description longue et détaillée de la formation Analyse de Données...', lessons: LESSONS_PROMPT,isPremium:false },
    { id: 't8', title: 'Optimisation de la Productivité', imageUrl: getImageUrl(80), category: 'Productivité', language: 'Français', price: 0, durationMinutes: 60, numberOfVideos: 5, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Des techniques éprouvées pour tripler votre efficacité quotidienne.', longDescription: 'Description longue et détaillée de la formation Productivité...', lessons: LESSONS_SEO,isPremium:false },
    // ... ajoutez d'autres formations ici pour les tests de pagination
    { id: 't9', title: 'Figma pour les Designers UI/UX', imageUrl: getImageUrl(90), category: 'Développement Web', language: 'Anglais', price: 0, durationMinutes: 140, numberOfVideos: 12, instructor: DUMMY_INSTRUCTOR, shortDescription: 'Description courte.', longDescription: 'Description longue.', lessons: LESSONS_SEO ,isPremium:false },
];
// --- FIN DES DONNÉES DE DÉMONSTRATION ---


// Fonction utilitaire pour extraire les options uniques
const getAllUniqueOptions = (trainings: Training[], key: keyof Training): string[] => {
    return Array.from(new Set(trainings.map(t => t[key] as string)));
};

const ALL_CATEGORIES = getAllUniqueOptions(ALL_TRAININGS, 'category');
const ALL_LANGUAGES = getAllUniqueOptions(ALL_TRAININGS, 'language');
const ITEMS_PER_PAGE = 8;


// --- NOUVEAU COMPOSANT : EN-TÊTE DE FILTRE MOBILE ---
interface MobileFilterHeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isFiltersOpen: boolean;
    toggleFilters: () => void;
}

const MobileFilterHeader: React.FC<MobileFilterHeaderProps> = ({ 
    searchTerm, 
    setSearchTerm, 
    isFiltersOpen, 
    toggleFilters 
}) => {
    return (
        // Rendu uniquement sur les écrans mobiles (masqué sur lg et au-dessus)
        <div className="lg:hidden p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-6 sticky top-2 z-10 mx-4 md:mx-0">
            <div className="flex items-center space-x-3">
                
                {/* Champ de Recherche */}
                <div className="flex-grow relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Rechercher une formation..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-full dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
                    />
                </div>
                
                {/* Icône/Bouton de Filtre */}
                <button 
                    onClick={toggleFilters}
                    className="p-3 bg-yellow-500 text-black rounded-full shadow-lg hover:bg-yellow-600 transition-colors flex items-center justify-center"
                    aria-label={isFiltersOpen ? "Fermer les filtres" : "Ouvrir les filtres"}
                >
                    {isFiltersOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
                </button>
            </div>
        </div>
    );
};


export default function FormationsPage() {
    const [filters, setFilters] = useState({
        category: '',
        language: '',
        price: 'all', 
        duration: 'all', 
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false); // 👈 ÉTAT DU MOBILE

    const toggleFilters = () => setIsMobileFiltersOpen(!isMobileFiltersOpen);

    const filteredTrainings = useMemo(() => {
        let list = ALL_TRAININGS;

        // 1. Recherche par terme
        if (searchTerm) {
            list = list.filter(t => 
                t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // 2. Filtrage par critères
        list = list.filter(t => {
            const matchCategory = !filters.category || t.category === filters.category;
            const matchLanguage = !filters.language || t.language === filters.language;
            
           
            // Logique de filtrage par durée
            let matchDuration = true;
            if (filters.duration !== 'all') {
                const [min, max] = filters.duration.split('-').map(Number);
                if (max) {
                    matchDuration = t.durationMinutes >= min && t.durationMinutes <= max;
                } else { // '180+'
                    matchDuration = t.durationMinutes >= min;
                }
            }let matchPrice = true;
            if (filters.price !== 'all') {
                
                if (filters.price === 'premium') {
                    // Si 'premium' est sélectionné, on vérifie la propriété isPremium du cours
                    matchPrice = t.isPremium === true; 

                } else if (filters.price === '0') {
                    // Si 'gratuit' est sélectionné, on vérifie que le prix est 0 ET que ce n'est PAS un Premium
                    // Nous supposons que les cours Premium (même si price=0) ne sont pas inclus dans le filtre 'Gratuit' simple.
                    matchPrice = t.price === 0 && t.isPremium !== true; 
                    
                } else { 
                    // Logique des tranches de prix numériques (ex: '1-99', '200+')
                    const [min, max] = filters.price.split('-').map(Number);
                    
                    if (max) {
                        matchPrice = t.price >= min && t.price <= max;
                    } else { // '200+'
                        matchPrice = t.price >= min;
                    }
                    // S'assurer que les cours Premium ne sont pas inclus dans les tranches de prix standard si t.price > 0
                    // (ceci dépend de votre logique métier, ici on les exclut implicitement)
                }
            }
            
            return matchCategory && matchLanguage && matchPrice && matchDuration;
        });

        return list;
    }, [searchTerm, filters]);

    // Gestion des changements de page
    const totalPages = Math.ceil(filteredTrainings.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentTrainings = filteredTrainings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }
    };

    // Réinitialise la pagination si les filtres ou la recherche changent
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filters]);


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                
                <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
                    Toutes nos Formations
                </h1>

                {/* 🌟 Intégration de l'en-tête de filtre mobile (s'affiche uniquement sur mobile) */}
                <MobileFilterHeader
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    isFiltersOpen={isMobileFiltersOpen}
                    toggleFilters={toggleFilters}
                />
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* Colonne des Filtres (Gérée par visibilité) */}
                    <aside className={`lg:col-span-1 ${isMobileFiltersOpen ? 'block fixed top-20 left-4 right-4 z-20' : 'hidden'} lg:block`}>
                        <TrainingFilters 
                            filters={filters}
                            setFilters={setFilters as any} 
                            searchTerm={searchTerm} // La barre de recherche est dans l'en-tête mobile, mais TrainingFilters gère les filtres
                            setSearchTerm={setSearchTerm}
                            allCategories={ALL_CATEGORIES}
                            allLanguages={ALL_LANGUAGES}
                        />
                    </aside>

                    {/* Colonne des Formations (3/4) */}
                    <main className="lg:col-span-3">
                        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
                            **{filteredTrainings.length}** formation(s) trouvée(s).
                        </p>
                        
                        {/* Grille des Cartes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {currentTrainings.map(training => (
                                <TrainingCard key={training.id} training={training} />
                            ))}
                            {currentTrainings.length === 0 && (
                                <p className="col-span-3 text-center text-xl text-gray-500 dark:text-gray-400 p-10 bg-white dark:bg-gray-800 rounded-lg">
                                    ❌ Aucune formation ne correspond à vos critères de recherche.
                                </p>
                            )}
                        </div>

                        {/* Pagination */}
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={handlePageChange} 
                        />

                    </main>
                </div>
            </div>
        </div>
    );
}