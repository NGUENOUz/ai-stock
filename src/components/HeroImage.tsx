// src/components/HeroImage.tsx
import React from 'react';
import { IconLockOpen } from '@tabler/icons-react';
import { cn } from '@/lib/utils'; // Assurez-vous d'avoir ce fichier utilitaire
import Image from 'next/image'; // 🎯 Importation de Next.js Image
 import previewImage from './heroImage.png'; // Si heroImage.png est dans le même dossier que HeroImage.tsx


export default function HeroImage() {
  return (
    <div className="relative w-full max-w-4xl mx-auto mt-16 p-2 rounded-xl bg-gray-900 border border-yellow-500/50 shadow-2xl shadow-yellow-500/20">
      
      {/* Cadenas Déverrouillé pour la symbolique Premium */}
      <div 
        className={cn(
          "absolute -top-12 left-1/2 transform -translate-x-1/2",
          "p-3 rounded-full bg-yellow-500 shadow-xl shadow-yellow-500/40 z-10"
        )}
      >
        <IconLockOpen className="w-8 h-8 text-black" stroke={2} />
      </div>

      {/* Maquette Visuelle (Basée sur l'aperçu des Prompts) */}
      <div className="rounded-lg overflow-hidden border border-gray-700/50">
        
        {/* Barre de navigation simplifiée */}
        <div className="flex justify-between items-center p-3 bg-neutral-800">
          <span className="text-xs text-yellow-500 font-semibold">ACCÈS PREMIUM DÉBLOQUÉ</span>
          <span className="text-xs text-gray-500">Profil: Alice</span>
        </div>

        {/* 🎯 CORRECTION ICI : Utilisation de <Image /> de Next.js */}
        {/* Le composant Image de Next.js nécessite width et height. */}
        {/* Utilisez `fill` et `object-cover` si vous voulez qu'il remplisse le conteneur */}
        {/* Ou des dimensions fixes si vous connaissez la taille de votre image */}
        <div className="relative w-full h-auto min-h-[300px]"> {/* Conteneur pour l'image */}
            <Image
                src={previewImage} // 🎯 Utilisez l'importation de l'image directement
                alt="Aperçu des Prompts Premium déverrouillés"
                fill // L'image remplit son parent
                style={{ objectFit: 'cover' }} // S'assure que l'image couvre le conteneur sans distorsion
                className="rounded-b-lg" // Applique un arrondi au bas de l'image
                priority // Charge l'image en priorité car elle est dans l'héro section
            />
        </div>
        {/* Fin de la correction */}

      </div>
    </div>
  );
}