"use client";

import React, { useState } from "react";
import { 
  BarChart3, DollarSign, Package, MessageSquare, Plus,
  TrendingUp, Users, ArrowUpRight, ArrowDownRight, Edit, Trash2, CheckCircle, Bell, Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const stats = [
  { label: "Vues (30j)", value: "24.5k", trend: "+12%", up: true, icon: BarChart3 },
  { label: "Revenus (30j)", value: "1 250 €", trend: "+5%", up: true, icon: DollarSign },
  { label: "Ressources actives", value: "8", trend: "0%", up: true, icon: Package },
  { label: "Nouveaux abonnés", value: "142", trend: "-2%", up: false, icon: Users },
];

const mockResources = [
  { id: 1, title: "Pack Prompts Midjourney V6", price: 15, sales: 45, revenue: 675, status: "Publié" },
  { id: 2, title: "Guide ChatGPT pour le SEO", price: 29, sales: 12, revenue: 348, status: "Publié" },
  { id: 3, title: "Template Notion Agence IA", price: 49, sales: 4, revenue: 196, status: "Publié" },
  { id: 4, title: "Formation Sora (Brouillon)", price: 99, sales: 0, revenue: 0, status: "Brouillon" },
];

const mockInteractions = [
  { id: 1, user: "Sarah", action: "a commenté votre prompt", time: "Il y a 2h", type: "comment" },
  { id: 2, user: "Alex", action: "a acheté 'Guide ChatGPT'", time: "Il y a 5h", type: "sale" },
  { id: 3, user: "Mounir", action: "a liké votre ressource", time: "Hier", type: "like" },
];

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState("vue_ensemble");
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Sous-navigation Dashboard */}
      <div className="flex items-center gap-2 bg-white dark:bg-[#151E32] p-2 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm overflow-x-auto no-scrollbar">
        {[
          { id: "vue_ensemble", label: "Vue d'ensemble", icon: BarChart3 },
          { id: "ressources", label: "Mes Ressources", icon: Package },
          { id: "interactions", label: "Interactions", icon: MessageSquare },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
              activeTab === tab.id 
                ? "bg-slate-100 dark:bg-[#0B1120] text-slate-900 dark:text-white" 
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "vue_ensemble" && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-[#0F172A] p-5 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <stat.icon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </div>
                  <div className={cn("flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg", stat.up ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400")}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.trend}
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
                  <p className="text-sm font-bold text-slate-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Graphique (Mock) */}
          <div className="bg-white dark:bg-[#0F172A] p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white">Évolution des interactions</h3>
              <select className="bg-slate-50 dark:bg-[#151E32] border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <option>30 derniers jours</option>
                <option>Cette année</option>
              </select>
            </div>
            
            {/* CSS-based Mock Chart */}
            <div className="h-48 w-full flex items-end justify-between gap-2 px-2 border-b border-slate-100 dark:border-slate-800/50 pb-2">
              {[40, 25, 60, 45, 80, 55, 90, 75, 100, 85, 120, 95, 110, 80, 140].map((h, i) => (
                <div key={i} className="w-full bg-primary/20 hover:bg-primary transition-colors rounded-t-md relative group cursor-pointer" style={{ height: `${(h/140)*100}%` }}>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap transition-opacity">
                    {h} vues
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
              <span>1 Sept</span>
              <span>15 Sept</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "ressources" && (
        <div className="bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Mes Ressources</h3>
            <button 
              onClick={() => setIsResourceModalOpen(true)}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4" /> Ajouter une ressource
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 font-bold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Titre</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4">Prix</th>
                  <th className="px-6 py-4">Ventes</th>
                  <th className="px-6 py-4">Revenus</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {mockResources.map(res => (
                  <tr key={res.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{res.title}</td>
                    <td className="px-6 py-4">
                      <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider", res.status === 'Publié' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400")}>
                        {res.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{res.price} €</td>
                    <td className="px-6 py-4 font-bold">{res.sales}</td>
                    <td className="px-6 py-4 font-black text-primary">{res.revenue} €</td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="p-2 text-slate-400 hover:text-red-500 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "interactions" && (
        <div className="bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-slate-900 dark:text-white">Interactions récentes</h3>
          </div>
          
          <div className="space-y-4">
            {mockInteractions.map(interaction => (
              <div key={interaction.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-[#151E32] transition-colors cursor-pointer">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", 
                  interaction.type === 'sale' ? "bg-green-100 text-green-500 dark:bg-green-500/20" :
                  interaction.type === 'like' ? "bg-pink-100 text-pink-500 dark:bg-pink-500/20" :
                  "bg-blue-100 text-blue-500 dark:bg-blue-500/20"
                )}>
                  {interaction.type === 'sale' ? <DollarSign className="w-5 h-5" /> :
                   interaction.type === 'like' ? <Heart className="w-5 h-5" /> :
                   <MessageSquare className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-slate-900 dark:text-white">{interaction.user}</span> {interaction.action}
                  </p>
                  <p className="text-xs font-bold text-slate-400 mt-0.5">{interaction.time}</p>
                </div>
                <button className="text-xs font-bold text-primary hover:underline">Voir</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CRUD Modal (Mock) */}
      {isResourceModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0F172A] w-full max-w-lg rounded-3xl p-6 shadow-2xl relative">
            <h2 className="text-2xl font-black mb-6">Nouvelle ressource</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Titre de la ressource</label>
                <input type="text" className="w-full bg-slate-50 dark:bg-[#151E32] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" placeholder="Ex: Pack Prompts V6" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Prix (€)</label>
                  <input type="number" className="w-full bg-slate-50 dark:bg-[#151E32] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" placeholder="0 = Gratuit" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Catégorie</label>
                  <select className="w-full bg-slate-50 dark:bg-[#151E32] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary">
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Code</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Fichier à vendre</label>
                <div className="w-full border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 bg-slate-50 dark:bg-[#151E32]/50 hover:bg-slate-100 dark:hover:bg-[#151E32] transition-colors cursor-pointer">
                  <Package className="w-8 h-8 mb-2" />
                  <span className="text-sm font-bold">Glissez votre fichier ici</span>
                  <span className="text-xs">PDF, ZIP, Notion Link</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 mt-8">
              <button onClick={() => setIsResourceModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                Annuler
              </button>
              <button onClick={() => setIsResourceModalOpen(false)} className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-glow-primary">
                Publier la ressource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
