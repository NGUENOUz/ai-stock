// src/app/liste/page.tsx
import React from "react";

import { AiToolCategory } from "@/types/type";
import Link from "next/link"; // Pour les contrôles de pagination
import type { Metadata } from "next"; // Importer Metadata pour generateMetadata

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
// import "../style.scss"; // Assure-toi que ce fichier existe si tu le décommentes

interface ListePageProps {
  searchParams: Promise<{
    q?: string;
    pricing?: string;
    page?: string;
    categories?: string; // <--- AJOUTÉ ICI : si tu veux filtrer par catégorie sur cette page
  }>;
}

const ITEMS_PER_PAGE = 20;

// --- generateMetadata pour cette page ---
// Note: generateMetadata ne reçoit pas searchParams, seulement params.
// Pour une page root comme liste/page.tsx, generateMetadata ne reçoit pas de params non plus.
// Si tu veux un titre dynamique basé sur les query params, tu devrais le faire directement dans le composant
// et utiliser <title> dans le JSX ou une balise <meta> si tu ne veux pas generateMetadata.
// Si tu veux vraiment generateMetadata, elle sera statique ou utilisera des données non basées sur searchParams.
// Je la laisse ici pour l'exemple, mais elle n'utilisera pas searchParams.
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Découvrez les Meilleures Intelligences Artificielles - Mon SAAS AI",
    description:
      "Explorez une liste complète d'outils IA pour tous vos besoins, avec des filtres par catégorie, prix, et plus.",
    keywords:
      "IA, outils IA, intelligence artificielle, meilleures IA, liste IA",
  };
}

export default async function ListePage({ searchParams }: ListePageProps) {
  // Résout la promesse searchParams une seule fois au début
  const resolvedSearchParams = await searchParams;

  const query = resolvedSearchParams.q || "";
  // Utilise resolvedSearchParams.categories, et assure-toi que 'categories' est dans l'interface
  const selectedCategorySlug = resolvedSearchParams.categories || "all";
  const selectedPricingModels = resolvedSearchParams.pricing?.split(",") || [];
  const currentPage = parseInt(resolvedSearchParams.page || "1", 10);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Prépare le tableau de catégories à passer à getFilteredTools
  const categoriesToFilter =
    selectedCategorySlug !== "all" ? [selectedCategorySlug] : undefined;

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
        Erreur lors du chargement des outils IA.
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
          // Si tu veux que la catégorie sélectionnée initialement soit gérée par les searchParams,
          // il faudrait passer `selectedCategorySlug` ici, mais ta SearchAndFilterBar
          // n'a pas `initialSelectedCategorySlug` comme la page dynamique.
          // Assure-toi que le composant SearchAndFilterBar peut gérer un prop pour la catégorie initiale
          // si tu en as besoin sur cette page.
          // initialSelectedCategorySlug={selectedCategorySlug !== 'all' ? selectedCategorySlug : undefined}
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
