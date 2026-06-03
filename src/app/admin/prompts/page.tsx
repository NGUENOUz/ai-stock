'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, Copy, Crown } from 'lucide-react';
import type { PromptData } from './_components/PromptForm';

const INITIAL_PROMPTS: PromptData[] = [
  { id: '1', title: 'Prompt Marketing Instagram', category: 'Marketing', type: 'text', prompt: 'Crée 10 posts Instagram percutants pour [PRODUIT] ciblant [AUDIENCE]...', description: 'Génère des posts Instagram viraux.', style: 'Professionnel', tool: 'ChatGPT', tags: ['social', 'instagram'], price: 9.99, isPremium: false, status: 'published', imageUrl: '', downloads: 234, likes: 89 },
  { id: '2', title: 'Génération Portrait Artistique', category: 'Design', type: 'image', prompt: 'Portrait of [SUBJECT], cinematic lighting, ultra-realistic, 8K, professional photography...', description: 'Portrait artistique haute qualité.', style: 'Réaliste, Cinématique', tool: 'Midjourney', tags: ['portrait', 'art'], price: 14.99, isPremium: true, status: 'published', imageUrl: 'https://picsum.photos/400/300?random=10', downloads: 189, likes: 120 },
  { id: '3', title: 'Rédaction Article SEO', category: 'SEO', type: 'text', prompt: 'Rédige un article SEO de 1500 mots sur [SUJET] avec les mots-clés [KEYWORDS]...', description: 'Article optimisé pour le référencement.', style: 'Informatif', tool: 'Claude', tags: ['seo', 'article'], price: 12.99, isPremium: false, status: 'draft', imageUrl: '', downloads: 156, likes: 67 },
];

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<PromptData[]>(INITIAL_PROMPTS);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'text' | 'image'>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = prompts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterType === 'all' || p.type === filterType)
  );

  const handleDelete = () => {
    if (deleteId) { setPrompts(prev => prev.filter(p => p.id !== deleteId)); setDeleteId(null); }
  };

  const handleCopy = (prompt: PromptData) => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(prompt.id!);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1">Prompts</h1>
          <p className="text-gray-500">{prompts.length} prompt{prompts.length > 1 ? 's' : ''} au total</p>
        </div>
        <Link href="/admin/prompts/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all shadow-sm">
          <Plus className="w-5 h-5" /> Nouveau Prompt
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="search" placeholder="Rechercher un prompt..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 outline-none text-sm" />
        </div>
        <div className="flex gap-2">
          {(['all', 'text', 'image'] as const).map(t => (
            <button key={t} onClick={() => setFilterType(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                filterType === t ? 'bg-purple-600 border-purple-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}>
              {t === 'all' ? 'Tous' : t === 'text' ? '📝 Texte' : '🖼️ Image'}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-400">Aucun prompt trouvé</div>
        ) : filtered.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-purple-200 transition-all">
            {/* Image preview pour les prompts image */}
            {p.type === 'image' && p.imageUrl && (
              <div className="h-36 overflow-hidden">
                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-5">
              {/* Header card */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {p.status === 'published' ? 'Publié' : 'Brouillon'}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                    {p.type === 'text' ? '📝' : '🖼️'} {p.tool}
                  </span>
                  {p.isPremium && <Crown className="w-4 h-4 text-purple-500" />}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link href={`/admin/prompts/${p.id}/edit`} className="p-1.5 hover:bg-purple-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4 text-purple-600" />
                  </Link>
                  <button onClick={() => setDeleteId(p.id!)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{p.title}</h3>
              <p className="text-xs text-gray-500 mb-3 line-clamp-1">{p.description}</p>

              {/* Prompt preview */}
              <div className="bg-gray-50 rounded-xl p-3 mb-4 font-mono text-xs text-gray-600 line-clamp-3 leading-relaxed">
                {p.prompt}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">{p.category}</span>
                {p.tags.slice(0, 2).map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">#{tag}</span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <p className="font-bold text-gray-900">{p.price === 0 ? 'Gratuit' : `${p.price}€`}</p>
                  <p className="text-xs text-gray-400">{p.downloads} dl · {p.likes} ♥</p>
                </div>
                <button onClick={() => handleCopy(p)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    copied === p.id ? 'bg-green-600 text-white' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                  }`}>
                  <Copy className="w-3.5 h-3.5" />
                  {copied === p.id ? 'Copié !' : 'Copier'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal suppression */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 w-full max-w-sm">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Supprimer le prompt</h3>
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
