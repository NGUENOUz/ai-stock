// src/app/liste/page.tsx
import React from 'react';

import { AiToolCategory } from '@/types/type';
import Link from 'next/link'; // Pour les contrôles de pagination

import { AdBannerSlider } from '@/components/adBannSlider';
import { AiToolList } from '@/components/aiToolList';
import { AiToolCarousel } from '@/components/aiToolsCaroussel';
import { CourseSection } from '@/components/coursSections';
import { SearchAndFilterBar } from '@/components/searchAndFilter';
import { getUniquePricingModels } from '@/lib/supabase/services/getpricing';
import { getFeaturedTools } from '@/lib/supabase/services/service';
import { getAllCategories, getFilteredTools, getActiveAds, getFeaturedCourses } from '@/lib/supabase/services/serviceList';
import { PaginationControls } from '@/components/paginationControl';
// import "../style.scss";

interface ListePageProps {
  searchParams: {
    q?: string;
    categories?: string;
    pricing?: string;
    page?: string;
  };
}

const ITEMS_PER_PAGE = 20;

export default async function ListePage({ searchParams }: ListePageProps) {
  const query = searchParams.q || '';
  const selectedCategorySlug = searchParams.categories || 'all'; // Une seule catégorie sélectionnée à la fois
  const selectedPricingModels = searchParams.pricing?.split(',') || [];
  const currentPage = parseInt(searchParams.page || '1', 10);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Prépare le tableau de catégories à passer à getFilteredTools
  const categoriesToFilter = selectedCategorySlug !== 'all' ? [selectedCategorySlug] : undefined;

  // Récupération parallèle des données
  const [
    { data: allCategories, error: categoriesError },
    { data: allPricingModels, error: pricingModelsError }, // Récupère les modèles de prix uniques
    { data: tools, count: totalToolsCount, error: toolsError },
    { data: activeAds, error: adsError },
    { data: featuredTools, error: featuredToolsError },
    { data: featuredCourses, error: coursesError },
  ] = await Promise.all([
    getAllCategories(),
    getUniquePricingModels(), // Appelle la nouvelle fonction
    getFilteredTools({
      query: query,
      categories: categoriesToFilter, // Passe la catégorie sélectionnée (ou undefined si 'all')
      pricing: selectedPricingModels,
      limit: ITEMS_PER_PAGE,
      offset: offset,
      includeCount: true,
    }),
    getActiveAds(),
    getFeaturedTools(8),
    getFeaturedCourses(3),
  ]);

  if (categoriesError) console.error("Erreur lors du chargement des catégories:", categoriesError);
  if (pricingModelsError) console.error("Erreur lors du chargement des modèles de prix:", pricingModelsError);
  if (toolsError) return <div className="text-center text-red-400 py-10">Erreur lors du chargement des outils IA.</div>;
  if (adsError) console.error("Erreur lors du chargement des publicités:", adsError);
  if (featuredToolsError) console.error("Erreur lors du chargement des outils en vogue:", featuredToolsError);
  if (coursesError) console.error("Erreur lors du chargement des formations:", coursesError);

  const totalPages = Math.ceil((totalToolsCount || 0) / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-900 text-white ">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Découvrez les Meilleures Intelligences Artificielles
        </h1>

        <AdBannerSlider ads={activeAds || []} />

        {/* Passer allPricingModels à SearchAndFilterBar */}
        <SearchAndFilterBar
          allCategories={allCategories || []}
          allPricingModels={allPricingModels || []}
        />

        <section className="mb-12">
          <AiToolList tools={tools || []} />

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <PaginationControls currentPage={currentPage} totalPages={totalPages} />
            </div>
          )}
        </section>

        <section className="my-12">
          <AiToolCarousel title="IA Populaires Actuellement" initialTools={featuredTools || []} fetchFeatured={true} />
        </section>

        <section className="my-12">
          <CourseSection courses={featuredCourses || []} />
        </section>
      </main>
    </div>
  );
}