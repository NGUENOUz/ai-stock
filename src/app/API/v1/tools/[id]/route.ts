import { NextRequest } from 'next/server';
import { ToolService } from '@/lib/services/business/tool.service';
import { successResponse, errorResponse, notFoundResponse } from '@/lib/utils/api-response';

const toolService = new ToolService();

/**
 * GET /api/v1/tools/[id]
 * Récupère un outil par son ID ou slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Essayer de récupérer par ID ou par slug
    let tool;
    try {
      tool = await toolService.getToolById(id);
    } catch {
      tool = await toolService.getToolBySlug(id);
    }

    if (!tool) {
      return notFoundResponse('Outil');
    }

    return successResponse(tool);
  } catch (error: any) {
    console.error('Erreur GET /api/v1/tools/[id]:', error);
    
    if (error.message === 'Outil non trouvé') {
      return notFoundResponse('Outil');
    }

    return errorResponse(
      error.message || 'Erreur lors de la récupération de l\'outil',
      'FETCH_ERROR',
      500
    );
  }
}
