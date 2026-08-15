"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Star, ChevronDown, Download, SlidersHorizontal, Search, ChevronLeft, ChevronRight, Sparkles, ArrowRight, ExternalLink, BookOpen, Layers
} from "lucide-react";
import ResourcesIllustration from "@/components/hero-illustrations/ResourcesIllustration";
import CursorGlow from "@/components/CursorGlow";

// Mock Data
const categories = [
  { name: "Tous", count: 120 },
  { name: "Marketing", count: 24 },
  { name: "Productivité", count: 22 },
  { name: "Développement", count: 18 },
  { name: "Design", count: 15 },
  { name: "Business", count: 12 },
  { name: "No-Code", count: 9 },
];

const types = [
  { name: "Gratuit", count: 68 },
  { name: "Payant", count: 52 },
];

const formats = [
  { name: "PDF", count: 54 },
  { name: "Notion", count: 28 },
  { name: "Figma", count: 18 },
  { name: "Vidéo", count: 12 },
  { name: "Autre", count: 8 },
];

const mockResources = [
  {
    id: 1,
    title: "Le guide ultime des prompts",
    type: "PDF",
    price: "Gratuit",
    rating: 4.9,
    reviews: 126,
    author: { name: "Alex Dev", avatar: "https://i.pravatar.cc/150?u=1" },
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=600&auto=format&fit=crop",
    isFeatured: true
  },
  {
    id: 2,
    title: "100+ Prompts ChatGPT pour le marketing",
    type: "PDF",
    price: "$9.99",
    rating: 4.8,
    reviews: 95,
    author: { name: "Sarah Prompt", avatar: "https://i.pravatar.cc/150?u=2" },
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Template Notion - Gestion de projet IA",
    type: "Notion",
    price: "Gratuit",
    rating: 4.7,
    reviews: 64,
    author: { name: "Mounir IA", avatar: "https://i.pravatar.cc/150?u=3" },
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Cheatsheet Midjourney v6",
    type: "PDF",
    price: "Gratuit",
    rating: 4.9,
    reviews: 210,
    author: { name: "CodeMaster", avatar: "https://i.pravatar.cc/150?u=4" },
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Ebook : Automatiser avec l'IA",
    type: "PDF",
    price: "$14.95",
    rating: 4.9,
    reviews: 104,
    author: { name: "PromptQueen", avatar: "https://i.pravatar.cc/150?u=5" },
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Guide : Créer un SaaS avec l'IA",
    type: "PDF",
    price: "$19.99",
    rating: 4.8,
    reviews: 89,
    author: { name: "LogoGenius", avatar: "https://i.pravatar.cc/150?u=10" },
    image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?q=80&w=600&auto=format&fit=crop"
  }
];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("Tous");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] font-sans text-slate-900 dark:text-white relative">
      
      {/* Scroll Bleed Blocker */}
      <div className="fixed top-0 inset-x-0 h-[72px] lg:h-[80px] bg-[#F8FAFC] dark:bg-[#0B1120] z-[35]" />

      {/* Background Intercatif (Simplifié pour uniformité) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Grille technique */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Hero Header Harmonisé avec CursorGlow */}
      <div className="relative">
        <CursorGlow gradientClasses="from-blue-500 to-emerald-500" />
        <div className="relative z-10 pt-28 pb-6 max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-between">
           <div className="w-full md:w-1/2">
             <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
               Ressources
             </h1>
             <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
               Guides, templates, ebooks et outils pour booster votre productivité avec l'IA.
             </p>
           </div>
           <div className="hidden md:block w-1/2">
             <ResourcesIllustration />
           </div>
        </div>
      </div>

      {/* Sticky Filter Bar - Harmonisé */}
      <div className="sticky top-[72px] lg:top-[80px] z-40 bg-[#F8FAFC]/90 dark:bg-[#0B1120]/90 backdrop-blur-xl border-y border-slate-200/50 dark:border-slate-800/50 py-3 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-6 w-full md:w-auto">
               
               {/* Search Bar - Style Pill */}
               <div className="relative w-full md:w-64 shrink-0">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <Search className="w-4 h-4 text-slate-400" />
                 </div>
                 <input 
                   type="text" 
                   placeholder="Rechercher une ressource..." 
                   className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0F172A] border border-slate-200/60 dark:border-slate-800 rounded-full text-sm font-medium focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
                 />
               </div>
               
               {/* Filter Pills */}
               <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/30 dark:border-slate-700/30 shrink-0">
                  {["Tous", "Guides", "Templates", "Ebooks", "Cheatsheets", "Outils"].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                        activeTab === tab 
                        ? 'bg-white dark:bg-[#0F172A] text-slate-900 dark:text-white shadow-sm' 
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
               </div>
               
               {/* Mobile Filters Toggle for Sidebar */}
               <button 
                 onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                 className="lg:hidden flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-[#0F172A] border border-slate-200/60 dark:border-slate-800 rounded-full text-sm font-bold text-slate-700 dark:text-slate-300 shrink-0"
               >
                 <SlidersHorizontal className="w-4 h-4" /> Filtres
               </button>

               {/* Prix Select */}
               <div className="relative shrink-0 ml-2 hidden md:block">
                 <select className="appearance-none bg-white dark:bg-[#0F172A] border border-slate-200/60 dark:border-slate-800 rounded-xl pl-4 pr-10 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 focus:outline-none shadow-sm cursor-pointer">
                    <option value="tous">Prix: Tous</option>
                    <option value="gratuit">Prix: Gratuit</option>
                    <option value="payant">Prix: Payant</option>
                 </select>
                 <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
               </div>

               {/* Sort - Text style */}
               <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 shrink-0 ml-2 hidden md:flex">
                 <span>Trier par</span>
                 <button className="font-bold text-slate-900 dark:text-white flex items-center gap-1 hover:text-primary transition-colors">
                   Populaires <ChevronDown className="w-4 h-4" />
                 </button>
               </div>
               
             </div>

             {/* Right: Count */}
             <div className="text-sm font-bold text-slate-900 dark:text-white shrink-0 hidden lg:flex items-center gap-1">
               {mockResources.length} <span className="font-medium text-slate-500 dark:text-slate-400">ressources</span>
             </div>
           </div>
        </div>
      </div>

      <div className="pt-10 pb-24 max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Sidebar */}
          <aside className={`lg:w-64 shrink-0 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="space-y-10 sticky top-[160px]">
              
              {/* Catégories */}
              <div className="bg-white dark:bg-[#0F172A] p-5 rounded-[1.5rem] border border-slate-200/60 dark:border-slate-800 shadow-sm">
                <h3 className="font-extrabold text-lg mb-5 text-slate-900 dark:text-white flex items-center gap-2">
                   <Star className="w-5 h-5 text-primary" /> Catégories
                </h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button 
                      key={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                        activeCategory === cat.name 
                          ? "bg-primary/10 dark:bg-primary/20 text-primary font-bold" 
                          : "text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-[#0F172A]"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        activeCategory === cat.name ? "bg-primary/20" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                      }`}>{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Right Content - Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockResources.map((resource) => (
                <Link href={`/ressources/${resource.id}`} key={resource.id} className="group flex flex-col h-full bg-white dark:bg-[#0F172A] rounded-[1.5rem] border border-slate-200/60 dark:border-slate-800 overflow-hidden hover:shadow-xl dark:hover:shadow-primary/5 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                     <Image src={resource.image} alt={resource.title} fill className="object-cover transform group-hover:scale-105 transition-all duration-700 ease-out" />
                     
                     {/* Decorative overlay gradient for depth */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                     {/* Overlay tags */}
                     {resource.isFeatured && (
                       <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg z-10">
                         Top Vente
                       </div>
                     )}
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-extrabold text-lg text-slate-900 dark:text-white leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {resource.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-4 pointer-events-auto">
                      <Image src={resource.author.avatar} alt={resource.author.name} width={24} height={24} className="rounded-full border border-slate-200 dark:border-slate-700" />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">{resource.author.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-6 mt-auto">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.floor(resource.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-700'}`} />)}
                      </div>
                      <span className="text-[13px] font-bold text-slate-900 dark:text-white">{resource.rating}</span>
                      <span className="text-[13px] font-semibold text-slate-400">({resource.reviews})</span>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-md">{resource.type}</span>
                        <span className={`text-[13px] font-black ${resource.price === 'Gratuit' ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>{resource.price}</span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-slate-400 dark:text-slate-500">
                        <Download className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Component */}
            <div className="flex items-center justify-center gap-2 mt-16">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary transition-colors shadow-sm">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm hidden sm:flex">3</button>
              <span className="text-slate-400 font-bold mx-2">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">8</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary transition-colors shadow-sm">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* CTA Contributor Banner */}
            <div className="mt-20 bg-gradient-to-br from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-500/20 border border-primary/20 dark:border-primary/30 rounded-[2rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />
              
              <div className="max-w-2xl relative z-10 text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4 flex flex-col md:flex-row items-center justify-center lg:justify-start gap-3">
                  <Sparkles className="w-8 h-8 text-primary" />
                  Envie de partager vos ressources ?
                </h2>
                <p className="text-slate-600 dark:text-slate-300 font-medium text-lg">
                  Rejoignez notre communauté de créateurs. Proposez vos meilleurs guides, templates ou outils, gagnez en visibilité et générez des revenus en vendant vos créations.
                </p>
              </div>
              <div className="shrink-0 relative z-10">
                <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-105 transform flex items-center gap-2">
                  Devenir Contributeur <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
