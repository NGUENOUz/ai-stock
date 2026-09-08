"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trophy, Clock, Users, ChevronRight, Zap, Flame, Award } from "lucide-react";
import CursorGlow from "@/components/CursorGlow";

const MOCK_TOURNAMENTS = [
  {
    id: "defi-neon",
    title: "Le Défi Néon : Cyberpunk Tokyo",
    type: "daily",
    status: "active",
    participants: 84,
    timeLeft: "08:45:22",
    prize: "Badge Visionnaire + 500pts",
    image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "defi-logo",
    title: "Tournoi Hebdo : Création de Logo Minimaliste",
    type: "weekly",
    status: "active",
    participants: 142,
    timeLeft: "2 jours",
    prize: "Badge Designer Pro + 2000pts",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "defi-retro",
    title: "Rétro Gaming Vibes",
    type: "daily",
    status: "completed",
    participants: 120,
    winner: { name: "NeonDreamer", avatar: "https://i.pravatar.cc/150?u=4" },
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
  }
];

export default function TournoisPage() {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] pb-24">
      <CursorGlow gradientClasses="from-amber-500 to-orange-500" />
      
      {/* HEADER */}
      <div className="relative pt-16 lg:pt-24 pb-16 overflow-hidden border-b border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-[#0F172A]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white mb-6 shadow-lg shadow-orange-500/30">
              <Trophy className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              Tournois & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Challenges</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Participez aux défis quotidiens, affrontez d'autres créateurs et grimpez dans les classements pour gagner des points et des badges exclusifs.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* TABS */}
        <div className="flex items-center gap-4 mb-8 overflow-x-auto no-scrollbar border-b border-slate-200/50 dark:border-slate-800">
          <button 
            onClick={() => setActiveTab("active")}
            className={`pb-4 text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${activeTab === 'active' ? 'border-amber-500 text-slate-900 dark:text-white' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}
          >
            <Flame className="w-4 h-4" /> En cours
          </button>
          <button 
            onClick={() => setActiveTab("completed")}
            className={`pb-4 text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 ${activeTab === 'completed' ? 'border-amber-500 text-slate-900 dark:text-white' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}
          >
            <Award className="w-4 h-4" /> Terminés
          </button>
        </div>

        {/* LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TOURNAMENTS.filter(t => t.status === activeTab).map(tournament => (
            <Link href={`/tournois/${tournament.id}`} key={tournament.id} className="group flex flex-col bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200/60 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-glow-orange transition-all">
              <div className="relative h-48 w-full overflow-hidden">
                <Image src={tournament.image} alt={tournament.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white ${tournament.type === 'daily' ? 'bg-pink-500' : 'bg-blue-500'}`}>
                    {tournament.type === 'daily' ? 'Défi du jour' : 'Tournoi Hebdo'}
                  </span>
                </div>

                {tournament.status === 'active' && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm font-bold">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{tournament.timeLeft}</span>
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 line-clamp-2">{tournament.title}</h3>
                
                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-bold">
                      <Users className="w-4 h-4" /> {tournament.participants} participants
                    </span>
                  </div>
                  
                  {tournament.status === 'completed' && tournament.winner ? (
                    <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-100 dark:border-amber-500/20">
                      <div className="w-8 h-8 rounded-full overflow-hidden relative border-2 border-amber-400">
                        <Image src={tournament.winner.avatar} alt={tournament.winner.name} fill className="object-cover" />
                      </div>
                      <div className="text-xs">
                        <span className="block font-bold text-amber-700 dark:text-amber-400">Gagnant</span>
                        <span className="font-black text-slate-900 dark:text-white">{tournament.winner.name}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10 p-2.5 rounded-xl">
                      <Trophy className="w-4 h-4" /> {tournament.prize}
                    </div>
                  )}
                  
                  <div className="pt-2 flex items-center justify-between text-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
                    {tournament.status === 'active' ? 'Rejoindre le défi' : 'Voir les résultats'}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}