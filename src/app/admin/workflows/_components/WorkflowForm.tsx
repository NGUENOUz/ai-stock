'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Save, Plus, X, Zap, Image as ImageIcon, 
  Award, CheckCircle, Clock, TrendingUp, Users, Star,
  Package, Shield, FileText, Crown
} from 'lucide-react';

export interface WorkflowData {
  id?: string;
  // Infos de base
  title: string;
  tagline: string;
  description: string;
  platform: string;
  category: string;
  sector: string;
  status: 'draft' | 'published';
  isBestseller: boolean;
  // Prix
  price: number;
  isFree: boolean;
  // Médias
  thumbnail: string;
  // Applications utilisées
  apps: { name: string; logo: string; role: string }[];
  // Contributeur
  contributor: {
    name: string;
    avatar: string;
    role: string;
    verified: boolean;
    totalWorkflows: number;
    totalStudents: number;
  };
  // Contenu
  features: string[];
  requirements: string[];
  steps: { title: string; desc: string }[];
  // Stats affichées
  stats: { label: string; value: string }[];
}

export const EMPTY_WORKFLOW: WorkflowData = {
  title: '', tagline: '', description: '',
  platform: 'N8N', category: 'Ventes', sector: 'SaaS',
  status: 'draft', isBestseller: false,
  price: 0, isFree: true,
  thumbnail: '',
  apps: [{ name: '', logo: '', role: '' }],
  contributor: {
    name: '', avatar: '', role: '', verified: false,
    totalWorkflows: 0, totalStudents: 0
  },
  features: [''],
  requirements: [''],
  steps: [{ title: '', desc: '' }],
  stats: [
    { label: 'Temps gagné', value: '' },
    { label: 'Taux de succès', value: '' },
    { label: 'Utilisateurs', value: '' },
    { label: 'Note moyenne', value: '' }
  ],
};

const PLATFORMS = ['N8N', 'Make', 'Zapier', 'Power Automate', 'Integromat', 'Autre'];
const CATEGORIES = ['Ventes', 'Marketing', 'Support', 'Finance', 'RH', 'Productivité', 'Développement', 'Autre'];
const SECTORS = ['SaaS', 'E-commerce', 'Agence', 'Startup', 'Enterprise', 'Freelance', 'Autre'];

const inputCls = (err?: boolean) =>
  `w-full px-4 py-2.5 rounded-xl border bg-gray-50 text-sm focus:outline-none focus:ring-2 transition-all ${
    err ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-300'
  }`;

const SECTIONS = [
  { id: 'basic', label: 'Infos de base', icon: FileText, color: 'blue' },
  { id: 'apps', label: 'Applications', icon: Package, color: 'purple' },
  { id: 'content', label: 'Contenu', icon: CheckCircle, color: 'green' },
  { id: 'guide', label: 'Guide installation', icon: Shield, color: 'orange' },
  { id: 'stats', label: 'Statistiques', icon: TrendingUp, color: 'cyan' },
  { id: 'contributor', label: 'Contributeur', icon: Award, color: 'pink' },
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
    if (!form.tagline.trim()) e.tagline = 'Requis';
    if (!form.description.trim()) e.description = 'Requis';
    if (!form.contributor.name.trim()) e.contributorName = 'Requis';
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

  const setApp = (i: number, field: string, val: string) =>
    setForm(prev => { const a = [...prev.apps]; a[i] = { ...a[i], [field]: val }; return { ...prev, apps: a }; });

  const setStep = (i: number, field: string, val: string) =>
    setForm(prev => { const a = [...prev.steps]; a[i] = { ...a[i], [field]: val }; return { ...prev, steps: a }; });

  const setStat = (i: number, field: string, val: string) =>
    setForm(prev => { const a = [...prev.stats]; a[i] = { ...a[i], [field]: val }; return { ...prev, stats: a }; });

  const add = (key: keyof WorkflowData, empty: any) =>
    setForm(prev => ({ ...prev, [key]: [...(prev[key] as any[]), empty] }));

  const remove = (key: keyof WorkflowData, i: number) =>
    setForm(prev => ({ ...prev, [key]: (prev[key] as any[]).filter((_: any, idx: number) => idx !== i) }));

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-600 text-white',
    purple: 'bg-purple-600 text-white',
    green: 'bg-green-600 text-white',
    orange: 'bg-orange-600 text-white',
    cyan: 'bg-cyan-600 text-white',
    pink: 'bg-pink-600 text-white',
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/workflows" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            {isEdit ? 'Modifier le workflow' : 'Nouveau workflow'}
          </h1>
          <p className="text-sm text-gray-500">Remplissez toutes les sections pour créer un workflow complet</p>
        </div>
      </div>

      {/* Nav sections avec icônes et couleurs */}
      <div className="flex gap-2 flex-wrap">
        {SECTIONS.map(s => {
          const Icon = s.icon;
          const isActive = activeSection === s.id;
          return (
            <button key={s.id} type="button" onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? colorMap[s.color] + ' shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}>
              <Icon className="w-4 h-4" />
              {s.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ── INFOS DE BASE ── */}
        {activeSection === 'basic' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-gray-900">Informations de base</h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Titre *</label>
              <input className={inputCls(!!errors.title)} value={form.title} onChange={set('title')} placeholder="ex: Automatisation Lead Enrichment + CRM" />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Tagline (sous-titre) *</label>
              <input className={inputCls(!!errors.tagline)} value={form.tagline} onChange={set('tagline')} placeholder="ex: Enrichissez et synchronisez vos leads automatiquement" />
              {errors.tagline && <p className="mt-1 text-xs text-red-500">{errors.tagline}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description complète *</label>
              <textarea rows={5} className={inputCls(!!errors.description)} value={form.description} onChange={set('description')} placeholder="Décrivez en détail ce que fait le workflow, son objectif et sa valeur ajoutée..." />
              {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Plateforme</label>
                <select className={inputCls()} value={form.platform} onChange={set('platform')}>
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Catégorie</label>
                <select className={inputCls()} value={form.category} onChange={set('category')}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Secteur</label>
                <select className={inputCls()} value={form.sector} onChange={set('sector')}>
                  {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Image principale (thumbnail)</label>
              <input className={inputCls()} value={form.thumbnail} onChange={set('thumbnail')} placeholder="https://exemple.com/workflow.jpg" />
              {form.thumbnail && (
                <img src={form.thumbnail} alt="preview" className="mt-3 w-full h-48 rounded-xl object-cover border border-gray-200" onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Prix (€)</label>
                <input type="number" min="0" step="0.01" className={inputCls()} value={form.price} onChange={e => setForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))} />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.isFree} onChange={e => setForm(prev => ({ ...prev, isFree: e.target.checked, price: e.target.checked ? 0 : prev.price }))}
                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <span className="text-sm font-semibold text-gray-700">Gratuit</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-3">Statut</label>
              <div className="flex gap-3">
                <button type="button" onClick={() => setForm(prev => ({ ...prev, status: 'draft' }))}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    form.status === 'draft' ? 'bg-gray-600 border-gray-600 text-white shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}>
                  Brouillon
                </button>
                <button type="button" onClick={() => setForm(prev => ({ ...prev, status: 'published' }))}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    form.status === 'published' ? 'bg-green-600 border-green-600 text-white shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}>
                  Publié
                </button>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <input type="checkbox" checked={form.isBestseller} onChange={e => setForm(prev => ({ ...prev, isBestseller: e.target.checked }))}
                className="w-4 h-4 rounded border-yellow-300 text-yellow-600 focus:ring-yellow-500" />
              <Crown className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-semibold text-gray-700">Marquer comme Bestseller</span>
            </label>
          </div>
        )}

        {/* ── APPLICATIONS ── */}
        {activeSection === 'apps' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-600" />
                <h2 className="font-bold text-gray-900">Applications utilisées</h2>
              </div>
              <button type="button" onClick={() => add('apps', { name: '', logo: '', role: '' })}
                className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-700">
                <Plus className="w-4 h-4" /> Ajouter
              </button>
            </div>
            <p className="text-sm text-gray-500">Les outils/apps utilisés dans ce workflow</p>

            {form.apps.map((app, i) => (
              <div key={i} className="flex gap-3 items-start p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <input className={inputCls()} value={app.name} onChange={e => setApp(i, 'name', e.target.value)} placeholder="ex: Apollo.io" />
                  <input className={inputCls()} value={app.logo} onChange={e => setApp(i, 'logo', e.target.value)} placeholder="URL logo" />
                  <input className={inputCls()} value={app.role} onChange={e => setApp(i, 'role', e.target.value)} placeholder="ex: Enrichissement" />
                </div>
                {form.apps.length > 1 && (
                  <button type="button" onClick={() => remove('apps', i)} className="p-2 hover:bg-red-50 rounded-xl transition-colors mt-0.5">
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
            {/* Fonctionnalités */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h2 className="font-bold text-gray-900">Fonctionnalités incluses</h2>
                </div>
                <button type="button" onClick={() => add('features', '')}
                  className="flex items-center gap-1 text-xs text-green-600 font-semibold hover:text-green-700">
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </div>
              {form.features.map((f, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls()} value={f} onChange={e => setArr('features', i, e.target.value)} placeholder={`Fonctionnalité ${i + 1}`} />
                  {form.features.length > 1 && (
                    <button type="button" onClick={() => remove('features', i)} className="p-2 hover:bg-red-50 rounded-xl">
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Prérequis */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <h2 className="font-bold text-gray-900">Prérequis</h2>
                </div>
                <button type="button" onClick={() => add('requirements', '')}
                  className="flex items-center gap-1 text-xs text-orange-600 font-semibold hover:text-orange-700">
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
          </div>
        )}

        {/* ── GUIDE INSTALLATION ── */}
        {activeSection === 'guide' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-600" />
                <h2 className="font-bold text-gray-900">Étapes d'installation</h2>
              </div>
              <button type="button" onClick={() => add('steps', { title: '', desc: '' })}
                className="flex items-center gap-1 text-xs text-orange-600 font-semibold hover:text-orange-700">
                <Plus className="w-4 h-4" /> Ajouter
              </button>
            </div>

            {form.steps.map((step, i) => (
              <div key={i} className="flex gap-3 items-start p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white text-sm font-bold flex items-center justify-center mt-1">
                  {i + 1}
                </div>
                <div className="flex-1 space-y-2">
                  <input className={inputCls()} value={step.title} onChange={e => setStep(i, 'title', e.target.value)} placeholder={`Titre de l'étape ${i + 1}`} />
                  <textarea rows={2} className={inputCls()} value={step.desc} onChange={e => setStep(i, 'desc', e.target.value)} placeholder="Description détaillée..." />
                </div>
                {form.steps.length > 1 && (
                  <button type="button" onClick={() => remove('steps', i)} className="p-2 hover:bg-red-50 rounded-xl mt-1">
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── STATISTIQUES ── */}
        {activeSection === 'stats' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-cyan-600" />
              <h2 className="font-bold text-gray-900">Statistiques affichées</h2>
            </div>
            <p className="text-sm text-gray-500">Ces stats seront affichées sur la page détail du workflow</p>

            <div className="grid grid-cols-2 gap-4">
              {form.stats.map((stat, i) => (
                <div key={i} className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">{stat.label}</label>
                  <input className={inputCls()} value={stat.value} onChange={e => setStat(i, 'value', e.target.value)} placeholder={`ex: ${i === 0 ? '15h/mois' : i === 1 ? '98%' : i === 2 ? '1.2K+' : '4.9/5'}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CONTRIBUTEUR ── */}
        {activeSection === 'contributor' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-pink-600" />
              <h2 className="font-bold text-gray-900">Informations contributeur</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nom du contributeur *</label>
                <input className={inputCls(!!errors.contributorName)} value={form.contributor.name} onChange={e => setForm(prev => ({ ...prev, contributor: { ...prev.contributor, name: e.target.value } }))} placeholder="ex: Sophie Martin" />
                {errors.contributorName && <p className="mt-1 text-xs text-red-500">{errors.contributorName}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Rôle</label>
                <input className={inputCls()} value={form.contributor.role} onChange={e => setForm(prev => ({ ...prev, contributor: { ...prev.contributor, role: e.target.value } }))} placeholder="ex: Expert Automation" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Avatar URL</label>
              <input className={inputCls()} value={form.contributor.avatar} onChange={e => setForm(prev => ({ ...prev, contributor: { ...prev.contributor, avatar: e.target.value } }))} placeholder="https://exemple.com/avatar.jpg" />
              {form.contributor.avatar && (
                <img src={form.contributor.avatar} alt="avatar" className="mt-3 w-20 h-20 rounded-full object-cover border border-gray-200" onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Total workflows</label>
                <input type="number" min="0" className={inputCls()} value={form.contributor.totalWorkflows} onChange={e => setForm(prev => ({ ...prev, contributor: { ...prev.contributor, totalWorkflows: parseInt(e.target.value) || 0 } }))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Total étudiants</label>
                <input type="number" min="0" className={inputCls()} value={form.contributor.totalStudents} onChange={e => setForm(prev => ({ ...prev, contributor: { ...prev.contributor, totalStudents: parseInt(e.target.value) || 0 } }))} />
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer p-4 bg-blue-50 rounded-xl border border-blue-200">
              <input type="checkbox" checked={form.contributor.verified} onChange={e => setForm(prev => ({ ...prev, contributor: { ...prev.contributor, verified: e.target.checked } }))}
                className="w-4 h-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500" />
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">Contributeur vérifié</span>
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
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 shadow-sm">
            <Save className="w-4 h-4" />
            {saving ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer le workflow'}
          </button>
        </div>
      </form>
    </div>
  );
}
