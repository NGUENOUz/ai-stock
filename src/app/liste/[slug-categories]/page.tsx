// src/app/liste/[categorySlug]/page.tsx
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

interface CategoryPageProps {
  params: {
    categorySlug: string;
  };
  searchParams: {
    q?: string;
    pricing?: string;
    page?: string;
  };
}

const ITEMS_PER_PAGE = 20;

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { categorySlug } = params;
  const query = searchParams.q || '';
  const selectedPricingModels = searchParams.pricing?.split(',') || [];
  const currentPage = parseInt(searchParams.page || '1', 10);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

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
      categories: [categorySlug], // La catégorie de l'URL est le filtre initial
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
  if (toolsError) return <div className="text-center text-red-400 py-10">Erreur lors du chargement des outils IA pour cette catégorie.</div>;
  if (adsError) console.error("Erreur lors du chargement des publicités:", adsError);
  if (featuredToolsError) console.error("Erreur lors du chargement des outils en vogue:", featuredToolsError);
  if (coursesError) console.error("Erreur lors du chargement des formations:", coursesError);

  const currentCategory = allCategories?.find(cat => cat.slug === categorySlug);
  const title = currentCategory ? `IA dans la catégorie "${currentCategory.name}"` : `IA par catégorie`;

  const totalPages = Math.ceil((totalToolsCount || 0) / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">{title}</h1>
        
        <AdBannerSlider ads={activeAds || []} />

        {/* Passer allPricingModels et la catégorie initiale à SearchAndFilterBar */}
        <SearchAndFilterBar
          allCategories={allCategories || []}
          allPricingModels={allPricingModels || []}
          initialSelectedCategorySlug={categorySlug} // Pré-sélectionne la catégorie de l'URL
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

export async function generateStaticParams() {
  const { data: categories } = await getAllCategories();
  return categories?.map((category) => ({
    categorySlug: category.slug,
  })) || [];
}