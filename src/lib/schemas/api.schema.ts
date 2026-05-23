import { z } from 'zod';

// Schéma de réponse API standardisé
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.any().optional(),
  }).optional(),
  meta: z.object({
    timestamp: z.string(),
    version: z.string(),
  }).optional(),
});

// Types pour les réponses API
export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    version: string;
  };
};

export type ApiError = {
  code: string;
  message: string;
  details?: any;
};
