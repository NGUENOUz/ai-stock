"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight, Heart, Download, BookOpen, FolderHeart, TrendingUp } from "lucide-react";

const recommendedItems = [
  { id: 1, title: "ChatGPT Plus", category: "Productivité", rating: 4.9, icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
  { id: 2, title: "Midjourney", category: "Design", rating: 4.8, icon: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png" },
  { id: 3, title: "Notion AI", category: "Productivité", rating: 4.7, icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
  { id: 4, title: "Claude 3", category: "Recherche", rating: 4.6, icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" }, // placeholder
];

const trendingItems = [
  { id: 1, title: "Prompt SEO - Article de blog", views: "2.4k" },
  { id: 2, title: "Midjourney - Interior Design", views: "1.8k" },
  { id: 3, title: "ChatGPT - Automation", views: "1.5k" },
];

export default function UserDashboardPage() {
  return (
    <div className="flex flex-col xl:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Main Content Area */}
      <div className="flex-1 space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#0F172A] to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-2xl flex items-center justify-between">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4">Bonjour, Alex ! 👋</h1>
            <p className="text-slate-300 font-medium mb-8 max-w-md">Découvrez les meilleurs outils IA, prompts et ressources soigneusement sélectionnés pour vous.</p>
            <button className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/30 hover:-translate-y-0.5">
              Explorer le catalogue
            </button>
          </div>
          {/* Abstract illustration or 3D robot placeholder */}
          <div className="hidden md:block relative z-10 w-48 h-48">
            <Image 
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=300&auto=format&fit=crop" 
              alt="Robot 3D Illustration"
              fill
              className="object-cover rounded-full shadow-2xl border-4 border-white/10"
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary opacity-20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 left-20 w-64 h-64 bg-purple-500 opacity-20 rounded-full blur-3xl" />
        </div>

        {/* Recommended Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Recommandé pour vous</h3>
            <button className="text-sm font-bold text-primary hover:text-blue-600 transition-colors flex items-center gap-1">
              Voir tout <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-[#0F172A] p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none hover:border-primary/50 transition-colors cursor-pointer group flex flex-col items-center text-center">
                <div className="w-16 h-16 relative bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm p-3 mb-4 group-hover:scale-110 transition-transform">
                  <Image src={item.icon} alt={item.title} fill className="object-contain p-3" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{item.category}</p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-lg">
                  ★ {item.rating}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Sidebar (Stats & Trending) */}
      <div className="w-full xl:w-80 shrink-0 space-y-6">
        
        {/* Vos statistiques */}
        <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6">Vos statistiques</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-500 flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">Favoris</span>
              </div>
              <span className="font-black text-slate-900 dark:text-white">24</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-500 flex items-center justify-center">
                  <Download className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">Téléchargements</span>
              </div>
              <span className="font-black text-slate-900 dark:text-white">57</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-500 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">Ressources lues</span>
              </div>
              <span className="font-black text-slate-900 dark:text-white">18</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-500 flex items-center justify-center">
                  <FolderHeart className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">Collections</span>
              </div>
              <span className="font-black text-slate-900 dark:text-white">5</span>
            </div>
          </div>
        </div>

        {/* Tendances */}
        <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Tendances
            </h3>
          </div>
          
          <div className="space-y-4">
            {trendingItems.map((item, idx) => (
              <div key={item.id} className="flex items-center gap-4">
                <span className="text-slate-400 font-black text-sm">{idx + 1}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate max-w-[180px]">{item.title}</h4>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
                  ▲ {item.views}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
