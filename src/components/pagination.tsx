// src/components/Pagination.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  // Crée une liste de numéros de page à afficher (ex: [1, 2, ..., 5, 6, 7, ..., 10])
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; 
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const baseClasses = "px-3 py-1 mx-1 rounded-lg transition-colors font-medium";
  const activeClasses = "bg-yellow-500 text-black";
  const inactiveClasses = "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <div className="flex justify-center items-center mt-10">
      
      {/* Bouton Précédent */}
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className={`${baseClasses} ${currentPage === 1 ? disabledClasses : inactiveClasses}`}
      >
        &larr; Précédent
      </button>

      {/* Numéros de page */}
      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${baseClasses} ${page === currentPage ? activeClasses : inactiveClasses}`}
        >
          {page}
        </button>
      ))}

      {/* Bouton Suivant */}
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className={`${baseClasses} ${currentPage === totalPages ? disabledClasses : inactiveClasses}`}
      >
        Suivant &rarr;
      </button>
    </div>
  );
};