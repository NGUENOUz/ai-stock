import WorkflowForm from '../../_components/WorkflowForm';

const MOCK: any = {
  id: '1',
  title: 'Workflow Création Contenu SEO',
  description: 'Générez des articles SEO optimisés en utilisant ChatGPT et SurferSEO. Ce workflow vous guide étape par étape pour produire du contenu de qualité rapidement.',
  category: 'Marketing',
  difficulty: 'intermédiaire',
  status: 'published',
  price: '29',
  isPremium: true,
  duration: '2h/semaine',
  thumbnailUrl: '',
  previewUrl: '',
  tags: ['seo', 'contenu', 'chatgpt'],
  tools: ['ChatGPT', 'SurferSEO', 'Notion'],
  steps: [
    { title: 'Recherche de mots-clés', description: 'Identifier les mots-clés à fort potentiel avec SurferSEO', toolUsed: 'SurferSEO' },
    { title: 'Rédaction du brief', description: 'Créer un brief détaillé pour ChatGPT', toolUsed: 'Notion' },
    { title: 'Génération du contenu', description: 'Utiliser le prompt optimisé pour générer l\'article', toolUsed: 'ChatGPT' },
    { title: 'Optimisation SEO', description: 'Ajuster le contenu selon les recommandations SurferSEO', toolUsed: 'SurferSEO' },
  ],
  useCases: [
    'Blog d\'entreprise',
    'Contenu pour e-commerce',
    'Articles pour agences digitales',
  ],
  requirements: [
    'Compte ChatGPT Plus',
    'Abonnement SurferSEO (Growth+)',
  ],
  outputs: [
    'Article de 1500-2000 mots optimisé SEO',
    'Score SurferSEO > 70',
    'Structure avec H2/H3 optimisés',
  ],
  author: 'Sophie Martin',
};

export default function EditWorkflowPage() {
  return <WorkflowForm initialData={MOCK} isEdit />;
}
