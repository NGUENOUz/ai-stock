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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log('[API] Recherche outil avec:', id);

    // Essayer de récupérer par slug d'abord, puis par ID
    let tool;
    
    try {
      tool = await toolService.getToolBySlug(id);
      console.log('[API] Trouvé par slug:', tool?.name);
    } catch (slugError) {
      console.log('[API] Non trouvé par slug, essai par ID...');
      try {
        tool = await toolService.getToolById(id);
        console.log('[API] Trouvé par ID:', tool?.name);
      } catch (idError) {
        console.log('[API] Non trouvé par ID non plus');
      }
    }

    if (!tool) {
      console.log('[API] Outil introuvable:', id);
      return notFoundResponse('Outil');
    }

    console.log('[API] Retour outil:', tool.name);
    return successResponse(tool);
  } catch (error: any) {
    console.error('[API] Erreur GET /api/v1/tools/[id]:', error);
    
    return errorResponse(
      error.message || 'Erreur lors de la récupération de l\'outil',
      'FETCH_ERROR',
      500
    );
  }
}
