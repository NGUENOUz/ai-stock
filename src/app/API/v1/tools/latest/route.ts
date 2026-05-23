import { NextRequest } from 'next/server';
import { ToolService } from '@/lib/services/business/tool.service';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

const toolService = new ToolService();

/**
 * GET /api/v1/tools/latest
 * Récupère les derniers outils ajoutés
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '8');

    const tools = await toolService.getLatestTools(limit);

    return successResponse(tools);
  } catch (error: any) {
    console.error('Erreur GET /api/v1/tools/latest:', error);
    return errorResponse(
      error.message || 'Erreur lors de la récupération des derniers outils',
      'FETCH_ERROR',
      500
    );
  }
}
