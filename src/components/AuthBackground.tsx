"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Flame, Bell } from "lucide-react";
import Image from "next/image";

export function AuthBackground() {
  return (
    <div className="hidden lg:flex w-1/2 relative bg-slate-50 dark:bg-[#0B1120] overflow-hidden items-center justify-center border-l border-slate-200 dark:border-slate-800">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, var(--tw-prose-body, #000) 100%), linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)', backgroundSize: '100% 100%, 40px 40px, 40px 40px' }} />
      
      {/* Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Floating Elements Container */}
      <div className="relative w-full max-w-lg aspect-square">
        
        {/* Main Engagement Card */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-slate-900 dark:bg-[#0F172A] rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-700/50 z-20"
        >
          <div className="flex justify-between items-start mb-8">
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 -ml-4 border-2 border-slate-900 overflow-hidden relative">
                <Image src="https://i.pravatar.cc/150?img=11" alt="Avatar" fill />
              </div>
            </div>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            </div>
          </div>
          <p className="text-slate-400 text-sm mb-1">Portée de vos outils & prompts</p>
          <h3 className="text-3xl font-black text-white mb-6">24,502 <span className="text-lg text-slate-500 font-medium">vues</span></h3>
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-emerald-400 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +12.5% ce mois</span>
            <span className="text-slate-500">Top 5% créateurs</span>
          </div>
        </motion.div>

        {/* Small Notification Card (Top Right) */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[15%] -right-4 w-64 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl border border-slate-100 dark:border-slate-700 z-30"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1"><Bell className="w-3 h-3"/> À l'instant</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm leading-tight">Nouvel outil IA en vogue dans votre domaine</h4>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 p-1 flex items-center justify-center border border-slate-200 dark:border-slate-700">
               <Image src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png" alt="Midjourney" width={20} height={20} />
            </div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Midjourney V6 Update
            </div>
          </div>
        </motion.div>

        {/* Analytics Card (Bottom Left) */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[20%] -left-8 w-56 bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-xl border border-slate-100 dark:border-slate-700 z-30"
        >
          <div className="flex items-end gap-2 h-12 mb-3">
            {[40, 70, 45, 90, 60].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-t-sm relative group">
                <div 
                  className={`absolute bottom-0 w-full rounded-t-sm transition-all ${i === 3 ? 'bg-blue-600' : 'bg-blue-400'}`}
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400">
            <span>Lun</span>
            <span>Mar</span>
            <span className="text-slate-800 dark:text-white">Mer</span>
            <span>Jeu</span>
            <span>Ven</span>
          </div>
        </motion.div>

        {/* Chat Card (Bottom Right) */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -bottom-4 right-0 w-72 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl border border-slate-100 dark:border-slate-700 z-10"
        >
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 border-2 border-slate-100 dark:border-slate-700">
              <Image src="https://i.pravatar.cc/150?img=32" alt="Avatar User" fill />
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-slate-800 dark:text-white text-sm">Sophie M.</h4>
                <span className="text-[10px] text-slate-400">Il y a 5 min</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3">Salut ! Ton prompt ChatGPT pour le SEO est incroyable, j'ai gagné 2h ce matin. Tu as prévu d'en sortir d'autres ?</p>
              <div className="flex justify-end">
                <button className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 text-[10px] font-bold rounded-lg hover:bg-blue-100 transition-colors">
                  Répondre
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
