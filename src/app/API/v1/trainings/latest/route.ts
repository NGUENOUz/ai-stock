import { NextRequest, NextResponse } from 'next/server';
import { TrainingService } from '@/lib/services/business/training.service';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/api-response';

const trainingService = new TrainingService();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 8;

    const trainings = await trainingService.getLatestTrainings(limit);

    return NextResponse.json(createSuccessResponse(trainings));
  } catch (error: any) {
    console.error('Error fetching latest trainings:', error);
    return NextResponse.json(
      createErrorResponse('FETCH_ERROR', error.message || 'Erreur lors de la récupération des dernières formations'),
      { status: 500 }
    );
  }
}
