import { NextResponse } from 'next/server';
import { ApiResponse } from '../schemas/api.schema';

const API_VERSION = 'v1';

/**
 * Formate une réponse API réussie
 */
export function successResponse<T>(data: T, status: number = 200): NextResponse<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      version: API_VERSION,
    },
  };

  return NextResponse.json(response, { status });
}

/**
 * Formate une réponse d'erreur API
 */
export function errorResponse(
  message: string,
  code: string = 'INTERNAL_ERROR',
  status: number = 500,
  details?: any
): NextResponse<ApiResponse> {
  const response: ApiResponse = {
    success: false,
    error: {
      code,
      message,
      details,
    },
    meta: {
      timestamp: new Date().toISOString(),
      version: API_VERSION,
    },
  };

  return NextResponse.json(response, { status });
}

/**
 * Gère les erreurs de validation Zod
 */
export function validationErrorResponse(errors: any): NextResponse<ApiResponse> {
  return errorResponse(
    'Erreur de validation',
    'VALIDATION_ERROR',
    400,
    errors
  );
}

/**
 * Erreur 404 - Ressource non trouvée
 */
export function notFoundResponse(resource: string = 'Ressource'): NextResponse<ApiResponse> {
  return errorResponse(
    `${resource} non trouvé(e)`,
    'NOT_FOUND',
    404
  );
}

/**
 * Erreur 401 - Non autorisé
 */
export function unauthorizedResponse(message: string = 'Non autorisé'): NextResponse<ApiResponse> {
  return errorResponse(
    message,
    'UNAUTHORIZED',
    401
  );
}

/**
 * Erreur 403 - Accès interdit
 */
export function forbiddenResponse(message: string = 'Accès interdit'): NextResponse<ApiResponse> {
  return errorResponse(
    message,
    'FORBIDDEN',
    403
  );
}

/**
 * Erreur 409 - Conflit
 */
export function conflictResponse(message: string): NextResponse<ApiResponse> {
  return errorResponse(
    message,
    'CONFLICT',
    409
  );
}

// Alias pour compatibilité
export const createSuccessResponse = <T>(data: T) => ({
  success: true,
  data,
  meta: {
    timestamp: new Date().toISOString(),
    version: API_VERSION,
  },
});

export const createErrorResponse = (code: string, message: string, details?: any) => ({
  success: false,
  error: {
    code,
    message,
    details,
  },
  meta: {
    timestamp: new Date().toISOString(),
    version: API_VERSION,
  },
});
