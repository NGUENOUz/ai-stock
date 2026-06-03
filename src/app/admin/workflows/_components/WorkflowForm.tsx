'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';

export interface WorkflowData {
  id?: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'débutant' | 'intermédiaire' | 'avancé';
  status: 'draft' | 'published';
  price: string;
  isPremium: boolean;
  duration: string;
  thumbnailUrl: string;
  previewUrl: string;
  tags: string[];
  tools: string[];
  steps: { title: string; description: string; toolUsed: string }[];
  useCases: string[];
  requirements: string[];
  outputs: string[];
  author: string;
  views?: number;
  downloads?: number;
  rating?: number;
}

export const EMPTY_WORKFLOW: WorkflowData = {
  title: '', description: '',
  category: 'Marketing', difficulty: 'intermédiaire',
  status: 'draft', price: '0',
  isPremium: false, duration: '',
  thumbnailUrl: '', previewUrl: '',
  tags: [], tools: [],
  steps: [{ title: '', description: '', toolUsed: '' }],
  useCases: [''], requirements: [''], outputs: [''],
  author: '', views: 0, downloads: 0, rating: 0,
};

const CATEGORIES = [
  'Marketing', 'Développement', 'Design', 'Productivité',
  'E-commerce', 'Finance', 'Éducation', 'Automatisation', 'Autre',
];

const inputCls = (err?: boolean) =>
  `w-full px-4 py-2.5 rounded-xl border bg-gray-50 text-sm focus:outline-none focus:ring-2 transition-all ${
    err ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-purple-100 focus:border-purple-300'
  }`;

const SECTIONS = [
  { id: 'basic', label: 'Infos de base' },
  { id: 'media', label: 'Médias' },
  { id: 'steps', label: 'Étapes' },
  { id: 'content', label: 'Contenu' },
  { id: 'pricing', label: 'Tarification' },
];

interface WorkflowFormProps {
  initialData?: Partial<WorkflowData>;
  isEdit?: boolean;
}

export default function WorkflowForm({ initialData, isEdit = false }: WorkflowFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<WorkflowData>({ ...EMPTY_WORKFLOW, ...initialData });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('basic');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Requis';
    if (!form.description.trim()) e.description = 'Requis';
    if (!form.author.trim()) e.author = 'Requis';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); setActiveSection('basic'); return; }
    setSaving(true);
    // TODO: supabase.from('workflows').insert/update(form)
    await new Promise(r => setTimeout(r, 700));
    setSaving(false);
    router.push('/admin/workflows');
  };

  const set = (key: keyof WorkflowData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }));

  const setArr = (key: keyof WorkflowData, i: number, val: string) =>
    setForm(prev => { const a = [...(prev[key] as string[])]; a[i] = val; return { ...prev, [key]: a }; });

  const setStep = (i: number, field: keyof WorkflowData['steps'][0], val: string) =>
    setForm(prev => {
      const a = [...prev.steps];
      a[i] = { ...a[i], [field]: val };
      return { ...prev, steps: a };
    });

  const add = (key: keyof WorkflowData, empty: any) =>
    setForm(prev => ({ ...prev, [key]: [...(prev[key] as any[]), empty] }));

  const remove = (key: keyof WorkflowData, i: number) =>
    setForm(prev => ({ ...prev, [key]: (prev[key] as any[]).filter((_: any, idx: number) => idx !== i) }));

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/workflows" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            {isEdit ? 'Modifier le workflow' : 'Nouveau workflow'}
          </h1>
          <p className="text-sm text-gray-500">Remplissez toutes les sections</p>
        </div>
      </div>

      {/* Nav sections */}
      <div className="flex gap-2 flex-wrap">
        {SECTIONS.map(s => (
          <button key={s.id} type="button" onClick={() => setActiveSection(s.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeSection === s.id
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}>
            {s.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ── INFOS DE BASE ── */}
        {activeSection === 'basic' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Informations de base</h2>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Titre *</label>
              <input className={inputCls(!!errors.title)} value={form.title} onChange={set('title')} placeholder="ex: Workflow de création de contenu SEO avec IA" />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description *</label>
              <textarea rows={4} className={inputCls(!!errors.description)} value={form.description} onChange={set('description')} placeholder="Décrivez ce que fait ce workflow, son objectif et sa valeur ajoutée..." />
              {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Catégorie</label>
                <select className={inputCls()} value={form.category} onChange={set('category')}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Niveau</label>
                <select className={inputCls()} value={form.difficulty} onChange={set('difficulty')}>
                  <option value="débutant">🟢 Débutant</option>
                  <option value="intermédiaire">🟡 Intermédiaire</option>
                  <option value="avancé">🔴 Avancé</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Auteur *</label>
                <input className={inputCls(!!errors.author)} value={form.author} onChange={set('author')} placeholder="ex: Jean Dupont" />
                {errors.author && <p className="mt-1 text-xs text-red-500">{errors.author}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Durée estimée</label>
                <input className={inputCls()} value={form.duration} onChange={set('duration')} placeholder="ex: 2h par semaine" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Outils utilisés <span className="font-normal text-gray-400">(virgules)</span></label>
              <input className={inputCls()} value={form.tools.join(', ')} onChange={e => setForm(prev => ({ ...prev, tools: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))} placeholder="ChatGPT, Midjourney, Notion" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Tags <span className="font-normal text-gray-400">(virgules)</span></label>
              <input className={inputCls()} value={form.tags.join(', ')} onChange={e => setForm(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))} placeholder="seo, contenu, automatisation" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Statut</label>
              <div className="flex gap-3">
                {(['draft', 'published'] as const).map(s => (
                  <button key={s} type="button" onClick={() => setForm(prev => ({ ...prev, status: s }))}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      form.status === s ? 'bg-purple-600 border-purple-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}>
                    {s === 'draft' ? 'Brouillon' : 'Publié'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── MÉDIAS ── */}
        {activeSection === 'media' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Médias</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Miniature (thumbnail)</label>
              <input className={inputCls()} value={form.thumbnailUrl} onChange={set('thumbnailUrl')} placeholder="https://exemple.com/thumbnail.jpg" />
              {form.thumbnailUrl && (
                <img src={form.thumbnailUrl} alt="thumbnail" className="mt-3 w-full h-40 rounded-xl object-cover border border-gray-200" onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Image de prévisualisation</label>
              <input className={inputCls()} value={form.previewUrl} onChange={set('previewUrl')} placeholder="https://exemple.com/preview.jpg" />
              {form.previewUrl && (
                <img src={form.previewUrl} alt="preview" className="mt-3 w-full h-40 rounded-xl object-cover border border-gray-200" onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
          </div>
        )}

        {/* ── ÉTAPES ── */}
        {activeSection === 'steps' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Étapes du workflow</h2>
              <button type="button" onClick={() => add('steps', { title: '', description: '', toolUsed: '' })}
                className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-700">
                <Plus className="w-4 h-4" /> Ajouter
              </button>
            </div>
            {form.steps.map((step, i) => (
              <div key={i} className="flex gap-2 items-start">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-100 text-purple-600 text-xs font-bold flex items-center justify-center mt-1">
                  {i + 1}
                </div>
                <div className="flex-1 space-y-2">
                  <input className={inputCls()} value={step.title} onChange={e => setStep(i, 'title', e.target.value)} placeholder={`Titre de l'étape ${i + 1}`} />
                  <textarea rows={2} className={inputCls()} value={step.description} onChange={e => setStep(i, 'description', e.target.value)} placeholder="Description de cette étape..." />
                  <input className={inputCls()} value={step.toolUsed} onChange={e => setStep(i, 'toolUsed', e.target.value)} placeholder="Outil utilisé (ex: ChatGPT)" />
                </div>
                {form.steps.length > 1 && (
                  <button type="button" onClick={() => remove('steps', i)} className="p-2 hover:bg-red-50 rounded-xl transition-colors mt-1">
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── CONTENU ── */}
        {activeSection === 'content' && (
          <div className="space-y-5">
            {/* Cas d'usage */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Cas d'usage</h2>
                <button type="button" onClick={() => add('useCases', '')}
                  className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-700">
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </div>
              {form.useCases.map((uc, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls()} value={uc} onChange={e => setArr('useCases', i, e.target.value)} placeholder={`Cas d'usage ${i + 1}`} />
                  {form.useCases.length > 1 && (
                    <button type="button" onClick={() => remove('useCases', i)} className="p-2 hover:bg-red-50 rounded-xl">
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Prérequis */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Prérequis</h2>
                <button type="button" onClick={() => add('requirements', '')}
                  className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-700">
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </div>
              {form.requirements.map((r, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls()} value={r} onChange={e => setArr('requirements', i, e.target.value)} placeholder={`Prérequis ${i + 1}`} />
                  {form.requirements.length > 1 && (
                    <button type="button" onClick={() => remove('requirements', i)} className="p-2 hover:bg-red-50 rounded-xl">
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Résultats attendus */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Résultats attendus</h2>
                <button type="button" onClick={() => add('outputs', '')}
                  className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-700">
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </div>
              {form.outputs.map((o, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls()} value={o} onChange={e => setArr('outputs', i, e.target.value)} placeholder={`Résultat ${i + 1}`} />
                  {form.outputs.length > 1 && (
                    <button type="button" onClick={() => remove('outputs', i)} className="p-2 hover:bg-red-50 rounded-xl">
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TARIFICATION ── */}
        {activeSection === 'pricing' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Tarification</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Prix (€)</label>
              <input type="number" min="0" step="0.01" className={inputCls()} value={form.price} onChange={set('price')} placeholder="0" />
              <p className="mt-1 text-xs text-gray-400">Mettre 0 pour gratuit</p>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.isPremium} onChange={e => setForm(prev => ({ ...prev, isPremium: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
              <span className="text-sm font-semibold text-gray-700">Contenu Premium 👑</span>
            </label>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Link href="/admin/workflows"
            className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm text-center hover:bg-gray-50 transition-colors">
            Annuler
          </Link>
          <button type="submit" disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors disabled:opacity-60 shadow-sm">
            <Save className="w-4 h-4" />
            {saving ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer le workflow'}
          </button>
        </div>
      </form>
    </div>
  );
}
