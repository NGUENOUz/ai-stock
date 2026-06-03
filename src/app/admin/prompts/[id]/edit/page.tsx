'use client';

import { use } from 'react';
import PromptForm from '../../_components/PromptForm';
import type { PromptData } from '../../_components/PromptForm';

const MOCK_PROMPTS: PromptData[] = [
  { id: '1', title: 'Prompt Marketing Instagram', category: 'Marketing', type: 'text', prompt: 'Crée 10 posts Instagram percutants pour [PRODUIT] ciblant [AUDIENCE]. Chaque post doit inclure : un hook accrocheur, le corps du message, 5 hashtags pertinents et un call-to-action clair.', description: 'Génère des posts Instagram viraux.', style: 'Professionnel', tool: 'ChatGPT', tags: ['social', 'instagram'], price: 9.99, isPremium: false, status: 'published', imageUrl: '', downloads: 234, likes: 89 },
  { id: '2', title: 'Génération Portrait Artistique', category: 'Design', type: 'image', prompt: 'Portrait of [SUBJECT], cinematic lighting, ultra-realistic, 8K, professional photography, shallow depth of field, bokeh background, award winning photo --ar 2:3 --v 6', description: 'Portrait artistique haute qualité.', style: 'Réaliste, Cinématique', tool: 'Midjourney', tags: ['portrait', 'art'], price: 14.99, isPremium: true, status: 'published', imageUrl: 'https://picsum.photos/400/300?random=10', downloads: 189, likes: 120 },
  { id: '3', title: 'Rédaction Article SEO', category: 'SEO', type: 'text', prompt: 'Rédige un article SEO de 1500 mots sur [SUJET] avec les mots-clés principaux [KEYWORDS]. Structure : introduction accrocheuse, 3-5 sections H2 avec sous-titres H3, conclusion avec appel à l\'action.', description: 'Article optimisé pour le référencement.', style: 'Informatif', tool: 'Claude', tags: ['seo', 'article'], price: 12.99, isPremium: false, status: 'draft', imageUrl: '', downloads: 156, likes: 67 },
];

export default function EditPromptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const prompt = MOCK_PROMPTS.find(p => p.id === id);

  if (!prompt) return <div className="p-6 text-center text-gray-500">Prompt introuvable.</div>;

  return <PromptForm initialData={prompt} isEdit />;
}
