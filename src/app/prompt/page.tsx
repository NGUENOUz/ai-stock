"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, Filter, Copy, Flame, MessageSquare, Play, Star, Eye, Zap, 
  Award, Share2, ThumbsUp, MessageCircle, ChevronDown, Check,
  Trophy, Clock, Sparkles, Send, ExternalLink, ChevronRight, 
  Bookmark, LayoutGrid, List, Info, Database, Scale
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPES ENRICHIS ---
interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  sector: string;
  tool: string;
  type: "Image" | "Video" | "Text" | "Code";
  mediaUrl: string; // Toujours une image/vidéo de couverture
  author: { name: string; avatar: string; points: number; verified: boolean };
  stats: { copies: number; likes: number; comments: number; views: number };
  tags: string[];
  variables?: string[]; // Liste des variables détectées [Pays], [Nom]...
}

// --- DONNÉES DE SIMULATION MASSIVES ---
const ALL_PROMPTS: Prompt[] = [
  {
    id: "p1",
    title: "Sora : Cyber-Douala 2077",
    content: "Drone shot of Douala port in 2077, flying taxis, neon lights reflecting on Wouri river, ultra-realistic...",
    category: "Vidéo",
    sector: "Art",
    tool: "Sora",
    type: "Video",
    mediaUrl: "https://cdn.pixabay.com/video/2023/10/20/185808-876542784_tiny.mp4",
    author: { name: "CameroonAI", avatar: "https://i.pravatar.cc/150?u=1", points: 4500, verified: true },
    stats: { copies: 1200, likes: 850, comments: 42, views: 15000 },
    tags: ["Cyberpunk", "Africa"],
  },
  {
    id: "p2",
    title: "Analyseur Juridique OHADA",
    content: "Analyse ce contrat de [Type_Contrat] selon les normes OHADA en vigueur au [Pays]...",
    category: "Productivité",
    sector: "Juridique",
    tool: "Claude 3.5",
    type: "Text",
    mediaUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800", // Image cover pour le texte
    author: { name: "Maître_AI", avatar: "https://i.pravatar.cc/150?u=10", points: 3200, verified: true },
    stats: { copies: 2100, likes: 940, comments: 56, views: 8000 },
    tags: ["Droit", "Business"],
    variables: ["Type_Contrat", "Pays"]
  },
  {
    id: "p3",
    title: "Logo Minimaliste Luxury",
    content: "Minimalist logo for a [Industrie] brand, vector, symmetrical, golden ratio, white background...",
    category: "Image",
    sector: "Design",
    tool: "Midjourney",
    type: "Image",
    mediaUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800",
    author: { name: "KingArt", avatar: "https://i.pravatar.cc/150?u=3", points: 8900, verified: true },
    stats: { copies: 12400, likes: 5200, comments: 310, views: 45000 },
    tags: ["Logo", "Minimalist"],
    variables: ["Industrie"]
  },
  {
    id: "p4",
    title: "Expert Python Refactor",
    content: "Optimise cette fonction [Nom_Fonction] pour réduire la complexité de O(n²) à O(log n)...",
    category: "Développement",
    sector: "Tech",
    tool: "GPT-4",
    type: "Code",
    mediaUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
    author: { name: "DevGénie", avatar: "https://i.pravatar.cc/150?u=15", points: 1200, verified: false },
    stats: { copies: 540, likes: 120, comments: 12, views: 3000 },
    tags: ["Python", "Algorithms"],
    variables: ["Nom_Fonction"]
  }
];

export default function PromptsDeepDive() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [copyId, setCopyId] = useState<string | null>(null);

  // LOGIQUE DE FILTRAGE FONCTIONNELLE
  const filteredPrompts = useMemo(() => {
    return ALL_PROMPTS.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.content.toLowerCase().includes(search.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchCat = category === "Tous" || p.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20 font-sans text-slate-900">
      <div className="max-w-[1700px] mx-auto px-6">
        
        {/* --- HERO CHALLENGE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div className="lg:col-span-8 bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[420px] group">
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200')] bg-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-primary text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 animate-pulse">
                  <Flame className="w-4 h-4 fill-current" /> Prompt de la semaine
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tighter">
                SORA <span className="text-primary">ULTIMATE</span> <br /> CINEMATIC GUIDE
              </h1>
              <p className="max-w-xl text-slate-300 text-lg font-medium">Apprenez à maîtriser les mouvements de caméra Sora pour des rendus Hollywoodiens.</p>
            </div>
            <div className="relative z-10 flex gap-4">
              <button className="bg-white text-black px-10 py-5 rounded-2xl font-black hover:bg-primary transition-all flex items-center gap-3 shadow-xl">
                <Zap className="w-6 h-6 fill-current" /> TESTER LE GUIDE
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-primary rounded-[3rem] p-10 flex flex-col justify-between shadow-xl relative overflow-hidden group">
             <Trophy className="absolute -bottom-4 -right-4 w-40 h-40 text-black/10 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
             <div className="relative z-10">
                <div className="flex justify-between mb-8">
                   <div className="bg-black text-white p-4 rounded-2xl"><Trophy size={32}/></div>
                   <span className="text-black font-black uppercase text-xs tracking-widest">Live Now</span>
                </div>
                <h3 className="text-3xl font-black text-black leading-tight mb-4 tracking-tighter">AI LAW CHALLENGE</h3>
                <p className="text-black/70 font-bold mb-6 italic">Créez le meilleur prompt d'analyse de litiges fonciers.</p>
                <div className="flex -space-x-3 mb-6">
                   {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-primary" />)}
                   <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black">+42</div>
                </div>
             </div>
             <button className="bg-black text-white w-full py-5 rounded-2xl font-black relative z-10 hover:scale-[1.02] transition-transform shadow-2xl">REJOINDRE LE DÉFI</button>
          </div>
        </div>

        {/* --- SMART SEARCH & FILTERS --- */}
        <div className="sticky top-20 z-50 bg-white/70 backdrop-blur-2xl border border-slate-200/50 p-4 rounded-[2.5rem] mb-12 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Rechercher un prompt, un outil..." 
                className="w-full bg-slate-100/50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
              {["Tous", "Image", "Vidéo", "Productivité", "Développement"].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                    category === cat ? "bg-white text-black shadow-sm" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
            <button 
              onClick={() => setViewMode("grid")}
              className={cn("p-3 rounded-xl transition-all", viewMode === "grid" ? "bg-black text-white" : "bg-slate-100 text-slate-400")}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={cn("p-3 rounded-xl transition-all", viewMode === "list" ? "bg-black text-white" : "bg-slate-100 text-slate-400")}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEADERBOARD ANIMÉ */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm sticky top-44">
              <h3 className="text-xl font-black mb-8 flex items-center justify-between">
                LEADERBOARD 
                <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full animate-pulse">LIVE</span>
              </h3>
              <div className="space-y-6">
                {ALL_PROMPTS.map((p, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-2xl transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-900 overflow-hidden border-2 border-white shadow-md group-hover:border-primary transition-all">
                        <img src={p.author.avatar} alt="" />
                      </div>
                      <div>
                        <p className="text-sm font-black">{p.author.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{p.author.points} pts</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-primary font-black text-xs">#{i + 1}</div>
                      <div className="text-[8px] text-green-500 font-black flex items-center gap-1">
                        <Flame size={8} /> +12
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-4 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all">VOIR TOUS LES EXPERTS</button>
            </div>
          </aside>

          {/* GRID DES PROMPTS */}
          <main className="lg:col-span-9">
            <AnimatePresence mode="popLayout">
              <motion.div 
                layout
                className={cn(
                  "grid gap-8",
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                )}
              >
                {filteredPrompts.map((prompt) => (
                  <PromptCard 
                    key={prompt.id} 
                    prompt={prompt} 
                    isCopied={copyId === prompt.id}
                    onCopy={() => {
                      navigator.clipboard.writeText(prompt.content);
                      setCopyId(prompt.id);
                      setTimeout(() => setCopyId(null), 2000);
                    }}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPOSANT : PROMPT CARD SURVITAMINÉE ---
function PromptCard({ prompt, isCopied, onCopy }: { prompt: Prompt, isCopied: boolean, onCopy: () => void }) {
  const [showVariables, setShowVariables] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group relative"
    >
      {/* MEDIA HEADER */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {prompt.type === "Video" ? (
          <video src={prompt.mediaUrl} muted loop onMouseEnter={e => e.currentTarget.play()} onMouseLeave={e => e.currentTarget.pause()} className="w-full h-full object-cover" />
        ) : (
          <img src={prompt.mediaUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="bg-white text-black px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
            {prompt.tool}
          </span>
          <span className="bg-black/40 backdrop-blur text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/20">
            {prompt.category}
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
           <h4 className="text-2xl font-black text-white leading-tight tracking-tighter drop-shadow-md">{prompt.title}</h4>
        </div>
      </div>

      {/* BODY */}
      <div className="p-8">
        
        {/* PROMPT BOX & VARIABLES */}
        <div className="mb-6 space-y-4">
          <div className="relative bg-slate-50 border border-slate-100 rounded-[2rem] p-6 group/code overflow-hidden">
            <p className="text-xs font-mono text-slate-500 line-clamp-2 leading-relaxed italic pr-12">
               "{prompt.content}"
            </p>
            <button 
              onClick={onCopy}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-2xl transition-all shadow-xl",
                isCopied ? "bg-green-500 text-white scale-110" : "bg-primary text-black hover:bg-black hover:text-white"
              )}
            >
              {isCopied ? <Check size={20} /> : <Copy size={20} />}
            </button>
            {isCopied && <div className="absolute top-2 right-14 text-[8px] font-black text-green-500 animate-bounce">COPIÉ !</div>}
          </div>

          {prompt.variables && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-black text-primary uppercase flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-md">
                <Database size={10} /> Variables :
              </span>
              {prompt.variables.map(v => (
                <span key={v} className="text-[10px] font-bold bg-slate-100 text-slate-400 px-3 py-1 rounded-full border border-slate-200">
                  [{v}]
                </span>
              ))}
            </div>
          )}
        </div>

        {/* SOCIAL STATS */}
        <div className="flex items-center justify-between py-6 border-y border-slate-50 mb-6">
           <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <span className="text-sm font-black text-slate-900">{prompt.stats.copies >= 1000 ? (prompt.stats.copies/1000).toFixed(1)+'k' : prompt.stats.copies}</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Copies</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm font-black text-slate-900">{prompt.stats.comments}</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Avis</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm font-black text-slate-900">{prompt.stats.likes}</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Likes</span>
              </div>
           </div>
           <div className="flex -space-x-2">
              {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />)}
              <div className="w-8 h-8 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center text-[8px] font-black text-slate-400">+12</div>
           </div>
        </div>

        {/* FOOTER AUTHOR */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="relative">
                <img src={prompt.author.avatar} className="w-11 h-11 rounded-2xl border-2 border-white shadow-md object-cover" alt="" />
                {prompt.author.verified && <div className="absolute -top-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full border-2 border-white"><Check size={8} strokeWidth={4}/></div>}
             </div>
             <div>
               <p className="text-xs font-black text-slate-900">{prompt.author.name}</p>
               <p className="text-[9px] font-black text-primary uppercase">{prompt.author.points} Pts</p>
             </div>
          </div>
          <div className="flex gap-2">
             <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-primary transition-colors"><Share2 size={16}/></button>
             <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl text-[10px] font-black hover:bg-primary hover:text-black transition-all group/btn shadow-lg">
                RUN TEST <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}