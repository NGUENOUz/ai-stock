'use client';

import { use } from 'react';
import ToolForm from '../../_components/ToolForm';
import type { ToolData } from '../../_components/ToolForm';

const MOCK_TOOLS: ToolData[] = [
  {
    id: '1', name: 'ChatGPT', tagline: 'Assistant IA conversationnel', category: 'IA Générative',
    pricing: 'freemium', url: 'https://chat.openai.com', description: 'Assistant IA conversationnel par OpenAI.',
    tags: ['chatbot', 'openai'], status: 'published', logoUrl: '', bannerUrl: '',
    priceMonthly: '20€', priceDetails: "Gratuit jusqu'à 100 msg/jour",
    users: '100M+', rating: 4.9, reviews: 50000, upvotes: 98000, uptime: '99.9%', accuracy: '90%', marketsCount: '',
    highlights: ['GPT-4 disponible', 'Vision et code'], features: [{ title: 'Chat IA', desc: 'Conversations naturelles' }],
    useCases: [{ title: 'Rédaction', desc: 'Génère du contenu' }], benefits: ['Accès API'], views: 12450, verified: true,
  },
  {
    id: '2', name: 'Midjourney', tagline: "Génération d'images par IA", category: 'Design',
    pricing: 'paid', url: 'https://midjourney.com', description: "Génération d'images par IA.",
    tags: ['image', 'design'], status: 'published', logoUrl: '', bannerUrl: '',
    priceMonthly: '10€', priceDetails: '200 images/mois',
    users: '15M+', rating: 4.8, reviews: 12000, upvotes: 45000, uptime: '99.5%', accuracy: '', marketsCount: '',
    highlights: ['Qualité exceptionnelle'], features: [{ title: 'Image Gen', desc: 'Génère des images' }],
    useCases: [{ title: 'Design', desc: 'Créer des visuels' }], benefits: ['Accès Discord'], views: 8920, verified: true,
  },
  {
    id: '3', name: 'Notion AI', tagline: 'Espace de travail intelligent', category: 'Productivité',
    pricing: 'freemium', url: 'https://notion.so', description: 'Espace de travail tout-en-un avec IA.',
    tags: ['notes', 'productivity'], status: 'published', logoUrl: '', bannerUrl: '',
    priceMonthly: '8€', priceDetails: 'Gratuit en solo',
    users: '30M+', rating: 4.7, reviews: 8000, upvotes: 22000, uptime: '99.8%', accuracy: '', marketsCount: '',
    highlights: ['IA intégrée'], features: [{ title: 'Notes IA', desc: 'Rédaction assistée' }],
    useCases: [{ title: 'Productivité', desc: 'Organiser son travail' }], benefits: ['Stockage illimité'], views: 6780, verified: false,
  },
  {
    id: '4', name: 'Zapier', tagline: 'Automatisation sans code', category: 'Automatisation',
    pricing: 'freemium', url: 'https://zapier.com', description: 'Automatisation de workflows.',
    tags: ['automation', 'workflow'], status: 'draft', logoUrl: '', bannerUrl: '',
    priceMonthly: '19€', priceDetails: '100 tâches/mois gratuit',
    users: '5M+', rating: 4.6, reviews: 6000, upvotes: 18000, uptime: '99.7%', accuracy: '', marketsCount: '',
    highlights: ['5000+ intégrations'], features: [{ title: 'Zaps', desc: 'Automatiser des tâches' }],
    useCases: [{ title: 'Workflow', desc: 'Connecter des apps' }], benefits: ['5000+ apps'], views: 5430, verified: false,
  },
];

export default function EditToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const tool = MOCK_TOOLS.find(t => t.id === id);

  if (!tool) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Outil introuvable.</p>
      </div>
    );
  }

  return <ToolForm initialData={tool} isEdit />;
}
