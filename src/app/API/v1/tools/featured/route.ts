import { NextRequest } from 'next/server';
import { ToolService } from '@/lib/services/business/tool.service';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

const toolService = new ToolService();

/**
 * GET /api/v1/tools/featured
 * Récupère les outils en vedette
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '4');

    const tools = await toolService.getFeaturedTools(limit);

    return successResponse(tools);
  } catch (error: any) {
    console.error('Erreur GET /api/v1/tools/featured:', error);
    return errorResponse(
      error.message || 'Erreur lors de la récupération des outils en vedette',
      'FETCH_ERROR',
      500
    );
  }
}
