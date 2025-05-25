// src/components/CategoryFilter.tsx
'use client'; // Indique que c'est un Client Component

import React from 'react';
import { AiToolCategory } from '@/types/type'; // Assurez-vous que le chemin vers votre type est correct

interface CategoryFilterProps {
  categories: AiToolCategory[]; // Toutes les catégories disponibles (passées par le parent)
  selectedCategories: string[]; // Les slugs des catégories actuellement sélectionnées
  onCategoryChange: (categorySlug: string) => void; // Fonction de rappel quand une catégorie est cliquée
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <div className="Categories">
      <h3 className="text-xl font-semibold text-white mb-3">Catégories</h3>
      <select>
        <option value="ALL">
         ALL
        </option>
        <option value="">
          <div className="">
        {/* Mappe sur toutes les catégories disponibles pour créer les boutons */}
        {categories.map((category) => (
          <button
            key={category.id} // Utilise l'ID de la catégorie comme clé
            onClick={() => onCategoryChange(category.slug)} // Appelle la fonction de rappel avec le slug
            className={`px-4 py-2 rounded-full text-sm transition-colors duration-200
              ${selectedCategories.includes(category.slug) // Vérifie si la catégorie est sélectionnée
                ? 'bg-blue-600 text-white' // Style si sélectionné
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600' // Style si non sélectionné
              }`}
          >
            {category.name} {/* Affiche le nom de la catégorie */}
          </button>
        ))}
      </div>
        </option>
      </select>
      
    </div>
  );
};