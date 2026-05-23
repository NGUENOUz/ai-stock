// src/components/TrainingFilterSection.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, Crown, DollarSign, Globe, X, ChevronDown } from 'lucide-react';

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

const DropdownMenu: React.FC<{
    label: string;
    options: DropdownOption[];
    selected: string;
    onSelect: (key: string) => void;
    icon: React.ElementType;
    forceClose?: () => void;
}> = ({ label, options, selected, onSelect, icon: Icon, forceClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

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
        if (forceClose) forceClose();
    };
    
    const selectedLabel = options.find(o => o.key === selected)?.label || 'Tous';

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-neutral-200 text-neutral-800 hover:border-primary hover:bg-neutral-50 transition-all h-12 font-medium text-sm group"
            >
                <Icon className="w-4 h-4 text-neutral-500 group-hover:text-primary transition-colors" />
                <span className='hidden sm:inline text-neutral-600'>{label}:</span>
                <span className="font-bold text-black">{selectedLabel}</span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 w-full min-w-[180px] rounded-lg bg-white border border-neutral-200 shadow-xl z-50 overflow-hidden">
                    {options.map((option) => (
                        <div
                            key={option.key}
                            onClick={() => handleOptionClick(option.key)} 
                            className={`p-3 cursor-pointer text-sm transition ${
                                option.key === selected 
                                    ? 'bg-primary/10 text-black font-bold border-l-2 border-primary' 
                                    : 'hover:bg-neutral-50 text-neutral-700'
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

const MobileFilterSheet: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => (
    <>
        {isOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
                <div className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white p-6 shadow-2xl overflow-y-auto transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <button onClick={onClose} className="absolute top-4 right-4 text-neutral-600 hover:text-black p-2 rounded-lg hover:bg-neutral-100 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                    {children}
                </div>
            </div>
        )}
    </>
);

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

    const handleFilterChange = (key: keyof TrainingFilterState, value: string) => {
        setFilterState(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex gap-3 md:gap-4 mb-12 items-start w-full">
            {/* Champ de Recherche */}
            <div className="relative flex-grow rounded-lg overflow-hidden bg-white border border-neutral-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all h-12 max-w-[calc(100%-65px)] md:max-w-full">
                <input
                    type="text"
                    placeholder={titlePlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent h-full py-3 pl-4 pr-12 text-black placeholder-neutral-400 outline-none" 
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            </div>
            
            {/* Filtres Dropdown (Desktop) */}
            <div className="hidden md:flex flex-row gap-3 flex-shrink-0">
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

            {/* Icône de Filtre (Mobile) */}
            <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex md:hidden items-center justify-center w-12 h-12 rounded-lg font-semibold flex-shrink-0 bg-white border border-neutral-200 text-neutral-800 hover:border-primary hover:bg-neutral-50 transition-all"
                aria-label="Ouvrir les options de filtre"
            >
                <Filter className="w-5 h-5" />
            </button>

            {/* Panneau de filtre mobile */}
            <MobileFilterSheet 
                isOpen={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
            >
                <h3 className="text-2xl font-bold mb-6 text-black flex items-center">
                    <Filter className="w-6 h-6 mr-3 text-primary" /> Options de Filtrage
                </h3>
                
                <div className="space-y-4">
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

