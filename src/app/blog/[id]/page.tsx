import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Bookmark, Share2, Heart, MoreHorizontal, ArrowLeft,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

// ─── MOCK DATA ─────────────────────────────────────────────────────────────
const article = {
  id: "1",
  title: "Comment automatiser vos tâches répétitives avec l'IA (Guide complet)",
  description: "Découvrez comment les outils d'intelligence artificielle peuvent vous faire gagner des heures chaque semaine en automatisant vos tâches répétitives.",
  category: "TUTORIEL",
  date: "12 mai 2024",
  readTime: "8 min de lecture",
  image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
  author: {
    name: "Alex Dev",
    role: "Expert IA & No-Code",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
    bio: "J'aide les professionnels à automatiser leur travail et à tirer parti de l'IA au quotidien."
  },
  content: `
## 1. Pourquoi automatiser avec l'IA ?

L'automatisation avec l'IA permet aux professionnels de se concentrer sur ce qui compte vraiment. Elle réduit les erreurs humaines, augmente la productivité et libère du temps pour des tâches à plus forte valeur ajoutée.

Des outils comme Zapier, Make, ChatGPT ou Notion AI rendent cela plus accessible que jamais.

### Les avantages clés
*   **Gain de temps massif** sur les tâches de saisie et de traitement de données.
*   **Réduction des coûts** opérationnels.
*   **Amélioration de la satisfaction client** grâce à des réponses plus rapides (ex: chatbots IA).

## 2. Identifier les tâches automatisables

La première étape consiste à auditer vos processus actuels. Demandez-vous :
- Quelles tâches effectuez-vous tous les jours ou toutes les semaines ?
- Quelles tâches nécessitent de copier-coller des données entre différentes applications ?
- Quelles décisions simples suivent des règles logiques strictes ?

## 3. Les outils incontournables en 2024

Pour bien démarrer, voici notre sélection d'outils No-Code infusés à l'IA :
1.  **Make (ex-Integromat)** : Le couteau suisse de l'automatisation visuelle.
2.  **ChatGPT / Claude APIs** : Pour le traitement du langage naturel (résumés, classification).
3.  **Airtable** : La base de données intelligente pour centraliser vos opérations.
  `
};

const popularArticles = [
  {
    id: 10,
    title: "10 extensions Chrome IA indispensables",
    date: "12 mai 2024",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 11,
    title: "Les meilleurs outils No-Code en 2024",
    date: "10 mai 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: 12,
    title: "Comment créer du contenu 10x plus vite",
    date: "8 mai 2024",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=300&auto=format&fit=crop",
  }
];

const relatedArticles = [
  {
    id: 1,
    title: "Comment créer des images photoréalistes avec Midjourney v6",
    category: "TUTORIEL",
    date: "14 mai 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Les 5 meilleurs générateurs d'images IA en 2024",
    category: "GUIDE",
    date: "28 avr 2024",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1686191128892-3b370a3f144c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Automatiser son SEO avec l'Intelligence Artificielle",
    category: "TUTO",
    date: "20 avr 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Anthropic dévoile Claude 3.5 Sonnet",
    category: "ACTUALITÉ",
    date: "15 avr 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1673812240504-20b15b74158d?q=80&w=800&auto=format&fit=crop",
  }
];

export default function ArticleDetailsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-slate-900 dark:text-white pt-24 pb-20 selection:bg-primary/30">
      
      {/* ── BREADCRUMB ──────────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
          <Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </div>
      </div>

      {/* ── HERO SECTION (2 colonnes) ───────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 mb-16">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-center">
          
          {/* Texte Gauche */}
          <div className="w-full lg:w-[55%] flex flex-col items-start">
            <div className="flex items-center gap-3 text-sm font-bold mb-6">
              <span className="text-primary uppercase tracking-widest">{article.category}</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-500 dark:text-slate-400">{article.date}</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-500 dark:text-slate-400">{article.readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.1] mb-6 text-slate-900 dark:text-white tracking-tight">
              {article.title}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">
              {article.description}
            </p>
            
            <div className="flex items-center gap-4">
              <Image 
                src={article.author.avatar} 
                alt={article.author.name} 
                width={56} 
                height={56} 
                className="rounded-full border-2 border-white dark:border-slate-800 shadow-lg object-cover"
              />
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-lg">{article.author.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{article.author.role}</p>
              </div>
            </div>
          </div>
          
          {/* Image Droite */}
          <div className="w-full lg:w-[45%] h-[400px] lg:h-[500px] relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 border border-slate-200/50 dark:border-slate-800/50">
            <Image 
              src={article.image} 
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
        </div>
      </div>

      <div className="w-full h-px bg-slate-200 dark:bg-slate-800/60 mb-16 max-w-[1400px] mx-auto" />

      {/* ── MAIN CONTENT LAYOUT ─────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* 1. Sidebar Flottante (Partage) */}
          <div className="hidden lg:flex flex-col gap-6 w-16 shrink-0 sticky top-32 h-fit items-center py-6 bg-white dark:bg-[#0F172A] rounded-full border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
            <button className="text-slate-400 hover:text-primary transition-colors p-2">
              <Bookmark className="w-6 h-6" />
            </button>
            <div className="w-8 h-px bg-slate-200 dark:bg-slate-800" />
            <button className="text-slate-400 hover:text-pink-500 transition-colors p-2">
              <Heart className="w-6 h-6" />
            </button>
            <button className="text-slate-400 hover:text-blue-500 transition-colors p-2">
              <Share2 className="w-6 h-6" />
            </button>
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-2">
              <MoreHorizontal className="w-6 h-6" />
            </button>
          </div>

          {/* 2. Article Content (Markdown-like) */}
          <article className="flex-1 max-w-3xl prose prose-slate dark:prose-invert prose-lg lg:prose-xl prose-headings:font-black prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-2xl prose-img:shadow-xl">
            {/* Dans une vraie app, on utiliserait react-markdown. Ici on simule avec du JSX natif stylisé */}
            <h2 className="text-2xl md:text-3xl font-black mt-0 mb-6 text-slate-900 dark:text-white">
              1. Pourquoi automatiser avec l'IA ?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              L'automatisation avec l'IA permet aux professionnels de se concentrer sur ce qui compte vraiment. Elle réduit les erreurs humaines, augmente la productivité et libère du temps pour des tâches à plus forte valeur ajoutée.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Des outils comme Zapier, Make, ChatGPT ou Notion AI rendent cela plus accessible que jamais.
            </p>

            <h3 className="text-xl md:text-2xl font-black mb-4 text-slate-900 dark:text-white">Les avantages clés</h3>
            <ul className="space-y-3 text-lg text-slate-600 dark:text-slate-300 mb-12 list-disc pl-6 marker:text-primary">
              <li><strong className="text-slate-900 dark:text-white">Gain de temps massif</strong> sur les tâches de saisie et de traitement de données.</li>
              <li><strong className="text-slate-900 dark:text-white">Réduction des coûts</strong> opérationnels de l'entreprise.</li>
              <li><strong className="text-slate-900 dark:text-white">Amélioration de la satisfaction client</strong> grâce à des réponses plus rapides (ex: chatbots IA).</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900 dark:text-white">
              2. Identifier les tâches automatisables
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              La première étape consiste à auditer vos processus actuels. Demandez-vous :
            </p>
            <ul className="space-y-3 text-lg text-slate-600 dark:text-slate-300 mb-12 list-disc pl-6 marker:text-primary">
              <li>Quelles tâches effectuez-vous tous les jours ou toutes les semaines ?</li>
              <li>Quelles tâches nécessitent de copier-coller des données entre différentes applications ?</li>
              <li>Quelles décisions simples suivent des règles logiques strictes ?</li>
            </ul>

            {/* Blockquote style */}
            <blockquote className="border-l-4 border-primary pl-6 py-2 my-10 italic text-xl text-slate-700 dark:text-slate-300 bg-primary/5 rounded-r-xl pr-6">
              "L'IA ne remplacera pas les managers, mais les managers qui utilisent l'IA remplaceront ceux qui ne l'utilisent pas."
            </blockquote>

            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900 dark:text-white">
              3. Les outils incontournables en 2024
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Pour bien démarrer, voici notre sélection d'outils No-Code infusés à l'IA :
            </p>
            <ol className="space-y-4 text-lg text-slate-600 dark:text-slate-300 mb-12 list-decimal pl-6 marker:font-bold marker:text-slate-400">
              <li><strong className="text-slate-900 dark:text-white">Make (ex-Integromat)</strong> : Le couteau suisse de l'automatisation visuelle. Connectez des milliers d'apps.</li>
              <li><strong className="text-slate-900 dark:text-white">ChatGPT / Claude APIs</strong> : Parfait pour le traitement du langage naturel (résumés, classification, rédaction).</li>
              <li><strong className="text-slate-900 dark:text-white">Airtable</strong> : La base de données intelligente pour centraliser vos opérations et déclencher des actions.</li>
            </ol>

            {/* Newsletter CTA au sein de l'article */}
            <div className="mt-16 p-8 md:p-10 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-[2rem] border border-blue-100 dark:border-blue-800/50 shadow-lg shadow-blue-500/5">
              <div className="flex items-start gap-6">
                <div className="hidden md:flex shrink-0 w-16 h-16 bg-white dark:bg-blue-900/50 rounded-2xl items-center justify-center shadow-inner">
                  <span className="text-3xl">💌</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 mt-0">Ne manquez aucun guide IA</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 font-medium">
                    Rejoignez plus de 15 000 professionnels. Recevez nos meilleurs tutoriels et actus chaque mardi, directement dans votre boîte mail.
                  </p>
                  <form className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="email" 
                      placeholder="votre@email.com" 
                      className="flex-1 h-12 px-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B1120] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      required
                    />
                    <button 
                      type="submit" 
                      className="h-12 px-8 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:bg-blue-600 transition-all hover:-translate-y-0.5"
                    >
                      S'abonner
                    </button>
                  </form>
                  <p className="text-xs text-slate-400 mt-4">Aucun spam, désabonnement en un clic.</p>
                </div>
              </div>
            </div>
          </article>

          {/* 3. Right Sidebar (Author & Popular Articles) - Rendu Sticky */}
          <aside className="w-full lg:w-[320px] shrink-0 flex flex-col gap-10 sticky top-32 h-fit">
            
            {/* Boîte Auteur */}
            <div className="bg-white dark:bg-[#0F172A] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">À propos de l'auteur</h4>
              <div className="flex items-center gap-4 mb-4">
                <Image 
                  src={article.author.avatar} 
                  alt={article.author.name} 
                  width={56} 
                  height={56} 
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{article.author.name}</p>
                  <p className="text-xs text-primary font-bold">{article.author.role}</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                {article.author.bio}
              </p>
              <button className="w-full py-3 px-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-primary hover:text-primary transition-colors">
                Voir le profil
              </button>
            </div>

            {/* Articles Populaires */}
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">Articles populaires</h4>
              <div className="flex flex-col gap-6">
                {popularArticles.map((pop) => (
                  <Link href={`/blog/${pop.id}`} key={pop.id} className="group flex gap-4 items-center">
                    <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden">
                      <Image 
                        src={pop.image} 
                        alt={pop.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors mb-1">
                        {pop.title}
                      </h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {pop.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>
          
        </div>
      </div>
      
      {/* ── RELATED ARTICLES CAROUSEL ─────────────────────────────────────── */}
      <div className="w-full h-px bg-slate-200 dark:bg-slate-800/60 my-20 max-w-[1400px] mx-auto" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-10">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-3xl font-black text-slate-900 dark:text-white">Vous aimerez aussi</h3>
          <div className="hidden sm:flex gap-3">
            <button className="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Carousel Container (Native CSS Scroll Snap) */}
        <div className="flex gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
          {relatedArticles.map((rel) => (
            <Link 
              href={`/blog/${rel.id}`} 
              key={rel.id} 
              className="min-w-[300px] md:min-w-[360px] snap-start group cursor-pointer flex flex-col bg-white dark:bg-[#0F172A] rounded-[2rem] border border-slate-200/60 dark:border-slate-800 overflow-hidden hover:shadow-2xl dark:hover:shadow-primary/5 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image 
                  src={rel.image} 
                  alt={rel.title}
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <span className="text-xs font-black uppercase tracking-widest text-primary mb-3">
                  {rel.category}
                </span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                  {rel.title}
                </h4>
                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <span>{rel.date}</span>
                  <span>•</span>
                  <span>{rel.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </main>
  );
}
