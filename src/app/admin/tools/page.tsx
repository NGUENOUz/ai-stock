'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, ExternalLink } from 'lucide-react';
import type { ToolData } from './_components/ToolForm';

const INITIAL_TOOLS: ToolData[] = [
  {
    id: '1', name: 'ChatGPT', tagline: 'Assistant IA conversationnel', category: 'IA Générative',
    pricing: 'freemium', url: 'https://chat.openai.com', description: 'Assistant IA conversationnel par OpenAI.',
    tags: ['chatbot', 'openai'], status: 'published', logoUrl: '', bannerUrl: '',
    priceMonthly: '20€', priceDetails: "Gratuit jusqu'à 100 msg/jour",
    users: '100M+', rating: 4.9, reviews: 50000, upvotes: 98000, uptime: '99.9%', accuracy: '90%', marketsCount: '',
    highlights: ['GPT-4 disponible'], features: [{ title: 'Chat IA', desc: 'Conversations naturelles' }],
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
    pricing: 'freemium', url: 'https://zapier.com', description: 'Automatisation de workflows entre applications.',
    tags: ['automation', 'workflow'], status: 'draft', logoUrl: '', bannerUrl: '',
    priceMonthly: '19€', priceDetails: '100 tâches/mois gratuit',
    users: '5M+', rating: 4.6, reviews: 6000, upvotes: 18000, uptime: '99.7%', accuracy: '', marketsCount: '',
    highlights: ['5000+ intégrations'], features: [{ title: 'Zaps', desc: 'Automatiser des tâches' }],
    useCases: [{ title: 'Workflow', desc: 'Connecter des apps' }], benefits: ['5000+ apps'], views: 5430, verified: false,
  },
];

const PRICING_STYLES = { free: 'bg-green-50 text-green-700', freemium: 'bg-blue-50 text-blue-700', paid: 'bg-red-50 text-red-700' };
const PRICING_LABELS = { free: 'Gratuit', freemium: 'Freemium', paid: 'Payant' };

export default function ToolsPage() {
  const [tools, setTools] = useState<ToolData[]>(INITIAL_TOOLS);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = tools.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteId) {
      setTools(prev => prev.filter(t => t.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1">Outils IA</h1>
          <p className="text-gray-500">{tools.length} outil{tools.length > 1 ? 's' : ''} au total</p>
        </div>
        <Link
          href="/admin/tools/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nouvel Outil
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            placeholder="Rechercher un outil..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 outline-none text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Outil</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tarif</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Utilisateurs</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">Aucun outil trouvé</td>
                </tr>
              ) : (
                filtered.map(tool => (
                  <tr key={tool.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 overflow-hidden">
                          {tool.logoUrl
                            ? <img src={tool.logoUrl} alt={tool.name} className="w-full h-full object-cover" />
                            : <span className="text-lg font-bold text-purple-600">{tool.name[0]}</span>
                          }
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 flex items-center gap-1">
                            {tool.name}
                            {tool.verified && <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full font-semibold">✓</span>}
                          </div>
                          <a href={tool.url} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-gray-400 hover:text-purple-600 flex items-center gap-1 transition-colors">
                            {tool.url.replace('https://', '')}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        {tool.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${PRICING_STYLES[tool.pricing]}`}>
                        {PRICING_LABELS[tool.pricing]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{tool.users}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        tool.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {tool.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/tools/${tool.id}/edit`}
                          className="p-2 hover:bg-purple-50 rounded-xl transition-colors">
                          <Edit className="w-4 h-4 text-purple-600" />
                        </Link>
                        <button onClick={() => setDeleteId(tool.id!)}
                          className="p-2 hover:bg-red-50 rounded-xl transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Suppression */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 w-full max-w-sm">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Supprimer l'outil</h3>
            <p className="text-sm text-gray-500 mb-6">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors text-sm">
                Annuler
              </button>
              <button onClick={handleDelete}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors text-sm">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
