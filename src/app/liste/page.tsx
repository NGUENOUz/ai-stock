// src/components/AiToolsListPage.tsx
"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { 
    Search, ArrowUp, ExternalLink, Sparkles, 
    Crown, ChevronDown, ChevronRight, TrendingUp, 
    Clock, Filter, Info, X // Importation de l'icône de fermeture
} from 'lucide-react'; 

// --- Définition simple de cn (à remplacer par votre utils/cn si vous en avez un) ---
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');


// --- 1. Types et Données (Simulées) ---
// (Les types et données restent inchangés)

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
const AD_BASE_URL = "https://picsum.photos/1000/300?random="; 

const initialAiTools: AiTool[] = [
    { id: 1, name: "StockPredict AI", shortDesc: "Prédit les tendances boursières à court terme avec une précision de 90%", fullDesc: "Une solution complète basée sur l'apprentissage profond pour anticiper les mouvements du marché. Idéal pour les investisseurs actifs et les gestionnaires de portefeuille.", features: ["Analyse technique avancée", "Prévisions journalières et hebdomadaires", "API Intégration"], category: "Analyse", price: "Gratuit", isPremium: true, currentRank: 1, upvotes: 950, isTrending: true, isNew: false, logo: LOGO_BASE_URL + 1, bannerImage: BANNER_BASE_URL + 11, officialSiteUrl: "https://stockpredict.com" },
    { id: 2, name: "AlgoTrade Pro", shortDesc: "Exécute des stratégies de trading automatisé sans intervention humaine", fullDesc: "Créez, testez et déployez vos robots de trading en quelques clics. Plateforme de backtesting et de paper trading intégrée.", features: ["Trading 24/7", "Backtesting rapide et fiable", "Gestion du risque personnalisée"], category: "Trading", price: "29€/mois", isPremium: true, currentRank: 15, upvotes: 450, isTrending: true, isNew: true, logo: LOGO_BASE_URL + 2, bannerImage: BANNER_BASE_URL + 22, officialSiteUrl: "https://algotradepro.com" },
    { id: 3, name: "Portfolio Optimizer", shortDesc: "Optimise la diversification de votre portefeuille en fonction de votre profil de risque", fullDesc: "Utilise des algorithmes de Markowitz pour maximiser le rendement ajusté au risque. Suivez les performances en temps réel.", features: ["Rééquilibrage automatique", "Modélisation Monte Carlo", "Analyse fiscale et sectorielle"], category: "Gestion", price: "59€/mois", isPremium: true, currentRank: 2, upvotes: 890, isTrending: false, isNew: false, logo: LOGO_BASE_URL + 3, bannerImage: BANNER_BASE_URL + 33, officialSiteUrl: "https://portfolioopt.com" },
    { id: 4, name: "Data Miner", shortDesc: "Collecte et structure des données de marché alternatives et financières", fullDesc: "...", features: ["Web scraping", "API", "Visualisation"], category: "Analyse", price: "49€/mois", isPremium: false, currentRank: 7, upvotes: 700, isTrending: false, isNew: true, logo: LOGO_BASE_URL + 4, bannerImage: BANNER_BASE_URL + 44, officialSiteUrl: "https://dataminer.com" },
    { id: 5, name: "News Sentiment AI", shortDesc: "Analyse le sentiment des actualités financières en temps réel", fullDesc: "...", features: ["NLP", "Score de sentiment", "Alertes"], category: "Actualités", price: "Gratuit", isPremium: false, currentRank: 5, upvotes: 650, isTrending: true, isNew: false, logo: LOGO_BASE_URL + 5, bannerImage: BANNER_BASE_URL + 55, officialSiteUrl: "https://newssentiment.com" },
    { id: 6, name: "Risk Bot", shortDesc: "Évaluation rapide et complète du risque d'un titre", fullDesc: "...", features: ["Notation de risque", "Historique"], category: "Gestion", price: "12€/mois", isPremium: false, currentRank: 18, upvotes: 300, isTrending: false, isNew: false, logo: LOGO_BASE_URL + 6, bannerImage: BANNER_BASE_URL + 66, officialSiteUrl: "https://riskbot.com" },
    { id: 7, name: "Tax Planner", shortDesc: "Optimisation fiscale pour les investissements boursiers", fullDesc: "...", features: ["Déclaration simplifiée", "Conseils fiscaux"], category: "Gestion", price: "Gratuit", isPremium: false, currentRank: 22, upvotes: 250, isTrending: false, isNew: false, logo: LOGO_BASE_URL + 7, bannerImage: BANNER_BASE_URL + 77, officialSiteUrl: "https://taxplanner.com" },
    { id: 8, name: "Forex Watcher", shortDesc: "Surveillance et signaux de trading pour le marché des devises", fullDesc: "...", features: ["Alertes en temps réel", "Stratégies prédéfinies", "Trading social"], category: "Trading", price: "45€/mois", isPremium: true, currentRank: 35, upvotes: 180, isTrending: false, isNew: true, logo: LOGO_BASE_URL + 8, bannerImage: BANNER_BASE_URL + 88, officialSiteUrl: "https://forexwatcher.com" },
];
const categories = ["Analyse", "Trading", "Gestion", "Actualités"];


// --- 2. Composants Publicitaires et de Conversion VisionOS ---

const adBanners = [
    { id: 1, text: "Outil Sponsorisé : Accélérez vos rendements avec AlphaTrade!", link: "https://alphatrade.com", image: AD_BASE_URL + 1 },
    { id: 2, text: "Placement Premium : Testez gratuitement le nouveau Bot d'Arbitrage à haute fréquence.", link: "https://arbitragebot.com", image: AD_BASE_URL + 2 },
    { id: 3, text: "Annonce partenaire : Votre compte démo chez le courtier IA le plus performant du marché.", link: "https://courtier.com", image: AD_BASE_URL + 3 },
];

const AdCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = adBanners.length;
    
    // ⭐️ Défilement Automatique (avec useEffect)
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }, 5000); // Défilement toutes les 5 secondes (5000 ms)

        return () => clearInterval(interval);
    }, [totalSlides]);


    const currentAd = adBanners[activeIndex];

    return (
        <div 
            className="
                relative col-span-full h-36 md:h-48 rounded-3xl overflow-hidden mb-12 group
                bg-white/10 dark:bg-neutral-800/10 backdrop-blur-3xl border border-white/20 dark:border-white/10
                shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                hover:shadow-[0_25px_60px_rgba(255,210,120,0.4)]
                transition-all duration-700
            "
        >
            <a href={currentAd.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                {/* Image en fond */}
                <img 
                    src={currentAd.image} 
                    alt={currentAd.text} 
                    className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition duration-500"
                />
                
                {/* Overlay pour le Glass Effect et le texte */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h3 className="text-xl md:text-3xl font-extrabold text-white text-center drop-shadow-lg leading-snug">
                        <span className="
                            text-sm md:text-base block mb-2 px-3 py-1 rounded-full 
                            bg-yellow-500/10 text-[#FFD86A] font-medium 
                            border border-[#FFD86A]/40
                            tracking-wider
                        ">
                            Opportunité Partenaire Gold
                        </span>
                        {currentAd.text}
                    </h3>
                </div>
            </a>
            
            {/* Contrôles de défilement (manuel) */}
            <div className="absolute inset-x-0 bottom-3 flex justify-center space-x-2">
                {adBanners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all duration-300",
                            index === activeIndex ? "bg-[#FFD86A] w-5 shadow-[0_0_10px_#FFD86A]" : "bg-white/30 hover:bg-white/70"
                        )}
                        aria-label={`Aller à la slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const ConversionBanner = () => (
    <div 
        className="
            col-span-full p-8 rounded-3xl my-16 text-center
            bg-gradient-to-br from-neutral-800/80 to-neutral-900/90 
            border border-[#FFD86A]/30
            shadow-[0_10px_30px_rgba(255,215,100,0.3)]
        "
    >
        <h3 className="text-3xl font-extrabold text-[#FFD86A] flex items-center justify-center mb-3 drop-shadow-md">
            <Crown className="w-8 h-8 mr-3 fill-[#FFD86A] text-[#FFD86A]" />
            Maîtrisez l'IA Financière : Passez au Niveau Supérieur
        </h3>
        <p className="text-gray-300 mt-2 mb-6 max-w-2xl mx-auto">
            Débloquez l'accès instantané à notre **Bibliothèque Premium** : des milliers de prompts exclusifs, des stratégies de trading IA avancées et des cours pour dominer les marchés.
        </p>
        <Link href="/pricing" passHref>
            <button 
                className="
                    px-8 py-3 rounded-xl font-bold text-lg
                    bg-gradient-to-br from-[#FFF4C9] via-[#F5D98A] to-[#C89C36]
                    text-black shadow-[0_4px_20px_rgba(255,215,120,0.45)]
                    hover:shadow-[0_6px_25px_rgba(255,225,150,0.7)]
                    transition-all duration-500 transform hover:scale-[1.03]
                "
            >
                <Sparkles className="w-5 h-5 inline mr-2 -mt-0.5" />
                Découvrir les Plans Premium
            </button>
        </Link>
    </div>
);


// --- 3. Composant pour les Menus Déroulants (VisionOS Style) ---

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

// NOTE : Ce composant est utilisé pour le desktop ET dans le nouveau composant MobileFilterSheet
const DropdownMenu = ({ label, options, selected, onSelect, icon: Icon }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const selectedOption = options.find(opt => opt.key === selected) || { label: 'Toutes' };

    return (
        // ⭐️ Retrait de z-10 ici (le z-index est géré par la sheet)
        <div className="relative flex-shrink-0 w-full md:w-auto">
            <button
                // ... (inchangé)
                onClick={() => setIsOpen(!isOpen)}
                className="
                    flex items-center justify-between h-[55px] px-5 py-2 rounded-xl font-semibold w-full
                    bg-white/10 dark:bg-neutral-900/20 backdrop-blur-md
                    border border-white/20 dark:border-white/10
                    text-gray-200 hover:bg-white/20
                    transition-all duration-300
                    hover:shadow-[0_0_15px_rgba(255,215,120,0.2)]
                "
                aria-expanded={isOpen}
            >
                <div className="flex items-center">
                    <Icon className="w-5 h-5 mr-3 text-[#FFD86A]" />
                    {label} : <span className="font-extrabold ml-2 text-white">{selectedOption.label}</span>
                </div>
                <ChevronDown className={`w-4 h-4 ml-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {/* ⭐️ MODIFICATION ICI : Remplacement de 'absolute top-full' par un bloc statique 
            Utilisation d'une simple transition de hauteur pour l'effet "déroulant" */}
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-out",
                    isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                )}
            >
                {isOpen && ( // Rendu conditionnel pour optimiser et s'assurer que le contenu est là quand la hauteur est > 0
                    <div 
                        className="
                            w-full 
                            bg-neutral-900/95 border border-[#FFD86A]/30 rounded-xl shadow-2xl
                            backdrop-blur-xl
                            py-1
                        "
                    >
                        {options.map((option) => (
                            <button
                                key={option.key}
                                onClick={() => { onSelect(option.key); setIsOpen(false); }}
                                className={cn(
                                    'block w-full text-left px-5 py-3 text-sm transition rounded-xl',
                                    selected === option.key 
                                        ? 'bg-[#FFD86A]/20 text-[#FFD86A] font-bold' 
                                        : 'text-gray-300 hover:bg-neutral-800/70',
                                    'first:rounded-t-xl last:rounded-b-xl'
                                )}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- NOUVEAU : Composant pour l'affichage des filtres sur Mobile ---
interface MobileFilterSheetProps {
    isOpen: boolean;
    onClose: () => void;
    filterState: { category: string; sort: string; };
    setFilterState: React.Dispatch<React.SetStateAction<{ category: string; sort: string; }>>;
    categoryOptions: DropdownOption[];
    sortOptions: DropdownOption[];
}

const MobileFilterSheet: React.FC<MobileFilterSheetProps> = ({ 
    isOpen, 
    onClose, 
    filterState, 
    setFilterState,
    categoryOptions,
    sortOptions
}) => {
    
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose} // Ferme si on clique en dehors
        >
            <div 
                className="
                    absolute bottom-0 left-0 right-0 p-6 rounded-t-3xl shadow-2xl
                    bg-neutral-900/95 border border-white/20
                    transform transition-transform duration-300 ease-out
                    
                    // Animation pour simuler un panneau qui monte du bas
                    animate-in slide-in-from-bottom-full
                "
                onClick={(e) => e.stopPropagation()} // Empêche la fermeture quand on clique dans le panneau
            >
                <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                    <h3 className="text-xl font-bold text-white flex items-center">
                        <Filter className="w-5 h-5 mr-2 text-[#FFD86A]" /> 
                        Options de Filtrage
                    </h3>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-neutral-800/50 transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    <DropdownMenu
                        label="Catégorie"
                        options={categoryOptions}
                        selected={filterState.category}
                        onSelect={(key) => { 
                            setFilterState(prev => ({ ...prev, category: key as string })); 
                            onClose(); // Fermer le panneau après sélection pour une meilleure UX mobile
                        }}
                        icon={Filter}
                    />
                    <DropdownMenu
                        label="Trier par"
                        options={sortOptions}
                        selected={filterState.sort}
                        onSelect={(key) => {
                            setFilterState(prev => ({ ...prev, sort: key as 'rank' | 'trending' | 'new' }));
                            onClose(); // Fermer le panneau après sélection
                        }}
                        icon={Crown}
                    />
                </div>
            </div>
        </div>
    );
};


// --- 4. Composant Carte d'Outil IA (ToolCard) - VisionOS Style ---

const ToolCard = ({ tool, onUpvote, isTop5 }: { tool: AiTool, onUpvote: (id: number) => void, isTop5: boolean }) => {
    
    const cardClass = cn(
        `
            relative group rounded-3xl overflow-hidden flex flex-col cursor-pointer
            backdrop-blur-3xl bg-white/10 dark:bg-neutral-900/25
            border border-white/20 dark:border-white/10
            shadow-[0_15px_40px_rgba(0,0,0,0.1)]
            transition-all duration-700 ease-out
            hover:-translate-y-2 hover:scale-[1.01]
        `,
        isTop5 
            ? "ring-2 ring-[#FFD86A]/70 shadow-[0_20px_60px_rgba(255,210,120,0.1)]" 
            : "hover:shadow-[0_20px_50px_rgba(255,210,120,0.2)]"
    );

    const premiumBadgeClass = `
        absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold 
        flex items-center gap-1 backdrop-blur-xl z-10
        bg-gradient-to-br from-[#FFF4C9] via-[#F8D97F] to-[#C79A34]
        text-black shadow-[0_0_15px_rgba(255,215,130,0.5)]
    `;

    const priceDisplay = tool.isPremium ? "Premium" : tool.price === "Gratuit" ? "Gratuit" : `${tool.price}`;
    const priceColorClass = tool.isPremium
        ? "text-[#FFD86A] font-extrabold drop-shadow-[0_0_6px_rgba(255,215,100,0.6)]"
        : tool.price === "Gratuit"
        ? "text-green-400 font-semibold"
        : "text-gray-300 font-semibold";


    return (
        <div className={cardClass}>
            <Link href={`/liste/${tool.id}`} passHref className="flex flex-col flex-grow">
                {/* ⭐️ SHINE EFFECT */}
                <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
                    <div
                        className="
                            absolute top-0 left-[-120%] w-[80%] h-full 
                            bg-gradient-to-r 
                            from-transparent 
                            via-[rgba(255,240,180,0.2)] 
                            to-transparent
                            skew-x-[-20deg]
                            group-hover:left-[120%]
                            transition-all duration-[1600ms] ease-out
                        "
                    ></div>
                </div>

                {/* En-tête (Image Bannière & Logo) */}
                <div className="relative h-40 w-full overflow-hidden">
                    {/* Image Bannière */}
                    <img 
                        src={tool.bannerImage} 
                        alt={`Bannière de ${tool.name}`} 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[1100ms] group-hover:scale-[1.05]"
                    />
                    
                    {/* Conteneur Logo/Nom & Rang */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-transparent flex flex-col justify-end p-4">
                        <div className="flex items-center mb-1">
                             {/* Logo */}
                             <img 
                                src={tool.logo} 
                                alt={`Logo de ${tool.name}`} 
                                width={48} 
                                height={48} 
                                className="rounded-xl mr-3 border-2 border-[#FFD86A]/50 shadow-xl w-12 h-12 object-cover"
                            />
                            <h3 className="text-xl font-bold text-white transition-colors duration-500 group-hover:text-[#FFE79A] drop-shadow-md">
                                {tool.name}
                            </h3>
                        </div>
                        {isTop5 && (
                            <div className="absolute top-4 left-4 p-2 bg-[#FFD86A] text-black text-sm font-bold rounded-xl flex items-center shadow-lg">
                                <Crown className="w-4 h-4 mr-1 fill-yellow-900" /> RANG {tool.currentRank}
                            </div>
                        )}
                        {tool.isPremium && (
                            <div className={premiumBadgeClass}>
                                <Crown className="w-4 h-4 text-yellow-800" />
                                PREMIUM
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{tool.shortDesc}</p>
                    
                    {/* Caractéristiques */}
                    <ul className="text-xs text-gray-300 space-y-1 mb-5">
                        {tool.features.slice(0, 2).map((feat, index) => (
                            <li key={index} className="flex items-center text-sm">
                                <Sparkles className="w-4 h-4 mr-2 text-[#FFD86A] opacity-80" />{feat}
                            </li>
                        ))}
                    </ul>
                    
                    {/* Footer d'Action */}
                    <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center gap-3">
                        
                        {/* Prix/Statut */}
                        <span className={cn("text-base", priceColorClass)}>{priceDisplay}</span>

                        {/* Bouton Voir Détails (lien interne) */}
                        <button className="text-sm bg-neutral-700/50 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition duration-300 font-medium flex items-center justify-center border border-white/20">
                            Détails <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                </div>
            </Link>
            
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
    
    // NOUVEAU: État pour la fenêtre de filtre mobile
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 8;
    const TOP_TOOLS_COUNT = 5;

    // Gestion du Vote (Upvote) - Ajouté pour la fonctionnalité complète
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
    

    // Logique de Filtrage et Tri (inchangée)
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
        { key: 'rank', label: 'Classement Global', icon: Crown },
        { key: 'trending', label: 'Tendances Actuelles', icon: TrendingUp },
        { key: 'new', label: 'Nouveautés', icon: Clock }
    ];


    // --- Rendu Principal ---

    return (
        <div 
            className="
                min-h-screen p-4 sm:p-8 lg:p-12
                // Correction du fond sombre pour un meilleur effet Gold
                bg-neutral-950 text-white
                bg-[radial-gradient(circle_at_top,rgba(12, 12, 12, 0.89),transparent_55%)]
            "
        >
            <div className="max-w-7xl mx-auto"> 

               
                
                {/* Carrousel Publicitaire Sponsorisé */}
                <AdCarousel />

                {/* ⭐️ MODIFICATION ICI : Barre de Recherche et Filtres */}
                <div className="flex gap-4 mb-12 items-start w-full">
                    
                    {/* Champ de Recherche (Taille réduite sur mobile) */}
                    <div 
                        className="
                            relative flex-grow rounded-xl overflow-hidden
                            bg-white/10 dark:bg-neutral-900/20 backdrop-blur-md
                            border border-white/20 dark:border-white/10
                            focus-within:shadow-[0_0_15px_rgba(255,215,120,0.4)]
                            transition-all duration-500
                            // ⭐️ Mobile: Taille légèrement réduite
                            h-[50px] md:h-[55px]
                        "
                    >
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FFD86A]" />
                        <input
                            type="text"
                            placeholder="Rechercher une plateforme..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            // ⭐️ Mobile: Padding réduit pour correspondre à la nouvelle hauteur
                            className="w-full bg-transparent h-full py-3 pl-12 pr-4 text-white placeholder-gray-500 outline-none"
                        />
                    </div>
                    
                    {/* Filtres Dropdown (Desktop) */}
                    <div className="hidden md:flex flex-row gap-4 flex-shrink-0">
                        <DropdownMenu
                            label="Catégorie"
                            options={categoryOptions}
                            selected={filterState.category}
                            onSelect={(key) => setFilterState(prev => ({ ...prev, category: key as string }))}
                            icon={Filter}
                        />
                        <DropdownMenu
                            label="Trier par"
                            options={sortOptions}
                            selected={filterState.sort}
                            onSelect={(key) => setFilterState(prev => ({ ...prev, sort: key as 'rank' | 'trending' | 'new' }))}
                            icon={Crown}
                        />
                    </div>

                    {/* ⭐️ Icône de Filtre (Mobile) */}
                    <button
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="
                            flex md:hidden items-center justify-center w-[50px] h-[50px] rounded-xl font-semibold flex-shrink-0
                            bg-white/10 dark:bg-neutral-900/20 backdrop-blur-md
                            border border-white/20 dark:border-white/10
                            text-[#FFD86A] hover:bg-white/20
                            transition-all duration-300
                            hover:shadow-[0_0_15px_rgba(255,215,120,0.2)]
                        "
                        aria-label="Ouvrir les options de filtre"
                    >
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
                
                {/* --- TOP 5 (Mise en Avant) --- */}
                <h2 className="
                    text-3xl font-extrabold mb-8 pb-3 border-b border-[#FFD86A]/40
                    flex items-center text-[#FFD86A] tracking-wide
                    drop-shadow-[0_0_8px_rgba(255,215,120,0.3)]
                ">
                    <Crown className="w-7 h-7 mr-3 fill-[#FFD86A]" /> 
                    Le Top 5 du Mois
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16">
                    {topTools.slice(0, 5).map(tool => ( 
                        <ToolCard key={tool.id} tool={tool} onUpvote={handleUpvote} isTop5={true} />
                    ))}
                </div>

                {/* Message si les filtres masquent le Top 5 */}
                {topTools.length === 0 && (
                    <div className="
                        text-center p-6 rounded-xl my-6 mx-auto max-w-lg
                        bg-neutral-800/60 border border-yellow-500/30
                    ">
                        <Info className="w-6 h-6 inline-block text-yellow-500 mr-2" />
                        <p className="inline-block text-gray-300">
                            Ajustez vos filtres : aucun outil ne correspond aux critères dans cette sélection premium.
                        </p>
                    </div>
                )}

                {/* --- Reste des Outils (Paginé) --- */}
                <h2 className="text-3xl font-bold mb-8 pb-3 border-b border-white/20 mt-16 text-gray-200">
                    Catalogue Complet des Solutions IA ({paginatedTools.length})
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {currentTools.map(tool => (
                        <ToolCard key={tool.id} tool={tool} onUpvote={handleUpvote} isTop5={false} />
                    ))}
                </div>

                {/* Pagination (inchangée) */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center space-x-4">
                         <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="
                                p-3 rounded-full 
                                bg-white/10 text-white hover:bg-white/20
                                disabled:bg-neutral-900 disabled:text-gray-600 
                                transition duration-300 border border-white/20 disabled:border-white/10
                                hover:shadow-[0_0_10px_rgba(255,215,120,0.2)]
                            "
                            aria-label="Page précédente"
                        >
                            <ChevronRight className="w-5 h-5 transform rotate-180" />
                        </button>
                        <span className="text-lg font-medium text-gray-300">
                            <span className="text-[#FFD86A] font-bold">{currentPage}</span> sur <span className="text-[#FFD86A] font-bold">{totalPages}</span>
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="
                                p-3 rounded-full 
                                bg-white/10 text-white hover:bg-white/20 
                                disabled:bg-neutral-900 disabled:text-gray-600 
                                transition duration-300 border border-white/20 disabled:border-white/10
                                hover:shadow-[0_0_10px_rgba(255,215,120,0.2)]
                            "
                            aria-label="Page suivante"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
                
                {/* Bannière de Conversion (Lead Magnet) */}
                <ConversionBanner />
            </div>

            {/* ⭐️ Affichage du panneau de filtre mobile */}
            <MobileFilterSheet 
                isOpen={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
                filterState={filterState}
                setFilterState={setFilterState}
                categoryOptions={categoryOptions}
                sortOptions={sortOptions}
            />
        </div>
    );
};

export default AiToolsListPage;