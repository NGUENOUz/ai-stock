"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Clock, ArrowRight, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import BlogIllustration from "@/components/hero-illustrations/BlogIllustration";
import CursorGlow from "@/components/CursorGlow";
import MobileFilterSheet, { MobileFilterBar } from "@/components/MobileFilterSheet";

// Mock Data pour les articles de blog
const categories = ["Tous les articles", "Actualités", "Guides", "Tutos", "Études de cas"];

const mockArticles = [
  {
    id: 1,
    title: "Comment choisir le bon outil IA pour votre activité ?",
    description: "Un guide complet pour évaluer et choisir les outils IA adaptés à vos besoins spécifiques et à votre budget.",
    category: "GUIDE",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    date: "12 Mai 2024",
    readTime: "8 min"
  },
  {
    id: 2,
    title: "Créer un site web en 10 minutes avec l'IA",
    description: "Découvrez comment générer un site web complet avec les meilleurs outils IA no-code du marché.",
    category: "TUTO",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=800&auto=format&fit=crop",
    date: "9 Mai 2024",
    readTime: "6 min"
  },
  {
    id: 3,
    title: "GPT-4o : toutes les nouveautés à connaître",
    description: "On vous résume les principales annonces et ce qui change concrètement pour vous au quotidien.",
    category: "ACTUALITÉ",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    date: "5 Mai 2024",
    readTime: "5 min"
  },
  {
    id: 4,
    title: "Comment cette startup a gagné 10h par semaine avec l'IA",
    description: "Retour d'expérience et outils utilisés au quotidien par l'équipe pour automatiser leurs tâches.",
    category: "ÉTUDE DE CAS",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
    date: "2 Mai 2024",
    readTime: "7 min"
  },
  {
    id: 5,
    title: "Les 5 meilleurs générateurs d'images IA en 2024",
    description: "Comparatif complet entre Midjourney, DALL-E 3, Stable Diffusion et les nouvelles alternatives.",
    category: "GUIDE",
    image: "https://images.unsplash.com/photo-1686191128892-3b370a3f144c?q=80&w=800&auto=format&fit=crop",
    date: "28 Avr 2024",
    readTime: "10 min"
  },
  {
    id: 6,
    title: "Automatiser son SEO avec l'Intelligence Artificielle",
    description: "Apprenez à générer du contenu optimisé et analyser vos mots-clés en quelques clics.",
    category: "TUTO",
    image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=800&auto=format&fit=crop",
    date: "20 Avr 2024",
    readTime: "8 min"
  },
  {
    id: 7,
    title: "Anthropic dévoile Claude 3.5 Sonnet",
    description: "Le nouveau modèle qui surpasse GPT-4o sur de nombreux benchmarks. Analyse complète.",
    category: "ACTUALITÉ",
    image: "https://images.unsplash.com/photo-1673812240504-20b15b74158d?q=80&w=800&auto=format&fit=crop",
    date: "15 Avr 2024",
    readTime: "4 min"
  },
  {
    id: 8,
    title: "De 0 à 10k€/mois avec une agence IA",
    description: "Plongée dans le business model des agences d'automatisation IA qui explosent cette année.",
    category: "ÉTUDE DE CAS",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    date: "10 Avr 2024",
    readTime: "12 min"
  }
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Tous les articles");
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Auto-slider logic for featured articles
  const featuredArticles = mockArticles.slice(0, 3);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredArticles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredArticles.length]);

  const currentFeatured = featuredArticles[featuredIndex];

  const filteredArticles = mockArticles.filter((article) => {
    const matchesCategory = activeCategory === "Tous les articles" || article.category === activeCategory.toUpperCase() || (activeCategory === "Actualités" && article.category === "ACTUALITÉ") || (activeCategory === "Études de cas" && article.category === "ÉTUDE DE CAS");
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || article.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] font-sans text-slate-900 dark:text-white relative">


      {/* Background Interactive (Simplifié pour uniformité) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Grille technique */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Hero Header avec CursorGlow */}
      <div className="relative">
        <CursorGlow gradientClasses="from-blue-500 to-indigo-500" />
        <div className="relative z-10 pt-16 lg:pt-8 pb-6 max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-between">
           <div className="w-full md:w-1/2">
             <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
               Le Blog
             </h1>
             <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl font-medium">
               Conseils, guides et actualités pour tirer le meilleur de l'intelligence artificielle.
             </p>
           </div>
           <div className="hidden md:block w-1/2">
             <BlogIllustration />
           </div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[72px] lg:top-[80px] z-30 bg-[#F8FAFC]/90 dark:bg-[#0B1120]/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-all duration-300">
         <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4">
            
            <MobileFilterBar
              searchValue={searchTerm}
              onSearchChange={(v) => setSearchTerm(v)}
              searchPlaceholder="Rechercher un article..."
              onFilterOpen={() => setMobileFiltersOpen(true)}
              activeFiltersCount={activeCategory !== "Tous les articles" ? 1 : 0}
            />

            <div className="hidden md:flex flex-row md:items-center justify-between gap-4">
              
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                      activeCategory === cat 
                        ? "bg-primary text-white shadow-md shadow-primary/20" 
                        : "bg-white dark:bg-[#0F172A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative shrink-0 w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un article..."
                  className="w-full h-10 pl-9 pr-4 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                />
              </div>

            </div>
         </div>
      </div>

      {/* Main Content */}
      <div className="pt-10 pb-24 max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Si l'utilisateur filtre ou cherche, on affiche une grille simple */}
        {activeCategory !== "Tous les articles" || searchTerm !== "" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          /* Mise en page éditoriale (Aucun filtre) */
          <div className="space-y-16">
            
            {/* 1. Article à la une (Featured) avec Slider Auto */}
            <Link href={`/blog/${currentFeatured.id}`} className="group flex flex-col md:flex-row bg-white dark:bg-[#0F172A] rounded-[2rem] border border-slate-200/60 dark:border-slate-800 overflow-hidden hover:shadow-2xl dark:hover:shadow-primary/5 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-500">
              {/* Image (prend la moitié sur desktop) */}
              <div className="relative w-full md:w-1/2 aspect-[16/10] md:aspect-auto overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image 
                  key={currentFeatured.image} // Force re-render for animation
                  src={currentFeatured.image} 
                  alt={currentFeatured.title} 
                  fill 
                  className="object-cover transform group-hover:scale-105 transition-all duration-700 ease-out animate-fade-in" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute top-6 left-6 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                  À La Une
                </div>
                {/* Dots indicator for slider */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {featuredArticles.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === featuredIndex ? "w-6 bg-white" : "w-2 bg-white/50"}`} />
                  ))}
                </div>
              </div>
              {/* Contenu */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center w-full md:w-1/2">
                <span className="text-xs font-black uppercase tracking-widest text-primary mb-4">
                  {currentFeatured.category}
                </span>
                <h2 className="font-black text-2xl md:text-3xl lg:text-4xl text-slate-900 dark:text-white leading-tight mb-6 group-hover:text-primary transition-colors">
                  {currentFeatured.title}
                </h2>
                <p className="text-base font-medium text-slate-500 dark:text-slate-400 mb-8 line-clamp-3">
                  {currentFeatured.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{currentFeatured.date}</p>
                  <div className="flex items-center gap-1.5 text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-bold">{currentFeatured.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 2. Layout Principal : Derniers Articles (gauche) + Populaires (droite) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Colonne de gauche (2/3) : Derniers articles */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Derniers articles</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {mockArticles.slice(3, 9).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="mt-16 flex items-center justify-center gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary transition-colors shadow-sm">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25">1</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">2</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm hidden sm:flex">3</button>
                  <span className="text-slate-400 font-bold mx-2">...</span>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary transition-colors shadow-sm">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Colonne de droite (1/3) : Articles populaires */}
              <div className="lg:col-span-1">
                <div className="sticky top-[160px]">
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-2 h-6 bg-primary rounded-full"></div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Populaires</h3>
                  </div>
                  
                  <div className="flex flex-col gap-6">
                    {[mockArticles[4], mockArticles[2], mockArticles[7]].map((article, idx) => (
                      <Link href={`/blog/${article.id}`} key={article.id} className="group flex gap-4 items-start bg-white/50 dark:bg-[#0F172A]/50 p-3 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all">
                        <div className="font-black text-4xl text-slate-200 dark:text-slate-800 w-8 shrink-0 leading-none">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 block">
                            {article.category}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">
                            {article.title}
                          </h4>
                          <p className="text-[11px] font-medium text-slate-500">
                            {article.date} • {article.readTime}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Newsletter Banner - Direct Input */}
            <div className="mt-20 bg-gradient-to-br from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-500/20 border border-primary/20 dark:border-primary/30 rounded-[2rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />
              
              <div className="max-w-3xl mx-auto relative z-10 text-center flex flex-col items-center">
                <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-md mb-6">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4">
                  Ne manquez plus aucune actualité IA
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-lg">
                  Inscrivez-vous à notre newsletter pour recevoir nos meilleurs guides, tutoriels et l'actualité de l'intelligence artificielle directement dans votre boîte mail.
                </p>
                
                <form className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Votre adresse email" 
                    required
                    className="flex-1 h-12 px-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button type="submit" className="h-12 px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all whitespace-nowrap shadow-lg shadow-primary/25">
                    S'inscrire
                  </button>
                </form>
              </div>
            </div>

          </div>
        )}

      </div>
      
      <MobileFilterSheet
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        title="Filtres"
        resultCount={filteredArticles.length}
        onReset={() => setActiveCategory("Tous les articles")}
        groups={[
          {
            id: "categories",
            label: "Catégories",
            type: "pills",
            value: activeCategory,
            onChange: (v) => setActiveCategory(v),
            options: categories.map(c => ({ value: c, label: c }))
          }
        ]}
      />
    </div>
  );
}

// Composant Carte Standard pour éviter la duplication
function ArticleCard({ article }: { article: any }) {
  return (
    <Link href={`/blog/${article.id}`} className="group flex flex-col h-full bg-white dark:bg-[#0F172A] rounded-[2rem] border border-slate-200/60 dark:border-slate-800 overflow-hidden hover:shadow-xl dark:hover:shadow-primary/5 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image 
          src={article.image} 
          alt={article.title} 
          fill 
          className="object-cover transform group-hover:scale-105 transition-all duration-700 ease-out" 
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">
          {article.category}
        </span>
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-2 mb-6">
          {article.description}
        </p>
        <div className="mt-auto pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{article.date}</span>
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {article.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
