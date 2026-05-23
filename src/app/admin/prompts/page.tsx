'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, Copy } from 'lucide-react';

interface Prompt {
  id: string;
  title: string;
  category: string;
  tags: string[];
  price: number;
  downloads: number;
  status: 'published' | 'draft';
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Mock data - remplacer par un vrai fetch
    setTimeout(() => {
      setPrompts([
        { id: '1', title: 'Prompt Marketing Instagram', category: 'Marketing', tags: ['social', 'instagram'], price: 9.99, downloads: 234, status: 'published' },
        { id: '2', title: 'Génération de Code Python', category: 'Développement', tags: ['code', 'python'], price: 14.99, downloads: 189, status: 'published' },
        { id: '3', title: 'Rédaction Article SEO', category: 'Contenu', tags: ['seo', 'article'], price: 12.99, downloads: 156, status: 'draft' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const filteredPrompts = prompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black mb-2">Prompts</h1>
          <p className="text-neutral-600">Gérez votre bibliothèque de prompts</p>
        </div>
        <Link
          href="/admin/prompts/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all"
        >
          <Plus className="w-5 h-5" />
          Nouveau Prompt
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="search"
            placeholder="Rechercher un prompt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12 text-neutral-500">Chargement...</div>
        ) : filteredPrompts.length === 0 ? (
          <div className="col-span-full text-center py-12 text-neutral-500">Aucun prompt trouvé</div>
        ) : (
          filteredPrompts.map((prompt) => (
            <div key={prompt.id} className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                  prompt.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                }`}>
                  {prompt.status === 'published' ? 'Publié' : 'Brouillon'}
                </span>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 hover:bg-neutral-100 rounded transition-colors">
                    <Edit className="w-4 h-4 text-neutral-600" />
                  </button>
                  <button className="p-1.5 hover:bg-red-50 rounded transition-colors">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-black mb-2">{prompt.title}</h3>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-semibold">
                  {prompt.category}
                </span>
                {prompt.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                <div>
                  <p className="text-2xl font-bold text-black">{prompt.price}€</p>
                  <p className="text-xs text-neutral-500">{prompt.downloads} téléchargements</p>
                </div>
                <button className="p-2 bg-primary/10 hover:bg-primary text-primary hover:text-black rounded-lg transition-all">
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
