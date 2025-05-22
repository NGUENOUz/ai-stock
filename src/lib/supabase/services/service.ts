import { AiTool, AiToolCategory } from "@/types/type";
import { supabase } from "../supabaseClient";

export async function getPopularCategories(limit: number = 5): Promise<{ data: AiToolCategory[] | null; error: any }> {
    const { data, error } = await supabase
      .from<AiToolCategory>('ai_tool_categorie')
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
      .select('id, name, slug, description_short, logo_url');
  
    return { data, error };
  }


  export async function getFeaturedTools(limit: number = 4): Promise<{ data: AiTool[] | null; error: any }> {
    // Ici, nous récupérons les outils marqués comme "featured" et leurs catégories associées
    const { data, error } = await supabase
      .from<AiTool>('ai_tools')
      .select('id, name, slug, description_short, logo_url, website_url, ban_url, pricing, is_featured ') // Récupère les catégories via la relation
      .eq('is_featured', true) // Filtre par la colonne is_featured
      .order('created_at', { ascending: false }) // Ou un autre ordre pertinent
      .limit(limit);
  
    return { data, error };
  }






  // NOUVELLE FONCTION: Récupérer un outil par son slug
export async function getAiToolBySlug(slug: string): Promise<{ data: AiTool | null; error: any }> {
  const { data, error } = await supabase
    .from<AiTool>('ai_tools')
    .select('id, name, slug, description_short, logo_url,description_long, website_url, ban_url, pricing, is_featured ')
    .eq('slug', slug)
    .single(); // Utilise .single() car on s'attend à un seul résultat

    if (error) {
      console.error("Erreur Supabase pour slug", slug, error); // Ajoute ceci
    }
    console.log("Données reçues pour slug", slug, data);
  return { data: data as AiTool | null, error };
}

// NOUVELLE FONCTION: Récupérer des outils similaires (suggestions)
export async function getRelatedAiTools(currentToolId: string, limit: number = 3): Promise<{ data: AiTool[] | null; error: any }> {
  // Option 1: Suggestions basées sur le fait d'être "featured" (simple)
  // Cela récupère d'autres outils featured, en excluant l'outil actuel.
  const { data, error } = await supabase
    .from('ai_tools')
    .select(`
      id,
      name,
      slug,
      description_short,
      logo_url,
      website_url,
      is_featured,
      pricing_model,
      ban_url
    `)
    .eq('is_featured', true)
    .neq('id', currentToolId) // Exclue l'outil actuel
    .order('created_at', { ascending: false }) // Ou un autre ordre pertinent
    .limit(limit);

  // Option 2: Suggestions basées sur la même catégorie (nécessite une colonne category_id)
  /*
  // D'abord, récupère la catégorie de l'outil actuel
  const { data: currentTool, error: toolError } = await supabase
    .from('ai_tools')
    .select('category_id') // Supposons que tu as une colonne category_id
    .eq('id', currentToolId)
    .single();

  if (toolError || !currentTool || !currentTool.category_id) {
    // Gère l'erreur ou si l'outil n'a pas de catégorie
    console.error("Erreur ou pas de catégorie pour l'outil actuel", toolError);
    return { data: null, error: toolError || new Error("Tool or category not found") };
  }

  // Ensuite, récupère les outils de la même catégorie, excluant l'outil actuel
  const { data, error } = await supabase
    .from('ai_tools')
    .select(`
      id,
      name,
      slug,
      description_short,
      logo_url,
      website_url,
      is_featured,
      pricing_model,
      ban_url
    `)
    .eq('category_id', currentTool.category_id)
    .neq('id', currentToolId)
    .order('created_at', { ascending: false })
    .limit(limit);
  */

  return { data: data as AiTool[] | null, error };
}