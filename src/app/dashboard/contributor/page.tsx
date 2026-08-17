"use client";

import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import { Eye, Download, ThumbsUp, DollarSign, ChevronRight, Shield, Star , TerminalSquare } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from "recharts";

// Mock Data pour les graphiques
const performanceData = [
  { name: 'J-6', vues: 4000, telechargements: 2400 },
  { name: 'J-5', vues: 3000, telechargements: 1398 },
  { name: 'J-4', vues: 2000, telechargements: 9800 },
  { name: 'J-3', vues: 2780, telechargements: 3908 },
  { name: 'J-2', vues: 1890, telechargements: 4800 },
  { name: 'J-1', vues: 2390, telechargements: 3800 },
  { name: 'Auj', vues: 3490, telechargements: 4300 },
];

const recentContents = [
  { id: 1, title: "Prompt - Landing page SaaS", time: "Il y a 2 jours", views: "1.2k", rating: 4.8 },
  { id: 2, title: "ChatGPT Automation Guide", time: "Il y a 5 jours", views: "856", rating: 4.7 },
  { id: 3, title: "Midjourney Style Packs", time: "Il y a 1 semaine", views: "620", rating: 4.9 },
];

export default function ContributorDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Section : Welcome & Badge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Welcome Box */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0F172A] p-8 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none flex flex-col justify-center">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Bienvenue, John ! 👋</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">Voici un aperçu de vos performances sur AI-Stock.</p>
          <div>
            <button className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-primary/20">
              Voir mon profil public
            </button>
          </div>
        </div>

        {/* Level Badge */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-[2rem] shadow-xl text-white flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-white/80 text-sm font-bold uppercase tracking-widest mb-1">Niveau</p>
            <h2 className="text-3xl font-black mb-4">Expert</h2>
            <div className="w-full bg-white/20 h-2 rounded-full mb-2">
              <div className="bg-white h-2 rounded-full w-[62%]" />
            </div>
            <p className="text-xs font-bold text-white/90">1,250 / 2,000 XP</p>
          </div>
          <div className="relative z-10 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
            <Shield className="w-8 h-8 text-white" />
          </div>
          {/* Abstract decoration */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black opacity-10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Vues" value="8,549" trend={23.5} trendText="" icon={<Eye />} />
        <StatCard title="Téléchargements" value="2,847" trend={15.7} trendText="" icon={<Download />} />
        <StatCard title="Appréciations" value="1,248" trend={12.2} trendText="" icon={<ThumbsUp />} />
        <StatCard title="Revenus" value="$1,487" trend={15.3} trendText="" icon={<DollarSign />} />
      </div>

      {/* Content & Performance */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Recent Contents */}
        <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Mes contenus récents</h3>
            <button className="text-sm font-bold text-primary hover:text-blue-600 transition-colors flex items-center gap-1">
              Voir tout <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {recentContents.map((content) => (
              <div key={content.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors border border-transparent dark:hover:border-slate-800">
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <TerminalSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{content.title}</h4>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{content.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 sm:ml-4 pl-14 sm:pl-0">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm font-bold">
                    <Eye className="w-4 h-4" /> {content.views}
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-lg text-sm font-bold">
                    <Star className="w-4 h-4 fill-amber-500" /> {content.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Performance <span className="text-slate-500 text-sm font-medium">(30 derniers jours)</span></h3>
            <button className="text-sm font-bold text-primary hover:text-blue-600 transition-colors flex items-center gap-1">
              Voir tout <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="vues" stroke="#8B5CF6" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="text-center">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Vues</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">8.5k</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Téléchargements</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">2.8k</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Appréciations</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">1.2k</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Revenus</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">$1.4k</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
