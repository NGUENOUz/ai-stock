"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Trophy, Users, Heart, MessageCircle, ArrowUp } from "lucide-react";
import CursorGlow from "@/components/CursorGlow";
import FeedPost from "@/components/feed/FeedPost";

const MOCK_SUBMISSIONS = [
  {
    id: 'sub-1',
    author: { name: "NeonDreamer", avatar: "https://i.pravatar.cc/150?u=4", badge: "PRO" },
    timeAgo: "Il y a 2h",
    content: {
      type: "image",
      prompt: "Cyberpunk Tokyo street, neon lights, rainy night, highly detailed, 8k resolution, cinematic lighting --v 6.0",
      mediaUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=800"
    },
    tool: { name: "Midjourney", slug: "midjourney" },
    stats: { likes: 342, comments: 45 }
  },
  {
    id: 'sub-2',
    author: { name: "Alex Dev", avatar: "https://i.pravatar.cc/150?u=1", badge: "PRO" },
    timeAgo: "Il y a 4h",
    content: {
      type: "image",
      prompt: "A futuristic samurai in Neo Tokyo, glowing katana, rain, reflections, Unreal Engine 5 render",
      mediaUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    },
    tool: { name: "Midjourney", slug: "midjourney" },
    stats: { likes: 256, comments: 12 }
  }
];

const LEADERBOARD = [
  { rank: 1, name: "NeonDreamer", score: 342, avatar: "https://i.pravatar.cc/150?u=4", trend: "up" },
  { rank: 2, name: "Alex Dev", score: 256, avatar: "https://i.pravatar.cc/150?u=1", trend: "same" },
  { rank: 3, name: "Sarah", score: 198, avatar: "https://i.pravatar.cc/150?u=2", trend: "down" },
  { rank: 4, name: "Moi", score: 145, avatar: "https://i.pravatar.cc/150?u=me", trend: "up", isMe: true },
];

export default function ChallengeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] pb-24">
      <CursorGlow gradientClasses="from-amber-500 to-orange-500" />
      
      {/* HEADER */}
      <div className="relative pt-16 lg:pt-8 pb-12 overflow-hidden border-b border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-[#0F172A]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Link href="/tournois" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Retour aux tournois
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="max-w-2xl">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 rounded-full text-xs font-black uppercase tracking-wider mb-4 inline-block">
                Défi du jour
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                Le Défi Néon : Cyberpunk Tokyo
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                Créez la scène cyberpunk la plus impressionnante de Tokyo sous la pluie. Mettez en valeur les reflets néon et l'ambiance nocturne.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-xl text-slate-700 dark:text-slate-300">
                  <Trophy className="w-4 h-4 text-amber-500" /> Badge Visionnaire + 500pts
                </div>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-xl text-slate-700 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-blue-500" /> Finit dans 08:45:22
                </div>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-xl text-slate-700 dark:text-slate-300">
                  <Users className="w-4 h-4 text-pink-500" /> 84 Participants
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto shrink-0">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-1 rounded-2xl md:rounded-full shadow-lg shadow-orange-500/25">
                <button className="w-full bg-white dark:bg-[#0B1120] text-slate-900 dark:text-white px-8 py-4 rounded-xl md:rounded-full font-black text-lg hover:bg-transparent hover:text-white transition-all flex items-center justify-center gap-2">
                  <Trophy className="w-5 h-5" /> Participer au défi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col-reverse lg:flex-row gap-8">
        
        {/* SUBMISSIONS FEED */}
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Participations (84)</h2>
          {MOCK_SUBMISSIONS.map((sub: any) => (
            <FeedPost key={sub.id} post={sub} />
          ))}
        </div>

        {/* LEADERBOARD SIDEBAR */}
        <div className="lg:w-80 shrink-0 space-y-6">
          <div className="bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 sticky top-24">
            <h3 className="font-black text-lg mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" /> Classement en direct
            </h3>

            <div className="space-y-3">
              {LEADERBOARD.map((user) => (
                <div key={user.rank} className={`flex items-center gap-3 p-3 rounded-2xl border transition-colors ${user.isMe ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30' : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
                  <div className={`w-6 text-center font-black ${user.rank === 1 ? 'text-amber-500' : user.rank === 2 ? 'text-slate-400' : user.rank === 3 ? 'text-amber-700' : 'text-slate-500'}`}>
                    #{user.rank}
                  </div>
                  <div className="w-8 h-8 rounded-full overflow-hidden relative">
                    <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${user.isMe ? 'text-amber-700 dark:text-amber-500' : 'text-slate-900 dark:text-white'}`}>{user.name}</p>
                    <p className="text-xs text-slate-500 font-medium">{user.score} votes</p>
                  </div>
                  {user.trend === 'up' && <ArrowUp className="w-4 h-4 text-green-500" />}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-sm font-bold text-slate-500">Tu es actuellement <span className="text-amber-500">4e</span> sur 84 !</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
