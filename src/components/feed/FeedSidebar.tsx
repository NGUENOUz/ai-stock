"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, TrendingUp, Users } from "lucide-react";

export default function FeedSidebar() {
  const topCreators = [
    { name: "Alex Dev", points: "12.4k", avatar: "https://i.pravatar.cc/150?u=1", badge: "Pro" },
    { name: "Sarah Prompt", points: "9.8k", avatar: "https://i.pravatar.cc/150?u=2" },
    { name: "Mounir IA", points: "8.7k", avatar: "https://i.pravatar.cc/150?u=3", badge: "Expert" },
  ];

  const trendingTools = [
    { name: "Midjourney v6", category: "Image", uses: "1.2k" },
    { name: "Claude 3 Opus", category: "Texte", uses: "980" },
    { name: "Sora", category: "Vidéo", uses: "750" },
  ];

  return (
    <div className="space-y-6 sticky top-28">
      {/* Community Stats */}
      <div className="bg-white dark:bg-[#151e32] border border-slate-100 dark:border-slate-800 rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-primary/10 rounded-xl text-primary">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white">La Communauté</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl text-center">
            <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">12.5k</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Membres</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl text-center">
            <div className="text-2xl font-black text-primary mb-1">842</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Posts</div>
          </div>
        </div>
      </div>

      {/* Top Creators */}
      <div className="bg-white dark:bg-[#151e32] border border-slate-100 dark:border-slate-800 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Top Créateurs</h3>
          </div>
          <Link href="/createurs" className="text-xs font-bold text-primary hover:underline">Voir tout</Link>
        </div>
        
        <div className="space-y-4">
          {topCreators.map((creator, idx) => (
            <div key={idx} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image src={creator.avatar} alt={creator.name} width={36} height={36} className="rounded-full" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white dark:border-slate-800">
                    {idx + 1}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors">{creator.name}</span>
                    {creator.badge && (
                      <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase font-bold">{creator.badge}</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">{creator.points} pts</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Tools */}
      <div className="bg-white dark:bg-[#151e32] border border-slate-100 dark:border-slate-800 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-500/10 rounded-xl text-rose-500">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Outils du moment</h3>
          </div>
        </div>
        
        <div className="space-y-4">
          {trendingTools.map((tool, idx) => (
            <Link key={idx} href="#" className="flex items-center justify-between group p-2 -mx-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors">{tool.name}</div>
                <div className="text-xs text-slate-500">{tool.category}</div>
              </div>
              <div className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                {tool.uses} posts
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
