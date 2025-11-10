// src/components/TrainingCard.tsx
import React from 'react';
import Link from 'next/link';
// Utilisation des icônes Lucide React
import { Clock, Video, User, DollarSign, Crown } from 'lucide-react'; 
import { Training } from '../types/training'; 

interface TrainingCardProps {
  training: Training;
}

export const TrainingCard: React.FC<TrainingCardProps> = ({ training }) => {
  // Récupération des données nécessaires, incluant isPremium
  const { title, imageUrl, durationMinutes, numberOfVideos, instructor, id, price, isPremium } = training; 
  
  // Formatage de la durée
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const formattedDuration = `${hours}h ${minutes}m`;

  // 🌟 NOUVELLE LOGIQUE POUR LE PRIX AFFICHÉ ET LA COULEUR
  let priceDisplay: string;
  let priceColorClass: string;

  if (isPremium) {
    // Si la formation est PREMIUM, on affiche un statut Premium, même si price=0
    priceDisplay = "Premium";
    priceColorClass = "text-red-500 font-bold";
  } else if (price === 0) {
    // Vraiment gratuit pour tous
    priceDisplay = "Gratuit";
    priceColorClass = "text-green-500 font-bold";
  } else {
    // Payant standard
    priceDisplay = `${price} €`;
    priceColorClass = "text-yellow-500 font-bold";
  }


  // 🌟 LOGIQUE D'AFFICHAGE DE L'ÉTIQUETTE D'ACCÈS
  let tagLabel: string;
  let tagClasses: string;

  if (isPremium) {
    tagLabel = 'PREMIUM';
    tagClasses = 'bg-red-600 text-white'; // Rouge pour un accès restreint/privilégié
  } else {
    tagLabel = 'GRATUIT';
    tagClasses = 'bg-green-600 text-white'; 
  }


  return (
    <Link href={`/formations/${id}`} passHref>
      {/* dark:bg-neutral-800 conservé */}
      <div className="group cursor-pointer bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col">
        
        {/* 1. Couverture de la formation */}
        <div className="relative h-40 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={`Couverture de la formation ${title}`} 
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
          
          {/* 🌟 ÉTIQUETTE AJOUTÉE EN HAUT À DROITE */}
          {/* Afficher l'étiquette uniquement pour Premium ou si c'est vraiment gratuit */}
          {tagLabel && (price === 0 || isPremium) && (
            <div className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold rounded-full shadow-md ${tagClasses} flex items-center`}>
              {tagLabel === 'PREMIUM' && <Crown className="w-3 h-3 mr-1" />}
              {tagLabel}
            </div>
          )}
          
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          {/* 2. Titre */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-yellow-500 transition-colors">
            {title}
          </h3>
          
          {/* Détails (Durée, Vidéos & Prix) */}
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
            
            {/* Durée */}
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              <span className='font-medium'>{formattedDuration}</span>
            </div>
            
            {/* Nombre de vidéos */}
            <div className="flex items-center">
              <Video className="w-4 h-4 mr-1.5" />
              <span>{numberOfVideos} Vidéos</span>
            </div>
            
            {/* Prix */}
            <div className="flex items-center">
              <span className={`text-md ${priceColorClass}`}>
                {priceDisplay}
              </span>
            </div>

          </div>
          
          {/* 4. Formateur */}
          <div className="flex items-center mt-auto pt-4"> 
            <Link href={`/instructors/${instructor.id}`} passHref onClick={(e) => e.stopPropagation()}>
              <img 
                src={instructor.avatarUrl} 
                alt={instructor.name} 
                className="w-8 h-8 rounded-full object-cover mr-3 border-2 border-yellow-500"
              />
            </Link>
            <Link href={`/instructors/${instructor.id}`} passHref onClick={(e) => e.stopPropagation()}>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-yellow-500 transition-colors">
                  {instructor.name}
                </span>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};