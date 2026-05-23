import { z } from 'zod';

// Schéma pour Instructor
export const InstructorSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatarUrl: z.string().url(),
  bio: z.string(),
});

// Schéma pour Lesson
export const LessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.string(),
  isFreePreview: z.boolean(),
  videoUrl: z.string().url(),
  order: z.number().optional(),
});

// Schéma pour Training
export const TrainingSchema = z.object({
  id: z.string(),
  title: z.string(),
  imageUrl: z.string().url(),
  category: z.string(),
  language: z.string(),
  price: z.number().min(0),
  durationMinutes: z.number().min(0),
  numberOfVideos: z.number().min(0),
  instructor: InstructorSchema,
  shortDescription: z.string(),
  longDescription: z.string(),
  lessons: z.array(LessonSchema),
  isPremium: z.boolean(),
  slug: z.string().optional(),
  is_featured: z.boolean().optional(),
  created_at: z.string().optional(),
});

// Schéma pour les filtres
export const TrainingFilterSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  language: z.string().optional(),
  price: z.enum(['all', 'free', 'premium']).optional(),
  is_featured: z.boolean().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  sort_by: z.enum(['created_at', 'title', 'price', 'durationMinutes']).optional(),
  sort_order: z.enum(['asc', 'desc']).optional(),
});

// Types TypeScript
export type Instructor = z.infer<typeof InstructorSchema>;
export type Lesson = z.infer<typeof LessonSchema>;
export type Training = z.infer<typeof TrainingSchema>;
export type TrainingFilter = z.infer<typeof TrainingFilterSchema>;

// Schéma pour la réponse paginée
export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// Schéma pour création
export const CreateTrainingSchema = TrainingSchema.omit({ 
  id: true, 
  created_at: true 
});

export type CreateTrainingInput = z.infer<typeof CreateTrainingSchema>;

// Schéma pour mise à jour
export const UpdateTrainingSchema = TrainingSchema.partial().omit({ 
  id: true, 
  created_at: true 
});

export type UpdateTrainingInput = z.infer<typeof UpdateTrainingSchema>;
