import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/supabaseClient';

export async function GET(request: NextRequest) {
  try {
    const { data: trainings, error: trainingsError } = await supabase
      .from('trainings')
      .select('*')
      .limit(1);

    const { data: instructors, error: instructorsError } = await supabase
      .from('instructors')
      .select('*')
      .limit(1);

    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .limit(1);

    return NextResponse.json({
      success: true,
      data: {
        trainings: {
          data: trainings,
          error: trainingsError?.message,
        },
        instructors: {
          data: instructors,
          error: instructorsError?.message,
        },
        lessons: {
          data: lessons,
          error: lessonsError?.message,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
