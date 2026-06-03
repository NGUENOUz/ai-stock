'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export interface PromptData {
  id?: string;
  title: string;
  category: string;
  type: 'text' | 'image';
  prompt: string;
  description: string;
  style: string;
  tool: string;
  tags: string[];
  price: number;
  isPremium: boolean;
  status: 'published' | 'draft';
  imageUrl: string;
  downloads?: number;
  likes?: number;
}

export const EMPTY_PROMPT: PromptData = {
  title: '', category: 'Marketing', type: 'text',
  prompt: '', description: '', style: '', tool: 'ChatGPT',
  tags: [], price: 0, isPremium: false, status: 'draft',
  imageUrl: '', downloads: 0, likes: 0,
};

const CATEGORIES = ['Marketing', 'Développement', 'Contenu', 'Design', 'Productivité', 'SEO', 'E-commerce', 'Finance', 'Éducation'];
const TOOLS_TEXT = ['ChatGPT', 'Claude', 'Gemini', 'Mistral', 'Llama', 'Copilot'];
const TOOLS_IMAGE = ['Midjourney', 'DALL-E', 'Stable Diffusion', 'Firefly', 'Ideogram'];

interface PromptFormProps {
  initialData?: Partial<PromptData>;
  isEdit?: boolean;
}

export default function PromptForm({ initialData, isEdit = false }: PromptFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<PromptData>({ ...EMPTY_PROMPT, ...initialData });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Requis';
    if (!form.prompt.trim()) e.prompt = 'Le prompt est requis';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaving(true);
    // TODO: supabase.from('prompts').insert/update(form)
    await new Promise(r => setTimeout(r, 600));
    setSaving(false);
    router.push('/admin/prompts');
  };

  const set = (key: keyof PromptData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const cls = (key?: string) =>
    `w-full px-4 py-2.5 rounded-xl border bg-gray-50 text-sm focus:outline-none focus:ring-2 transition-all ${
      key && errors[key] ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-purple-100 focus:border-purple-300'
    }`;

  const tools = form.type === 'image' ? TOOLS_IMAGE : TOOLS_TEXT;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/prompts" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900">{isEdit ? 'Modifier le prompt' : 'Nouveau prompt'}</h1>
          <p className="text-sm text-gray-500">{isEdit ? 'Modifiez les informations' : 'Créez un nouveau prompt'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <h2 className="font-bold text-gray-900">Informations</h2>

          {/* Titre */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Titre *</label>
            <input className={cls('title')} value={form.title} onChange={set('title')} placeholder="ex: Prompt Marketing Instagram Ultra-Efficace" />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
            <input className={cls()} value={form.description} onChange={set('description')} placeholder="Brève description du prompt..." />
          </div>

          {/* Type + Catégorie */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Type</label>
              <div className="flex gap-2">
                {(['text', 'image'] as const).map(t => (
                  <button key={t} type="button" onClick={() => setForm(prev => ({ ...prev, type: t, tool: t === 'image' ? TOOLS_IMAGE[0] : TOOLS_TEXT[0] }))}
                    className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-all ${
                      form.type === t ? 'bg-purple-600 border-purple-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}>
                    {t === 'text' ? '📝 Texte' : '🖼️ Image'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Catégorie</label>
              <select className={cls()} value={form.category} onChange={set('category')}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Outil + Style */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Outil IA</label>
              <select className={cls()} value={form.tool} onChange={set('tool')}>
                {tools.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Style {form.type === 'image' ? '(ex: Réaliste, Anime…)' : '(ex: Professionnel…)'}</label>
              <input className={cls()} value={form.style} onChange={set('style')} placeholder={form.type === 'image' ? 'Réaliste, 4K' : 'Professionnel'} />
            </div>
          </div>

          {/* Image URL (si type image) */}
          {form.type === 'image' && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">URL de l'image d'exemple</label>
              <input className={cls()} value={form.imageUrl} onChange={set('imageUrl')} placeholder="https://exemple.com/image.jpg" />
              {form.imageUrl && (
                <img src={form.imageUrl} alt="preview" className="mt-3 w-full h-40 rounded-xl object-cover border border-gray-200"
                  onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
          )}
        </div>

        {/* Prompt */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="font-bold text-gray-900">Contenu du prompt *</h2>
          <textarea rows={8} className={cls('prompt')} value={form.prompt} onChange={set('prompt')}
            placeholder="Écrivez le prompt complet ici. Utilisez [VARIABLE] pour les parties à personnaliser..." />
          {errors.prompt && <p className="mt-1 text-xs text-red-500">{errors.prompt}</p>}
          <p className="text-xs text-gray-400">{form.prompt.length} caractères</p>
        </div>

        {/* Tarification & Publication */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <h2 className="font-bold text-gray-900">Tarification & Publication</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Prix (€)</label>
              <input type="number" min="0" step="0.01" className={cls()} value={form.price}
                onChange={e => setForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Tags <span className="font-normal text-gray-400">(virgules)</span></label>
              <input className={cls()} value={form.tags.join(', ')}
                onChange={e => setForm(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))}
                placeholder="social, instagram, marketing" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isPremium} onChange={e => setForm(prev => ({ ...prev, isPremium: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 text-purple-600" />
              <span className="text-sm font-semibold text-gray-700">Prompt Premium</span>
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

        {/* Actions */}
        <div className="flex gap-3">
          <Link href="/admin/prompts" className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm text-center hover:bg-gray-50 transition-colors">
            Annuler
          </Link>
          <button type="submit" disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors disabled:opacity-60 shadow-sm">
            <Save className="w-4 h-4" />
            {saving ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer le prompt'}
          </button>
        </div>
      </form>
    </div>
  );
}
