// src/components/PromptListPage.tsx

"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { 
    Crown, TrendingUp, Clock, Filter, Sparkles, ChevronRight, 
    Copy, Heart, Share2, Lock, Info, Zap // Icônes
} from 'lucide-react';
import { FilterSection } from '@/components/FilterSection'; 
import { DropdownOption } from '@/components/DropdownMenu'; 
import { cn, copyToClipboard, sharePrompt } from '@/lib/utils'; // Fonctions d'aide
import { useAppStore } from '@/store/useAppStore'; // ⭐️ Import du store Zustand
import Link from 'next/link';

// --- Types et Données Simulés (Ajout du texte complet du prompt) ---

interface Prompt {
    id: number;
    title: string;
    category: string;
    style: string; 
    shortDesc: string;
    // ⭐️ Ajout du prompt complet
    fullPromptText: string;
    upvotes: number;
    isTrending: boolean;
    isNew: boolean;
    imageId: number; 
}

// Les catégories bloquées pour les utilisateurs non abonnés
const BLOCKED_CATEGORIES = ["Trading/Code", "Analyse Financière"];
const FREE_ACCESS_CATEGORY = "Generation d'Image";
const MAX_FREE_COPIES = 3;

// ⭐️ Simuler le texte complet (tronqué pour l'affichage, complet pour la copie)
const initialPrompts: Prompt[] = [
    { id: 1, title: "Photorealistic HDR Image", category: FREE_ACCESS_CATEGORY, style: "Shooting", shortDesc: "Génère des images hyper-réalistes, qualité cinéma, avec éclairage HDR.", fullPromptText: "Un portrait d'un explorateur de l'espace, hyper-réaliste, RAW photo, éclairage HDR studio, détails d'ambiance 8K, profondeur de champ, par Greg Rutkowski et Alphonse Mucha. (Le prompt complet, beaucoup plus long)", upvotes: 1200, isTrending: true, isNew: false, imageId: 101 },
    { id: 2, title: "Fantasy Concept Art", category: FREE_ACCESS_CATEGORY, style: "Art", shortDesc: "Prompt pour des illustrations de mondes fantastiques épiques et détaillées.", fullPromptText: "Un château flottant dans un ciel orageux, style peinture à l'huile médiévale, détails très fins, atmosphère dramatique, large plan, Unreal Engine. (Le prompt complet, beaucoup plus long)", upvotes: 850, isTrending: false, isNew: false, imageId: 102 },
    { id: 3, title: "Trading Strategy Script", category: BLOCKED_CATEGORIES[0], style: "Développement", shortDesc: "Crée un script Python pour une stratégie de 'scalping' basée sur RSI.", fullPromptText: "# Python script pour Trading View, Strategy: Scalping based on RSI crossover. Conditions: Entry on RSI < 30 and exit on take-profit or stop-loss. (Le prompt complet, beaucoup plus long)", upvotes: 950, isTrending: true, isNew: true, imageId: 103 },
    { id: 4, title: "Modern E-commerce Product Shot", category: FREE_ACCESS_CATEGORY, style: "Shooting", shortDesc: "Optimisé pour des photos de produits sur fond minimaliste et éclairage doux.", fullPromptText: "Photo de produit, bouteille de parfum de luxe, arrière-plan minimaliste blanc éclatant, éclairage doux, photo de studio de haute qualité, rendu 3D. (Le prompt complet, beaucoup plus long)", upvotes: 600, isTrending: false, isNew: false, imageId: 104 },
    { id: 5, title: "Market Analysis Summary", category: BLOCKED_CATEGORIES[1], style: "Rapport", shortDesc: "Génère un résumé complet du marché en 5 points à partir de données brutes.", fullPromptText: "Générer un résumé des 5 principaux facteurs affectant le marché NASDAQ aujourd'hui, avec analyse des volumes et des mouvements de prix majeurs. Format : Liste à puces. (Le prompt complet, beaucoup plus long)", upvotes: 1500, isTrending: true, isNew: false, imageId: 105 },
    { id: 6, title: "Steampunk Character Design", category: FREE_ACCESS_CATEGORY, style: "Art", shortDesc: "Crée des portraits détaillés de personnages Steampunk avec accessoires complexes.", fullPromptText: "Portrait d'une jeune femme Steampunk, lunettes d'aviateur, veste en cuir brun, engrenages visibles dans le décor, éclairage cinématographique, hyper-détaillé. (Le prompt complet, beaucoup plus long)", upvotes: 720, isTrending: true, isNew: true, imageId: 106 },
    { id: 7, title: "Long-Term Investment Thesis", category: BLOCKED_CATEGORIES[1], style: "Rapport", shortDesc: "Prompt pour générer une thèse d'investissement détaillée sur 5 ans.", fullPromptText: "Rédiger une thèse d'investissement détaillée sur la société X pour les 5 prochaines années, en couvrant la concurrence, la croissance potentielle et les risques. (Le prompt complet, beaucoup plus long)", upvotes: 400, isTrending: false, isNew: false, imageId: 107 },
];

const mainCategories = [FREE_ACCESS_CATEGORY].concat(BLOCKED_CATEGORIES);

// --- Composant Carte de Prompt (PromptCard) ---

interface PromptCardProps {
    prompt: Prompt;
    isLoggedIn: boolean; // ⭐️ Ajout de l'état de connexion
    isSubscribed: boolean;
    copiedCount: number;
    maxCopies: number;
    onCopy: (category: string, fullPrompt: string, title: string) => void; // Mise à jour de onCopy
    onLike: (promptId: number) => void; // Nouvelle prop pour liker
    isPromptLiked: boolean; // État de like du prompt
    currentUpvotes: number; // Compteur d'upvotes actuel
}

const PromptCard: React.FC<PromptCardProps> = ({ 
    prompt, 
    isLoggedIn, 
    isSubscribed, 
    copiedCount, 
    maxCopies, 
    onCopy, 
    onLike, 
    isPromptLiked,
    currentUpvotes
}) => {
    
    const isFreeCategory = prompt.category === FREE_ACCESS_CATEGORY;
    const isQuotaReached = copiedCount >= maxCopies;
    const isCategoryBlocked = !isFreeCategory && !isSubscribed;

    // Détermine si le bouton Copier doit être bloqué
    // ⭐️ Vérifie si l'utilisateur est connecté, sinon c'est bloqué
    const isCopyBlocked = !isLoggedIn || (!isSubscribed && (isQuotaReached || isCategoryBlocked));
    
    // Classes pour l'effet de blocage visuel
    const blockClasses = isCopyBlocked 
        ? "pointer-events-none opacity-50 blur-[2px] grayscale-[50%]" 
        : "group-hover:opacity-100 opacity-100";
        
    const copyHandler = () => {
        if (!isCopyBlocked && isLoggedIn) {
            onCopy(prompt.category, prompt.fullPromptText, prompt.title);
        } else if (!isLoggedIn) {
            alert("Veuillez vous connecter pour copier un prompt.");
        }
    };
    
    const shareHandler = () => {
        sharePrompt(prompt.title, `${window.location.origin}/prompts/${prompt.id}`);
    };


    return (
        <div 
            className={cn(
                "relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg transition-all duration-300 overflow-hidden",
                "hover:border-[#FFD86A]/50 hover:shadow-[0_0_20px_rgba(255,215,120,0.2)] group"
            )}
        >
            {/* ⭐️ Image / Aperçu (Simulé) */}
            <div className="relative h-36 w-full overflow-hidden">
                 <img 
                    src={`https://picsum.photos/400/200?random=${prompt.imageId}`} 
                    alt={`Aperçu de ${prompt.title}`} 
                    className={cn(
                        "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                        blockClasses
                    )}
                />
                
                {/* ⭐️ Overlay de Blocage (Cadenas et CTA) */}
                {isCopyBlocked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10 p-4">
                        <Lock className="w-8 h-8 text-[#FFD86A] mb-3" />
                        <p className="text-center font-bold text-white mb-3">
                            {!isLoggedIn 
                                ? "Veuillez vous connecter pour copier"
                                : isQuotaReached 
                                ? "Limite quotidienne atteinte" 
                                : `Accès limité à la catégorie ${FREE_ACCESS_CATEGORY}.`
                            }
                        </p>
                        {isLoggedIn && (
                            <Link href="/pricing" passHref>
                                <button className="
                                    px-4 py-2 text-sm font-semibold rounded-lg 
                                    bg-[#FFD86A] text-black hover:bg-[#FFE79A] transition
                                ">
                                    Mettre à jour mon plan
                                </button>
                            </Link>
                        )}
                    </div>
                )}

                {/* Badges de Catégorie sur l'image */}
                 <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <span className="bg-[#FFD86A]/80 text-black px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm">
                        {prompt.category}
                    </span>
                    {prompt.isTrending && (
                        <span className="bg-red-500/80 text-white px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm flex items-center">
                            <Zap className="w-3 h-3 mr-1" /> TENDANCE
                        </span>
                    )}
                </div>
            </div>


            {/* Contenu et Actions */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className={cn("text-lg font-bold text-white leading-tight pr-8 line-clamp-2", blockClasses)}>
                        {prompt.title}
                    </h3>
                    {/* ⭐️ Utilisation de currentUpvotes */}
                    <div className="text-xs text-gray-400 flex items-center bg-white/10 px-2 py-1 rounded-full flex-shrink-0">
                        <Sparkles className="w-3 h-3 mr-1 text-red-400" /> {currentUpvotes}
                    </div>
                </div>
                
                <p className={cn("text-sm text-gray-400 mb-4 line-clamp-2", blockClasses)}>{prompt.shortDesc}</p>

                {/* ⭐️ Actions (Liker, Copier, Partager) */}
                <div className="flex justify-between items-center text-sm mt-3 pt-3 border-t border-white/5">
                    <div className="flex space-x-3">
                        {/* Liker (Met à jour le upvote) */}
                        <button 
                            onClick={() => onLike(prompt.id)} // ⭐️ Appel de la fonction onLike
                            className="flex items-center text-gray-400 hover:text-red-500 transition disabled:opacity-50"
                            disabled={!isLoggedIn} // Seuls les utilisateurs connectés peuvent liker
                            aria-label="Liker ce prompt"
                        >
                            <Heart className={cn(
                                "w-5 h-5 transition-colors", 
                                isPromptLiked ? "fill-red-500 text-red-500" : ""
                            )} />
                        </button>

                        {/* Partager (Utilise Web Share API) */}
                         <button 
                            onClick={shareHandler} // ⭐️ Appel de la fonction shareHandler
                            className="flex items-center text-gray-400 hover:text-white transition disabled:opacity-50"
                            aria-label="Partager ce prompt"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Copier (Bouton Principal) */}
                    <button 
                        onClick={copyHandler}
                        className={cn(
                            "flex items-center px-4 py-2 rounded-lg font-semibold transition",
                            isCopyBlocked 
                                ? "bg-neutral-700 text-gray-400 cursor-not-allowed" 
                                : "bg-[#FFD86A] text-black hover:bg-[#FFE79A]"
                        )}
                        disabled={isCopyBlocked}
                    >
                        {isCopyBlocked ? <Lock className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {isCopyBlocked ? "Bloqué" : "Copier le Prompt"}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Composant de la Barre de Progression du Quota (inchangé) ---
// ... (omission du QuotaBar car il n'a pas besoin d'être modifié)
interface QuotaBarProps {
    copiedCount: number;
    maxCopies: number;
    isSubscribed: boolean;
    freeCategory: string;
}

const QuotaBar: React.FC<QuotaBarProps> = ({ copiedCount, maxCopies, isSubscribed, freeCategory }) => {
    if (isSubscribed) return null;
    
    const percentage = Math.min(100, (copiedCount / maxCopies) * 100);
    const isReached = copiedCount >= maxCopies;

    return (
        <div className="
            p-4 mb-8 rounded-xl bg-neutral-800/70 border border-white/20 
            flex flex-col md:flex-row items-start md:items-center justify-between
        ">
            <div className="mb-3 md:mb-0">
                <p className="font-bold text-lg text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                    Quota Quotidien Gratuit
                </p>
                <p className="text-sm text-gray-400 mt-1">
                    Accès limité à la catégorie <span className="text-[#FFD86A] font-semibold">{freeCategory}</span>.
                    Vous pouvez copier {maxCopies - copiedCount} prompt(s) aujourd'hui.
                </p>
            </div>
            
            <div className="w-full md:w-64 flex flex-col items-end">
                <p className={cn(
                    "font-bold mb-1 text-sm",
                    isReached ? "text-red-400" : "text-white"
                )}>
                    {copiedCount} / {maxCopies} Copié(s)
                </p>
                <div className="w-full h-2.5 bg-neutral-700 rounded-full">
                    <div 
                        style={{ width: `${percentage}%` }}
                        className={cn(
                            "h-full rounded-full transition-all duration-500",
                            isReached ? "bg-red-500" : "bg-[#FFD86A] shadow-[0_0_10px_rgba(255,215,120,0.4)]"
                        )}
                    ></div>
                </div>
            </div>
        </div>
    );
};
// --- Fin du QuotaBar ---


// --- Composant Principal de la Page (Utilisation de Zustand) ---

const PromptListPage: React.FC = () => {
    // ⭐️ Synchronisation avec le store Zustand
   const isLoggedIn = useAppStore(state => state.isLoggedIn);
   const subscription = useAppStore(state => state.subscription);
    
    // ⭐️ Détermine l'état d'abonnement (Premium ou Pro = Abonné)
    const isSubscribed = subscription === 'Premium' || subscription === 'Pro';
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filterState, setFilterState] = useState({
        category: 'Toutes',
        sort: 'popular',
    });

    // ⭐️ État pour la gestion des Upvotes (nécessaire car les données initiales sont statiques)
    // Map: { promptId: upvoteCount }
    const [upvoteStates, setUpvoteStates] = useState<Record<number, number>>(() => 
        initialPrompts.reduce((acc, p) => ({ ...acc, [p.id]: p.upvotes }), {})
    );
    // État pour les Likes de l'utilisateur (Map: { promptId: isLiked })
    const [userLikes, setUserLikes] = useState<Record<number, boolean>>({});

    // ⭐️ État local pour le quota (Devrait être synchronisé avec le backend/store pour la persistance quotidienne)
    const [copiedCount, setCopiedCount] = useState(0); 
    
    // Simuler le clic sur Like
    const handleLike = useCallback((promptId: number) => {
        if (!isLoggedIn) {
            alert("Veuillez vous connecter pour liker un prompt.");
            return;
        }

        const isCurrentlyLiked = !!userLikes[promptId];
        
        setUserLikes(prev => ({
            ...prev,
            [promptId]: !isCurrentlyLiked
        }));
        
        // Mettre à jour les upvotes: +1 si like, -1 si unlike
        setUpvoteStates(prev => ({
            ...prev,
            [promptId]: prev[promptId] + (isCurrentlyLiked ? -1 : 1)
        }));
        
    }, [isLoggedIn, userLikes]);


    // ⭐️ Logique de Copie (Inclut la fonction de copie complète)
    const handleCopyPrompt = useCallback(async (category: string, fullPrompt: string, title: string) => {
        if (!isLoggedIn) {
             alert("Veuillez vous connecter pour copier un prompt.");
             return;
        }
        
        // Vérification des restrictions de copie (pour les non-abonnés)
        const isFreeCategory = category === FREE_ACCESS_CATEGORY;
        const isQuotaReached = copiedCount >= MAX_FREE_COPIES;
        const isCategoryBlocked = !isFreeCategory && !isSubscribed;

        if (!isSubscribed && (isQuotaReached || isCategoryBlocked)) {
             // L'interface utilisateur devrait déjà bloquer cela, mais c'est une sécurité
             return; 
        }

        // ⭐️ Copier l'intégralité du prompt
        const copySuccessful = await copyToClipboard(fullPrompt, title);

        if (copySuccessful) {
            // Incrémenter le quota uniquement si non abonné et dans la catégorie gratuite
            if (!isSubscribed && isFreeCategory) {
                setCopiedCount(prev => prev + 1);
            }
        }
        
    }, [copiedCount, isSubscribed, isLoggedIn]);

    // Options pour les menus déroulants (inchangées)
    const categoryOptions: DropdownOption[] = [{ key: 'Toutes', label: 'Toutes' }]
        .concat(mainCategories.map(c => ({ key: c, label: c })));

    const sortOptions: DropdownOption[] = [
        { key: 'popular', label: 'Les plus Populaires', icon: Crown },
        { key: 'trending', label: 'Tendances Actuelles', icon: TrendingUp },
        { key: 'new', label: 'Nouveautés', icon: Clock }
    ];

    
    const filteredAndSortedPrompts = useMemo(() => {
        // Pour le tri, on utilise les upvotes dynamiques
        const promptsWithDynamicUpvotes = initialPrompts.map(p => ({
            ...p,
            upvotes: upvoteStates[p.id] || p.upvotes
        }));

        let prompts = promptsWithDynamicUpvotes.filter(prompt => {
            const categoryMatch = filterState.category === 'Toutes' || prompt.category === filterState.category;
            const searchLower = searchTerm.toLowerCase();
            const searchMatch = prompt.title.toLowerCase().includes(searchLower) || 
                                prompt.shortDesc.toLowerCase().includes(searchLower) ||
                                prompt.style.toLowerCase().includes(searchLower);
            return categoryMatch && searchMatch;
        });

        // Tri
        if (filterState.sort === 'popular') {
            prompts.sort((a, b) => b.upvotes - a.upvotes);
        } else if (filterState.sort === 'trending') {
            prompts.sort((a, b) => (b.isTrending ? -1 : 1) || b.upvotes - a.upvotes); 
        } else if (filterState.sort === 'new') {
            prompts.sort((a, b) => (b.isNew ? -1 : 1) || b.upvotes - a.upvotes); 
        }

        return prompts;
    }, [searchTerm, filterState, upvoteStates]);


    // Rendu Principal
    return (
        <div className="min-h-screen p-4 sm:p-8 lg:p-12 bg-neutral-950 text-white">
            <div className="max-w-7xl mx-auto"> 

                <header className="text-center mb-12 pt-8 md:pt-16">
                    <h1 className="
                        text-4xl md:text-6xl font-extrabold mb-3
                        text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#FFD700]
                    ">
                        Bibliothèque de Prompts IA Premium
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        Accédez aux meilleures recettes pour des résultats époustouflants avec l'IA.
                    </p>
                    {/* ⭐️ Affichage de l'état du store */}
                    <div className="mt-4 text-sm text-gray-500">
                        Statut: {isLoggedIn ? 'Connecté' : 'Déconnecté'} | 
                        Abonnement: <span className={cn(isSubscribed ? 'text-green-400 font-bold' : 'text-yellow-500')}>{subscription}</span>
                    </div>
                    {/* NOTE: Les boutons de simulation d'abonnement/reset ont été retirés pour utiliser l'état du store. 
                        Si vous voulez simuler le changement d'abonnement, faites-le via votre composant de profil/settings.
                    */}
                </header>
                
                {/* ⭐️ Barre de Progression du Quota */}
                <QuotaBar 
                    copiedCount={copiedCount} 
                    maxCopies={MAX_FREE_COPIES} 
                    isSubscribed={isSubscribed}
                    freeCategory={FREE_ACCESS_CATEGORY}
                />

                <FilterSection
                    titlePlaceholder="Rechercher un prompt, un style..."
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterState={filterState}
                    setFilterState={setFilterState}
                    categoryOptions={categoryOptions}
                    sortOptions={sortOptions} 
                />

                <h2 className="text-3xl font-bold mb-8 pb-3 border-b border-white/20 mt-10 text-gray-200">
                    Résultats ({filteredAndSortedPrompts.length})
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAndSortedPrompts.map(prompt => (
                        <PromptCard 
                            key={prompt.id} 
                            prompt={prompt} 
                            isLoggedIn={isLoggedIn} // ⭐️ Passe l'état de connexion
                            isSubscribed={isSubscribed}
                            copiedCount={copiedCount}
                            maxCopies={MAX_FREE_COPIES}
                            onCopy={handleCopyPrompt}
                            onLike={handleLike} // ⭐️ Passe la fonction de like
                            isPromptLiked={!!userLikes[prompt.id]} // ⭐️ Passe l'état de like
                            currentUpvotes={upvoteStates[prompt.id] || prompt.upvotes} // ⭐️ Passe les upvotes dynamiques
                        />
                    ))}
                </div>

                {filteredAndSortedPrompts.length === 0 && (
                    <div className="text-center p-12 text-gray-500">
                        <Info className="w-10 h-10 mx-auto mb-4 text-[#FFD86A]" />
                        <p className="text-xl">Aucun prompt trouvé correspondant à vos critères.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromptListPage;