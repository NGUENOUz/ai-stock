// src/types/training.ts

export interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
  bio:string;
  // Ajoutez d'autres champs comme 'bio', 'followersCount', etc. si nécessaire
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; // ex: "05:30"
  isFreePreview: boolean; // Utile pour les aperçus gratuits
  videoUrl:string;
 
}

export interface Training {
  id: string;
  title: string;
  imageUrl: string; // Couverture de la formation
  category: string;
  language: string;
  price: number;
  durationMinutes: number; // Durée totale en minutes pour le filtre
  numberOfVideos: number;
  instructor: Instructor;
  shortDescription: string;
  // Détails de la formation (pour la page de détail)
  longDescription: string;
  lessons: Lesson[];
  isPremium:boolean;
}

export type FilterType = 'category' | 'language' | 'price' | 'duration';