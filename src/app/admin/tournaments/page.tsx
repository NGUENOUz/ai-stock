'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Trophy, Plus, Users, Gift, CheckCircle,
  Eye, Edit, Trash2, Search, X
} from 'lucide-react';

const TOURNAMENTS = [
  {
    id: 1,
    title: 'Meilleur Prompt ChatGPT Marketing',
    description: 'Créez le prompt le plus efficace pour générer des campagnes marketing',
    type: 'prompt', status: 'active', prize: '500€',
    participants: 127, submissions: 89,
    startDate: '2024-01-15', endDate: '2024-02-15',
    winner: null,
  },
  {
    id: 2,
    title: 'Application IA Innovante',
    description: "Développez une application utilisant l'IA de manière créative",
    type: 'code', status: 'active', prize: '1 000€',
    participants: 89, submissions: 45,
    startDate: '2024-01-20', endDate: '2024-02-28',
    winner: null,
  },
  {
    id: 3,
    title: 'Prompt Engineering Décembre',
    description: 'Prompt multi-étapes pour analyse de données',
    type: 'prompt', status: 'completed', prize: '500€',
    participants: 156, submissions: 98,
    startDate: '2023-12-01', endDate: '2023-12-31',
    winner: 'Sophie M.',
  },
];

const STATUS_CONFIG = {
  draft:     { label: 'Brouillon', color: 'bg-gray-100 text-gray-700' },
  active:    { label: 'Actif',     color: 'bg-green-100 text-green-700' },
  completed: { label: 'Terminé',   color: 'bg-blue-100 text-blue-700' },
  cancelled: { label: 'Annulé',    color: 'bg-red-100 text-red-700' },
};

const TYPE_CONFIG = {
  prompt:   { label: 'Prompt',   icon: '💡' },
  code:     { label: 'Code',     icon: '💻' },
  design:   { label: 'Design',   icon: '🎨' },
  workflow: { label: 'Workflow', icon: '⚡' },
};

export default function AdminTournamentsPage() {
  const router = useRouter();
  const [tournaments, setTournaments] = useState(TOURNAMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = tournaments.filter(t => {
    const q = searchQuery.toLowerCase();
    return (
      (t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)) &&
      (statusFilter === 'all' || t.status === statusFilter) &&
      (typeFilter === 'all' || t.type === typeFilter)
    );
  });

  const handleDelete = () => {
    // TODO: supabase.from('tournaments').delete().eq('id', deleteId)
    setTournaments(prev => prev.filter(t => t.id !== deleteId));
    setDeleteId(null);
  };

  const activeCount = tournaments.filter(t => t.status === 'active').length;
  const totalParticipants = tournaments.reduce((s, t) => s + t.participants, 0);
  const totalSubmissions = tournaments.reduce((s, t) => s + t.submissions, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black mb-2">Gestion des Tournois</h1>
          <p className="text-neutral-600">Créez et gérez les tournois de la plateforme</p>
        </div>
        <button
          onClick={() => router.push('/admin/tournaments/new')}
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nouveau Tournoi
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: <Trophy className="w-8 h-8 text-purple-600" />, label: 'Tournois Actifs', value: activeCount },
          { icon: <Users className="w-8 h-8 text-blue-600" />, label: 'Participants Total', value: totalParticipants },
          { icon: <Gift className="w-8 h-8 text-green-600" />, label: 'Prix Distribués', value: '2 500€' },
          { icon: <CheckCircle className="w-8 h-8 text-purple-600" />, label: 'Soumissions', value: totalSubmissions },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-neutral-200 p-6">
            <div className="flex items-center gap-3">
              {s.icon}
              <div>
                <p className="text-sm text-neutral-500">{s.label}</p>
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
              type="text" placeholder="Rechercher un tournoi..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-100"
            />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-100">
            <option value="all">Tous les statuts</option>
            <option value="draft">Brouillon</option>
            <option value="active">Actif</option>
            <option value="completed">Terminé</option>
            <option value="cancelled">Annulé</option>
          </select>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-100">
            <option value="all">Tous les types</option>
            <option value="prompt">💡 Prompt</option>
            <option value="code">💻 Code</option>
            <option value="design">🎨 Design</option>
            <option value="workflow">⚡ Workflow</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                {['Tournoi', 'Type', 'Statut', 'Prix', 'Participants', 'Fin', 'Actions'].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-sm font-semibold text-neutral-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <h4 className="font-semibold text-black">{t.title}</h4>
                    <p className="text-sm text-neutral-500 mt-0.5 line-clamp-1">{t.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium">
                      {TYPE_CONFIG[t.type as keyof typeof TYPE_CONFIG]?.icon}{' '}
                      {TYPE_CONFIG[t.type as keyof typeof TYPE_CONFIG]?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_CONFIG[t.status as keyof typeof STATUS_CONFIG]?.color}`}>
                      {STATUS_CONFIG[t.status as keyof typeof STATUS_CONFIG]?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600">{t.prize}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="font-medium">{t.participants} participants</div>
                    <div className="text-neutral-500">{t.submissions} soumissions</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="font-medium">{t.endDate}</div>
                    {t.winner && <div className="text-green-600">🏆 {t.winner}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => router.push(`/admin/tournaments/${t.id}/edit`)}
                        className="p-2 text-neutral-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteId(t.id)}
                        className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-neutral-400">Aucun tournoi trouvé</div>
          )}
        </div>
      </div>

      {/* Modal suppression */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Supprimer le tournoi ?</h3>
              <button onClick={() => setDeleteId(null)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-6">Cette action est irréversible. Toutes les soumissions associées seront également supprimées.</p>
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
