"use client";

import React from "react";
import { Sparkles, Trophy, ArrowRight, Clock } from "lucide-react";
import Image from "next/image";

export default function DailyChallenge() {
  return (
    <div className="relative overflow-hidden bg-[#0F172A] rounded-3xl p-6 md:p-8 mb-8 border border-slate-800 shadow-glow-primary">
      {/* Background Effects */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-pink-500/20 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest mb-4 backdrop-blur-md border border-white/10">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            Défi du Jour
          </div>
          
          <h2 className="text-2xl md:text-4xl font-black text-white mb-3 tracking-tight leading-tight">
            Designez une interface cyberpunk
          </h2>
          
          <p className="text-slate-300 mb-6 max-w-lg mx-auto md:mx-0">
            Créez une UI dashboard au style cyberpunk avec Midjourney ou DALL-E. Le gagnant remporte le badge "Visionnaire" et 500 points.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button className="w-full sm:w-auto px-6 py-3 bg-white text-slate-900 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Participer
            </button>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <Clock className="w-4 h-4" /> Termine dans 8h 24m
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/3 shrink-0">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl transform md:rotate-3 hover:rotate-0 transition-transform duration-500">
            <Image 
              src="https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600&auto=format&fit=crop" 
              alt="Cyberpunk UI" 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
              <div className="flex items-center gap-2">
                <Image src="https://i.pravatar.cc/150?u=12" alt="Current leader" width={24} height={24} className="rounded-full border border-white/50" />
                <span className="text-xs font-bold text-white">En tête : NeonDreamer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
