// src/components/DropdownMenu.tsx

import React, { useState } from 'react';
import { ChevronDown, Crown, TrendingUp, Clock, Filter, Info, X } from 'lucide-react'; 
import { cn } from '@/lib/utils'; // Assurez-vous d'avoir ce chemin correct

// --- Types partagés ---

export interface DropdownOption {
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

interface MobileFilterSheetProps {
    isOpen: boolean;
    onClose: () => void;
    // Remplacer ces types par les vôtres si la structure de l'état est différente
    filterState: { category: string; sort: string; };
    setFilterState: React.Dispatch<React.SetStateAction<{ category: string; sort: string; }>>;
    categoryOptions: DropdownOption[];
    sortOptions: DropdownOption[];
}


// --- Composant Dropdown Menu (Réutilisable) ---

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, options, selected, onSelect, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const selectedOption = options.find(opt => opt.key === selected) || { label: 'Toutes' };

    return (
        <div className="relative flex-shrink-0 w-full md:w-auto z-10 md:z-auto">
            <button
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
            
            {/* ⭐️ CLÉ : Utilisation de max-h pour un "déroulement" qui pousse les autres éléments (Fix Mobile) */}
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-out",
                    isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                )}
            >
                {isOpen && ( 
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


// --- Composant MobileFilterSheet (Feuille de Filtre pour les petits écrans) ---

export const MobileFilterSheet: React.FC<MobileFilterSheetProps> = ({ 
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
            onClick={onClose} 
        >
            <div 
                className="
                    absolute bottom-0 left-0 right-0 p-6 rounded-t-3xl shadow-2xl
                    bg-neutral-900/95 border border-white/20
                    transform transition-transform duration-300 ease-out
                    
                    animate-in slide-in-from-bottom-full

                    max-h-[80vh] overflow-y-auto
                "
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4 sticky top-0 bg-neutral-900/95 z-20">
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
                        }}
                        icon={Filter}
                    />
                    <DropdownMenu
                        label="Trier par"
                        options={sortOptions}
                        selected={filterState.sort}
                        onSelect={(key) => {
                            setFilterState(prev => ({ ...prev, sort: key as 'rank' | 'trending' | 'new' }));
                        }}
                        icon={Crown}
                    />
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/10">
                    <button 
                        onClick={onClose}
                        className="w-full py-3 rounded-xl font-bold bg-[#FFD86A] text-black hover:bg-[#FFE79A] transition"
                    >
                        Appliquer les Filtres
                    </button>
                </div>
            </div>
        </div>
    );
};