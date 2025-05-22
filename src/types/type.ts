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
  category_id?: string | null;
  description_long?: string;
  // ... potentiellement d'autres champs
}
