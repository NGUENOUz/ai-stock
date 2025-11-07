"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface AiTool {
  id: number;
  name: string;
  shortDesc: string;
  category: string;
  logo: string;
}

export const SimilarToolsCarousel = ({
  currentToolCategory,
  currentToolId,
  allAiTools,
}: {
  currentToolCategory: string;
  currentToolId: number;
  allAiTools: AiTool[];
}) => {
  const similarTools = allAiTools.filter(
    (tool) => tool.category === currentToolCategory && tool.id !== currentToolId
  );

  if (similarTools.length === 0) {
    return (
      <p className="text-gray-500 mt-4">
        Aucun outil similaire trouvé dans cette catégorie.
      </p>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-white mb-4 border-b border-neutral-700 pb-2">
        Outils similaires
      </h3>
      <div className="flex space-x-4 overflow-x-auto pb-4 custom-scrollbar">
        {similarTools.map((tool) => (
          <Link
            href={`/liste/${tool.id}`}
            key={tool.id}
            className="flex-shrink-0 w-72 p-4 bg-neutral-800 rounded-lg border border-neutral-700 hover:bg-neutral-700/80 transition duration-200"
          >
            <div className="flex items-center mb-3">
              <Image
                src={tool.logo}
                alt={`Logo de ${tool.name}`}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-lg font-semibold ml-3 text-white">
                {tool.name}
              </span>
            </div>
            <p className="text-sm text-gray-400 line-clamp-2">
              {tool.shortDesc}
            </p>
            <span className="text-xs mt-2 inline-block text-yellow-500">
              Voir Détails →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
