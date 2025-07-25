// src/app/liste/[categorySlug]/page.tsx
import React from "react";
import Link from "next/link"; // Pour les contrôles de pagination
import type { Metadata } from "next"; // N'oublie pas d'importer Metadata si tu comptes utiliser generateMetadata

import { AiToolCategory } from "@/types/type"; // Assure-toi que ce type est correctement défini
import { AdBannerSlider } from "@/components/adBannSlider";
import { AiToolList } from "@/components/aiToolList";
import { AiToolCarousel } from "@/components/aiToolsCaroussel";
import { CourseSection } from "@/components/coursSections";
import { SearchAndFilterBar } from "@/components/searchAndFilter";
import { getUniquePricingModels } from "@/lib/supabase/services/getpricing";
import { getFeaturedTools } from "@/lib/supabase/services/service";
import {
  getAllCategories,
  getFilteredTools,
  getActiveAds,
  getFeaturedCourses,
} from "@/lib/supabase/services/serviceList";
import { PaginationControls } from "@/components/paginationControl";

// --- MODIFICATION ICI : params est maintenant une Promise ---
interface CategoryPageProps {
  params: Promise<{
    // <--- Ici, on indique que params est une Promise
    categorySlug: string;
  }>;
  searchParams:Promise<{ // <--- ICI LE NOUVEAU CHANGEMENT CLÉ
    q?: string;
    pricing?: string;
    page?: string;
  }>;
}
// --- FIN DE LA MODIFICATION ---

const ITEMS_PER_PAGE = 20;

// --- Ajout de generateMetadata pour le SEO et le typage ---
// C'est une bonne pratique et cela utilise aussi les params
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params; // N'oublie pas l'await ici aussi
  const { categorySlug } = resolvedParams;
  const { data: allCategories } = await getAllCategories();

  const currentCategory = allCategories?.find(
    (cat) => cat.slug === categorySlug
  );

  if (!currentCategory) {
    return {
      title: "Catégorie d'outils IA non trouvée",
      description: "Cette catégorie d'outils IA n'existe pas.",
    };
  }

  return {
    title: `Outils IA pour "${currentCategory.name}" - Mon SAAS AI`,
    description: `Découvrez tous les outils d'intelligence artificielle dans la catégorie "${currentCategory.name}".`,
    keywords: `IA, outils IA, ${currentCategory.name}, intelligence artificielle`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  // --- TA MODIFICATION EST DÉJÀ LÀ, C'EST EXCELLENT ! ---
  const { categorySlug } = await params; // C'est le 'await' qui résout la Promise

  const query = (await searchParams).q || "";
  const selectedPricingModels = (await searchParams).pricing?.split(",") || [];
  const currentPage = parseInt((await searchParams).page || "1", 10);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Récupération parallèle des données
  const [
    { data: allCategories, error: categoriesError },
    { data: allPricingModels, error: pricingModelsError },
    { data: tools, count: totalToolsCount, error: toolsError },
    { data: activeAds, error: adsError },
    { data: featuredTools, error: featuredToolsError },
    { data: featuredCourses, error: coursesError },
  ] = await Promise.all([
    getAllCategories(),
    getUniquePricingModels(),
    getFilteredTools({
      query: query,
      categories: [categorySlug],
      pricing: selectedPricingModels,
      limit: ITEMS_PER_PAGE,
      offset: offset,
      includeCount: true,
    }),
    getActiveAds(),
    getFeaturedTools(8),
    getFeaturedCourses(3),
  ]);

  if (categoriesError)
    console.error("Erreur lors du chargement des catégories:", categoriesError);
  if (pricingModelsError)
    console.error(
      "Erreur lors du chargement des modèles de prix:",
      pricingModelsError
    );
  if (toolsError)
    return (
      <div className="text-center text-red-400 py-10">
        Erreur lors du chargement des outils IA pour cette catégorie.
      </div>
    );
  if (adsError)
    console.error("Erreur lors du chargement des publicités:", adsError);
  if (featuredToolsError)
    console.error(
      "Erreur lors du chargement des outils en vogue:",
      featuredToolsError
    );
  if (coursesError)
    console.error("Erreur lors du chargement des formations:", coursesError);

  const currentCategory = allCategories?.find(
    (cat) => cat.slug === categorySlug
  );
  const title = currentCategory
    ? `IA dans la catégorie "${currentCategory.name}"`
    : `IA par catégorie`;

  const totalPages = Math.ceil((totalToolsCount || 0) / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          {title}
        </h1>

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
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </section>

        <section className="my-12">
          <AiToolCarousel
            title="IA Populaires Actuellement"
            initialTools={featuredTools || []}
            fetchFeatured={true}
          />
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
  return (
    categories?.map((category) => ({
      categorySlug: category.slug,
    })) || []
  );
}
