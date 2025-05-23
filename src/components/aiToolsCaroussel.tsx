// src/components/AiToolCarousel.tsx
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { AiToolCard } from './AiToolCard';

import { AiTool } from '@/types/type';
import { getFeaturedTools, getRelatedAiToolsByCategory } from '@/lib/supabase/services/service';

interface AiToolCarouselProps {
  title: string;
  initialTools?: AiTool[];
  categoryId?: string[] | null | undefined;
  currentToolId?: string;
  fetchFeatured?: boolean;
  limit?: number;
}

export const AiToolCarousel: React.FC<AiToolCarouselProps> = ({
  title,
  initialTools,
  categoryId,
  currentToolId,
  fetchFeatured,
  limit = 8,
}) => {
  const [tools, setTools] = useState<AiTool[]>(initialTools || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false, // Gardé sur false comme tu l'as demandé
    containScroll: 'keepSnaps',
    dragFree: true,
    // Options responsives
    slidesToScroll: 1, // Par défaut, 1 slide par défilement (pour les petits écrans)
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 3, dragFree: false }, // Sur desktop (>= 1024px), défile 3 slides, pas de glisser libre
      '(min-width: 768px)': { slidesToScroll: 2, dragFree: false }, // Sur tablette (>= 768px), défile 2 slides
      // Note: Pas besoin de (max-width: 1023px) ici, les breakpoints sont évalués dans l'ordre du plus spécifique au moins spécifique ou selon le premier qui match.
      // Embla gère l'application du premier breakpoint qui correspond.
      // J'ai simplifié le breakpoint pour 768px+ pour inclure la tablette et le desktop avant le desktop spécifique.
    },
    // Ajout d'un espace entre les slides si tu utilises TailwindCSS.
    // Cela se gère généralement avec la classe `gap-x-X` sur `embla__container`.
    // Si tu n'utilises pas `gap-x-X` via Tailwind sur le conteneur `embla__container`,
    // tu pourrais avoir besoin de l'option `inViewThreshold` ou de padding/margin sur les slides.
    // L'ajout de `gap-x-4` au conteneur est plus simple et commun avec Tailwind.
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    async function fetchTools() {
      if (initialTools) {
        setTools(initialTools);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        let data: AiTool[] | null = null;
        let fetchError: any = null;

        if (fetchFeatured) {
          const { data: featuredData, error: featuredErr } = await getFeaturedTools(limit);
          data = featuredData;
          fetchError = featuredErr;
        } else if (categoryId) {
          const { data: relatedData, error: relatedErr } = await getRelatedAiToolsByCategory(
            categoryId,
            currentToolId || '',
            limit
          );
          data = relatedData;
          fetchError = relatedErr;
        } else {
          console.warn("AiToolCarousel: Aucune catégorie, ni 'fetchFeatured', ni 'initialTools' spécifiés. Récupération des IA en vedette comme fallback.");
          const { data: fallbackData, error: fallbackErr } = await getFeaturedTools(limit);
          data = fallbackData;
          fetchError = fallbackErr;
        }

        if (fetchError) {
          console.error(`Erreur lors de la récupération des outils pour le carrousel "${title}" :`, fetchError);
          setError(`Impossible de charger les outils pour "${title}".`);
        } else {
          setTools(data || []);
        }
      } catch (err) {
        console.error(`Erreur inattendue lors de la récupération des outils pour le carrousel "${title}" :`, err);
        setError('Erreur inattendue.');
      } finally {
        setLoading(false);
      }
    }

    fetchTools();
  }, [initialTools, categoryId, currentToolId, fetchFeatured, limit, title]);

  if (loading) {
    return <div className="text-center text-gray-400 py-10">Chargement des outils...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400 py-10">{error}</div>;
  }

  if (tools.length === 0) {
    return <div className="text-center text-gray-400 py-10">Aucun outil trouvé pour cette section.</div>;
  }

  return (
    <div className="relative py-12">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">{title}</h2>

      <div className="embla overflow-hidden" ref={emblaRef}>
        {/* Important: Ajoutez 'gap-x-4' ou une autre classe de gap Tailwind pour l'espace entre les cartes */}
        <div className="embla__container flex -ml-4 gap-x-4"> {/* AJOUTEZ gap-x-4 ICI */}
          {tools.map((tool) => (
            <div key={tool.id} className="embla__slide flex-none pl-4 min-w-0"
                // SUPPRIMEZ OU MODIFIEZ CE STYLE INLINE :
                // style={{ flex: '0 0 33.33%' }}
                // Embla gérera la taille des slides en fonction des breakpoints et des gaps.
                // Si vous voulez définir une largeur par défaut pour les petits écrans, utilisez des classes Tailwind comme w-full ou w-1/2
            >
              <AiToolCard tool={tool} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button
          className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
          onClick={scrollPrev}
          disabled={!emblaApi || !emblaApi.canScrollPrev()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          className="bg-gray-700 text-white p-3 rounded-full hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
          onClick={scrollNext}
          disabled={!emblaApi || !emblaApi.canScrollNext()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};