import { NextRequest, NextResponse } from 'next/server';
import { TrainingService } from '@/lib/services/business/training.service';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/api-response';

const trainingService = new TrainingService();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; lessonId: string }> }
) {
  try {
    const { lessonId } = await params;

    const lesson = await trainingService.getLessonById(lessonId);

    return NextResponse.json(createSuccessResponse(lesson));
  } catch (error: any) {
    console.error('Error fetching lesson:', error);
    
    if (error.message === 'Leçon non trouvée') {
      return NextResponse.json(
        createErrorResponse('NOT_FOUND', 'Leçon non trouvée'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createErrorResponse('FETCH_ERROR', error.message || 'Erreur lors de la récupération de la leçon'),
      { status: 500 }
    );
  }
}
