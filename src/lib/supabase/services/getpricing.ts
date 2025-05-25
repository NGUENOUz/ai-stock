// src/lib/supabase/services/service.ts

import { supabase } from '../supabaseClient';
// ... (vos autres imports)

export async function getUniquePricingModels(): Promise<{ data: string[] | null; error: any }> {
  // Récupérer toutes les valeurs de 'pricing' sans le distinct ici
  // Nous allons faire le distinct côté JavaScript pour plus de contrôle
  const { data, error } = await supabase
    .from('ai_tools')
    .select('pricing');

  if (error) {
    console.error("Erreur lors de la récupération des modèles de prix uniques:", error);
    return { data: null, error };
  }

  // Extrait les valeurs de 'pricing', filtre les nulls/undefined, et s'assure de l'unicité avec un Set
  // Convertit en minuscules et trim pour une meilleure uniformisation côté code si la DB n'est pas parfaite.
  const pricingModelsRaw = data.map(item => item.pricing).filter(Boolean) as string[];

  // Normalise et rend les valeurs uniques
  const uniqueNormalizedModels = Array.from(new Set(
    pricingModelsRaw.map(model => model.trim()) // Enlève les espaces en début/fin
  ));

  // Optionnel: Définir un ordre préféré ou inclure des valeurs par défaut si non présentes
  const preferredOrder = ['Gratuit', 'Freemium', 'Payant', 'Essai Gratuit', 'Contact pour Prix', 'Non spécifié'];

  // Filtrer les modèles uniques pour correspondre à l'ordre préféré, puis ajouter les autres si existants
  const sortedModels = preferredOrder.filter(model => uniqueNormalizedModels.includes(model));
  const otherModels = uniqueNormalizedModels.filter(model => !preferredOrder.includes(model));

  // Combine les listes, mettant les modèles connus en premier dans l'ordre préféré, puis les autres
  const finalPricingModels = [...sortedModels, ...otherModels];


  return { data: finalPricingModels, error: null };
}