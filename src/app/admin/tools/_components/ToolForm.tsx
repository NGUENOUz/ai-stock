'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';

export interface ToolData {
  id?: string;
  // Infos de base
  name: string;
  tagline: string;
  category: string;
  pricing: 'free' | 'freemium' | 'paid';
  url: string;
  description: string;
  tags: string[];
  status: 'published' | 'draft';
  // Médias
  logoUrl: string;
  bannerUrl: string;
  // Tarification
  priceMonthly: string;
  priceDetails: string;
  // Stats
  users: string;
  rating: number;
  reviews: number;
  upvotes: number;
  uptime: string;
  accuracy: string;
  marketsCount: string;
  // Contenu
  highlights: string[];
  features: { title: string; desc: string }[];
  useCases: { title: string; desc: string }[];
  benefits: string[];
  // Meta
  views?: number;
  verified?: boolean;
}

export const EMPTY_TOOL: ToolData = {
  name: '', tagline: '', category: 'IA Générative', pricing: 'free',
  url: '', description: '', tags: [], status: 'draft',
  logoUrl: '', bannerUrl: '',
  priceMonthly: '0€', priceDetails: 'Gratuit',
  users: '0', rating: 0, reviews: 0, upvotes: 0,
  uptime: '99.9%', accuracy: '', marketsCount: '',
  highlights: [''], features: [{ title: '', desc: '' }],
  useCases: [{ title: '', desc: '' }], benefits: [''],
  views: 0, verified: false,
};

const CATEGORIES = [
  'IA Générative', 'Design', 'Productivité', 'Automatisation',
  'Marketing', 'Développement', 'Analyse', 'Audio & Vidéo',
  'Finance & Trading', 'Éducation', 'Santé', 'E-commerce',
];

interface ToolFormProps {
  initialData?: Partial<ToolData>;
  isEdit?: boolean;
}

export default function ToolForm({ initialData, isEdit = false }: ToolFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ToolData>({ ...EMPTY_TOOL, ...initialData });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('basic');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Requis';
    if (!form.tagline.trim()) e.tagline = 'Requis';
    if (!form.url.trim()) e.url = 'Requis';
    else if (!/^https?:\/\/.+/.test(form.url)) e.url = 'Doit commencer par https://';
    if (!form.description.trim()) e.description = 'Requis';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); setActiveSection('basic'); return; }
    setSaving(true);
    // TODO: supabase.from('tools').insert/update(form)
    await new Promise(r => setTimeout(r, 700));
    setSaving(false);
    router.push('/admin/tools');
  };

  const set = (key: keyof ToolData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const setArr = (key: keyof ToolData, index: number, value: string) =>
    setForm(prev => {
      const arr = [...(prev[key] as string[])];
      arr[index] = value;
      return { ...prev, [key]: arr };
    });

  const setObjArr = (key: keyof ToolData, index: number, field: string, value: string) =>
    setForm(prev => {
      const arr = [...(prev[key] as any[])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [key]: arr };
    });

  const addItem = (key: keyof ToolData, empty: any) =>
    setForm(prev => ({ ...prev, [key]: [...(prev[key] as any[]), empty] }));

  const removeItem = (key: keyof ToolData, index: number) =>
    setForm(prev => ({ ...prev, [key]: (prev[key] as any[]).filter((_, i) => i !== index) }));

  const inputCls = (key?: string) =>
    `w-full px-4 py-2.5 rounded-xl border bg-gray-50 text-sm focus:outline-none focus:ring-2 transition-all ${
      key && errors[key]
        ? 'border-red-300 focus:ring-red-100'
        : 'border-gray-200 focus:ring-purple-100 focus:border-purple-300'
    }`;

  const SECTIONS = [
    { id: 'basic', label: 'Infos de base' },
    { id: 'media', label: 'Médias' },
    { id: 'pricing', label: 'Tarification' },
    { id: 'stats', label: 'Statistiques' },
    { id: 'content', label: 'Contenu' },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/tools" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            {isEdit ? "Modifier l'outil" : 'Nouvel outil'}
          </h1>
          <p className="text-sm text-gray-500">Remplissez toutes les sections</p>
        </div>
      </div>

      {/* Nav sections */}
      <div className="flex gap-2 flex-wrap">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveSection(s.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeSection === s.id
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ── INFOS DE BASE ── */}
        {activeSection === 'basic' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Informations de base</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nom *</label>
                <input className={inputCls('name')} value={form.name} onChange={set('name')} placeholder="ex: ChatGPT" />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Tagline *</label>
                <input className={inputCls('tagline')} value={form.tagline} onChange={set('tagline')} placeholder="ex: L'assistant IA le plus puissant" />
                {errors.tagline && <p className="mt-1 text-xs text-red-500">{errors.tagline}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">URL du site *</label>
              <input className={inputCls('url')} value={form.url} onChange={set('url')} placeholder="https://exemple.com" />
              {errors.url && <p className="mt-1 text-xs text-red-500">{errors.url}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description *</label>
              <textarea rows={4} className={inputCls('description')} value={form.description} onChange={set('description')} placeholder="Description détaillée de l'outil..." />
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
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Tarification</label>
                <select className={inputCls()} value={form.pricing} onChange={set('pricing')}>
                  <option value="free">Gratuit</option>
                  <option value="freemium">Freemium</option>
                  <option value="paid">Payant</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Tags <span className="font-normal text-gray-400">(séparés par des virgules)</span></label>
              <input className={inputCls()} value={form.tags.join(', ')} onChange={e => setForm(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))} placeholder="chatbot, openai, ia" />
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

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.verified} onChange={e => setForm(prev => ({ ...prev, verified: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
              <span className="text-sm font-semibold text-gray-700">Outil vérifié ✓</span>
            </label>
          </div>
        )}

        {/* ── MÉDIAS ── */}
        {activeSection === 'media' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Médias</h2>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">URL du logo</label>
              <input className={inputCls()} value={form.logoUrl} onChange={set('logoUrl')} placeholder="https://exemple.com/logo.png" />
              {form.logoUrl && (
                <img src={form.logoUrl} alt="logo preview" className="mt-3 w-20 h-20 rounded-xl object-cover border border-gray-200" onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">URL de la bannière</label>
              <input className={inputCls()} value={form.bannerUrl} onChange={set('bannerUrl')} placeholder="https://exemple.com/banner.jpg" />
              {form.bannerUrl && (
                <img src={form.bannerUrl} alt="banner preview" className="mt-3 w-full h-40 rounded-xl object-cover border border-gray-200" onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
          </div>
        )}

        {/* ── TARIFICATION ── */}
        {activeSection === 'pricing' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Tarification</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Prix mensuel</label>
                <input className={inputCls()} value={form.priceMonthly} onChange={set('priceMonthly')} placeholder="ex: 29€" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Détails du prix</label>
                <input className={inputCls()} value={form.priceDetails} onChange={set('priceDetails')} placeholder="ex: Gratuit jusqu'à 100 req/mois" />
              </div>
            </div>
          </div>
        )}

        {/* ── STATS ── */}
        {activeSection === 'stats' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Statistiques affichées</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Utilisateurs actifs</label>
                <input className={inputCls()} value={form.users} onChange={set('users')} placeholder="ex: 50K+" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Note (sur 5)</label>
                <input type="number" min="0" max="5" step="0.1" className={inputCls()} value={form.rating} onChange={e => setForm(prev => ({ ...prev, rating: parseFloat(e.target.value) }))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nombre d'avis</label>
                <input type="number" className={inputCls()} value={form.reviews} onChange={e => setForm(prev => ({ ...prev, reviews: parseInt(e.target.value) }))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Upvotes</label>
                <input type="number" className={inputCls()} value={form.upvotes} onChange={e => setForm(prev => ({ ...prev, upvotes: parseInt(e.target.value) }))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Uptime</label>
                <input className={inputCls()} value={form.uptime} onChange={set('uptime')} placeholder="ex: 99.9%" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Précision IA</label>
                <input className={inputCls()} value={form.accuracy} onChange={set('accuracy')} placeholder="ex: 87%" />
              </div>
            </div>
          </div>
        )}

        {/* ── CONTENU ── */}
        {activeSection === 'content' && (
          <div className="space-y-5">
            {/* Points forts */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Points forts</h2>
                <button type="button" onClick={() => addItem('highlights', '')}
                  className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-700">
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </div>
              {form.highlights.map((h, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls()} value={h} onChange={e => setArr('highlights', i, e.target.value)} placeholder={`Point fort ${i + 1}`} />
                  {form.highlights.length > 1 && (
                    <button type="button" onClick={() => removeItem('highlights', i)} className="p-2 hover:bg-red-50 rounded-xl transition-colors">
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Fonctionnalités */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Fonctionnalités</h2>
                <button type="button" onClick={() => addItem('features', { title: '', desc: '' })}
                  className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-700">
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </div>
              {form.features.map((f, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <input className={inputCls()} value={f.title} onChange={e => setObjArr('features', i, 'title', e.target.value)} placeholder="Titre" />
                    <input className={inputCls()} value={f.desc} onChange={e => setObjArr('features', i, 'desc', e.target.value)} placeholder="Description courte" />
                  </div>
                  {form.features.length > 1 && (
                    <button type="button" onClick={() => removeItem('features', i)} className="p-2 hover:bg-red-50 rounded-xl transition-colors mt-0.5">
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Cas d'usage */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Cas d'usage</h2>
                <button type="button" onClick={() => addItem('useCases', { title: '', desc: '' })}
                  className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-700">
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </div>
              {form.useCases.map((uc, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <input className={inputCls()} value={uc.title} onChange={e => setObjArr('useCases', i, 'title', e.target.value)} placeholder="Titre du cas" />
                    <input className={inputCls()} value={uc.desc} onChange={e => setObjArr('useCases', i, 'desc', e.target.value)} placeholder="Description" />
                  </div>
                  {form.useCases.length > 1 && (
                    <button type="button" onClick={() => removeItem('useCases', i)} className="p-2 hover:bg-red-50 rounded-xl transition-colors mt-0.5">
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Bénéfices */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Inclus dans l'abonnement</h2>
                <button type="button" onClick={() => addItem('benefits', '')}
                  className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-700">
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </div>
              {form.benefits.map((b, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls()} value={b} onChange={e => setArr('benefits', i, e.target.value)} placeholder={`Bénéfice ${i + 1}`} />
                  {form.benefits.length > 1 && (
                    <button type="button" onClick={() => removeItem('benefits', i)} className="p-2 hover:bg-red-50 rounded-xl transition-colors">
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions sticky */}
        <div className="flex gap-3 pt-2">
          <Link href="/admin/tools"
            className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm text-center hover:bg-gray-50 transition-colors">
            Annuler
          </Link>
          <button type="submit" disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors disabled:opacity-60 shadow-sm">
            <Save className="w-4 h-4" />
            {saving ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : "Créer l'outil"}
          </button>
        </div>
      </form>
    </div>
  );
}
