import WorkflowForm from '../../_components/WorkflowForm';

const MOCK: any = {
  id: '1',
  title: 'Automatisation Lead Enrichment + CRM',
  tagline: 'Enrichissez et synchronisez vos leads automatiquement',
  description: 'Ce workflow automatise l\'enrichissement de vos leads via Apollo.io et les synchronise directement dans HubSpot. Chaque nouveau lead est enrichi avec des données professionnelles (email, téléphone, entreprise, poste) puis ajouté à votre CRM avec notification Slack.',
  platform: 'N8N',
  category: 'Ventes',
  sector: 'SaaS',
  status: 'published',
  isBestseller: true,
  price: 29,
  isFree: false,
  thumbnail: 'https://picsum.photos/1400/600?random=100',
  apps: [
    { name: 'Apollo.io', logo: 'https://picsum.photos/60/60?random=1', role: 'Enrichissement données' },
    { name: 'HubSpot', logo: 'https://picsum.photos/60/60?random=2', role: 'CRM' },
    { name: 'Slack', logo: 'https://picsum.photos/60/60?random=3', role: 'Notifications' },
  ],
  contributor: {
    name: 'Sophie Martin',
    avatar: 'https://picsum.photos/100/100?random=10',
    role: 'Expert Automation',
    verified: true,
    totalWorkflows: 24,
    totalStudents: 3400,
  },
  features: [
    'Enrichissement automatique via Apollo API',
    'Synchronisation bidirectionnelle HubSpot',
    'Notifications Slack en temps réel',
    'Gestion des doublons intelligente',
    'Logs et rapports détaillés',
    'Support multi-pipelines',
  ],
  requirements: [
    'Compte N8N (gratuit ou payant)',
    'API Key Apollo.io',
    'Compte HubSpot avec accès API',
    'Webhook Slack (optionnel)',
  ],
  steps: [
    { title: 'Télécharger le workflow', desc: 'Cliquez sur le bouton de téléchargement pour obtenir le fichier JSON' },
    { title: 'Importer dans N8N', desc: 'Ouvrez N8N, allez dans Workflows > Import from File et sélectionnez le JSON' },
    { title: 'Configurer les credentials', desc: 'Ajoutez vos API keys Apollo, HubSpot et Slack dans les nodes correspondants' },
    { title: 'Tester le workflow', desc: 'Lancez un test avec un lead fictif pour vérifier que tout fonctionne' },
    { title: 'Activer l\'automatisation', desc: 'Activez le workflow et profitez de l\'automatisation complète' },
  ],
  stats: [
    { label: 'Temps gagné', value: '15h/mois' },
    { label: 'Taux de succès', value: '98%' },
    { label: 'Utilisateurs', value: '1.2K+' },
    { label: 'Note moyenne', value: '4.9/5' },
  ],
};

export default function EditWorkflowPage() {
  return <WorkflowForm initialData={MOCK} isEdit />;
}
