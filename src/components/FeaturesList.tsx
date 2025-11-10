// src/components/FeaturesList.tsx
"use client";
import React from 'react';
import { IconCheck, IconClockHour3, IconDiamond } from '@tabler/icons-react';
import { LayoutTextFlip } from './LayoutText';
import { motion } from 'motion/react';

const promptCategories = [
    "Copywriting", 
    "Stratégie Marketing", 
    "Développement Web", 
    "SEO Avancé", 
    "Réseaux Sociaux",
    "Productivité",
    "E-commerce",
    "Analyse de Données"
  ];
const features = [
  { 
    title: "Qualité Garantie", 
    description: "Chaque prompt est vérifié, testé et optimisé par nos spécialistes en IA pour délivrer des résultats professionnels.", 
    icon: IconCheck 
  },
  { 
    title: "Gain de Temps Massif", 
    description: "Ne perdez plus de minutes à expérimenter. Copiez, collez, exécutez. C'est tout.", 
    icon: IconClockHour3 
  },
  { 
    title: "Contenu Exclusif", 
    description: "Accédez à des catégories de prompts introuvables ailleurs, réservées à nos membres Premium.", 
    icon: IconDiamond 
  },
];

export default function FeaturesList() {
  return (
    <>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="p-6 rounded-xl border border-gray-700 bg-neutral-900 shadow-lg dark:text-white"
        >
          <feature.icon className="h-10 w-10 text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-400">{feature.description}</p>
        </div>
      ))}

     
    </div>

     <div className=''>
       <p className="mt-4 text-center text-base text-neutral-600 dark:text-neutral-400">
        Des prompts pour plusieurs secteurs d'activités :
      </p>
      <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip
          text=""
          words={promptCategories}
        />
      </motion.div>
     
    </div>
    
     </>
  );
}