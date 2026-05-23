import { supabase } from '../supabase/supabaseClient';
import { Training, Lesson, Instructor } from '@/types/training';
import { TrainingFilter } from '../schemas/training.schema';

export class TrainingRepository {
  private tableName = 'trainings';
  private lessonsTable = 'lessons';
  private instructorsTable = 'instructors';

  private mapToTraining(data: any, instructor: any, lessons: any[]): Training {
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      imageUrl: data.imageurl,
      category: data.category,
      language: data.language,
      price: data.price,
      durationMinutes: data.durationminutes,
      numberOfVideos: data.numberofvideos,
      shortDescription: data.shortdescription,
      longDescription: data.longdescription,
      isPremium: data.ispremium,
      is_featured: data.is_featured,
      created_at: data.created_at,
      instructor: instructor ? {
        id: instructor.id,
        name: instructor.name,
        avatarUrl: instructor.avatarurl,
        bio: instructor.bio,
      } : null,
      lessons: lessons.map(this.mapToLesson),
    } as Training;
  }

  private mapToLesson(lesson: any): Lesson {
    return {
      id: lesson.id,
      title: lesson.title,
      duration: lesson.duration,
      isFreePreview: lesson.isfreepreview,
      videoUrl: lesson.videourl,
      order: lesson.order,
    };
  }

  async findAll(filters?: TrainingFilter): Promise<{ data: Training[]; total: number }> {
    let query = supabase
      .from(this.tableName)
      .select('*', { count: 'exact' });

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,shortdescription.ilike.%${filters.search}%`);
    }

    if (filters?.category && filters.category !== 'all') {
      query = query.eq('category', filters.category);
    }

    if (filters?.language && filters.language !== 'all') {
      query = query.eq('language', filters.language);
    }

    if (filters?.price === 'free') {
      query = query.eq('ispremium', false);
    } else if (filters?.price === 'premium') {
      query = query.eq('ispremium', true);
    }

    if (filters?.is_featured !== undefined) {
      query = query.eq('is_featured', filters.is_featured);
    }

    const sortBy = filters?.sort_by || 'created_at';
    const sortOrder = filters?.sort_order === 'asc' ? { ascending: true } : { ascending: false };
    query = query.order(sortBy, sortOrder);

    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    const trainingsWithDetails = await Promise.all(
      (data || []).map(async (training: any) => {
        const { data: instructor } = await supabase
          .from(this.instructorsTable)
          .select('*')
          .eq('id', training.instructor_id)
          .single();

        const { data: lessons } = await supabase
          .from(this.lessonsTable)
          .select('*')
          .eq('trainingid', training.id)
          .order('order', { ascending: true });

        return this.mapToTraining(training, instructor, lessons || []);
      })
    );

    return {
      data: trainingsWithDetails,
      total: count || 0,
    };
  }

  async findById(id: string): Promise<Training | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching training:', error);
      throw error;
    }
    if (!data) return null;

    const { data: instructor, error: instructorError } = await supabase
      .from(this.instructorsTable)
      .select('*')
      .eq('id', data.instructor_id)
      .maybeSingle();

    if (instructorError) {
      console.error('Error fetching instructor:', instructorError);
    }

    const { data: lessons, error: lessonsError } = await supabase
      .from(this.lessonsTable)
      .select('*')
      .eq('trainingid', id)
      .order('order', { ascending: true });

    if (lessonsError) {
      console.error('Error fetching lessons:', lessonsError);
    }

    return this.mapToTraining(data, instructor, lessons || []);
  }

  async findBySlug(slug: string): Promise<Training | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    if (!data) return null;

    const { data: instructor } = await supabase
      .from(this.instructorsTable)
      .select('*')
      .eq('id', data.instructor_id)
      .single();

    const { data: lessons } = await supabase
      .from(this.lessonsTable)
      .select('*')
      .eq('trainingid', data.id)
      .order('order', { ascending: true });

    return this.mapToTraining(data, instructor, lessons || []);
  }

  async findFeatured(limit: number = 4): Promise<Training[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    const trainingsWithDetails = await Promise.all(
      (data || []).map(async (training: any) => {
        const { data: instructor } = await supabase
          .from(this.instructorsTable)
          .select('*')
          .eq('id', training.instructor_id)
          .single();

        const { data: lessons } = await supabase
          .from(this.lessonsTable)
          .select('*')
          .eq('trainingid', training.id)
          .order('order', { ascending: true });

        return this.mapToTraining(training, instructor, lessons || []);
      })
    );

    return trainingsWithDetails;
  }

  async findLatest(limit: number = 8): Promise<Training[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    const trainingsWithDetails = await Promise.all(
      (data || []).map(async (training: any) => {
        const { data: instructor } = await supabase
          .from(this.instructorsTable)
          .select('*')
          .eq('id', training.instructor_id)
          .single();

        const { data: lessons } = await supabase
          .from(this.lessonsTable)
          .select('*')
          .eq('trainingid', training.id)
          .order('order', { ascending: true });

        return this.mapToTraining(training, instructor, lessons || []);
      })
    );

    return trainingsWithDetails;
  }

  async findLessonsByTrainingId(trainingId: string): Promise<Lesson[]> {
    const { data, error } = await supabase
      .from(this.lessonsTable)
      .select('*')
      .eq('trainingid', trainingId)
      .order('order', { ascending: true });

    if (error) throw error;
    return (data || []).map(this.mapToLesson);
  }

  async findLessonById(lessonId: string): Promise<Lesson | null> {
    const { data, error } = await supabase
      .from(this.lessonsTable)
      .select('*')
      .eq('id', lessonId)
      .single();

    if (error) throw error;
    return data ? this.mapToLesson(data) : null;
  }

  async create(training: Partial<Training>): Promise<Training> {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(training)
      .select('*')
      .single();

    if (error) throw error;

    const { data: instructor } = await supabase
      .from(this.instructorsTable)
      .select('*')
      .eq('id', data.instructor_id)
      .single();

    return this.mapToTraining(data, instructor, []);
  }

  async update(id: string, training: Partial<Training>): Promise<Training> {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(training)
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw error;

    const { data: instructor } = await supabase
      .from(this.instructorsTable)
      .select('*')
      .eq('id', data.instructor_id)
      .single();

    const { data: lessons } = await supabase
      .from(this.lessonsTable)
      .select('*')
      .eq('trainingid', id)
      .order('order', { ascending: true });

    return this.mapToTraining(data, instructor, lessons || []);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async exists(slug: string): Promise<boolean> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('id')
      .eq('slug', slug)
      .single();

    return !error && data !== null;
  }
}
