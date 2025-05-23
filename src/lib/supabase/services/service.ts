// src/services/supabase.ts
import { AiTool, AiToolCategory } from "@/types/type";
import { supabase } from "../supabaseClient";
// import { log } from "console"; // 'log' n'est généralement pas nécessaire ici, sauf si tu l'utilises ailleurs.

export async function getPopularCategories(limit: number = 5): Promise<{ data: AiToolCategory[] | null; error: any }> {
  const { data, error } = await supabase
    .from<AiToolCategory>('ai_tool_categorie') // Assuming 'ai_tool_categorie' is a separate table for categories
    .select('id, name, slug')
    .limit(limit);

  return { data, error };
}

export async function getLatestTools(limit: number = 8): Promise<{ data: AiTool[] | null; error: any }> {
  const { data, error } = await supabase
    .from<AiTool>('ai_tools')
    .select('id, name, slug, description_short, logo_url')
    .order('created_at', { ascending: false })
    .limit(limit);

  return { data, error };
}

export async function getAllTools(): Promise<{ data: AiTool[] | null; error: any }> {
  const { data, error } = await supabase
    .from<AiTool>('ai_tools')
    .select('id, name, slug, description_short, logo_url, website_url, ban_url, pricing, is_featured, categories'); // Inclure 'categories' ici aussi
  return { data, error };
}

export async function getFeaturedTools(limit: number = 4): Promise<{ data: AiTool[] | null; error: any }> {
  const { data, error } = await supabase
    .from<AiTool>('ai_tools')
    .select('id, name, slug, description_short, logo_url, website_url, ban_url, pricing, is_featured, categories') // Assurez-vous d'inclure 'categories' si c'est pertinent
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  return { data, error };
}

// NOUVELLE FONCTION: Récupérer un outil par son slug
export async function getAiToolBySlug(slug: string): Promise<{ data: AiTool | null; error: any }> {
  const { data, error } = await supabase
    .from<AiTool>('ai_tools')
    .select('id, name, slug, description_short, logo_url, description_long, website_url, ban_url, pricing, is_featured, categories') // Utilisation de 'pricing' et inclusion de 'categories'
    .eq('slug', slug)
    .single();

  if (error) {
    console.error("Erreur Supabase pour slug", slug, error);
  }
  console.log("Données reçues pour slug", slug, data);
  return { data: data as AiTool | null, error };
}

// --- Cette fonction getRelatedAiTools EST SUPPRIMÉE ou COMMENTÉE ---
// export async function getRelatedAiTools(currentToolId: string, limit: number = 3): Promise<{ data: AiTool[] | null; error: any }> {
//   // Cette fonction est basée sur l'hypothèse d'une 'category_id' ou d'une logique différente.
//   // Pour la structure avec 'categories: string[]', utilisez getRelatedAiToolsByCategory.
//   // Donc, elle est commentée ou supprimée.
//   // Si tu veux une fonction de suggestion qui n'est PAS basée sur les catégories
//   // (par exemple, des outils aléatoires ou les plus récents, en excluant l'actuel),
//   // nous devrons la réécrire complètement.
//   return { data: null, error: new Error("Function not implemented for current schema.") };
// }


// NOUVELLE FONCTION: Récupérer des outils liés par catégories (tableau de chaînes)
export async function getRelatedAiToolsByCategory(currentToolCategories: string[] | null | undefined, currentToolId: string, limit: number = 6): Promise<{ data: AiTool[] | null; error: any }> {
  if (!currentToolCategories || currentToolCategories.length === 0) {
    console.warn("Aucune catégorie fournie pour l'outil actuel. Retourne des IA en vedette comme fallback.");
    return getFeaturedTools(limit);
  }

  const { data, error } = await supabase
    .from<AiTool>('ai_tools')
    // S'assurer que la chaîne de sélection est compacte et sans saut de ligne inutile
    .select('id, name, slug, description_short, logo_url, website_url, is_featured, pricing, ban_url, categories')
    .overlaps('categories', currentToolCategories)
    .neq('id', currentToolId)
    .order('created_at', { ascending: false })
    .limit(limit);

  return { data: data as AiTool[] | null, error };
}