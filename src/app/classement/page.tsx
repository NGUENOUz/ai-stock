"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Search, ChevronRight, Award, Flame, UserPlus } from "lucide-react";
import CursorGlow from "@/components/CursorGlow";

const MOCK_LEADERBOARD = Array.from({ length: 50 }).map((_, i) => ({
  id: `user-${i + 1}`,
  rank: i + 1,
  name: `Creator ${i + 1}`,
  avatar: `https://i.pravatar.cc/150?u=${i + 1}`,
  score: Math.floor(15000 / (i + 1)) + Math.floor(Math.random() * 500),
  specialty: ["Images", "Vidéos", "Textes", "Code"][i % 4],
  trending: i < 3,
  pro: i % 5 === 0
}));

export default function ClassementPage() {
  const [search, setSearch] = useState("");

  const filteredUsers = MOCK_LEADERBOARD.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] relative">
      <CursorGlow gradientClasses="from-amber-500 to-orange-500" />
      
      {/* HEADER */}
      <div className="relative pt-28 pb-12 overflow-hidden border-b border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-[#0F172A]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-500 mb-6 shadow-lg shadow-amber-500/20">
            <Trophy className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Classement des Créateurs
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Découvrez les membres les plus actifs et créatifs de la communauté AI-STOCK. Gagnez des points en publiant des prompts et en recevant des votes.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* SEARCH & FILTERS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Rechercher un créateur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-full text-sm font-medium focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
            />
          </div>
          <div className="text-sm font-bold text-slate-500 dark:text-slate-400">
            {filteredUsers.length} Créateurs classés
          </div>
        </div>

        {/* LIST */}
        <div className="bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {filteredUsers.map((user, index) => (
              <div key={user.id} className="flex items-center p-4 sm:p-6 hover:bg-slate-50 dark:hover:bg-[#151E32] transition-colors group">
                {/* RANK */}
                <div className={`w-12 text-center text-lg font-black shrink-0 ${
                  user.rank === 1 ? 'text-amber-500' : 
                  user.rank === 2 ? 'text-slate-400' : 
                  user.rank === 3 ? 'text-amber-700' : 
                  'text-slate-500 dark:text-slate-500'
                }`}>
                  #{user.rank}
                </div>

                {/* INFO */}
                <Link href={`/createurs/${user.id}`} className="flex-1 flex items-center gap-4 px-4 min-w-0 cursor-pointer">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${
                      user.rank <= 3 ? 'border-amber-400' : 'border-slate-200 dark:border-slate-700'
                    }`}>
                      <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                    </div>
                    {user.trending && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full border-2 border-white dark:border-[#0F172A] flex items-center justify-center text-white">
                        <Flame className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
                        {user.name}
                      </h3>
                      {user.pro && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-black tracking-widest bg-primary/10 text-primary uppercase">Pro</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      Spécialité : {user.specialty}
                    </p>
                  </div>
                </Link>

                {/* SCORE & FOLLOW */}
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="font-black text-slate-900 dark:text-white">{user.score.toLocaleString()}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Points</div>
                  </div>
                  <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <UserPlus className="w-3.5 h-3.5" /> Suivre
                  </button>
                  <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-700 group-hover:text-primary transition-colors sm:hidden" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
