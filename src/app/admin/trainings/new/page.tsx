'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Link from 'next/link';

export default function NewTrainingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: 0,
    duration: '',
    status: 'draft',
    thumbnail: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/v1/trainings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/trainings');
      }
    } catch (error) {
      console.error('Error creating training:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/trainings"
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-black mb-2">Nouvelle Formation</h1>
          <p className="text-neutral-600">Créez une nouvelle formation pour votre plateforme</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
          <h2 className="text-xl font-bold text-black">Informations de base</h2>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Titre de la formation *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Maîtriser ChatGPT pour les professionnels"
              className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Décrivez votre formation..."
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Catégorie *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="ia-generative">IA Générative</option>
                <option value="automatisation">Automatisation</option>
                <option value="marketing">Marketing</option>
                <option value="design">Design</option>
                <option value="developpement">Développement</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Niveau *
              </label>
              <select
                required
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Prix (€) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                placeholder="49.99"
                className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Durée
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="Ex: 5 heures"
                className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
          <h2 className="text-xl font-bold text-black">Média</h2>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Image de couverture
            </label>
            <div className="border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <p className="text-sm text-neutral-600 mb-2">
                Cliquez pour télécharger ou glissez-déposez
              </p>
              <p className="text-xs text-neutral-400">PNG, JPG jusqu'à 5MB</p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
          <h2 className="text-xl font-bold text-black">Publication</h2>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Statut
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            >
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Enregistrement...' : 'Créer la formation'}
          </button>
          <Link
            href="/admin/trainings"
            className="px-6 py-3 bg-neutral-100 text-black font-semibold rounded-lg hover:bg-neutral-200 transition-all"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
