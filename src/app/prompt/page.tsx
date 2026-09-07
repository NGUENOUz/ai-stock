"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, ChevronDown, Copy, Star, Eye, Trophy, Play, Heart, Share2, Sparkles, ArrowRight, ChevronLeft, ChevronRight
} from "lucide-react";
import PromptsIllustration from "@/components/hero-illustrations/PromptsIllustration";
import CursorGlow from "@/components/CursorGlow";
import MobileFilterSheet, { MobileFilterBar } from "@/components/MobileFilterSheet";

// Mock Data
const leaderboard = [
  { rank: 1, name: "Alex Dev", points: "12.4k pts", avatar: "https://i.pravatar.cc/150?u=1" },
  { rank: 2, name: "Sarah Prompt", points: "9.8k pts", avatar: "https://i.pravatar.cc/150?u=2" },
  { rank: 3, name: "Mounir IA", points: "8.7k pts", avatar: "https://i.pravatar.cc/150?u=3" },
  { rank: 4, name: "CodeMaster", points: "6.5k pts", avatar: "https://i.pravatar.cc/150?u=4" },
  { rank: 5, name: "PromptQueen", points: "5.4k pts", avatar: "https://i.pravatar.cc/150?u=5" },
];

const mockPrompts = [
  {
    id: 1,
    title: "Cinematic Tokyo Cyberpunk Night",
    tool: "Midjourney v6",
    toolColor: "bg-[#2563EB]", 
    category: "Images",
    views: "34k",
    likes: 1250,
    type: "image", 
    heightClass: "h-[450px]", 
    author: { name: "NeonDreamer", avatar: "https://i.pravatar.cc/150?u=12" },
    image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Drone flight over an alien glowing forest",
    tool: "Sora",
    toolColor: "bg-[#10B981]", 
    category: "Vidéos",
    views: "89k",
    likes: 3420,
    type: "video",
    heightClass: "h-[280px]", 
    author: { name: "AI Director", avatar: "https://i.pravatar.cc/150?u=15" },
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Article de blog ultra-optimisé SEO",
    tool: "ChatGPT 4",
    toolColor: "bg-[#10B981]", 
    category: "Textes",
    views: "12k",
    likes: 450,
    type: "text",
    heightClass: "h-[340px]", 
    author: { name: "Sarah Prompt", avatar: "https://i.pravatar.cc/150?u=2" },
    image: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Realistic product photography mockup",
    tool: "Midjourney v6",
    toolColor: "bg-[#2563EB]", 
    category: "Images",
    views: "18k",
    likes: 890,
    type: "image",
    heightClass: "h-[380px]", 
    author: { name: "UI Master", avatar: "https://i.pravatar.cc/150?u=6" },
    image: "https://images.unsplash.com/photo-1528297506728-9533d2ac3fa4?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Script complet de landing page SaaS",
    tool: "Claude 3",
    toolColor: "bg-[#D97757]", 
    category: "Textes",
    views: "22k",
    likes: 1100,
    type: "text",
    heightClass: "h-[260px]", 
    author: { name: "CopyNinja", avatar: "https://i.pravatar.cc/150?u=18" },
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Générateur d'animations CSS fluides",
    tool: "Cursor",
    toolColor: "bg-[#3B82F6]", 
    category: "Code",
    views: "45k",
    likes: 2300,
    type: "text",
    heightClass: "h-[320px]", 
    author: { name: "CodeMaster", avatar: "https://i.pravatar.cc/150?u=4" },
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Logo minimalist 3D gradient abstract",
    tool: "Midjourney v6",
    toolColor: "bg-[#2563EB]", 
    category: "Images",
    views: "19k",
    likes: 900,
    type: "image",
    heightClass: "h-[280px]", 
    author: { name: "LogoGenius", avatar: "https://i.pravatar.cc/150?u=10" },
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
  }
];

export default function PromptsCatalogPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [likedPrompts, setLikedPrompts] = useState<number[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState("Populaires");

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (likedPrompts.includes(id)) {
      setLikedPrompts(likedPrompts.filter(pId => pId !== id));
    } else {
      setLikedPrompts([...likedPrompts, id]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] font-sans text-slate-900 dark:text-white relative">
      
      {/* Scroll Bleed Blocker - Prevents items from showing behind transparent global navbar */}
      <div className="fixed top-0 inset-x-0 h-[72px] lg:h-[80px] bg-[#F8FAFC] dark:bg-[#0B1120] z-[35]" />

      
      {/* Background Interactive Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Hero Header Harmonisé avec CursorGlow */}
      <div className="relative">
        <CursorGlow gradientClasses="from-blue-500 to-pink-500" />
        <div className="relative z-10 pt-28 pb-6 max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-between">
           <div className="w-full md:w-1/2">
             <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
               Prompts IA
             </h1>
             <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
               Explorez les meilleurs prompts d'intelligence artificielle triés par popularité et par format (Image, Vidéo, Texte, Code).
             </p>
           </div>
           <div className="hidden md:block w-1/2">
             <PromptsIllustration />
           </div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[72px] lg:top-[80px] z-40 bg-[#F8FAFC]/90 dark:bg-[#0B1120]/90 backdrop-blur-xl border-y border-slate-200/50 dark:border-slate-800/50 py-3 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Mobile: search + filter icon on one line */}
          <MobileFilterBar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Rechercher un prompt..."
            onFilterOpen={() => setMobileFiltersOpen(true)}
            activeFiltersCount={(activeCategory !== "Tous" ? 1 : 0) + (activeSort !== "Populaires" ? 1 : 0)}
          />

          {/* Desktop: full bar */}
          <div className="hidden md:flex md:flex-row md:items-center justify-between gap-4">
             <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-6 w-full md:w-auto">
               
              {/* Search Bar - Style Pill */}
              <div className="relative w-full md:w-64 shrink-0">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Rechercher un prompt..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0F172A] border border-slate-200/60 dark:border-slate-800 rounded-full text-sm font-medium focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
                />
               </div>
               
              {/* Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/30 dark:border-slate-700/30 shrink-0">
                 {["Tous", "Images", "Vidéos", "Textes", "Code"].map(type => (
                   <button
                     key={type}
                     onClick={() => setActiveCategory(type)}
                     className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                       activeCategory === type 
                       ? 'bg-white dark:bg-[#0F172A] text-slate-900 dark:text-white shadow-sm' 
                       : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                     }`}
                   >
                     {type}
                   </button>
                 ))}
              </div>
               
              {/* Sort */}
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 shrink-0 ml-2">
                <span>Trier par</span>
                <button className="font-bold text-slate-900 dark:text-white flex items-center gap-1 hover:text-primary transition-colors">
                  {activeSort} <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Right: Count */}
            <div className="text-sm font-bold text-slate-900 dark:text-white shrink-0 hidden md:flex items-center gap-1">
              {mockPrompts.length} <span className="font-medium text-slate-500 dark:text-slate-400">prompts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter sheet */}
      <MobileFilterSheet
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        title="Filtrer les prompts"
        resultCount={mockPrompts.length}
        onReset={() => { setActiveCategory("Tous"); setActiveSort("Populaires"); }}
        groups={[
          {
            id: "type",
            label: "Type de prompt",
            type: "pills",
            value: activeCategory,
            onChange: setActiveCategory,
            options: ["Tous", "Images", "Vidéos", "Textes", "Code"].map((t) => ({ value: t, label: t })),
          },
          {
            id: "sort",
            label: "Trier par",
            type: "select",
            value: activeSort,
            onChange: setActiveSort,
            options: ["Populaires", "Récents", "Tendances"].map((s) => ({ value: s, label: s })),
          },
        ]}
      />

      <div className="pt-10 pb-24 max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar (Leaderboard) */}
          <aside className="lg:w-72 shrink-0 space-y-8 hidden lg:block">
            <div className="bg-white dark:bg-[#0F172A] rounded-3xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-sm sticky top-[160px]">
               <h3 className="font-extrabold text-lg flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
                 <span className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-500 flex items-center justify-center"><Trophy className="w-4 h-4" /></span>
                 Leaderboard
               </h3>
               
               <div className="space-y-4 mb-6">
                 {leaderboard.map((user) => (
                   <div key={user.rank} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <span className={`w-5 text-center text-sm font-black ${user.rank <= 3 ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                           {user.rank}
                         </span>
                         <div className="relative w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 overflow-hidden shadow-sm">
                           <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                         </div>
                         <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{user.name}</span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-400">{user.points}</span>
                   </div>
                 ))}
               </div>
               
               <button className="w-full py-3 bg-slate-50 dark:bg-[#151E32] rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/50 dark:border-slate-700">
                 Voir le classement
               </button>
            </div>
          </aside>

          {/* Right Content - True Masonry Gallery */}
          <div className="flex-1">
            <div className="columns-1 sm:columns-2 xl:columns-3 gap-6 space-y-6">
              {mockPrompts.map((prompt) => (
                <Link href={`/prompt/${prompt.id}`} key={prompt.id} className="break-inside-avoid group relative flex flex-col bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200/60 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl dark:hover:shadow-primary/5 transition-all duration-500 cursor-pointer">
                   
                   {/* Main Media Preview */}
                   <div className={`relative w-full ${prompt.heightClass} bg-slate-100 dark:bg-slate-900 overflow-hidden`}>
                      <Image 
                        src={prompt.image} 
                        alt={prompt.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      
                      {/* Dark overlay on hover for better icon visibility */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 z-10" />
                      
                      {/* Permanent Gradient overlay for text readability at bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 z-10 pointer-events-none" />
                      
                      {/* Hover Actions - Interactive Buttons */}
                      <div className={`absolute top-4 left-4 z-30 flex items-center gap-2 transition-opacity duration-300 ${likedPrompts.includes(prompt.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                         <button 
                           onClick={(e) => toggleLike(e, prompt.id)}
                           className={`w-9 h-9 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 shadow-xl ${likedPrompts.includes(prompt.id) ? 'bg-pink-500/90 text-white border-pink-500' : 'bg-white/20 text-white hover:bg-pink-500 hover:border-pink-500'}`} 
                           title="Aimer"
                         >
                            <Heart className={`w-4 h-4 ${likedPrompts.includes(prompt.id) ? 'fill-white' : ''}`} />
                         </button>
                         <button 
                           onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                           className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 shadow-xl" 
                           title="Partager"
                         >
                            <Share2 className="w-4 h-4" />
                         </button>
                         <button 
                           onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                           className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 shadow-xl" 
                           title="Copier le prompt"
                         >
                            <Copy className="w-4 h-4" />
                         </button>
                      </div>

                      {/* Video Play Icon overlay */}
                      {prompt.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                           <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-2xl transform group-hover:scale-110">
                              <Play className="w-5 h-5 text-white fill-white ml-1" />
                           </div>
                        </div>
                      )}
                      
                      {/* Tool Badge */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg z-30">
                         <div className={`w-2 h-2 rounded-full ${prompt.toolColor}`} />
                         {prompt.tool}
                      </div>

                      {/* Info Overlaid at bottom of image */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 z-20 pointer-events-none">
                        <h3 className="font-extrabold text-lg text-white leading-tight mb-3 drop-shadow-md line-clamp-2 group-hover:text-primary-100 transition-colors">
                          {prompt.title}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2 pointer-events-auto">
                             <Image src={prompt.author.avatar} alt={prompt.author.name} width={24} height={24} className="rounded-full border border-white/20" />
                             <span className="text-[11px] font-bold text-white/90 drop-shadow-md hover:underline">{prompt.author.name}</span>
                           </div>
                           <div className="flex items-center gap-3 text-[11px] font-bold text-white/80 drop-shadow-md">
                              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {prompt.views}</span>
                              <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-white" /> {prompt.likes}</span>
                           </div>
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
                  Envie de partager vos créations ?
                </h2>
                <p className="text-slate-600 dark:text-slate-300 font-medium text-lg">
                  Rejoignez notre communauté de créateurs. Proposez vos meilleurs prompts, gagnez en visibilité et générez des revenus en vendant vos créations exclusives.
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
