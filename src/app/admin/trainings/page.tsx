'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, Eye, Clock, Video, Crown } from 'lucide-react';
import type { TrainingData } from './_components/TrainingForm';

const INITIAL_TRAININGS: TrainingData[] = [
  {
    id: '1', title: 'Formation ChatGPT Pro', shortDescription: 'Maîtrisez ChatGPT pour booster votre productivité.',
    longDescription: '', category: 'IA Générative', level: 'Intermédiaire', language: 'Français',
    price: 99.99, durationMinutes: 300, numberOfVideos: 15,
    thumbnailUrl: 'https://picsum.photos/800/450?random=1', isPremium: false, status: 'published',
    instructorName: 'Marie Dubois', instructorBio: '', instructorAvatar: '',
    lessons: [], objectives: [], requirements: [], tags: ['chatgpt', 'ia'],
  },
  {
    id: '2', title: 'Automatisation avec Zapier', shortDescription: 'Automatisez vos workflows sans coder.',
    longDescription: '', category: 'Automatisation', level: 'Débutant', language: 'Français',
    price: 49.99, durationMinutes: 180, numberOfVideos: 10,
    thumbnailUrl: 'https://picsum.photos/800/450?random=2', isPremium: false, status: 'published',
    instructorName: 'Jean Martin', instructorBio: '', instructorAvatar: '',
    lessons: [], objectives: [], requirements: [], tags: ['zapier'],
  },
  {
    id: '3', title: 'Marketing IA Avancé', shortDescription: "Utilisez l'IA pour votre stratégie marketing.",
    longDescription: '', category: 'Marketing', level: 'Avancé', language: 'Français',
    price: 149.99, durationMinutes: 420, numberOfVideos: 20,
    thumbnailUrl: 'https://picsum.photos/800/450?random=3', isPremium: true, status: 'draft',
    instructorName: 'Sophie Laurent', instructorBio: '', instructorAvatar: '',
    lessons: [], objectives: [], requirements: [], tags: ['marketing'],
  },
];

const LEVEL_STYLES: Record<string, string> = {
  'Débutant': 'bg-green-50 text-green-700',
  'Intermédiaire': 'bg-blue-50 text-blue-700',
  'Avancé': 'bg-red-50 text-red-700',
};

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<TrainingData[]>(INITIAL_TRAININGS);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = trainings.filter(t =>
    (t.title.toLowerCase().includes(search.toLowerCase())) &&
    (filterCat === 'all' || t.category === filterCat)
  );

  const handleDelete = () => {
    if (deleteId) { setTrainings(prev => prev.filter(t => t.id !== deleteId)); setDeleteId(null); }
  };

  const categories = [...new Set(trainings.map(t => t.category))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1">Formations</h1>
          <p className="text-gray-500">{trainings.length} formation{trainings.length > 1 ? 's' : ''} au total</p>
        </div>
        <Link href="/admin/trainings/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all shadow-sm">
          <Plus className="w-5 h-5" /> Nouvelle Formation
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="search" placeholder="Rechercher une formation..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 outline-none text-sm" />
        </div>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
          className="h-10 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple-300 outline-none text-sm font-medium">
          <option value="all">Toutes les catégories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Formation</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Niveau</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Prix</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contenu</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">Aucune formation trouvée</td></tr>
              ) : filtered.map(t => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        {t.thumbnailUrl
                          ? <img src={t.thumbnailUrl} alt={t.title} className="w-full h-full object-cover" />
                          : <div className="w-full h-full bg-purple-50 flex items-center justify-center"><Video className="w-4 h-4 text-purple-400" /></div>
                        }
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                          {t.title}
                          {t.isPremium && <Crown className="w-3.5 h-3.5 text-purple-500" />}
                        </div>
                        <div className="text-xs text-gray-400">{t.instructorName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700">{t.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${LEVEL_STYLES[t.level] ?? 'bg-gray-100 text-gray-600'}`}>{t.level}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{t.price === 0 ? 'Gratuit' : `${t.price}€`}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5" />{t.numberOfVideos}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{Math.floor(t.durationMinutes / 60)}h{t.durationMinutes % 60 > 0 ? `${t.durationMinutes % 60}m` : ''}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${t.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {t.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/formations/${t.id}`} className="p-2 hover:bg-gray-100 rounded-xl transition-colors" title="Voir">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </Link>
                      <Link href={`/admin/trainings/${t.id}/edit`} className="p-2 hover:bg-purple-50 rounded-xl transition-colors" title="Modifier">
                        <Edit className="w-4 h-4 text-purple-600" />
                      </Link>
                      <button onClick={() => setDeleteId(t.id!)} className="p-2 hover:bg-red-50 rounded-xl transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal suppression */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 w-full max-w-sm">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Supprimer la formation</h3>
            <p className="text-sm text-gray-500 mb-6">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors">Annuler</button>
              <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
