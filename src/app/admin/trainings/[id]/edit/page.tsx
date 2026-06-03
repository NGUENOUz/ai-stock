'use client';

import { use } from 'react';
import TrainingForm from '../../_components/TrainingForm';
import type { TrainingData } from '../../_components/TrainingForm';

const MOCK_TRAININGS: TrainingData[] = [
  {
    id: '1', title: 'Formation ChatGPT Pro', shortDescription: 'Maîtrisez ChatGPT pour booster votre productivité.',
    longDescription: 'Une formation complète pour apprendre à utiliser ChatGPT dans un contexte professionnel.',
    category: 'IA Générative', level: 'Intermédiaire', language: 'Français',
    price: 99.99, durationMinutes: 300, numberOfVideos: 15,
    thumbnailUrl: 'https://picsum.photos/800/450?random=1', isPremium: false, status: 'published',
    instructorName: 'Marie Dubois', instructorBio: 'Experte IA depuis 8 ans.', instructorAvatar: 'https://i.pravatar.cc/150?img=1',
    lessons: [
      { title: 'Introduction à ChatGPT', duration: '05:30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', isFreePreview: true },
      { title: 'Les prompts avancés', duration: '12:00', videoUrl: '', isFreePreview: false },
    ],
    objectives: ['Utiliser ChatGPT efficacement', 'Créer des prompts optimisés'],
    requirements: ['Accès internet', 'Compte ChatGPT gratuit'],
    tags: ['chatgpt', 'ia', 'productivité'],
  },
  {
    id: '2', title: 'Automatisation avec Zapier', shortDescription: 'Automatisez vos workflows sans coder.',
    longDescription: 'Apprenez à connecter vos applications et automatiser vos tâches répétitives.',
    category: 'Automatisation', level: 'Débutant', language: 'Français',
    price: 49.99, durationMinutes: 180, numberOfVideos: 10,
    thumbnailUrl: 'https://picsum.photos/800/450?random=2', isPremium: false, status: 'published',
    instructorName: 'Jean Martin', instructorBio: 'Expert automatisation.', instructorAvatar: 'https://i.pravatar.cc/150?img=2',
    lessons: [{ title: 'Créer votre premier Zap', duration: '08:00', videoUrl: '', isFreePreview: true }],
    objectives: ['Créer des automatisations'], requirements: ['Compte Zapier gratuit'],
    tags: ['zapier', 'automatisation', 'workflow'],
  },
  {
    id: '3', title: 'Marketing IA Avancé', shortDescription: 'Utilisez l\'IA pour votre stratégie marketing.',
    longDescription: 'Stratégies marketing avancées utilisant les outils IA modernes.',
    category: 'Marketing', level: 'Avancé', language: 'Français',
    price: 149.99, durationMinutes: 420, numberOfVideos: 20,
    thumbnailUrl: 'https://picsum.photos/800/450?random=3', isPremium: true, status: 'draft',
    instructorName: 'Sophie Laurent', instructorBio: 'CMO et experte IA marketing.', instructorAvatar: 'https://i.pravatar.cc/150?img=3',
    lessons: [{ title: 'IA et copywriting', duration: '15:00', videoUrl: '', isFreePreview: false }],
    objectives: ['Créer des campagnes avec l\'IA'], requirements: ['Notions de marketing'],
    tags: ['marketing', 'ia', 'copywriting'],
  },
];

export default function EditTrainingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const training = MOCK_TRAININGS.find(t => t.id === id);

  if (!training) return <div className="p-6 text-center text-gray-500">Formation introuvable.</div>;

  return <TrainingForm initialData={training} isEdit />;
}
