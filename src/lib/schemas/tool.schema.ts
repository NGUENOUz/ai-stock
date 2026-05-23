import { z } from 'zod';

// Schéma de validation pour PricingModel
export const PricingModelSchema = z.enum([
  'Gratuit',
  'Payant',
  'Essai Gratuit',
  'Freemium',
  'Contact pour Prix',
  'Non spécifié'
]);

// Schéma pour la création d'un outil
export const CreateToolSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, "Le slug doit être en minuscules avec des tirets"),
  description_short: z.string().min(10, "La description courte doit contenir au moins 10 caractères").max(200).optional(),
  description_long: z.string().min(50, "La description longue doit contenir au moins 50 caractères").optional(),
  logo_url: z.string().url("URL du logo invalide").optional(),
  ban_url: z.string().url("URL de la bannière invalide").optional(),
  website_url: z.string().url("URL du site web invalide").optional(),
  pricing: PricingModelSchema.default('Non spécifié'),
  categories: z.array(z.string()).min(1, "Au moins une catégorie est requise").max(5, "Maximum 5 catégories"),
  is_featured: z.boolean().default(false),
});

// Schéma pour la mise à jour d'un outil
export const UpdateToolSchema = CreateToolSchema.partial();

// Schéma pour les filtres de recherche
export const ToolFilterSchema = z.object({
  search: z.string().optional(),
  categories: z.array(z.string()).optional(),
  pricing: z.array(PricingModelSchema).optional(),
  is_featured: z.boolean().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(12),
  sort_by: z.enum(['created_at', 'name', 'popularity']).default('created_at'),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
});

// Schéma de réponse paginée
export const PaginatedResponseSchema = z.object({
  data: z.array(z.any()),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});

// Types TypeScript générés depuis les schémas
export type CreateToolInput = z.infer<typeof CreateToolSchema>;
export type UpdateToolInput = z.infer<typeof UpdateToolSchema>;
export type ToolFilter = z.infer<typeof ToolFilterSchema>;
export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
