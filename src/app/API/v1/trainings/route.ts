import { NextRequest, NextResponse } from 'next/server';
import { TrainingService } from '@/lib/services/business/training.service';
import { TrainingFilterSchema } from '@/lib/schemas/training.schema';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/api-response';

const trainingService = new TrainingService();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parser les paramètres de requête
    const rawFilters = {
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      language: searchParams.get('language') || undefined,
      price: searchParams.get('price') || undefined,
      is_featured: searchParams.get('is_featured') === 'true' ? true : undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 12,
      sort_by: searchParams.get('sort_by') || undefined,
      sort_order: searchParams.get('sort_order') || undefined,
    };

    // Nettoyer les valeurs undefined pour la validation
    const filters = Object.fromEntries(
      Object.entries(rawFilters).filter(([_, v]) => v !== undefined)
    );

    // Valider les filtres
    const validatedFilters = TrainingFilterSchema.parse(filters);

    // Récupérer les formations
    const result = await trainingService.getTrainings(validatedFilters);

    return NextResponse.json(createSuccessResponse(result));
  } catch (error: any) {
    console.error('Error fetching trainings:', error);
    return NextResponse.json(
      createErrorResponse('FETCH_ERROR', error.message || 'Erreur lors de la récupération des formations'),
      { status: 500 }
    );
  }
}
