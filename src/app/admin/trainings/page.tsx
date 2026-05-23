'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';

interface Training {
  id: string;
  title: string;
  category: string;
  level: string;
  price: number;
  students: number;
  status: 'published' | 'draft';
  createdAt: string;
}

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await fetch('/api/v1/trainings');
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setTrainings(data.data);
      } else {
        // Si pas de données ou erreur, utiliser des données mockées
        setTrainings([
          { id: '1', title: 'Formation ChatGPT Pro', category: 'IA Générative', level: 'Intermédiaire', price: 99.99, students: 234, status: 'published', createdAt: '2024-01-15' },
          { id: '2', title: 'Automatisation avec Zapier', category: 'Automatisation', level: 'Débutant', price: 49.99, students: 189, status: 'published', createdAt: '2024-02-01' },
          { id: '3', title: 'Marketing IA Avancé', category: 'Marketing', level: 'Avancé', price: 149.99, students: 156, status: 'draft', createdAt: '2024-02-15' },
        ]);
      }
    } catch (error) {
      console.error('Error fetching trainings:', error);
      // En cas d'erreur, utiliser des données mockées
      setTrainings([
        { id: '1', title: 'Formation ChatGPT Pro', category: 'IA Générative', level: 'Intermédiaire', price: 99.99, students: 234, status: 'published', createdAt: '2024-01-15' },
        { id: '2', title: 'Automatisation avec Zapier', category: 'Automatisation', level: 'Débutant', price: 49.99, students: 189, status: 'published', createdAt: '2024-02-01' },
        { id: '3', title: 'Marketing IA Avancé', category: 'Marketing', level: 'Avancé', price: 149.99, students: 156, status: 'draft', createdAt: '2024-02-15' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) return;
    
    try {
      const response = await fetch(`/api/v1/trainings/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setTrainings(trainings.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error('Error deleting training:', error);
    }
  };

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || training.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black mb-2">Formations</h1>
          <p className="text-neutral-600">Gérez toutes vos formations</p>
        </div>
        <Link
          href="/admin/trainings/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all"
        >
          <Plus className="w-5 h-5" />
          Nouvelle Formation
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="search"
              placeholder="Rechercher une formation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="h-10 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          >
            <option value="all">Toutes les catégories</option>
            <option value="ia-generative">IA Générative</option>
            <option value="automatisation">Automatisation</option>
            <option value="marketing">Marketing</option>
            <option value="design">Design</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Formation</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Catégorie</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Niveau</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Prix</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Étudiants</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-neutral-600">Statut</th>
                <th className="text-right px-6 py-4 text-sm font-bold text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                    Chargement...
                  </td>
                </tr>
              ) : filteredTrainings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                    Aucune formation trouvée
                  </td>
                </tr>
              ) : (
                filteredTrainings.map((training) => (
                  <tr key={training.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-black">{training.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        {training.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{training.level}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-black">{training.price}€</td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{training.students}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        training.status === 'published' 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        {training.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/trainings/${training.id}`}
                          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                          title="Voir"
                        >
                          <Eye className="w-4 h-4 text-neutral-600" />
                        </Link>
                        <Link
                          href={`/admin/trainings/${training.id}/edit`}
                          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                          title="Éditer"
                        >
                          <Edit className="w-4 h-4 text-neutral-600" />
                        </Link>
                        <button
                          onClick={() => handleDelete(training.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
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

      {/* Stats Footer */}
      <div className="flex items-center justify-between text-sm text-neutral-600">
        <p>Total: {filteredTrainings.length} formation(s)</p>
        <p>Page 1 sur 1</p>
      </div>
    </div>
  );
}
