// src/app/liste/page.tsx
"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { 
    IconSearch, IconArrowUp, IconExternalLink, IconSparkles, 
    IconCrown, IconChevronDown, IconChevronRight, IconTrendingUp, 
    IconClock, IconFilter, IconInfoCircle 
} from '@tabler/icons-react'; 
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// --- 1. Types et Données (Simulées avec URLs réelles) ---

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
    logo: string; // URL d'une image de logo
    bannerImage: string; // URL d'une image de bannière (interface de l'outil)
    officialSiteUrl: string; 
}

const LOGO_BASE_URL = "https://picsum.photos/40/40?random="; // Exemple de logo placeholder
const BANNER_BASE_URL = "https://picsum.photos/800/400?random="; // Exemple de bannière placeholder
const AD_BASE_URL = "https://picsum.photos/1000/300?random="; // Exemple d'image publicitaire

const initialAiTools: AiTool[] = [
    { id: 1, name: "StockPredict AI", shortDesc: "Prédit les tendances boursières à court terme avec une précision de 90%", fullDesc: "Une solution complète basée sur l'apprentissage profond pour anticiper les mouvements du marché. Idéal pour les investisseurs actifs et les gestionnaires de portefeuille.", features: ["Analyse technique avancée", "Prévisions journalières et hebdomadaires", "API Intégration"], category: "Analyse", price: "Gratuit", isPremium: false, currentRank: 1, upvotes: 950, isTrending: true, isNew: false, logo: LOGO_BASE_URL + 1, bannerImage: BANNER_BASE_URL + 11, officialSiteUrl: "https://stockpredict.com" },
    { id: 2, name: "AlgoTrade Pro", shortDesc: "Exécute des stratégies de trading automatisé sans intervention humaine", fullDesc: "Créez, testez et déployez vos robots de trading en quelques clics. Plateforme de backtesting et de paper trading intégrée.", features: ["Trading 24/7", "Backtesting rapide et fiable", "Gestion du risque personnalisée"], category: "Trading", price: "29€/mois", isPremium: true, currentRank: 15, upvotes: 450, isTrending: true, isNew: true, logo: LOGO_BASE_URL + 2, bannerImage: BANNER_BASE_URL + 22, officialSiteUrl: "https://algotradepro.com" },
    { id: 3, name: "Portfolio Optimizer", shortDesc: "Optimise la diversification de votre portefeuille en fonction de votre profil de risque", fullDesc: "Utilise des algorithmes de Markowitz pour maximiser le rendement ajusté au risque. Suivez les performances en temps réel.", features: ["Rééquilibrage automatique", "Modélisation Monte Carlo", "Analyse fiscale et sectorielle"], category: "Gestion", price: "59€/mois", isPremium: true, currentRank: 2, upvotes: 890, isTrending: false, isNew: false, logo: LOGO_BASE_URL + 3, bannerImage: BANNER_BASE_URL + 33, officialSiteUrl: "https://portfolioopt.com" },
    { id: 4, name: "Data Miner", shortDesc: "Collecte et structure des données de marché alternatives et financières", fullDesc: "...", features: ["Web scraping", "API", "Visualisation"], category: "Analyse", price: "49€/mois", isPremium: false, currentRank: 7, upvotes: 700, isTrending: false, isNew: true, logo: LOGO_BASE_URL + 4, bannerImage: BANNER_BASE_URL + 44, officialSiteUrl: "https://dataminer.com" },
    { id: 5, name: "News Sentiment AI", shortDesc: "Analyse le sentiment des actualités financières en temps réel", fullDesc: "...", features: ["NLP", "Score de sentiment", "Alertes"], category: "Actualités", price: "Gratuit", isPremium: false, currentRank: 5, upvotes: 650, isTrending: true, isNew: false, logo: LOGO_BASE_URL + 5, bannerImage: BANNER_BASE_URL + 55, officialSiteUrl: "https://newssentiment.com" },
    { id: 6, name: "Risk Bot", shortDesc: "Évaluation rapide et complète du risque d'un titre", fullDesc: "...", features: ["Notation de risque", "Historique"], category: "Gestion", price: "12€/mois", isPremium: false, currentRank: 18, upvotes: 300, isTrending: false, isNew: false, logo: LOGO_BASE_URL + 6, bannerImage: BANNER_BASE_URL + 66, officialSiteUrl: "https://riskbot.com" },
    { id: 7, name: "Tax Planner", shortDesc: "Optimisation fiscale pour les investissements boursiers", fullDesc: "...", features: ["Déclaration simplifiée", "Conseils fiscaux"], category: "Gestion", price: "Gratuit", isPremium: false, currentRank: 22, upvotes: 250, isTrending: false, isNew: false, logo: LOGO_BASE_URL + 7, bannerImage: BANNER_BASE_URL + 77, officialSiteUrl: "https://taxplanner.com" },
    // Outils supplémentaires pour la pagination
    { id: 8, name: "Forex Watcher", shortDesc: "Surveillance et signaux de trading pour le marché des devises", fullDesc: "...", features: ["Alertes en temps réel", "Stratégies prédéfinies", "Trading social"], category: "Trading", price: "45€/mois", isPremium: true, currentRank: 35, upvotes: 180, isTrending: false, isNew: true, logo: LOGO_BASE_URL + 8, bannerImage: BANNER_BASE_URL + 88, officialSiteUrl: "https://forexwatcher.com" },
];
const categories = ["Analyse", "Trading", "Gestion", "Actualités"];

// --- 2. Composants Publicitaires et de Conversion ---

const adBanners = [
    { id: 1, text: "Outil Sponsorisé : Boostez vos gains avec AlphaTrade!", link: "https://alphatrade.com", image: AD_BASE_URL + 1 },
    { id: 2, text: "Placement Premium : Testez gratuitement le nouveau Bot d'Arbitrage!", link: "https://arbitragebot.com", image: AD_BASE_URL + 2 },
    { id: 3, text: "Annonce partenaire : Découvrez la plateforme de courtage IA la plus performante.", link: "https://courtier.com", image: AD_BASE_URL + 3 },
];

const AdCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = adBanners.length;

    const nextSlide = () => setActiveIndex((activeIndex + 1) % totalSlides);
    const prevSlide = () => setActiveIndex((activeIndex - 1 + totalSlides) % totalSlides);

    const currentAd = adBanners[activeIndex];

    return (
        <div className="relative col-span-full h-32 md:h-40 bg-neutral-800 rounded-xl overflow-hidden mb-10 shadow-lg group">
            <a href={currentAd.link} target="_blank" rel="noopener noreferrer">
                <Image 
                    src={currentAd.image} 
                    alt={currentAd.text} 
                    fill 
                    style={{ objectFit: "cover" }}
                    className="opacity-40 hover:opacity-50 transition duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h3 className="text-xl md:text-2xl font-extrabold text-white text-center drop-shadow-lg">
                        <span className="text-yellow-400 text-sm block mb-1">Espace Publicitaire Sponsorisé</span>
                        {currentAd.text}
                    </h3>
                </div>
            </a>
            
            {/* Contrôles de défilement (manuel) */}
            <button 
                onClick={(e) => { e.preventDefault(); prevSlide(); }} 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition opacity-0 group-hover:opacity-100 z-10"
                aria-label="Annonce précédente"
            >
                <IconChevronRight className="w-5 h-5 transform rotate-180" />
            </button>
            <button 
                onClick={(e) => { e.preventDefault(); nextSlide(); }} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition opacity-0 group-hover:opacity-100 z-10"
                aria-label="Annonce suivante"
            >
                <IconChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

const ConversionBanner = () => (
    <div className="col-span-full bg-indigo-900/40 p-6 rounded-xl border border-indigo-400/50 my-10 text-center">
        <h3 className="text-2xl font-bold text-white flex items-center justify-center">
            <IconSparkles className="w-6 h-6 mr-2 text-yellow-500" />
            Débloquez les Formations et les Prompts Exclusifs !
        </h3>
        <p className="text-gray-300 mt-2 mb-4">Passez à Premium pour accéder à des milliers de prompts exclusifs et à des cours pour maîtriser l'IA en finance.</p>
        <Link href="/pricing" passHref>
            <button className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition duration-200">
                Voir les Plans Premium
            </button>
        </Link>
    </div>
);


// --- 3. Composant pour les Menus Déroulants (Avec Typage) ---

interface DropdownOption {
    key: string;
    label: string;
    icon?: React.ElementType;
}

interface DropdownMenuProps {
    label: string;
    options: DropdownOption[];
    selected: string;
    onSelect: (key: string) => void;
    icon: React.ElementType;
}

const DropdownMenu = ({ label, options, selected, onSelect, icon: Icon }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const selectedOption = options.find(opt => opt.key === selected) || { label: 'Toutes' };

    return (
        <div className="relative flex-shrink-0 z-10"> {/* z-10 pour s'assurer que le dropdown est au-dessus */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center h-[50px] px-4 py-2 rounded-lg font-semibold bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700 transition"
            >
                <Icon className="w-5 h-5 mr-2 text-yellow-500" />
                {label} : <span className="font-bold ml-1 text-yellow-400">{selectedOption.label}</span>
                <IconChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl z-20">
                    {options.map((option) => (
                        <button
                            key={option.key}
                            onClick={() => { onSelect(option.key); setIsOpen(false); }}
                            className={cn(
                                'block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 transition',
                                selected === option.key ? 'bg-yellow-500 text-black font-bold' : 'text-gray-300'
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};


// --- 4. Composant Carte d'Outil IA (ToolCard) ---

const ToolCard = ({ tool, onUpvote, isTop5 }: { tool: AiTool, onUpvote: (id: number) => void, isTop5: boolean }) => {
    
    const cardClass = cn(
        "bg-neutral-800 rounded-lg shadow-xl overflow-hidden transition duration-300 flex flex-col",
        isTop5 ? "ring-4 ring-yellow-500/50 shadow-yellow-500/20" : "hover:shadow-lg hover:shadow-neutral-700/50"
    );

    return (
        <div className={cardClass}>
            {/* En-tête (Image Bannière & Logo) */}
            <div className="relative h-32 w-full">
                {/* Utilisation de Image avec fill et un style pour le placeholder */}
                <Image 
                    src={tool.bannerImage} 
                    alt={`Bannière de ${tool.name}`} 
                    fill 
                    style={{ objectFit: "cover" }} 
                    className="opacity-70"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-neutral-900/70 p-2 rounded-lg border border-yellow-500/50 flex items-center">
                    <Image src={tool.logo} alt={`Logo de ${tool.name}`} width={32} height={32} />
                    <span className="text-lg font-bold ml-2">{tool.name}</span>
                </div>
                {isTop5 && (
                    <div className="absolute bottom-0 right-0 p-2 bg-yellow-500 text-black text-sm font-bold rounded-tl-lg flex items-center">
                        <IconCrown className="w-4 h-4 mr-1" /> TOP {tool.currentRank}
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div>
                    <p className="text-sm text-gray-400 mb-3">{tool.shortDesc}...</p>
                    <ul className="text-xs text-gray-300 space-y-1 mb-4">
                        {tool.features.slice(0, 2).map((feat, index) => (
                            <li key={index} className="flex items-center">
                                <span className="text-yellow-500 mr-2">•</span>{feat}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="mt-auto pt-3 border-t border-neutral-700 flex justify-between items-center gap-2">
                    
                    {/* Bouton Voir Détails (lien interne) */}
                    <Link href={`/liste/${tool.id}`} passHref>
                        <button className="text-sm bg-neutral-700 text-white px-3 py-1.5 rounded-lg hover:bg-yellow-500 hover:text-black transition duration-200 font-medium flex-grow flex items-center justify-center">
                            Détails <IconChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </Link>

                    {/* Bouton CTA (Visiter) */}
                    <a 
                        href={tool.officialSiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-500 transition duration-200 font-medium flex items-center flex-shrink-0"
                        aria-label="Visiter le site officiel"
                    >
                        <IconExternalLink className="w-4 h-4" />
                    </a>

                    {/* Bouton de Vote (Upvote) */}
                    <button
                        onClick={() => onUpvote(tool.id)}
                        className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-500 transition duration-200 font-medium flex items-center flex-shrink-0"
                        aria-label={`Voter pour ${tool.name}`}
                    >
                        <IconArrowUp className="w-4 h-4 mr-1" />
                        {tool.upvotes}
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- 5. Composant Principal de la Page ---

const AiToolsListPage = () => {
    const [toolsData, setToolsData] = useState(initialAiTools);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterState, setFilterState] = useState({
        category: 'Toutes',
        sort: 'rank',
    });
    
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 8;
    const TOP_TOOLS_COUNT = 5;

    // Gestion du Vote (Upvote)
    const handleUpvote = useCallback((toolId: number) => {
        setToolsData(prevTools => {
            const newTools = prevTools.map(tool => 
                tool.id === toolId 
                ? { ...tool, upvotes: tool.upvotes + 1 } 
                : tool
            );
            // Reclassement simple basé sur les votes et mise à jour du rank
            newTools.sort((a, b) => b.upvotes - a.upvotes);
            newTools.forEach((tool, index) => tool.currentRank = index + 1);
            return newTools;
        });
    }, []);
    

    // Logique de Filtrage et Tri
    const filteredAndSortedTools = useMemo(() => {
        let tools = toolsData.filter(tool => {
            const categoryMatch = filterState.category === 'Toutes' || tool.category === filterState.category;
            const searchMatch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                tool.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
            return categoryMatch && searchMatch;
        });

        // Tri
        if (filterState.sort === 'rank') {
            tools.sort((a, b) => a.currentRank - b.currentRank);
        } else if (filterState.sort === 'trending') {
            tools.sort((a, b) => (b.isTrending ? -1 : 1) || a.currentRank - b.currentRank); 
        } else if (filterState.sort === 'new') {
            tools.sort((a, b) => (b.isNew ? -1 : 1) || a.currentRank - b.currentRank); 
        }

        return tools;
    }, [searchTerm, filterState, toolsData]);


    // Séparation Top 5 et Reste pour la Pagination
    const topTools = filteredAndSortedTools.slice(0, TOP_TOOLS_COUNT);
    const paginatedTools = filteredAndSortedTools.slice(TOP_TOOLS_COUNT);

    const totalPages = Math.ceil(paginatedTools.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentTools = paginatedTools.slice(startIndex, startIndex + ITEMS_PER_PAGE);


    // Options pour les menus déroulants
    const categoryOptions = [{ key: 'Toutes', label: 'Toutes' }].concat(categories.map(c => ({ key: c, label: c })));
    const sortOptions = [
        { key: 'rank', label: 'Top Classement', icon: IconCrown },
        { key: 'trending', label: 'En Vogue', icon: IconTrendingUp },
        { key: 'new', label: 'Nouveautés', icon: IconClock }
    ];


    // --- Rendu Principal ---

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-4 sm:p-8 lg:p-12">
            <header className="mb-10">
                <h1 className="text-5xl font-extrabold mb-3">Annuaire des Outils IA</h1>
                <p className="text-xl text-gray-400">
                    Votez pour vos favoris et trouvez le TOP IA pour l'investissement.
                </p>
            </header>

            {/* Carrousel Publicitaire Sponsorisé */}
            <AdCarousel />

            {/* Barre de Recherche et Filtres Déployés */}
            <div className="flex flex-col md:flex-row gap-4 mb-10 items-start">
                {/* Champ de Recherche */}
                <div className="relative flex-grow w-full md:w-auto">
                    <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher un outil..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                </div>

                {/* Filtre Catégorie */}
                <DropdownMenu
                    label="Catégorie"
                    options={categoryOptions}
                    selected={filterState.category}
                    onSelect={(key) => setFilterState(prev => ({ ...prev, category: key as string }))}
                    icon={IconFilter}
                />

                {/* Filtre Tri / Classement */}
                <DropdownMenu
                    label="Classement"
                    options={sortOptions}
                    selected={filterState.sort}
                    onSelect={(key) => setFilterState(prev => ({ ...prev, sort: key as 'rank' | 'trending' | 'new' }))}
                    icon={IconCrown}
                />
            </div>
            
            {/* --- TOP 5 (Mise en Avant) --- */}
            <h2 className="text-3xl font-bold mb-6 border-b border-neutral-700 pb-2 flex items-center text-yellow-500">
                <IconCrown className="w-6 h-6 mr-2" /> 
                TOP 5 de la semaine
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {topTools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} onUpvote={handleUpvote} isTop5={true} />
                ))}
            </div>

            {/* Message si les filtres masquent le Top 5 */}
            {topTools.length === 0 && (
                <div className="text-center bg-neutral-800 p-4 rounded-lg my-6">
                    <IconInfoCircle className="w-6 h-6 inline-block text-yellow-500 mr-2" />
                    <p className="inline-block text-gray-300">Aucun outil ne correspond aux filtres appliqués dans cette section.</p>
                </div>
            )}

            {/* --- Reste des Outils (Paginé) --- */}
            <h2 className="text-3xl font-bold mb-6 border-b border-neutral-700 pb-2 mt-12">
                Explorer tous les outils ({paginatedTools.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentTools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} onUpvote={handleUpvote} isTop5={false} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-10 flex justify-center items-center space-x-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 disabled:bg-neutral-900 disabled:text-gray-600 transition"
                    >
                        <IconChevronRight className="w-5 h-5 transform rotate-180" />
                    </button>
                    <span className="text-lg font-medium">
                        Page {currentPage} sur {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 disabled:bg-neutral-900 disabled:text-gray-600 transition"
                    >
                        <IconChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
            
            {/* Bannière de Conversion (Lead Magnet) */}
            <ConversionBanner />
        </div>
    );
};

export default AiToolsListPage;