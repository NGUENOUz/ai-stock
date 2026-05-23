'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, ExternalLink } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  category: string;
  pricing: 'free' | 'freemium' | 'paid';
  url: string;
  views: number;
  status: 'published' | 'draft';
}

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setTools([
        { id: '1', name: 'ChatGPT', category: 'IA Générative', pricing: 'freemium', url: 'https://chat.openai.com', views: 12450, status: 'published' },
        { id: '2', name: 'Midjourney', category: 'Design', pricing: 'paid', url: 'https://midjourney.com', views: 8920, status: 'published' },
        { id: '3', name: 'Notion AI', category: 'Productivité', pricing: 'freemium', url: 'https://notion.so', views: 6780, status: 'published' },
        { id: '4', name: 'Zapier', category: 'Automatisation', pricing: 'freemium', url: 'https://zapier.com', views: 5430, status: 'draft' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pricingBadge = (pricing: string) => {
    const styles = {
      free: 'bg-green-50 text-green-700',
      freemium: 'bg-yellow-50 text-yellow-700',
      paid: 'bg-red-50 text-red-700',
    };
    const labels = {
      free: 'Gratuit',
      freemium: 'Freemium',
      paid: 'Payant',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${styles[pricing as keyof typeof styles]}`}>
        {labels[pricing as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black mb-2">Outils IA</h1>
          <p className="text-neutral-600">Gérez votre catalogue d'outils</p>
        </div>
        <Link
          href="/admin/tools/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all"
        >
          <Plus className="w-5 h-5" />
          Nouvel Outil
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="search"
            placeholder="Rechercher un outil..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Outil</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Catégorie</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Tarification</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Vues</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Statut</th>
                <th className="text-right px-6 py-4 text-sm font-bold text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">
                    Chargement...
                  </td>
                </tr>
              ) : filteredTools.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">
                    Aucun outil trouvé
                  </td>
                </tr>
              ) : (
                filteredTools.map((tool) => (
                  <tr key={tool.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">{tool.name[0]}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-black">{tool.name}</div>
                          <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-primary flex items-center gap-1">
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
                    <td className="px-6 py-4">{pricingBadge(tool.pricing)}</td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{tool.views.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        tool.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        {tool.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-neutral-600" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
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
    </div>
  );
}
