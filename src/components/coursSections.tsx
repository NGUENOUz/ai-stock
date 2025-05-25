// src/components/CourseSection.tsx
import React from 'react';
import Link from 'next/link';
import { Formations } from '@/types/type';

interface CourseSectionProps {
  courses: Formations[];
  title?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const CourseSection: React.FC<CourseSectionProps> = ({
  courses,
  title = "Devenez un maître de l'IA avec nos formations !",
  buttonText = "En savoir plus sur nos formations",
  buttonLink = "/formations", // Assurez-vous que cette page existe
}) => {
  if (!courses || courses.length === 0) {
    return null; // Ne rien afficher si pas de formations
  }

  // Vous pouvez décider de faire un carrousel ici aussi, ou une simple grille.
  // Pour la simplicité, je vais faire une grille avec seulement la première formation pour l'exemple.
  // Si tu veux un slider de formations, tu peux adapter AdBannerSlider pour Course.

  const featuredCourse = courses[0]; // Affichons la première formation en vedette pour l'exemple

  return (
    <section className="bg-gray-800 p-8 rounded-lg shadow-xl my-12 text-center">
      <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
        {featuredCourse && (
          <div className="bg-gray-700 rounded-lg overflow-hidden shadow-md w-full md:w-1/2 lg:w-1/3">
            <img src={featuredCourse.image_url} alt={featuredCourse.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white mb-2">{featuredCourse.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{featuredCourse.description}</p>
              <Link href={featuredCourse.details_url || '#'} className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Découvrir
              </Link>
            </div>
          </div>
        )}
        {/* Si tu as plusieurs formations à présenter en grille, tu peux les mapper ici */}
      </div>

      <Link href={buttonLink} className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors duration-300">
        {buttonText}
      </Link>
    </section>
  );
};