// src/app/prompt/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IconLock, IconSparkles, IconCrown, IconArrowRight, IconBellRinging,
  IconSearch, IconAdjustmentsHorizontal, IconHeart,
  IconShare2, IconCopy, IconPalette, IconLayoutGrid, IconChevronDown,
} from "@tabler/icons-react";

// --- CONFIGURATION & SIMULATION ---

// Simulation du Contexte Utilisateur (à remplacer par votre véritable store)
const useAuthStore = () => {
  const isAuthenticated = true;
  const isPremiumUser = true;
  const userName = "Alice Dupont";
  return { isAuthenticated, isPremiumUser, userName };
};

// Catégories de Prompts
const promptCategories = [
    { id: 'image', name: 'Génération d\'Images', icon: IconPalette },
    { id: 'marketing', name: 'Marketing & SEO', icon: IconSparkles },
    { id: 'finance', name: 'Analyse Financière', icon: IconLayoutGrid },
    { id: 'general', name: 'Général & Productivité', icon: IconArrowRight },
];

// Sous-Catégories/Filtres pour la Génération d'Images
const imageStyles = [
    'Tous', 'Style Artistique', 'Photographique', '3D Rendu', 'Commercial', 'Branding', 'Shooting', 'Anime'
];

// Contenu Mocké des Prompts (Hautement enrichi pour l'exemple Image)
const initialPrompts = {
  image: [
    { id: 101, title: "Portrait Cyberpunk Urbain", style: "Style Artistique", tool: "Midjourney", likes: 450, imageUrl: "https://picsum.photos/400/300?random=1", prompt: "Un portrait d'une femme cybernétique dans une ruelle de Tokyo sous la pluie, éclairage néon bleu et rose, détails extrêmes, cinematic lighting, 8k, --ar 3:4" },
    { id: 102, title: "Nature Morte pour Branding Café", style: "Commercial", tool: "DALL-E 3", likes: 210, imageUrl: "https://picsum.photos/400/300?random=2", prompt: "Nature morte de grains de café torréfiés sur une table en bois rustique, lumière douce, style photographique, focus net, pour publicité de marque." },
    { id: 103, title: "Rendu 3D d'une Chaise Moderne", style: "3D Rendu", tool: "Blender AI", likes: 180, imageUrl: "https://picsum.photos/400/300?random=3", prompt: "Rendu 3D isométrique d'une chaise de bureau ergonomique, couleur vert olive, fond blanc minimaliste, studio lighting, haute résolution." },
    { id: 104, title: "Paysage Photographique Détaillé", style: "Photographique", tool: "Stable Diffusion", likes: 500, imageUrl: "https://picsum.photos/400/300?random=4", prompt: "Un paysage montagneux épique au lever du soleil, brume légère, style Ansel Adams, haute résolution photographique." },
    { id: 105, title: "Logo Moderne Style Anime", style: "Anime", tool: "Niji Journey", likes: 120, imageUrl: "https://picsum.photos/400/300?random=5", prompt: "Illustration de style anime pour un logo d'eSport, couleurs vives, éclairage dramatique, personnage de type ninja, fond minimaliste." },
  ],
  marketing: [
    { id: 201, title: "Prompt SEO pour Article de Blog", prompt: "Rédige une structure H1/H2/H3 et les 5 points clés d'un article de blog sur 'L'impact des taux d'intérêt sur le marché Crypto'. Utilise un ton expert et optimise pour le mot-clé 'taux crypto'." },
    { id: 202, title: "Prompt pour Campagne Email Froide", prompt: "Crée un objet d'email et un corps de texte pour une campagne de prospection ciblant les CFOs de PME. L'objectif est de leur vendre notre outil 'Portfolio Optimizer'." },
  ],
  finance: [
    { id: 301, title: "Analyse Rapide du Sentiment du Marché", prompt: "Action: Analyse en temps réel. Sujets: Crypto, Tech. Ton: Neutre. Livrer un score de 1 à 10 et un résumé en 3 points." },
  ],
  general: [
    { id: 401, title: "Génération de Code Python pour Backtesting", prompt: "Écris un script Python complet utilisant la librairie Pandas pour importer un fichier CSV de données boursières et calculer la moyenne mobile simple (SMA) sur 20 jours." },
  ],
};

// --------------------------------------------------------

// --- Composants Modulaires (NotificationBell, ImagePromptCard, TextPromptCard, AccessRestricted) ---

const NotificationBell: React.FC = () => {
    const [hasNew, setHasNew] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const notifications = [
        { id: 1, message: "NOUVEAU : 5 prompts ajoutés dans la catégorie 'Analyse Financière'!", time: "il y a 2 heures" },
        { id: 2, message: "PROMO : 20% de réduction sur l'abonnement annuel. Valable jusqu'à vendredi !", time: "Hier" },
        { id: 3, message: "ÉVÉNEMENT : Rejoignez notre webinaire sur le 'Trading Algo sans code' le 15 Nov.", time: "il y a 3 jours" },
    ];

    return (
        <div className="relative">
            <button
                className="p-3 rounded-full bg-neutral-700 hover:bg-neutral-600 transition relative"
                onClick={() => { setIsOpen(!isOpen); setHasNew(false); }}
                aria-label="Notifications"
            >
                <IconBellRinging className="w-6 h-6 text-yellow-500" />
                {hasNew && (
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-neutral-800 rounded-xl shadow-2xl border border-neutral-700 z-50">
                    <div className="p-4 text-lg font-bold border-b border-neutral-700">Notifications</div>
                    <ul className="divide-y divide-neutral-700 max-h-80 overflow-y-auto">
                        {notifications.map(n => (
                            <li key={n.id} className="p-3 hover:bg-neutral-700/50 cursor-pointer">
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

interface ImagePromptCardProps {
    prompt: typeof initialPrompts.image[0];
}

const ImagePromptCard: React.FC<ImagePromptCardProps> = ({ prompt }) => {
    const isTruncated = prompt.prompt.length > 100;

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt.prompt);
        alert(`Prompt pour '${prompt.title}' copié dans le presse-papiers !`);
    };

    return (
        <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg flex flex-col h-full">
            <div className="relative h-48 w-full">
                <Image
                    src={prompt.imageUrl}
                    alt={prompt.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="transition duration-300 hover:scale-[1.03]"
                />
                <span className="absolute top-2 right-2 bg-black/60 text-xs text-white px-2 py-1 rounded-full">{prompt.tool}</span>
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                    <h3 className="text-xl font-bold mb-1 line-clamp-2">{prompt.title}</h3>
                    <div className="text-xs text-yellow-500 mb-3">{prompt.style}</div>
                    
                    <p className="text-gray-400 text-sm bg-neutral-900 p-3 rounded-lg font-mono mb-4 cursor-pointer" onClick={handleCopy}>
                        {isTruncated ? `${prompt.prompt.substring(0, 100)}...` : prompt.prompt}
                        <span className="block text-right text-xs text-yellow-500 mt-1">
                            (Clic pour copier le prompt complet)
                        </span>
                    </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-neutral-700 pt-3">
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center text-red-400 hover:text-red-500 transition">
                            <IconHeart className="w-5 h-5 mr-1 fill-current" /> {prompt.likes}
                        </button>
                        <button className="text-gray-400 hover:text-white transition">
                            <IconShare2 className="w-5 h-5" />
                        </button>
                    </div>
                    <button onClick={handleCopy} className="text-sm text-yellow-500 hover:text-yellow-400 flex items-center">
                        <IconCopy className="w-4 h-4 mr-1" /> Copier
                    </button>
                </div>
            </div>
        </div>
    );
};

interface TextPromptCardProps {
    prompt: typeof initialPrompts.marketing[0];
}

const TextPromptCard: React.FC<TextPromptCardProps> = ({ prompt }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(prompt.prompt);
        alert(`Prompt pour '${prompt.title}' copié dans le presse-papiers !`);
    };

    return (
        <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 hover:border-yellow-500/50 transition duration-200">
            <h3 className="text-2xl font-semibold mb-3 text-yellow-500">{prompt.title}</h3>
            
            <p className="text-gray-400 text-sm bg-neutral-900 p-4 rounded-lg font-mono line-clamp-4 cursor-pointer" onClick={handleCopy}>
                {prompt.prompt}
                <span className="block text-right text-xs text-yellow-500 mt-2">
                    (Clic pour copier le prompt complet)
                </span>
            </p>

            <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <button className="flex items-center text-red-400 hover:text-red-500 transition">
                        <IconHeart className="w-5 h-5 mr-1 fill-current" /> 150
                    </button>
                    <button className="text-gray-400 hover:text-white transition">
                        <IconShare2 className="w-5 h-5" />
                    </button>
                </div>
                <button onClick={handleCopy} className="text-sm bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition">
                    Copier le Prompt
                </button>
            </div>
        </div>
    );
};

interface AccessRestrictedProps {
    title: string;
    description: string;
    linkPath: string;
    linkText: string;
}

const AccessRestricted: React.FC<AccessRestrictedProps> = ({ title, description, linkPath, linkText }) => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4">
        <IconLock className="w-20 h-20 text-red-500 mb-6" />
        <h1 className="text-4xl font-extrabold mb-4 text-white">{title}</h1>
        <p className="text-xl text-gray-400 mb-8 max-w-md">{description}</p>
        
        <Link 
            href={linkPath}
            className="flex items-center bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-400 transition duration-200"
        >
            {linkText} <IconArrowRight className="w-5 h-5 ml-2" />
        </Link>
    </div>
);


// --- Composant Principal de la Page Prompts Populaires ---
const PromptsPage = () => {
    const { isAuthenticated, isPremiumUser, userName } = useAuthStore();
    const [activeCategory, setActiveCategory] = useState(promptCategories[0].id);
    const [activeImageStyle, setActiveImageStyle] = useState(imageStyles[0]);

    const filteredPrompts = activeCategory === 'image' 
        ? initialPrompts.image.filter(p => activeImageStyle === 'Tous' || p.style === activeImageStyle)
        : (initialPrompts as any)[activeCategory] || [];


    const renderContent = () => {
        if (!isAuthenticated) {
            return <AccessRestricted 
                title="Connectez-vous pour voir les Prompts"
                description="L'accès aux Prompts Populaires nécessite une authentification."
                linkPath="/login"
                linkText="Se connecter"
            />
        }

        if (isAuthenticated && !isPremiumUser) {
            return <AccessRestricted 
                title="Upgradez pour accéder aux Prompts Premium"
                description="Débloquez des prompts avancés d'analyse boursière avec l'abonnement Premium."
                linkPath="/pricing"
                linkText="Voir les Abonnements Premium"
            />
        }

        // --- Contenu Premium (Tableau de Bord) ---
        return (
            <div className="flex">
                {/* Colonne de gauche : Catégories (Sidebar) - Cachée sur mobile */}
                <aside className="w-64 min-w-[250px] mr-8 hidden lg:block h-fit sticky top-4">
                    <h3 className="text-xl font-bold text-white mb-4">Catégories</h3>
                    <nav className="space-y-2">
                        {promptCategories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setActiveCategory(cat.id);
                                    setActiveImageStyle(imageStyles[0]); // Réinitialiser le filtre d'image
                                }}
                                className={`w-full text-left flex items-center p-3 rounded-lg transition duration-200 ${
                                    activeCategory === cat.id
                                        ? 'bg-yellow-500 text-black font-bold'
                                        : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                                }`}
                            >
                                <cat.icon className="w-5 h-5 mr-3" />
                                {cat.name}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Colonne de droite : Contenu principal */}
                <main className="flex-1 w-full lg:w-auto">
                    {/* Entête Personnalisée et Notifications */}
                    <div className="flex justify-between items-center mb-10 pb-4 border-b border-neutral-700">
                        <div className="max-w-xl">
                            <h1 className="text-4xl font-extrabold text-white mb-1">
                                Bienvenue, <span className="text-yellow-500">{userName.split(' ')[0]}</span> !
                            </h1>
                            <p className="text-gray-400 text-lg">
                                Bon prompting avec les outils Premium. Votre avantage est ici.
                            </p>
                        </div>
                        <NotificationBell />
                    </div>

                    {/* NOUVEAU : Sélection des Catégories sur Mobile/Tablette */}
                    <div className="mb-6 lg:hidden">
                        <label htmlFor="category-select" className="block text-sm font-medium text-gray-300 mb-2">
                            Sélectionner la Catégorie
                        </label>
                        <div className="relative">
                            <select
                                id="category-select"
                                value={activeCategory}
                                onChange={(e) => {
                                    setActiveCategory(e.target.value);
                                    setActiveImageStyle(imageStyles[0]);
                                }}
                                className="w-full appearance-none bg-neutral-800 text-white p-3 pr-10 rounded-lg border border-neutral-700 focus:border-yellow-500 cursor-pointer"
                            >
                                {promptCategories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <IconChevronDown className="w-5 h-5 absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>


                    {/* Filtres spécifiques à la catégorie Image (Liste déroulante) */}
                    {activeCategory === 'image' && (
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <IconAdjustmentsHorizontal className="w-6 h-6 mr-2" /> Filtrer par Style Artistique
                            </h2>
                            <div className="relative max-w-xs"> {/* Limiter la largeur de la liste déroulante */}
                                <select
                                    value={activeImageStyle}
                                    onChange={(e) => setActiveImageStyle(e.target.value)}
                                    className="w-full appearance-none bg-neutral-800 text-white p-3 pr-10 rounded-lg border border-neutral-700 focus:border-yellow-500 cursor-pointer"
                                >
                                    {imageStyles.map(style => (
                                        <option key={style} value={style}>
                                            {style}
                                        </option>
                                    ))}
                                </select>
                                <IconChevronDown className="w-5 h-5 absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="mt-4 text-gray-500 text-sm">
                                {filteredPrompts.length} prompts trouvés dans cette sélection.
                            </div>
                        </div>
                    )}
                    
                    {/* Zone de recherche */}
                    <div className="mb-8">
                        <div className="relative">
                            <IconSearch className="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                            <input 
                                type="text"
                                placeholder={`Rechercher un prompt dans la catégorie "${promptCategories.find(c => c.id === activeCategory)?.name}"...`}
                                className="w-full bg-neutral-800 text-white p-3 pl-10 rounded-lg border border-neutral-700 focus:border-yellow-500 focus:ring-yellow-500"
                            />
                        </div>
                    </div>


                    {/* Grille des Prompts */}
                    <div className={`grid ${activeCategory === 'image' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                        {filteredPrompts.length > 0 ? (
                            filteredPrompts.map((prompt: any) => 
                                activeCategory === 'image' ? (
                                    <ImagePromptCard key={prompt.id} prompt={prompt} />
                                ) : (
                                    <TextPromptCard key={prompt.id} prompt={prompt} />
                                )
                            )
                        ) : (
                            <p className="text-gray-500 lg:col-span-3 mt-10">Aucun prompt trouvé dans cette catégorie / style.</p>
                        )}
                    </div>
                </main>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-4 sm:p-8 lg:p-12">
            {renderContent()}
        </div>
    );
};

export default PromptsPage;