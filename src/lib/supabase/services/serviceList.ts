// src/lib/supabase/services/service.ts
import { supabase } from '../supabaseClient';
import { AiTool, AiToolCategory, Ads, Formations } from '@/types/type'; // Assurez-vous d'importer les nouveaux types

// ... (vos fonctions existantes : getAllCategories, getFilteredTools, getFeaturedTools, getRelatedAiToolsByCategory)
export async function getAllCategories(): Promise<{ data: AiToolCategory[] | null; error: any }> {
  const { data, error } = await supabase
    .from('ai_tool_categorie') // <<< TRÈS IMPORTANT : Assurez-vous que 'ai_tool_categorie' est le nom exact de votre table de catégories dans Supabase.
    .select('id, name, slug'); // Sélectionne les colonnes nécessaires pour les catégories

  if (error) {
    console.error("Erreur lors de la récupération de toutes les catégories:", error);
  }
  return { data, error };
}

// NOUVEAU : Fonction pour récupérer les publicités actives
export async function getActiveAds(): Promise<{ data: Ads[] | null; error: any }> {
  const { data, error } = await supabase
    .from('ads')
    .select('id, titre, description, image_url, target_url, is_active, order')
    .eq('is_active', true)
    .order('order', { ascending: true });

  // Map French property names to English as expected by Ads type
  const mappedData = data
    ? data.map((ad: any) => ({
        id: ad.id,
        title: ad.titre,
        description: ad.description,
        image_url: ad.image_url,
        target_url: ad.target_url,
        is_active: ad.is_active,
        order: ad.order
      }))
    : null;

  return { data: mappedData, error };
}

// NOUVEAU : Fonction pour récupérer les formations (par exemple, les formations "en vedette")
export async function getFeaturedCourses(limit: number = 3): Promise<{ data: Formations[] | null; error: any }> {
  const { data, error } = await supabase
    .from('formations') // Assurez-vous que le nom de votre table est 'courses'
    .select('*')
    .eq('is_featured', true) // Ou un autre critère pour les "meilleures" formations
    .limit(limit);
  return { data, error };
}


export async function getFilteredTools({
  query,
  categories,
  pricing,
  limit = 20,
  offset = 0,
  includeCount = false // Nouveau paramètre par défaut à false
}: {
  query?: string;
  categories?: string[];
  pricing?: string[];
  limit?: number;
  offset?: number;
  includeCount?: boolean; // Nouveau type
}): Promise<{ data: AiTool[] | null; count: number | null; error: any }> { // Le type de retour a changé
  let dbQuery = supabase.from('ai_tools').select(
   'id, name, slug, description_short, logo_url, website_url, is_featured, pricing, ban_url, categories',
    { count: includeCount ? 'exact' : undefined } // Permet de demander le count conditionnellement
  );

  if (query) {
    dbQuery = dbQuery.or(`name.ilike.%${query}%,description_short.ilike.%${query}%`);
  }

  if (categories && categories.length > 0) {
    dbQuery = dbQuery.overlaps('categories', categories);
  }

  if (pricing && pricing.length > 0) {
    dbQuery = dbQuery.in('pricing', pricing);
  }

  dbQuery = dbQuery.order('name', { ascending: true })
                   .range(offset, offset + limit - 1);

  const { data, count, error } = await dbQuery; // 'count' est maintenant disponible

  if (error) {
    console.error("Erreur lors de la récupération des outils filtrés:", error);
  }
  return { data, count, error }; // Retourner le count
}