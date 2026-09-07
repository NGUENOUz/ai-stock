"use client";

import React, { useState } from "react";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import DailyChallenge from "@/components/feed/DailyChallenge";
import FeedHeader from "@/components/feed/FeedHeader";
import FeedPost from "@/components/feed/FeedPost";
import FeedSidebar from "@/components/feed/FeedSidebar";
import CreatePostModal from "@/components/feed/CreatePostModal";
import { Search, Plus, Sparkles, Image as ImageIcon, MessageSquare, Code } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// MOCK DATA: Feed Posts
const mockPosts = [
  {
    id: "p1",
    author: { name: "Sarah Prompt", avatar: "https://i.pravatar.cc/150?u=2", badge: "Expert" },
    content: {
      type: "image" as const,
      mediaUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600&auto=format&fit=crop",
      prompt: "Cinematic Tokyo Cyberpunk Night, glowing neon signs reflections on wet pavement, cinematic lighting, photorealistic, 8k --ar 16:9"
    },
    tool: { name: "Midjourney v6", slug: "midjourney" },
    stats: { likes: 124, comments: 12 },
    createdAt: "Il y a 2h",
    isTrending: true
  },
  {
    id: "p2",
    author: { name: "CodeMaster", avatar: "https://i.pravatar.cc/150?u=4" },
    content: {
      type: "code" as const,
      prompt: "Génère un composant React de dashboard analytique avec Tailwind CSS et Recharts. Thème sombre."
    },
    tool: { name: "Cursor", slug: "cursor" },
    stats: { likes: 89, comments: 5 },
    createdAt: "Il y a 5h"
  },
  {
    id: "p3",
    author: { name: "AI Director", avatar: "https://i.pravatar.cc/150?u=15", badge: "Pro" },
    content: {
      type: "video" as const,
      mediaUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
      prompt: "Drone flight over an alien glowing forest, bioluminescent plants, misty atmosphere, cinematic camera movement"
    },
    tool: { name: "Sora", slug: "sora" },
    stats: { likes: 342, comments: 45 },
    createdAt: "Hier",
    isTrending: true
  }
];

export default function HomeFeedPage() {
  const [activeTab, setActiveTab] = useState("recent");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter logic (mock)
  let filteredPosts = [...mockPosts];
  if (activeCategory !== "all") {
    filteredPosts = filteredPosts.filter(p => p.content.type === activeCategory);
  }
  if (activeTab === "trending") {
    filteredPosts.sort((a, b) => b.stats.likes - a.stats.likes);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-transparent font-sans text-slate-900 dark:text-white relative">
      
      {/* Background Interactive Elements (Preserved from original) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* MAIN FEED AREA */}
          <div className="flex-1 max-w-3xl mx-auto lg:mx-0 w-full">
            
            {/* ACTION HERO HEADER */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-center lg:text-left">
                Explorez. Créez. <span className="text-transparent bg-clip-text bg-gradient-ai">Innovez.</span>
              </h1>
              
              <div className="bg-white dark:bg-[#151e32] p-2 rounded-2xl md:rounded-full shadow-lg dark:shadow-glow-primary border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-2">
                <div className="flex-1 flex items-center w-full bg-slate-50 dark:bg-[#0B1120] rounded-xl md:rounded-full px-4 py-2 border border-slate-100 dark:border-slate-700">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input 
                    type="text"
                    placeholder="Rechercher un prompt, un créateur..."
                    className="w-full bg-transparent border-none focus:outline-none px-3 py-2 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full md:w-auto shrink-0 bg-gradient-ai hover:bg-gradient-ai-hover text-white px-6 py-3 rounded-xl md:rounded-full font-bold shadow-glow-pink transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Publier
                </button>
              </div>
            </div>

            <DailyChallenge />

            <FeedHeader 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />

            <div className="space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <FeedPost key={post.id} post={post} />
                ))
              ) : (
                <div className="text-center py-12 bg-white dark:bg-[#151e32] rounded-3xl border border-slate-200 dark:border-slate-800">
                  <p className="text-slate-500 font-medium">Aucune publication trouvée.</p>
                  <button 
                    onClick={() => {setActiveTab("recent"); setActiveCategory("all");}}
                    className="mt-4 text-primary font-bold hover:underline"
                  >
                    Réinitialiser
                  </button>
                </div>
              )}
            </div>
            
          </div>

          {/* SIDEBAR RIGHT (Stats, Creators) */}
          <div className="hidden lg:block w-80 shrink-0">
            <FeedSidebar />
          </div>

        </div>
      </div>

      <CreatePostModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />

      {/* Floating Action Button for Mobile */}
      <button 
        onClick={() => setIsCreateModalOpen(true)}
        className="lg:hidden fixed bottom-[88px] right-6 z-40 w-14 h-14 bg-gradient-ai text-white rounded-full flex items-center justify-center shadow-glow-pink active:scale-95 transition-transform"
      >
        <Plus className="w-6 h-6" />
      </button>

    </div>
  );
}
