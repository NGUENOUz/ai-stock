// src/components/AdBannerSlider.tsx
'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Ads } from '@/types/type'; // Assurez-vous que le chemin est correct

interface AdBannerSliderProps {
  ads: Ads[];
  autoplayInterval?: number; // Intervalle en ms pour l'autoplay
}

export const AdBannerSlider: React.FC<AdBannerSliderProps> = ({ ads, autoplayInterval = 5000 }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (emblaApi && autoplayInterval > 0) {
      autoplayRef.current = setInterval(() => {
        emblaApi.scrollNext();
      }, autoplayInterval);
    }
  }, [emblaApi, autoplayInterval]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    if (emblaApi) {
      emblaApi.on('pointerDown', stopAutoplay);
      emblaApi.on('select', startAutoplay); // Reprendre l'autoplay après interaction
      // emblaApi.on('init', startAutoplay); // Décommenter si l'autoplay ne démarre pas
    }
    return () => {
      stopAutoplay();
      if (emblaApi) {
        emblaApi.off('pointerDown', stopAutoplay);
        emblaApi.off('select', startAutoplay);
        // emblaApi.off('init', startAutoplay);
      }
    };
  }, [emblaApi, startAutoplay, stopAutoplay]);

  if (!ads || ads.length === 0) {
    return null; // Ne rien afficher si pas de pubs
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg mb-8">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {ads.map((ad) => (
            <div key={ad.id} className="embla__slide flex-none w-full">
              <a href={ad.target_url} target="_blank" rel="noopener noreferrer" className="block relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
                <img
                  src={ad.image_url}
                  alt={ad.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-end">
                  <h3 className="text-white text-xl md:text-2xl font-bold">{ad.title}</h3>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* Optionnel: Ajouter des points de navigation si tu veux */}
      {/* <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {ads.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === emblaApi?.selectedScrollSnap() ? 'bg-white' : 'bg-gray-400'}`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div> */}
    </div>
  );
};