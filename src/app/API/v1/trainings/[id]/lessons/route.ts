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

    const lessons = await trainingService.getTrainingLessons(id);

    return NextResponse.json(createSuccessResponse(lessons));
  } catch (error: any) {
    console.error('Error fetching lessons:', error);
    
    if (error.message === 'Formation non trouvée') {
      return NextResponse.json(
        createErrorResponse('NOT_FOUND', 'Formation non trouvée'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createErrorResponse('FETCH_ERROR', error.message || 'Erreur lors de la récupération des leçons'),
      { status: 500 }
    );
  }
}
