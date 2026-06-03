'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';

export interface TournamentData {
  id?: string;
  title: string;
  description: string;
  type: 'prompt' | 'code' | 'design' | 'workflow';
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  prize: string;
  prizeDetails: string;
  startDate: string;
  endDate: string;
  maxParticipants: string;
  rules: string[];
  criteria: { title: string; weight: string }[];
  rewards: { rank: string; prize: string }[];
  imageUrl: string;
  tags: string[];
  isPublic: boolean;
}

export const EMPTY_TOURNAMENT: TournamentData = {
  title: '', description: '',
  type: 'prompt', status: 'draft',
  prize: '', prizeDetails: '',
  startDate: '', endDate: '',
  maxParticipants: '',
  rules: [''],
  criteria: [{ title: '', weight: '' }],
  rewards: [{ rank: '1er', prize: '' }],
  imageUrl: '', tags: [], isPublic: true,
};

const inputCls = (err?: boolean) =>
  `w-full px-4 py-2.5 rounded-xl border bg-gray-50 text-sm focus:outline-none focus:ring-2 transition-all ${
    err ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-purple-100 focus:border-purple-300'
  }`;

const SECTIONS = [
  { id: 'basic', label: 'Infos de base' },
  { id: 'dates', label: 'Dates & Prix' },
  { id: 'rules', label: 'Règles & Critères' },
  { id: 'rewards', label: 'Récompenses' },
  { id: 'media', label: 'Médias' },
];

interface TournamentFormProps {
  initialData?: Partial<TournamentData>;
  isEdit?: boolean;
}

export default function TournamentForm({ initialData, isEdit = false }: TournamentFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<TournamentData>({ ...EMPTY_TOURNAMENT, ...initialData });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('basic');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Requis';
    if (!form.description.trim()) e.description = 'Requis';
    if (!form.prize.trim()) e.prize = 'Requis';
    if (!form.startDate) e.startDate = 'Requis';
    if (!form.endDate) e.endDate = 'Requis';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); setActiveSection('basic'); return; }
    setSaving(true);
    // TODO: supabase.from('tournaments').insert/update(form)
    await new Promise(r => setTimeout(r, 700));
    setSaving(false);
    router.push('/admin/tournaments');
  };

  const set = (key: keyof TournamentData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }));

  const setArr = (key: keyof TournamentData, i: number, val: string) =>
    setForm(prev => { const a = [...(prev[key] as string[])]; a[i] = val; return { ...prev, [key]: a }; });

  const setObjArr = (key: keyof TournamentData, i: number, field: string, val: string) =>
    setForm(prev => { const a = [...(prev[key] as any[])]; a[i] = { ...a[i], [field]: val }; return { ...prev, [key]: a }; });

  const add = (key: keyof TournamentData, empty: any) =>
    setForm(prev => ({ ...prev, [key]: [...(prev[key] as any[]), empty] }));

  const remove = (key: keyof TournamentData, i: number) =>
    setForm(prev => ({ ...prev, [key]: (prev[key] as any[]).filter((_: any, idx: number) => idx !== i) }));

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/tournaments" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            {isEdit ? 'Modifier le tournoi' : 'Nouveau tournoi'}
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
              <input className={inputCls(!!errors.title)} value={form.title} onChange={set('title')} placeholder="ex: Meilleur Prompt Marketing 2024" />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description *</label>
              <textarea rows={4} className={inputCls(!!errors.description)} value={form.description} onChange={set('description')} placeholder="Décrivez le tournoi, son objectif et ce que les participants doivent faire..." />
              {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Type</label>
                <select className={inputCls()} value={form.type} onChange={set('type')}>
                  <option value="prompt">💡 Prompt</option>
                  <option value="code">💻 Code</option>
                  <option value="design">🎨 Design</option>
                  <option value="workflow">⚡ Workflow</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Statut</label>
                <select className={inputCls()} value={form.status} onChange={set('status')}>
                  <option value="draft">Brouillon</option>
                  <option value="active">Actif</option>
                  <option value="completed">Terminé</option>
                  <option value="cancelled">Annulé</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Participants max</label>
                <input type="number" className={inputCls()} value={form.maxParticipants} onChange={set('maxParticipants')} placeholder="ex: 200" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Tags <span className="font-normal text-gray-400">(virgules)</span></label>
                <input className={inputCls()} value={form.tags.join(', ')} onChange={e => setForm(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))} placeholder="ia, prompt, marketing" />
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.isPublic} onChange={e => setForm(prev => ({ ...prev, isPublic: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
              <span className="text-sm font-semibold text-gray-700">Tournoi public (visible par tous)</span>
            </label>
          </div>
        )}

        {/* ── DATES & PRIX ── */}
        {activeSection === 'dates' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Dates & Prix</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Date de début *</label>
                <input type="date" className={inputCls(!!errors.startDate)} value={form.startDate} onChange={set('startDate')} />
                {errors.startDate && <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Date de fin *</label>
                <input type="date" className={inputCls(!!errors.endDate)} value={form.endDate} onChange={set('endDate')} />
                {errors.endDate && <p className="mt-1 text-xs text-red-500">{errors.endDate}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Prix total *</label>
                <input className={inputCls(!!errors.prize)} value={form.prize} onChange={set('prize')} placeholder="ex: 1 500€" />
                {errors.prize && <p className="mt-1 text-xs text-red-500">{errors.prize}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Détails du prix</label>
                <input className={inputCls()} value={form.prizeDetails} onChange={set('prizeDetails')} placeholder="ex: 1000€ + 500€ en crédits" />
              </div>
            </div>
          </div>
        )}

        {/* ── RÈGLES & CRITÈRES ── */}
        {activeSection === 'rules' && (
          <div className="space-y-5">
            {/* Règles */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Règles de participation</h2>
                <button type="button" onClick={() => add('rules', '')}
                  className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-700">
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </div>
              {form.rules.map((r, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls()} value={r} onChange={e => setArr('rules', i, e.target.value)} placeholder={`Règle ${i + 1}`} />
                  {form.rules.length > 1 && (
                    <button type="button" onClick={() => remove('rules', i)} className="p-2 hover:bg-red-50 rounded-xl transition-colors">
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Critères d'évaluation */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Critères d'évaluation</h2>
                <button type="button" onClick={() => add('criteria', { title: '', weight: '' })}
                  className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-700">
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </div>
              {form.criteria.map((c, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <input className={inputCls()} value={c.title} onChange={e => setObjArr('criteria', i, 'title', e.target.value)} placeholder="ex: Créativité" />
                    </div>
                    <input className={inputCls()} value={c.weight} onChange={e => setObjArr('criteria', i, 'weight', e.target.value)} placeholder="ex: 40%" />
                  </div>
                  {form.criteria.length > 1 && (
                    <button type="button" onClick={() => remove('criteria', i)} className="p-2 hover:bg-red-50 rounded-xl transition-colors mt-0.5">
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RÉCOMPENSES ── */}
        {activeSection === 'rewards' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Récompenses par rang</h2>
              <button type="button" onClick={() => add('rewards', { rank: `${form.rewards.length + 1}ème`, prize: '' })}
                className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-700">
                <Plus className="w-4 h-4" /> Ajouter
              </button>
            </div>
            {form.rewards.map((r, i) => (
              <div key={i} className="flex gap-2 items-start">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <input className={inputCls()} value={r.rank} onChange={e => setObjArr('rewards', i, 'rank', e.target.value)} placeholder="ex: 1er" />
                  <input className={inputCls()} value={r.prize} onChange={e => setObjArr('rewards', i, 'prize', e.target.value)} placeholder="ex: 500€" />
                </div>
                {form.rewards.length > 1 && (
                  <button type="button" onClick={() => remove('rewards', i)} className="p-2 hover:bg-red-50 rounded-xl transition-colors mt-0.5">
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── MÉDIAS ── */}
        {activeSection === 'media' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Médias</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Image du tournoi</label>
              <input className={inputCls()} value={form.imageUrl} onChange={set('imageUrl')} placeholder="https://exemple.com/image.jpg" />
              {form.imageUrl && (
                <img src={form.imageUrl} alt="preview" className="mt-3 w-full h-40 rounded-xl object-cover border border-gray-200" onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Link href="/admin/tournaments"
            className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm text-center hover:bg-gray-50 transition-colors">
            Annuler
          </Link>
          <button type="submit" disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors disabled:opacity-60 shadow-sm">
            <Save className="w-4 h-4" />
            {saving ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer le tournoi'}
          </button>
        </div>
      </form>
    </div>
  );
}
