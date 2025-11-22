// src/components/TrainingFilterSection.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, Crown, DollarSign, Globe, X } from 'lucide-react';

// --- Interfaces Globales ---

export interface DropdownOption {
    key: string;
    label: string;
    icon?: React.ElementType;
}

export interface TrainingFilterState {
    category: string;
    language: string;
    price: 'all' | 'free' | 'premium';
}

// --- Composant Fonctionnel : DropdownMenu ---
// Assure que la sélection d'une option appelle onSelect et fonctionne en dehors du contexte d'une feuille.
const DropdownMenu: React.FC<{
    label: string;
    options: DropdownOption[];
    selected: string;
    onSelect: (key: string) => void;
    icon: React.ElementType;
    forceClose?: () => void; // Pour forcer la fermeture si utilisé dans une MobileSheet
}> = ({ label, options, selected, onSelect, icon: Icon, forceClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Fermeture lorsque l'on clique à l'extérieur
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    const handleOptionClick = (key: string) => {
        onSelect(key);
        setIsOpen(false);
        if (forceClose) forceClose(); // Important pour fermer la sheet après sélection mobile
    };
    
    // Trouvez le label sélectionné
    const selectedLabel = options.find(o => o.key === selected)?.label || 'Tous';

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-3 rounded-xl 
                           bg-white/10 dark:bg-neutral-900/20 backdrop-blur-sm 
                           border border-white/20 dark:border-white/10 text-white 
                           hover:bg-white/20 transition h-[50px] md:h-[55px] flex-shrink-0"
            >
                <Icon className="w-5 h-5 text-[#FFD86A]" />
                <span className='hidden sm:inline'>{label}:</span>
                <span className="font-semibold text-[#FFD86A]">{selectedLabel}</span>
            </button>

            {/* Liste des options */}
            {isOpen && (
                <div className="absolute top-full mt-2 w-full min-w-[180px] rounded-xl bg-neutral-800 
                                border border-neutral-700 shadow-2xl z-50 overflow-hidden">
                    {options.map((option) => (
                        <div
                            key={option.key}
                            onClick={() => handleOptionClick(option.key)} 
                            className={`p-3 cursor-pointer text-sm transition
                                ${option.key === selected 
                                    ? 'bg-yellow-700/50 text-white font-bold' 
                                    : 'hover:bg-neutral-700/70 text-neutral-200'
                                }`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


// --- Composant Fonctionnel : MobileFilterSheet ---
// Gère l'affichage de la modale latérale sur mobile.
const MobileFilterSheet: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => (
    <>
        {isOpen && (
            <div className="fixed inset-0 z-40 lg:hidden transition-opacity duration-300">
                {/* Overlay pour fermer */}
                <div className="absolute inset-0 bg-black/70" onClick={onClose} />
                {/* Contenu de la Sheet (Slide-in) */}
                <div className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-neutral-900 p-6 shadow-2xl overflow-y-auto transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-yellow-400 p-2">
                        <X className="w-6 h-6" />
                    </button>
                    {children}
                </div>
            </div>
        )}
    </>
);

// --- Composant Principal : TrainingFilterSection ---

interface TrainingFilterSectionProps {
    titlePlaceholder: string; 
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterState: TrainingFilterState;
    setFilterState: React.Dispatch<React.SetStateAction<TrainingFilterState>>;
    categoryOptions: DropdownOption[];
    languageOptions: DropdownOption[];
    priceOptions: DropdownOption[];
}

export const TrainingFilterSection: React.FC<TrainingFilterSectionProps> = ({
    titlePlaceholder,
    searchTerm,
    setSearchTerm,
    filterState,
    setFilterState,
    categoryOptions,
    languageOptions,
    priceOptions
}) => {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Fonction de mise à jour générique pour simplifier l'utilisation
    const handleFilterChange = (key: keyof TrainingFilterState, value: string) => {
        // console.log(`Mise à jour: ${key} = ${value}`); // Log de vérification
        setFilterState(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex gap-3 md:gap-4 mb-12 items-start w-full">
            {/* Champ de Recherche (Taille réduite, style VisionOS Gold) */}
            <div 
                className="
                    relative flex-grow rounded-xl overflow-hidden
                    bg-white/10 dark:bg-neutral-900/20 backdrop-blur-md
                    border border-white/20 dark:border-white/10
                    focus-within:shadow-[0_0_15px_rgba(255,215,120,0.4)]
                    transition-all duration-500
                    h-[50px] md:h-[55px]
                    max-w-[calc(100%-65px)] md:max-w-full 
                "
            >
                <input
                    type="text"
                    placeholder={titlePlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent h-full py-3 pl-4 pr-12 text-white placeholder-gray-500 outline-none" 
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FFD86A]" />
            </div>
            
            {/* Filtres Dropdown (Desktop) */}
            <div className="hidden md:flex flex-row gap-4 flex-shrink-0">
                <DropdownMenu
                    label="Catégorie"
                    options={categoryOptions}
                    selected={filterState.category}
                    onSelect={(key: string) => handleFilterChange('category', key)}
                    icon={Filter}
                />
                <DropdownMenu
                    label="Langue"
                    options={languageOptions}
                    selected={filterState.language}
                    onSelect={(key: string) => handleFilterChange('language', key)}
                    icon={Globe}
                />
                <DropdownMenu
                    label="Accès"
                    options={priceOptions}
                    selected={filterState.price}
                    onSelect={(key: string) => handleFilterChange('price', key as TrainingFilterState['price'])}
                    icon={DollarSign}
                />
            </div>

            {/* Icône de Filtre (Mobile) - style VisionOS Gold, taille légèrement réduite */}
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

            {/* Affichage du panneau de filtre mobile */}
            <MobileFilterSheet 
                isOpen={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
            >
                <h3 className="text-2xl font-bold mb-6 text-yellow-300 flex items-center">
                    <Filter className="w-6 h-6 mr-3" /> Options de Filtrage
                </h3>
                
                {/* Contenu des filtres à l'intérieur de la Sheet */}
                <div className="space-y-6">
                    <DropdownMenu
                        label="Catégorie"
                        options={categoryOptions}
                        selected={filterState.category}
                        onSelect={(key: string) => handleFilterChange('category', key)}
                        icon={Filter}
                        forceClose={() => setIsMobileFilterOpen(false)}
                    />
                    <DropdownMenu
                        label="Langue"
                        options={languageOptions}
                        selected={filterState.language}
                        onSelect={(key: string) => handleFilterChange('language', key)}
                        icon={Globe}
                        forceClose={() => setIsMobileFilterOpen(false)}
                    />
                    <DropdownMenu
                        label="Accès"
                        options={priceOptions}
                        selected={filterState.price}
                        onSelect={(key: string) => handleFilterChange('price', key as TrainingFilterState['price'])}
                        icon={DollarSign}
                        forceClose={() => setIsMobileFilterOpen(false)}
                    />
                </div>
            </MobileFilterSheet>
        </div>
    );
};

