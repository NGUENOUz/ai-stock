import { NextRequest } from 'next/server';
import { ToolService } from '@/lib/services/business/tool.service';
import { ToolFilterSchema } from '@/lib/schemas/tool.schema';
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/utils/api-response';

const toolService = new ToolService();

/**
 * GET /api/v1/tools
 * Récupère tous les outils avec filtres et pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extraction et parsing des paramètres
    const filters = {
      search: searchParams.get('search') || undefined,
      categories: searchParams.get('categories')?.split(',') || undefined,
      pricing: searchParams.get('pricing')?.split(',') || undefined,
      is_featured: searchParams.get('is_featured') === 'true' ? true : undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '12'),
      sort_by: searchParams.get('sort_by') as 'created_at' | 'name' | 'popularity' || 'created_at',
      sort_order: searchParams.get('sort_order') as 'asc' | 'desc' || 'desc',
    };

    // Validation des filtres avec Zod
    const validatedFilters = ToolFilterSchema.parse(filters);

    // Récupération des outils via le service
    const result = await toolService.getTools(validatedFilters);

    return successResponse(result);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return validationErrorResponse(error.errors);
    }

    console.error('Erreur GET /api/v1/tools:', error);
    return errorResponse(
      error.message || 'Erreur lors de la récupération des outils',
      'FETCH_ERROR',
      500
    );
  }
}
