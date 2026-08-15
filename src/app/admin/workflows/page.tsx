'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Zap, Plus, Download, Eye, Star, Edit, Trash2, Search, Crown, X,
  TrendingUp, Users, Package, FileCode
} from 'lucide-react';

const WORKFLOWS = [
  {
    id: 1,
    title: 'Automatisation Lead Enrichment + CRM',
    tagline: 'Enrichissez et synchronisez vos leads automatiquement',
    platform: 'N8N',
    category: 'Ventes',
    sector: 'SaaS',
    status: 'published',
    price: 29,
    isFree: false,
    isBestseller: true,
    apps: ['Apollo.io', 'HubSpot', 'Slack'],
    downloads: 1240,
    views: 4520,
    rating: 4.9,
    contributor: 'Sophie Martin',
  },
  {
    id: 2,
    title: 'Pipeline Marketing Automation',
    tagline: 'Automatisez vos campagnes marketing de A à Z',
    platform: 'Make',
    category: 'Marketing',
    sector: 'E-commerce',
    status: 'published',
    price: 0,
    isFree: true,
    isBestseller: false,
    apps: ['Mailchimp', 'Google Sheets', 'Slack'],
    downloads: 856,
    views: 3210,
    rating: 4.7,
    contributor: 'Marc Dubois',
  },
  {
    id: 3,
    title: 'Support Client IA + Ticketing',
    tagline: 'Réponses automatiques intelligentes avec IA',
    platform: 'Zapier',
    category: 'Support',
    sector: 'SaaS',
    status: 'draft',
    price: 39,
    isFree: false,
    isBestseller: false,
    apps: ['OpenAI', 'Zendesk', 'Intercom'],
    downloads: 0,
    views: 124,
    rating: 0,
    contributor: 'Julie Bernard',
  },
];

export default function AdminWorkflowsPage() {
  const router = useRouter();
  const [workflows, setWorkflows] = useState(WORKFLOWS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const categories = ['all', ...Array.from(new Set(WORKFLOWS.map(w => w.category)))];

  const filtered = workflows.filter(w => {
    const q = searchQuery.toLowerCase();
    return (
      (w.title.toLowerCase().includes(q) || w.tagline.toLowerCase().includes(q)) &&
      (categoryFilter === 'all' || w.category === categoryFilter)
    );
  });

  const handleDelete = () => {
    // TODO: supabase.from('workflows').delete().eq('id', deleteId)
    setWorkflows(prev => prev.filter(w => w.id !== deleteId));
    setDeleteId(null);
  };

  const totalDownloads = workflows.reduce((s, w) => s + w.downloads, 0);
  const publishedCount = workflows.filter(w => w.status === 'published').length;
  const totalViews = workflows.reduce((s, w) => s + w.views, 0);
  const avgRating = (workflows.filter(w => w.rating > 0).reduce((s, w) => s + w.rating, 0) / workflows.filter(w => w.rating > 0).length || 0).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black mb-2">Gestion des Workflows</h1>
          <p className="text-neutral-600">Créez et gérez les workflows d'automatisation de la plateforme</p>
        </div>
        <button
          onClick={() => router.push('/admin/workflows/new')}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nouveau Workflow
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: <Zap className="w-8 h-8 text-blue-600" />, label: 'Total Workflows', value: workflows.length, bg: 'bg-blue-50' },
          { icon: <FileCode className="w-8 h-8 text-green-600" />, label: 'Publiés', value: publishedCount, bg: 'bg-green-50' },
          { icon: <Download className="w-8 h-8 text-purple-600" />, label: 'Téléchargements', value: totalDownloads.toLocaleString(), bg: 'bg-purple-50' },
          { icon: <Star className="w-8 h-8 text-yellow-500" />, label: 'Note Moyenne', value: `${avgRating} ⭐`, bg: 'bg-yellow-50' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} rounded-xl border border-neutral-200 p-6`}>
            <div className="flex items-center gap-3">
              {s.icon}
              <div>
                <p className="text-sm text-neutral-500 font-medium">{s.label}</p>
                <h3 className="text-2xl font-bold text-black">{s.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text" placeholder="Rechercher un workflow..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100">
            {categories.map(c => (
              <option key={c} value={c}>{c === 'all' ? 'Toutes les catégories' : c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(w => (
          <div key={w.id} className="bg-white rounded-2xl border border-neutral-200 p-5 hover:shadow-lg hover:border-blue-200 transition-all">
            {/* Card header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="font-bold text-black text-sm line-clamp-1">{w.title}</h3>
                    {w.isBestseller && <Crown className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-neutral-500">{w.contributor}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                w.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {w.status === 'published' ? 'Publié' : 'Brouillon'}
              </span>
            </div>

            <p className="text-sm text-neutral-600 line-clamp-2 mb-4">{w.tagline}</p>

            {/* Meta */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                <Package className="w-3 h-3" />
                {w.platform}
              </span>
              <span className="text-xs text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-full font-medium">{w.category}</span>
              <span className="text-xs text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-full font-medium">{w.sector}</span>
            </div>

            {/* Apps */}
            <div className="flex gap-1.5 flex-wrap mb-4">
              {w.apps.map(app => (
                <span key={app} className="text-xs text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg font-medium">{app}</span>
              ))}
            </div>

            {/* Stats + actions */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5" />{w.downloads}</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{w.views}</span>
                {w.rating > 0 && <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />{w.rating}</span>}
                <span className="font-bold text-blue-600">{w.isFree ? 'Gratuit' : `${w.price}€`}</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => router.push(`/admin/workflows/${w.id}/edit`)}
                  className="p-2 text-neutral-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => setDeleteId(w.id)}
                  className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-neutral-400 bg-white rounded-2xl border border-neutral-200">
          <Zap className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
          <p className="font-semibold">Aucun workflow trouvé</p>
        </div>
      )}

      {/* Modal suppression */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Supprimer le workflow ?</h3>
              <button onClick={() => setDeleteId(null)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-6">Cette action est irréversible. Le workflow sera définitivement supprimé.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50">
                Annuler
              </button>
              <button onClick={handleDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
