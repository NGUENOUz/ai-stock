import TournamentForm from '../../_components/TournamentForm';

const MOCK: any = {
  id: '1',
  title: 'Meilleur Prompt ChatGPT Marketing',
  description: 'Créez le prompt le plus efficace pour générer des campagnes marketing complètes et percutantes.',
  type: 'prompt',
  status: 'active',
  prize: '500€',
  prizeDetails: '300€ cash + 200€ en crédits plateforme',
  startDate: '2024-01-15',
  endDate: '2024-02-15',
  maxParticipants: '200',
  rules: [
    'Le prompt doit être original et non publié ailleurs',
    'Maximum 3 soumissions par participant',
    'Le prompt doit fonctionner avec ChatGPT 4',
  ],
  criteria: [
    { title: 'Créativité', weight: '30%' },
    { title: 'Efficacité', weight: '40%' },
    { title: 'Originalité', weight: '30%' },
  ],
  rewards: [
    { rank: '1er', prize: '300€' },
    { rank: '2ème', prize: '150€' },
    { rank: '3ème', prize: '50€' },
  ],
  imageUrl: '',
  tags: ['marketing', 'chatgpt', 'prompt'],
  isPublic: true,
};

export default function EditTournamentPage() {
  return <TournamentForm initialData={MOCK} isEdit />;
}
