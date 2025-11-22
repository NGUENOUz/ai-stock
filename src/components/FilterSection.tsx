// src/components/FilterSection.tsx

import React, { useState } from 'react';
import { Search, Filter, Crown, TrendingUp, Clock } from 'lucide-react';
import { DropdownMenu, MobileFilterSheet, DropdownOption } from './DropdownMenu'; 

interface FilterSectionProps {
    titlePlaceholder: string; // Ex: "Rechercher une plateforme..." ou "Rechercher un prompt..."
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterState: { category: string; sort: string; };
    setFilterState: React.Dispatch<React.SetStateAction<{ category: string; sort: string; }>>;
    categoryOptions: DropdownOption[];
    sortOptions: DropdownOption[];
}

export const FilterSection: React.FC<FilterSectionProps> = ({
    titlePlaceholder,
    searchTerm,
    setSearchTerm,
    filterState,
    setFilterState,
    categoryOptions,
    sortOptions
}) => {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    return (
        <div className="flex gap-4 mb-12 items-start w-full">
            {/* Champ de Recherche (Taille réduite sur mobile) */}
            <div 
                className="
                    relative flex-grow rounded-xl overflow-hidden
                    bg-white/10 dark:bg-neutral-900/20 backdrop-blur-md
                    border border-white/20 dark:border-white/10
                    focus-within:shadow-[0_0_15px_rgba(255,215,120,0.4)]
                    transition-all duration-500
                    h-[50px] md:h-[55px]
                "
            >
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FFD86A]" />
                <input
                    type="text"
                    placeholder={titlePlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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

            {/* Icône de Filtre (Mobile) */}
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
                filterState={filterState}
                setFilterState={setFilterState}
                categoryOptions={categoryOptions}
                sortOptions={sortOptions}
            />
        </div>
    );
};