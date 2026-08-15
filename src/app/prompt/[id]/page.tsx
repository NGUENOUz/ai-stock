"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, ChevronLeft, ChevronRight, Download, Heart, Share2, ShieldCheck, 
  CheckCircle2, Play, FileText, Image as ImageIcon, Code, Copy,
  MessageSquare
} from "lucide-react";

// Mock Data for the details
const resourceDetail = {
  id: "1",
  title: "Le guide ultime des prompts ChatGPT pour le Marketing Digital",
  category: "Marketing",
  type: "Ebook / PDF",
  price: "$19.99",
  rating: 4.9,
  reviewsCount: 128,
  sales: 1450,
  lastUpdated: "12 Août 2024",
  author: {
    name: "Alex Dev",
    avatar: "https://i.pravatar.cc/150?u=1",
    role: "Expert IA & Marketing",
    isVerified: true
  },
  images: [
    "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
  ],
  description: `Débloquez la puissance de ChatGPT pour vos campagnes marketing. Ce guide complet de 85 pages vous montre exactement quels prompts utiliser pour générer des idées de contenu, écrire des newsletters persuasives, créer des scripts vidéos viraux et optimiser votre SEO en un temps record.
  
Plus besoin de passer des heures devant une page blanche. Avec cette bibliothèque de prompts prêts à l'emploi, vous allez multiplier par 10 votre productivité et la qualité de vos textes.`,
  features: [
    "Plus de 250 prompts testés et optimisés",
    "Templates Notion inclus pour organiser vos requêtes",
    "Cas d'usage concrets avec exemples de réponses",
    "Mises à jour gratuites à vie"
  ],
  includes: [
    { icon: FileText, text: "PDF complet (85 pages)" },
    { icon: Copy, text: "Fichier Notion avec tous les prompts" },
    { icon: Play, text: "Mini-formation vidéo (30 min)" }
  ],
  reviews: [
    { name: "Sophie M.", rating: 5, date: "Il y a 2 jours", text: "Exactement ce dont j'avais besoin pour lancer mes campagnes ads. Les prompts sont ultra précis !" },
    { name: "Marc T.", rating: 5, date: "Il y a 1 semaine", text: "Le fichier Notion bonus vaut à lui seul le prix du guide. Gain de temps incroyable." },
    { name: "Julie L.", rating: 4, date: "Il y a 2 semaines", text: "Très complet, peut-être même trop pour un débutant, mais on y trouve forcément son compte." }
  ]
};

export default function ResourceDetailsPage({ params }: { params: { id: string } }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] font-sans text-slate-900 dark:text-white pt-28 pb-24">
      
      {/* Background Interactive Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/prompt" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors bg-white dark:bg-[#0F172A] px-4 py-2 rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-800">
            <ChevronLeft className="w-4 h-4" /> Retour
          </Link>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="w-10 h-10 rounded-full bg-white dark:bg-[#0F172A] border border-slate-200/60 dark:border-slate-800 flex items-center justify-center hover:text-rose-500 hover:border-rose-500 transition-all shadow-sm"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white dark:bg-[#0F172A] border border-slate-200/60 dark:border-slate-800 flex items-center justify-center hover:text-primary hover:border-primary transition-all shadow-sm">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Media & Details */}
          <div className="flex-1 space-y-12">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[16/9] w-full rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-xl border border-slate-200/50 dark:border-slate-800/50">
                <Image 
                  src={resourceDetail.images[activeImage]} 
                  alt={resourceDetail.title} 
                  fill 
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
                {resourceDetail.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-32 aspect-[16/9] rounded-xl overflow-hidden shrink-0 border-2 transition-all ${activeImage === idx ? 'border-primary shadow-md scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <Image src={img} alt={`Preview ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Tabs (Description, Features) */}
            <div className="bg-white dark:bg-[#0F172A] rounded-[2rem] border border-slate-200/60 dark:border-slate-800 p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">À propos de cette ressource</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none mb-10">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg whitespace-pre-line">
                  {resourceDetail.description}
                </p>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">Ce que vous allez obtenir</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resourceDetail.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews Section */}
            <div className="bg-white dark:bg-[#0F172A] rounded-[2rem] border border-slate-200/60 dark:border-slate-800 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Avis clients</h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-lg">{resourceDetail.rating}</span>
                    <span className="text-slate-500 font-medium">({resourceDetail.reviewsCount} avis)</span>
                  </div>
                </div>
                <button className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors rounded-xl text-sm font-bold text-slate-900 dark:text-white">
                  Écrire un avis
                </button>
              </div>

              <div className="space-y-6">
                {resourceDetail.reviews.map((review, idx) => (
                  <div key={idx} className="pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">{review.name}</p>
                          <p className="text-xs text-slate-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-800'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Checkout Sidebar */}
          <aside className="lg:w-[400px] shrink-0">
            <div className="sticky top-28 space-y-6">
              
              {/* Main Checkout Card */}
              <div className="bg-white dark:bg-[#0F172A] rounded-[2rem] border border-slate-200/60 dark:border-slate-800 p-8 shadow-xl">
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">{resourceDetail.category}</span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full">{resourceDetail.type}</span>
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-4">
                  {resourceDetail.title}
                </h1>

                <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-slate-900 dark:text-white font-bold">{resourceDetail.rating}</span>
                    <span>({resourceDetail.reviewsCount})</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{resourceDetail.sales} ventes</span>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-4xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    {resourceDetail.price}
                    {resourceDetail.price !== 'Gratuit' && <span className="text-lg text-slate-400 line-through font-medium">$39.99</span>}
                  </p>
                  <p className="text-sm text-emerald-500 font-bold mt-2 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Paiement sécurisé
                  </p>
                </div>

                <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/25 hover:bg-primary/90 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mb-6">
                  <Download className="w-5 h-5" />
                  {resourceDetail.price === 'Gratuit' ? 'Télécharger Gratuitement' : 'Acheter maintenant'}
                </button>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Ce pack inclut :</h4>
                  <ul className="space-y-3">
                    {resourceDetail.includes.map((inc, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0">
                          <inc.icon className="w-4 h-4" />
                        </div>
                        {inc.text}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Author Card */}
              <div className="bg-white dark:bg-[#0F172A] rounded-[2rem] border border-slate-200/60 dark:border-slate-800 p-6 shadow-sm flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <Image src={resourceDetail.author.avatar} alt={resourceDetail.author.name} width={48} height={48} className="rounded-full border-2 border-white dark:border-[#0F172A] shadow-md" />
                    {resourceDetail.author.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white dark:border-[#0F172A] flex items-center justify-center text-white">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-0.5">Créé par</p>
                    <p className="text-sm font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{resourceDetail.author.name}</p>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
