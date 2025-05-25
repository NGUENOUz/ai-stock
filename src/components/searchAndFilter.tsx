// src/components/SearchAndFilterBar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AiToolCategory } from '@/types/type'; // Assurez-vous que le chemin est correct

interface SearchAndFilterBarProps {
  allCategories: AiToolCategory[]; // Toutes les catégories disponibles (vient du serveur)
  allPricingModels: string[]; // Tous les modèles de prix uniques (vient du serveur)
  initialSelectedCategorySlug?: string; // Pour pré-sélectionner une catégorie si on vient d'une page de catégorie
}

export const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  allCategories,
  allPricingModels,
  initialSelectedCategorySlug,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(
    initialSelectedCategorySlug || searchParams.get('categories') || 'all' // 'all' pour toutes les catégories
  );
  const [selectedPricingModels, setSelectedPricingModels] = useState<string[]>(
    searchParams.get('pricing')?.split(',') || []
  );

  // Met à jour les paramètres d'URL lorsque les filtres changent
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm) {
      params.set('q', searchTerm);
    } else {
      params.delete('q');
    }

    if (selectedCategory && selectedCategory !== 'all') {
      params.set('categories', selectedCategory);
    } else {
      params.delete('categories');
    }

    if (selectedPricingModels.length > 0) {
      params.set('pricing', selectedPricingModels.join(','));
    } else {
      params.delete('pricing');
    }
    
    // Assurez-vous que le paramètre 'page' est réinitialisé à 1 lors d'un changement de filtre
    params.set('page', '1');

    router.replace(`/liste?${params.toString()}`);
  }, [searchTerm, selectedCategory, selectedPricingModels, router, searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handlePricingChange = (model: string) => {
    setSelectedPricingModels((prev) =>
      prev.includes(model)
        ? prev.filter((m) => m !== model)
        : [...prev, model]
    );
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sticky top-0 z-30">
      {/* Champ de recherche */}
      <div className="flex-grow w-full md:w-auto">
        <input
          type="text"
          placeholder="Rechercher des IA..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sélecteur de Catégories (Dropdown) */}
      <div className="flex-shrink-0 w-full md:w-auto">
        <label htmlFor="category-select" className="sr-only">Catégories</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8 relative"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23d1d5db' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
        >
          <option value="all">ALL (Catégories)</option> {/* Option pour toutes les catégories */}
          {allCategories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Filtres par Modèle de Prix (Boutons) */}
      <div className="flex-shrink-0 w-full md:w-auto flex flex-wrap gap-2 justify-center md:justify-end">
        {/* Bouton "All" pour désélectionner tous les prix */}
        <button
          onClick={() => setSelectedPricingModels([])} // Désélectionne tout
          className={`px-4 py-2 rounded-full text-sm transition-colors duration-200
            ${selectedPricingModels.length === 0
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
        >
          All
        </button>
        {allPricingModels.map((model) => (
          <button
            key={model}
            onClick={() => handlePricingChange(model)}
            className={`px-4 py-2 rounded-full text-sm transition-colors duration-200
              ${selectedPricingModels.includes(model)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
          >
            {model}
          </button>
        ))}
      </div>
    </div>
  );
};