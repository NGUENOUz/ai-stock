'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';

export interface LessonData {
  id?: string;
  title: string;
  duration: string;
  videoUrl: string;
  isFreePreview: boolean;
}

export interface TrainingData {
  id?: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  language: string;
  price: number;
  durationMinutes: number;
  numberOfVideos: number;
  thumbnailUrl: string;
  isPremium: boolean;
  status: 'published' | 'draft';
  // Instructeur
  instructorName: string;
  instructorBio: string;
  instructorAvatar: string;
  // Contenu
  lessons: LessonData[];
  objectives: string[];
  requirements: string[];
  tags: string[];
}

export const EMPTY_TRAINING: TrainingData = {
  title: '', shortDescription: '', longDescription: '',
  category: 'IA Générative', level: 'Débutant', language: 'Français',
  price: 0, durationMinutes: 60, numberOfVideos: 0,
  thumbnailUrl: '', isPremium: false, status: 'draft',
  instructorName: '', instructorBio: '', instructorAvatar: '',
  lessons: [{ title: '', duration: '05:00', videoUrl: '', isFreePreview: false }],
  objectives: [''], requirements: [''], tags: [],
};

const CATEGORIES = ['IA Générative', 'Design', 'Marketing', 'Automatisation', 'Développement', 'Finance', 'Productivité', 'Création Vidéo'];

interface TrainingFormProps {
  initialData?: Partial<TrainingData>;
  isEdit?: boolean;
}

export default function TrainingForm({ initialData, isEdit = false }: TrainingFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<TrainingData>({ ...EMPTY_TRAINING, ...initialData });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [section, setSection] = useState('basic');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Requis';
    if (!form.shortDescription.trim()) e.shortDescription = 'Requis';
    if (!form.instructorName.trim()) e.instructorName = 'Requis';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); setSection('basic'); return; }
    setSaving(true);
    // TODO: supabase.from('trainings').insert/update(form)
    await new Promise(r => setTimeout(r, 700));
    setSaving(false);
    router.push('/admin/trainings');
  };

  const set = (key: keyof TrainingData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const setNum = (key: keyof TrainingData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [key]: parseFloat(e.target.value) || 0 }));

  const setStrArr = (key: keyof TrainingData, i: number, val: string) =>
    setForm(prev => { const a = [...(prev[key] as string[])]; a[i] = val; return { ...prev, [key]: a }; });

  const addStr = (key: keyof TrainingData) =>
    setForm(prev => ({ ...prev, [key]: [...(prev[key] as string[]), ''] }));

  const removeStr = (key: keyof TrainingData, i: number) =>
    setForm(prev => ({ ...prev, [key]: (prev[key] as string[]).filter((_, idx) => idx !== i) }));

  const setLesson = (i: number, field: keyof LessonData, val: any) =>
    setForm(prev => {
      const ls = [...prev.lessons];
      ls[i] = { ...ls[i], [field]: val };
      return { ...prev, lessons: ls, numberOfVideos: ls.length };
    });

  const addLesson = () =>
    setForm(prev => ({
      ...prev,
      lessons: [...prev.lessons, { title: '', duration: '05:00', videoUrl: '', isFreePreview: false }],
      numberOfVideos: prev.lessons.length + 1,
    }));

  const removeLesson = (i: number) =>
    setForm(prev => {
      const ls = prev.lessons.filter((_, idx) => idx !== i);
      return { ...prev, lessons: ls, numberOfVideos: ls.length };
    });

  const cls = (key?: string) =>
    `w-full px-4 py-2.5 rounded-xl border bg-gray-50 text-sm focus:outline-none focus:ring-2 transition-all ${
      key && errors[key] ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-purple-100 focus:border-purple-300'
    }`;

  const SECTIONS = [
    { id: 'basic', label: 'Infos de base' },
    { id: 'media', label: 'Médias' },
    { id: 'instructor', label: 'Formateur' },
    { id: 'content', label: 'Contenu' },
    { id: 'lessons', label: 'Leçons' },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/trainings" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900">{isEdit ? 'Modifier la formation' : 'Nouvelle formation'}</h1>
          <p className="text-sm text-gray-500">Remplissez toutes les sections</p>
        </div>
      </div>

      {/* Nav sections */}
      <div className="flex gap-2 flex-wrap">
        {SECTIONS.map(s => (
          <button key={s.id} type="button" onClick={() => setSection(s.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              section === s.id ? 'bg-purple-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}>
            {s.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ── INFOS DE BASE ── */}
        {section === 'basic' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Informations de base</h2>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Titre *</label>
              <input className={cls('title')} value={form.title} onChange={set('title')} placeholder="ex: Maîtriser ChatGPT Pro" />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description courte *</label>
              <input className={cls('shortDescription')} value={form.shortDescription} onChange={set('shortDescription')} placeholder="Résumé en une phrase..." />
              {errors.shortDescription && <p className="mt-1 text-xs text-red-500">{errors.shortDescription}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description longue</label>
              <textarea rows={5} className={cls()} value={form.longDescription} onChange={set('longDescription')} placeholder="Description complète de la formation..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Catégorie</label>
                <select className={cls()} value={form.category} onChange={set('category')}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Niveau</label>
                <select className={cls()} value={form.level} onChange={set('level')}>
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Avancé">Avancé</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Prix (€)</label>
                <input type="number" min="0" step="0.01" className={cls()} value={form.price} onChange={setNum('price')} placeholder="49.99" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Durée (min)</label>
                <input type="number" min="0" className={cls()} value={form.durationMinutes} onChange={setNum('durationMinutes')} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Langue</label>
                <select className={cls()} value={form.language} onChange={set('language')}>
                  <option value="Français">Français</option>
                  <option value="Anglais">Anglais</option>
                  <option value="Espagnol">Espagnol</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Tags <span className="font-normal text-gray-400">(séparés par virgules)</span></label>
              <input className={cls()} value={form.tags.join(', ')} onChange={e => setForm(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))} placeholder="chatgpt, ia, productivité" />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isPremium} onChange={e => setForm(prev => ({ ...prev, isPremium: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600" />
                <span className="text-sm font-semibold text-gray-700">Formation Premium</span>
              </label>
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
        {section === 'media' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Image de couverture</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">URL de la miniature</label>
              <input className={cls()} value={form.thumbnailUrl} onChange={set('thumbnailUrl')} placeholder="https://exemple.com/image.jpg" />
              {form.thumbnailUrl && (
                <img src={form.thumbnailUrl} alt="preview" className="mt-3 w-full h-48 rounded-xl object-cover border border-gray-200"
                  onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
          </div>
        )}

        {/* ── FORMATEUR ── */}
        {section === 'instructor' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Informations du formateur</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nom *</label>
              <input className={cls('instructorName')} value={form.instructorName} onChange={set('instructorName')} placeholder="ex: Jean Dupont" />
              {errors.instructorName && <p className="mt-1 text-xs text-red-500">{errors.instructorName}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Bio</label>
              <textarea rows={3} className={cls()} value={form.instructorBio} onChange={set('instructorBio')} placeholder="Expert IA depuis 10 ans..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">URL de l'avatar</label>
              <input className={cls()} value={form.instructorAvatar} onChange={set('instructorAvatar')} placeholder="https://exemple.com/avatar.jpg" />
              {form.instructorAvatar && (
                <img src={form.instructorAvatar} alt="avatar" className="mt-3 w-16 h-16 rounded-full object-cover border border-gray-200"
                  onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
          </div>
        )}

        {/* ── CONTENU ── */}
        {section === 'content' && (
          <div className="space-y-4">
            {/* Objectifs */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Objectifs pédagogiques</h2>
                <button type="button" onClick={() => addStr('objectives')}
                  className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-700">
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </div>
              {form.objectives.map((o, i) => (
                <div key={i} className="flex gap-2">
                  <input className={cls()} value={o} onChange={e => setStrArr('objectives', i, e.target.value)} placeholder={`Objectif ${i + 1}`} />
                  {form.objectives.length > 1 && (
                    <button type="button" onClick={() => removeStr('objectives', i)} className="p-2 hover:bg-red-50 rounded-xl">
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
                <button type="button" onClick={() => addStr('requirements')}
                  className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-700">
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </div>
              {form.requirements.map((r, i) => (
                <div key={i} className="flex gap-2">
                  <input className={cls()} value={r} onChange={e => setStrArr('requirements', i, e.target.value)} placeholder={`Prérequis ${i + 1}`} />
                  {form.requirements.length > 1 && (
                    <button type="button" onClick={() => removeStr('requirements', i)} className="p-2 hover:bg-red-50 rounded-xl">
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── LEÇONS ── */}
        {section === 'lessons' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Leçons ({form.lessons.length})</h2>
              <button type="button" onClick={addLesson}
                className="flex items-center gap-1 text-xs text-purple-600 font-semibold hover:text-purple-700 px-3 py-1.5 bg-purple-50 rounded-xl">
                <Plus className="w-4 h-4" /> Ajouter une leçon
              </button>
            </div>
            {form.lessons.map((lesson, i) => (
              <div key={i} className="p-4 rounded-xl border border-gray-100 bg-gray-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">Leçon {i + 1}</span>
                  {form.lessons.length > 1 && (
                    <button type="button" onClick={() => removeLesson(i)} className="p-1.5 hover:bg-red-50 rounded-lg">
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Titre</label>
                    <input className={cls()} value={lesson.title} onChange={e => setLesson(i, 'title', e.target.value)} placeholder="Titre de la leçon" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Durée</label>
                    <input className={cls()} value={lesson.duration} onChange={e => setLesson(i, 'duration', e.target.value)} placeholder="ex: 12:30" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">URL Vidéo (YouTube embed)</label>
                  <input className={cls()} value={lesson.videoUrl} onChange={e => setLesson(i, 'videoUrl', e.target.value)} placeholder="https://www.youtube.com/embed/..." />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={lesson.isFreePreview} onChange={e => setLesson(i, 'isFreePreview', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600" />
                  <span className="text-xs font-semibold text-gray-600">Aperçu gratuit</span>
                </label>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Link href="/admin/trainings"
            className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm text-center hover:bg-gray-50 transition-colors">
            Annuler
          </Link>
          <button type="submit" disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors disabled:opacity-60 shadow-sm">
            <Save className="w-4 h-4" />
            {saving ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer la formation'}
          </button>
        </div>
      </form>
    </div>
  );
}
