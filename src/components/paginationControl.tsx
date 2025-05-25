// src/components/PaginationControls.tsx
'use client'; // C'est un Client Component car il utilise useSearchParams et Link de Next.js

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // Pour accéder aux paramètres d'URL actuels

interface PaginationControlsProps {
  currentPage: number; // La page actuelle (nombre)
  totalPages: number;  // Le nombre total de pages
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, totalPages }) => {
  const searchParams = useSearchParams();

  // Fonction utilitaire pour construire l'URL d'une page donnée
  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString()); // Copie les paramètres d'URL existants
    params.set('page', page.toString()); // Met à jour le paramètre 'page'
    return `/liste?${params.toString()}`; // Retourne l'URL complète
  };

  // Logique pour déterminer quelles pages afficher (ex: 1, 2, 3, ..., 10, 11, 12)
  const pagesToShow: (number | '...')[] = [];
  const maxPagesAroundCurrent = 2; // Nombre de pages à afficher autour de la page actuelle

  for (let i = 1; i <= totalPages; i++) {
    // Affiche la première page, la dernière page, et les pages autour de la page actuelle
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - maxPagesAroundCurrent && i <= currentPage + maxPagesAroundCurrent)
    ) {
      pagesToShow.push(i);
    } else if (
      // Ajoute des points de suspension si la page n'est pas dans les plages et qu'on n'a pas déjà ajouté '...'
      pagesToShow[pagesToShow.length - 1] !== '...' &&
      (i < currentPage - maxPagesAroundCurrent || i > currentPage + maxPagesAroundCurrent)
    ) {
      pagesToShow.push('...');
    }
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Bouton Précédent */}
      <Link
        href={buildPageUrl(currentPage - 1)}
        className={`px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200
          ${currentPage === 1 ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''}`}
        aria-disabled={currentPage === 1} // Pour l'accessibilité
        scroll={false} // Empêche le défilement vers le haut de la page
      >
        Précédent
      </Link>

      {/* Numéros de Page */}
      {pagesToShow.map((page, index) => (
        typeof page === 'number' ? (
          <Link
            key={index} // Index comme clé car les nombres peuvent être répétés avec '...'
            href={buildPageUrl(page)}
            className={`px-4 py-2 rounded-lg transition-colors duration-200
              ${currentPage === page
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            scroll={false} // Empêche le défilement vers le haut de la page
          >
            {page}
          </Link>
        ) : (
          <span key={index} className="px-4 py-2 text-gray-400">...</span>
        )
      ))}

      {/* Bouton Suivant */}
      <Link
        href={buildPageUrl(currentPage + 1)}
        className={`px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200
          ${currentPage === totalPages ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''}`}
        aria-disabled={currentPage === totalPages}
        scroll={false} // Empêche le défilement vers le haut de la page
      >
        Suivant
      </Link>
    </div>
  );
};