// src/components/AiToolList.tsx
import React from 'react';
import { AiTool } from '@/types/type'; // Assurez-vous que le chemin vers votre type est correct
import { AiToolCard } from './AiToolCard'; // <<< TRÈS IMPORTANT : Assurez-vous que le chemin vers votre composant AiToolCard est correct

interface AiToolListProps {
  tools: AiTool[]; // Le tableau d'outils IA à afficher
}

export const AiToolList: React.FC<AiToolListProps> = ({ tools }) => {
  // Affiche un message si aucun outil n'est trouvé
  if (!tools || tools.length === 0) {
    return <p className="text-center text-gray-400 py-10">Aucun outil IA trouvé.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 pt-[-15]">
      {/* Mappe sur le tableau d'outils et rend un AiToolCard pour chaque outil */}
      {tools.map((tool) => (
        <AiToolCard key={tool.id} tool={tool} /> // Assurez-vous que chaque outil a un 'id' unique pour la clé
      ))}
    </div>
  );
};