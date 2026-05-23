import { NextRequest, NextResponse } from 'next/server';
import { TrainingService } from '@/lib/services/business/training.service';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/api-response';

const trainingService = new TrainingService();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Fetching training with ID:', id);

    const training = await trainingService.getTrainingById(id);
    console.log('Training found:', training ? 'YES' : 'NO');

    return NextResponse.json(createSuccessResponse(training));
  } catch (error: any) {
    console.error('Error fetching training:', error);
    
    if (error.message === 'Formation non trouvée') {
      return NextResponse.json(
        createErrorResponse('NOT_FOUND', 'Formation non trouvée'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createErrorResponse('FETCH_ERROR', error.message || 'Erreur lors de la récupération de la formation'),
      { status: 500 }
    );
  }
}
