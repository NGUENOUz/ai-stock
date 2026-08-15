"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Heart, Share2, ExternalLink, Star, TrendingUp,
  Check, Zap, Shield, Globe, Users, Award, Sparkles, Search,
  ChevronRight, Play, Target, BarChart3, Rocket,
  CheckCircle2, Download, Code, Headphones, Lock, Gauge
} from "lucide-react";
import { apiClient } from "@/lib/api-client";

interface ToolData {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description_short: string;
  description_long: string;
  logo_url: string;
  ban_url: string | null;
  website_url: string;
  pricing: string;
  categories: string[];
  rating: number;
  views: number;
  upvotes: number;
  verified: boolean;
  highlights: string[] | null;
  features: Array<{title: string; desc: string}> | null;
  use_cases: Array<{title: string; desc: string}> | null;
  benefits: string[] | null;
  pricing_details: {priceMonthly?: string; priceDetails?: string} | null;
  stats: {users?: string; reviews?: number; uptime?: string; accuracy?: string} | null;
}

export default function AiToolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "reviews">("overview");
  const [tool, setTool] = useState<ToolData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTool() {
      try {
        setLoading(true);
        // Utilisation de apiClient qui intègre le fallback vers le mock
        const data = await apiClient.getToolBySlug(resolvedParams.id);
        if (data) {
           setTool(data as any); 
        } else {
           throw new Error('Structure de données invalide');
        }
      } catch (err: any) {
        setError(err.message || 'Outil introuvable');
      } finally {
        setLoading(false);
      }
    }
    fetchTool();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 font-bold">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-black text-black mb-2">Outil introuvable</h1>
          <p className="text-neutral-600 mb-4">{error}</p>
          <Link href="/liste" className="text-primary hover:underline font-bold">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  // Icônes par défaut
  const defaultIcons = [Zap, Sparkles, TrendingUp, Globe, Shield, Users, Code, Rocket];
  const getIcon = (index: number) => defaultIcons[index % defaultIcons.length];
  
  const mappedTool = {
    name: tool.name,
    tagline: tool.tagline || tool.description_short,
    category: tool.categories?.[0] || 'Non catégorisé',
    categories: tool.categories || ['Productivité', 'Rédaction', 'Organisation'],
    description: tool.description_long || tool.description_short,
    logo: tool.logo_url || 'https://via.placeholder.com/120',
    banner: tool.ban_url || 'https://via.placeholder.com/1400x600',
    pricing: tool.pricing,
    priceDetails: tool.pricing_details?.priceDetails || 'Voir le site',
    priceMonthly: tool.pricing_details?.priceMonthly || '0€',
    website: tool.website_url,
    rating: tool.rating || 4.7,
    reviews: tool.stats?.reviews || 126,
    upvotes: tool.upvotes || 0,
    users: tool.stats?.users || '0',
    verified: tool.verified,
    highlights: tool.highlights || [],
    features: (tool.features || []).map((f, i) => ({
      title: f.title,
      desc: f.desc,
      icon: getIcon(i)
    })),
    useCases: (tool.use_cases || []).map((uc, i) => ({
      title: uc.title,
      desc: uc.desc,
      icon: [Target, BarChart3, Shield, Rocket][i % 4]
    })),
    benefits: (tool.benefits || []).map((b, i) => ({
      text: b,
      icon: [CheckCircle2, Download, Code, Headphones, Lock, Rocket][i % 6]
    })),
    stats: [
      { label: "Utilisateurs actifs", value: tool.stats?.users || '0', icon: Users },
      { label: "Précision moyenne", value: tool.stats?.accuracy || 'N/A', icon: Target },
      { label: "Vues", value: tool.views?.toString() || '0', icon: Globe },
      { label: "Uptime", value: tool.stats?.uptime || 'N/A', icon: Gauge },
    ]
  };

  const reviews: any[] = [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-slate-900 dark:text-white pt-24 pb-24">
      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-6 mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-semibold">
          <Link href="/liste" className="hover:text-primary transition-colors">Outils IA</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="hover:text-primary transition-colors cursor-pointer">{mappedTool.category}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-slate-200">{mappedTool.name}</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Top Section : Card */}
        <div className="bg-white dark:bg-[#0F172A] rounded-3xl p-8 shadow-sm border border-slate-200/60 dark:border-slate-800 mb-8 relative overflow-hidden">
          {/* Subtle glow effect behind logo */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row gap-12 z-10">
            {/* Left Info */}
            <div className="flex-1 flex flex-col md:flex-row gap-8">
              <div className="w-36 h-36 rounded-[2rem] bg-slate-50 dark:bg-[#151E32] shrink-0 overflow-hidden border border-slate-200/60 dark:border-slate-800 flex items-center justify-center p-6 shadow-sm">
                <Image src={mappedTool.logo} alt="Logo" width={128} height={128} className="object-contain" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-extrabold tracking-tight">{mappedTool.name}</h1>
                  <span className="bg-primary/10 dark:bg-primary/20 text-primary text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">{mappedTool.pricing}</span>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 font-medium mb-3 text-[15px]">{mappedTool.tagline}</p>
                
                <div className="flex items-center gap-2 text-sm font-bold mb-4">
                  <span className="text-slate-900 dark:text-white text-lg">{mappedTool.rating.toFixed(1)}</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= Math.round(mappedTool.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-700'}`} />)}
                  </div>
                  <span className="text-slate-400 dark:text-slate-500 font-semibold ml-1">({mappedTool.reviews} avis)</span>
                </div>
                
                {/* Paragraph description */}
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-2xl">
                  {mappedTool.description.length > 150 ? mappedTool.description.substring(0, 150) + "..." : mappedTool.description}
                </p>
                
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {mappedTool.categories.map((cat, i) => (
                     <div key={i} className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#1A233A] px-4 py-2 rounded-xl border border-slate-200/50 dark:border-slate-800">
                       {cat}
                     </div>
                  ))}
                </div>

                {/* Features Grid (Icon + Title + Desc) */}
                <div className="flex flex-wrap md:grid md:grid-cols-3 gap-3 mt-4">
                  {mappedTool.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex flex-col p-4 bg-slate-50 dark:bg-[#151E32]/80 rounded-2xl border border-slate-200/60 dark:border-slate-800 h-full">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3 shrink-0">
                         <f.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-[13px] font-extrabold text-slate-900 dark:text-white leading-tight mb-1.5">{f.title}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{f.desc.length > 50 ? f.desc.substring(0,50)+'...' : f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Action Box */}
            <div className="lg:w-[340px] shrink-0">
               <div className="bg-slate-50 dark:bg-[#151E32]/50 rounded-[2rem] p-8 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl shadow-slate-200/40 dark:shadow-none h-full flex flex-col justify-center relative overflow-hidden">
                 {/* Decorative background blur inside the right card */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
                 
                 <div className="relative z-10">
                   <div className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 pl-1">À partir de</div>
                   <div className="flex items-end gap-1 mb-6 pl-1">
                     <div className="text-4xl font-black">{mappedTool.priceMonthly}</div>
                     <div className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1.5">/mois</div>
                   </div>
                   
                   <a href={mappedTool.website} target="_blank" className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all mb-3 shadow-lg shadow-primary/25">
                     Visiter le site <ExternalLink className="w-4 h-4" />
                   </a>
                   
                   <button className="flex items-center justify-center gap-2 w-full py-3.5 bg-white dark:bg-[#0F172A] border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mb-6">
                     Ou essayer gratuitement
                   </button>
                   
                   <button onClick={() => setIsLiked(!isLiked)} className="flex items-center justify-center gap-2 w-full py-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-2">
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      {isLiked ? 'Retirer des favoris' : 'Ajouter à mes favoris'}
                   </button>
                   
                   <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Outil vérifié</div>
                      <div>Mise à jour : 12 Mai 2024</div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {[
               "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=800&auto=format&fit=crop"
             ].map((imgSrc, i) => (
               <div key={i} className="aspect-[4/3] rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800 overflow-hidden relative group">
                  <Image src={imgSrc} alt={`Capture d'écran ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                  </div>
               </div>
             ))}
          </div>
          
          {/* Carousel Arrows */}
          <button className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors z-10 hidden md:flex">
             <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <button className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors z-10 hidden md:flex">
             <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Row */}
        <div className="flex items-center gap-8 border-b border-slate-200/60 dark:border-slate-800 mb-10 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'À propos' },
            { id: 'features', label: 'Fonctionnalités' },
            { id: 'reviews', label: `Avis (${mappedTool.reviews})` },
            { id: 'alternatives', label: 'Alternatives' }
          ].map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-primary text-slate-900 dark:text-white' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-16 mb-16">
           {/* Left text */}
           <div className="flex-1">
              {activeTab === 'overview' && (
                <>
                  <h2 className="text-2xl font-extrabold mb-6">À propos de {mappedTool.name}</h2>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-10 text-[15px]">
                    {mappedTool.description}
                  </p>
                  <div className="space-y-4">
                    {mappedTool.benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Check className="w-3.5 h-3.5 text-primary stroke-[3]" />
                        </div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300 text-[15px]">{b.text}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {activeTab === 'features' && (
                <div className="grid sm:grid-cols-2 gap-6">
                  {mappedTool.features.map((f, i) => (
                    <div key={i} className="p-6 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm">
                       <f.icon className="w-6 h-6 text-primary mb-4" />
                       <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                       <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="p-10 bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm text-center">
                   <Star className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                   <h3 className="text-xl font-bold mb-2">Les avis arrivent bientôt</h3>
                   <p className="text-slate-500 dark:text-slate-400 mb-6">Soyez le premier à partager votre expérience avec {mappedTool.name}.</p>
                   <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">Rédiger un avis</button>
                </div>
              )}
              {activeTab === 'alternatives' && (
                <div className="grid sm:grid-cols-2 gap-6">
                   {/* Placeholder for alternatives */}
                   {[1,2,3,4].map(i => (
                     <div key={i} className="flex gap-4 p-4 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200/60 dark:border-slate-800 cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-[#151E32] shrink-0"></div>
                        <div className="flex flex-col justify-center">
                          <div className="font-bold mb-1 text-slate-900 dark:text-white">Alternative {i}</div>
                          <div className="text-xs text-slate-500 mb-2">Similaire à {mappedTool.name}</div>
                          <div className="text-xs font-bold text-primary flex items-center gap-1">Explorer <ChevronRight className="w-3 h-3" /></div>
                        </div>
                     </div>
                   ))}
                </div>
              )}
           </div>
           
           {/* Right rating summary */}
           <div className="lg:w-80 shrink-0">
              <div className="bg-white dark:bg-[#0F172A] rounded-3xl p-8 border border-slate-200/60 dark:border-slate-800 shadow-sm sticky top-24">
                 <div className="text-sm font-bold text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Note moyenne</div>
                 <div className="flex items-end gap-2 mb-8">
                   <div className="text-[3rem] leading-none font-black tracking-tight">{mappedTool.rating.toFixed(1)}</div>
                   <div className="text-xl font-bold text-slate-400 dark:text-slate-500 pb-1.5">/ 5</div>
                 </div>
                 
                 <div className="space-y-3.5 mb-10">
                    {[
                      { stars: 5, pct: 82 },
                      { stars: 4, pct: 10 },
                      { stars: 3, pct: 4 },
                      { stars: 2, pct: 2 },
                      { stars: 1, pct: 1 }
                    ].map(r => (
                      <div key={r.stars} className="flex items-center gap-4 text-xs font-bold">
                         <span className="text-slate-600 dark:text-slate-400 w-4 flex items-center justify-between">{r.stars} <Star className="w-3 h-3 fill-slate-300 dark:fill-slate-600 text-slate-300 dark:text-slate-600" /></span>
                         <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-800 dark:bg-white rounded-full transition-all duration-1000" style={{ width: `${r.pct}%` }}></div>
                         </div>
                         <span className="text-slate-400 dark:text-slate-500 w-8 text-right">{r.pct}%</span>
                      </div>
                    ))}
                 </div>
                 
                 <button className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
                   Laisser un avis
                 </button>
              </div>
           </div>
        </div>

        {/* Similar Tools Section */}
        <div className="mb-16">
           <h2 className="text-2xl font-extrabold mb-8">Vous aimerez aussi</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                 <div key={i} className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200/60 dark:border-slate-800 p-5 hover:shadow-lg transition-shadow cursor-pointer group flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                       <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-[#151E32] shrink-0 border border-slate-200/50 dark:border-slate-700/50"></div>
                       <div>
                         <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Outil Similaire {i}</h3>
                         <div className="text-xs text-slate-500 font-medium mt-1">Productivité</div>
                       </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                       <div className="text-sm font-bold">$12/mo</div>
                       <div className="text-xs font-bold text-primary flex items-center gap-1">Voir <ChevronRight className="w-3 h-3" /></div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
           <div className="relative z-10">
              <h2 className="text-3xl font-extrabold mb-3">Vous avez un outil IA ?</h2>
              <p className="text-indigo-200 text-lg max-w-xl">Référencez-le gratuitement sur AI-STOCK et gagnez en visibilité auprès de milliers d'utilisateurs chaque jour.</p>
           </div>
           <div className="relative z-10 shrink-0 w-full md:w-auto">
              <button className="w-full md:w-auto px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
                 Ajouter mon outil gratuitement
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}
