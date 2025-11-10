// src/components/TrainingFilters.tsx
import React from 'react';

interface Filters {
    category: string;
    language: string;
    price: string;
    duration: string;
}

interface TrainingFiltersProps {
    filters: Filters;
    setFilters: (filters: Filters) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    allCategories: string[];
    allLanguages: string[];
}

export const TrainingFilters: React.FC<TrainingFiltersProps> = ({
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    allCategories,
    allLanguages
}) => {
    
    // Options de prix et de durée (à adapter selon vos besoins)
    const priceOptions = [
        { value: 'all', label: 'Tous les prix' },
        { value: '0', label: 'Gratuit' },
        { value: 'premium', label: 'Premium' },
    
    ];

    const durationOptions = [
        { value: 'all', label: 'Toutes les durées' },
        { value: '0-60', label: 'Moins d\'1 heure' },
        { value: '60-180', label: '1h - 3h' },
        { value: '180+', label: 'Plus de 3 heures' },
    ];

    const handleFilterChange = (name: keyof Filters, value: string) => {
        setFilters({ ...filters, [name]: value });
    };

    const SelectInput: React.FC<{ name: keyof Filters, label: string, options: { value: string, label: string }[] }> = ({ name, label, options }) => (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {label}
            </label>
            <select
                name={name}
                value={filters[name]}
                onChange={(e) => handleFilterChange(name, e.target.value)}
                className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-gray-600 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-lg sticky top-6">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Filtrer & Rechercher</h3>

            {/* Barre de Recherche */}
            <input 
                type="text" 
                placeholder="Rechercher une formation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 mb-6 border rounded-lg dark:bg-neutral-800 dark:border-gray-600 dark:text-white"
            />

            <div className="space-y-4">
                {/* Filtre Catégorie */}
                <SelectInput 
                    name="category" 
                    label="Catégorie" 
                    options={[{ value: '', label: 'Toutes les catégories' }, ...allCategories.map(c => ({ value: c, label: c }))]} 
                />
                
                {/* Filtre Langue */}
                <SelectInput 
                    name="language" 
                    label="Langue" 
                    options={[{ value: '', label: 'Toutes les langues' }, ...allLanguages.map(l => ({ value: l, label: l }))]} 
                />

                {/* Filtre Prix */}
                <SelectInput 
                    name="price" 
                    label="Prix" 
                    options={priceOptions} 
                />

                {/* Filtre Durée */}
                <SelectInput 
                    name="duration" 
                    label="Durée" 
                    options={durationOptions} 
                />
            </div>
            
            {/* Bouton de Réinitialisation */}
            <button 
                onClick={() => {
                    setFilters({ category: '', language: '', price: 'all', duration: 'all' });
                    setSearchTerm('');
                }}
                className="w-full mt-6 py-2 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold"
            >
                Réinitialiser les filtres
            </button>
        </div>
    );
};