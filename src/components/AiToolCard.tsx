// src/components/AiToolCard.tsx
'use client'; // Ce composant est un Client Component

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import VerifiedIcon from '@mui/icons-material/Verified';

import { CardBody, CardContainer, CardItem } from './3DCart'; // Assure-toi que ce chemin est correct
import { AiTool } from '../types/type'; // Assure-toi que le chemin est correct

interface AiToolCardProps {
  tool: AiTool;
}

export const AiToolCard: React.FC<AiToolCardProps> = ({ tool }) => {
  // Optionnel: chemin vers un logo par défaut si tool.logo_url est nul ou vide
  const defaultLogo = '/path/to/default-ai-logo.svg'; // REMPLACE CECI avec ton chemin réel
  const flameGifUrl = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWdrZDFyaW82cnJyazYwN3Znb24wc3Y1bjhldHdhNWhldXZ4aWZkdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/UqUHuT6y9mK5HfsYFm/giphy.gif";
  const getPricingTagClasses = (model: string | null) => {
    switch (model) {
      case 'Gratuit':
        return 'bg-green-500 text-green-900 border-green-700';
      case 'Essai Gratuit':
        return 'bg-blue-500 text-blue-900 border-blue-700';
      case 'Freemium':
        return 'bg-purple-500 text-purple-900 border-purple-700';
      case 'Payant':
        return 'bg-red-500 text-red-900 border-red-700';
      default: // Inclut 'Contact pour Prix' et 'Non spécifié'
        return 'bg-gray-500 text-gray-900 border-gray-700';
    }
  };

   const truncateDescription = (text: string | null, maxLength: number) => {
    if (!text) return "Aucune description courte disponible.";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Définis l'URL de la page de détails
  const detailPageUrl = `/${tool.slug}`;

  return (

    <Link href={detailPageUrl} className="block cursor-pointer">
    <CardContainer className="inter-var">
      <CardBody
        className="
          bg-gray-900
          relative group/card
          dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]
          dark:bg-black
          dark:border-white/[0.2]
          border-black/[0.1]
          w-auto sm:w-[18rem] h-auto 
          rounded-xl p-6 border
          flex flex-col
          justify-between
        "
      >
        {/* Section Supérieure: Logo, Nom, Badge Vérifié */}
        <div className="flex items-center gap-4 mb-4"> {/* flex et gap pour aligner logo et titre/badge */}
          {/* Logo de l'IA */}
          <CardItem translateZ="50">
            <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center">
              {tool.logo_url ? (
                <Image
                  src={tool.logo_url}
                  height={64} // Dimensions fixes pour le logo
                  width={64}
                  className="object-contain rounded-lg"
                  alt={`${tool.name} logo`}
                />
              ) : (
                <span className="text-xl font-bold text-gray-400 uppercase">
                  {tool.name.substring(0, 2)}
                </span>
              )}
            </div>
          </CardItem>

          {/* Nom de l'IA et Badge Vérifié */}
          <div className=""> {/* Permet au texte de prendre l'espace */}
             <div><CardItem
              translateZ="50"
              className="text-1xl font-bold text-neutral-200 dark:text-white flex items-center" // flex pour aligner titre et badge
            >
              {tool.name}
              {/* Badge "Verified" - Visible uniquement si l'IA est "featured" (premium) */}
              {tool.is_featured && ( // Utilise is_featured comme indicateur de vérification premium
                <span className="ml-1 text-orange-500" title="Vérifié et en vedette text-sm">
                   <VerifiedIcon/>
                </span>
              )}
            </CardItem></div>

            <div className='flex row'>
              <CardItem
              as="span"
              translateZ="20"
              className={`
                inline-block mt-1 ml-0 // Pas de marge à gauche pour la 3D
                px-3 py-1 rounded-full text-xs font-semibold
                border-2 border-solid
                ${getPricingTagClasses(tool.pricing)}
              `}
            >
             {tool.pricing || 'N/A'} {/* Affiche le prix ou "N/A" si non défini */}
            </CardItem>

              {tool.is_featured && ( // Condition pour afficher la flamme
            <Image
              src={flameGifUrl}
              alt="En vogue"
              width={15}  // Taille de la flamme
              height={15} // Taille de la flamme
              className="ml-1"
              unoptimized={true} // Important pour les GIFs, Next.js ne peut pas les optimiser par défaut
            />
          )}
            </div>
             {/* Étiquette de Tarification */}
             
           
          </div>
        </div>
         {/* Bannière de l'ia */}

         <CardItem translateZ="100" className="w-full mt-4 h-30">
         <Image
           src={tool.ban_url}
            height={200}
            width={200}
            className="h-30 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>

        {/* Mini-Description */}
        
       <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-300 text-sm mt-4 dark:text-neutral-300 flex-grow"
          >
            {truncateDescription(tool.description_short, 40)} {/* Augmenté à 60 pour un peu plus de contexte, tu peux ajuster */}
          </CardItem>

        {/* Boutons "En savoir plus" et "Visiter" */}
        <div className="flex justify-between items-center mt-6">
          <CardItem
            translateZ={20}
            as={Link}
            href={`/${tool.slug}`}
            className="px-4 py-2 rounded-xl text-xs font-normal text-blue-400 hover:text-blue-500 transition-colors duration-200"
          >
            En savoir plus →
          </CardItem>

          {tool.website_url && (
            <CardItem
              translateZ={20}
              as="a"
              href={tool.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold hover:from-emerald-600 hover:to-green-600 transition-colors duration-200"
            >
              Visiter
            </CardItem>
          )}
        </div>
      </CardBody>
    </CardContainer>
    </Link>
  );
};
