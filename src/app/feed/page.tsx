"use client";

import React, { useState } from "react";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import PromptOfTheDay from "@/components/feed/PromptOfTheDay";
import FeedHeader from "@/components/feed/FeedHeader";
import FeedPost from "@/components/feed/FeedPost";
import FeedSidebar from "@/components/feed/FeedSidebar";
import CreatePostModal from "@/components/feed/CreatePostModal";
import { Plus } from "lucide-react";

// MOCK DATA: Prompt of the Day
const promptOfTheDay = {
  title: "Générateur d'images produit photoréalistes",
  description: "Un prompt ultra-détaillé pour créer des visuels produits professionnels, parfait pour le e-commerce et le marketing.",
  content: "Professional product photography of [PRODUCT], placed on a sleek minimalist podium, soft studio lighting with subtle rim light, hyper-realistic textures, 8k resolution, shot on 85mm lens, depth of field --ar 16:9 --v 6.0 --style raw",
  tool: "Midjourney",
  author: {
    name: "Alex Dev",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  image: "https://images.unsplash.com/photo-1528297506728-9533d2ac3fa4?q=80&w=600&auto=format&fit=crop"
};

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
      type: "text" as const,
      prompt: "Agis comme un développeur React Senior. Analyse le composant suivant et propose 3 optimisations de performance majeures en expliquant pourquoi, puis fournis le code refactorisé :"
    },
    tool: { name: "ChatGPT 4", slug: "chatgpt" },
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

export default function FeedPage() {
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
    <PageTransitionWrapper>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] pt-24 pb-20">
        
        {/* Floating Action Button for Mobile */}
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 active:scale-95 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </button>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* MAIN CONTENT AREA */}
            <div className="flex-1 max-w-3xl mx-auto lg:mx-0 w-full">
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white">Feed Communautaire</h1>
                  <p className="text-slate-500 mt-1">Découvrez et partagez les meilleures créations IA.</p>
                </div>
                <button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="hidden lg:flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Publier
                </button>
              </div>

              <PromptOfTheDay prompt={promptOfTheDay} />

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
                  <div className="text-center py-12 bg-white dark:bg-[#151e32] rounded-3xl border border-slate-100 dark:border-slate-800">
                    <p className="text-slate-500 font-medium">Aucune publication trouvée pour ces filtres.</p>
                    <button 
                      onClick={() => {setActiveTab("recent"); setActiveCategory("all");}}
                      className="mt-4 text-primary font-bold hover:underline"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                )}
              </div>
              
            </div>

            {/* SIDEBAR */}
            <div className="hidden lg:block w-80 shrink-0">
              <FeedSidebar />
            </div>

          </div>
        </div>
      </div>

      <CreatePostModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </PageTransitionWrapper>
  );
}
