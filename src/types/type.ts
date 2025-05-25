export interface AiToolCategory {
  id: string;
  name: string;
  slug: string;
  // ... potentiellement d'autres champs
}

export type PricingModel = 'Gratuit' | 'Payant' | 'Essai Gratuit' | 'Freemium' | 'Contact pour Prix' | 'Non spécifié';

export interface AiTool {
  id: string;
  name: string;
  slug: string;
  pricing:PricingModel;
  ban_url?:string;
  description_short?: string;
  logo_url?: string;
  website_url?: string; // URL du site de l'IA
  is_featured?: boolean;
  categories?: string[] | null;
  description_long?: string;
  // ... potentiellement d'autres champs
}

export interface Ads {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  target_url: string;
  is_active: boolean;
  order: number; // Pour définir l'ordre d'affichage dans le slider
}
export interface Formations {
  id: string;
  title: string;
  description: string;
  level:string;
  format:string;
  image_url: string;
  details_url: string; // URL vers la page de détails de la formation
  is_featured: boolean;
}

export interface PaginatedTools {
   tools: AiTool[];
  totalCount: number;
   currentPage: number;
   totalPages: number;
 }

