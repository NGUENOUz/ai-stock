// src/types/training.ts

export interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isFreePreview: boolean;
  videoUrl: string;
}

export interface Training {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  language: string;
  price: number;
  durationMinutes: number;
  numberOfVideos: number;
  instructor: Instructor;
  shortDescription: string;
  longDescription: string;
  lessons: Lesson[];
  isPremium: boolean;
}

// Type pour les données Supabase
export interface TrainingDB {
  id: string;
  title: string;
  description: string | null;
  level: string | null;
  format: string | null;
  image_url: string | null;
  details_url: string | null;
  is_featured: boolean;
  duration_hours: number | null;
  price: number | null;
  created_at?: string;
  updated_at?: string;
}

// Helper pour convertir Supabase → Training
export function mapSupabaseToTraining(data: TrainingDB): Training {
  return {
    id: data.id,
    title: data.title,
    imageUrl: data.image_url || 'https://picsum.photos/600/400',
    category: data.level || 'Non catégorisé',
    language: data.format || 'Français',
    price: data.price || 0,
    durationMinutes: (data.duration_hours || 0) * 60,
    numberOfVideos: 10,
    instructor: {
      id: 'default',
      name: 'Expert AI-STOCK',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      bio: 'Expert en formation digitale',
    },
    shortDescription: data.description?.substring(0, 150) || '',
    longDescription: data.description || '',
    lessons: [],
    isPremium: (data.price || 0) > 0,
  };
}

export type FilterType = 'category' | 'language' | 'price' | 'duration';