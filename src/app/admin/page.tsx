"use client";

import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import { Users, Wrench, TerminalSquare, DollarSign, ChevronRight, UserPlus, FilePlus, Download } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import Image from "next/image";

// Mock Data pour les graphiques
const lineChartData = [
  { name: 'J-6', vues: 4000, interactions: 2400 },
  { name: 'J-5', vues: 3000, interactions: 1398 },
  { name: 'J-4', vues: 2000, interactions: 9800 },
  { name: 'J-3', vues: 2780, interactions: 3908 },
  { name: 'J-2', vues: 1890, interactions: 4800 },
  { name: 'J-1', vues: 2390, interactions: 3800 },
  { name: 'Auj', vues: 3490, interactions: 4300 },
];

const pieChartData = [
  { name: 'Outils IA', value: 1248, color: '#3B82F6' },
  { name: 'Prompts', value: 3754, color: '#8B5CF6' },
  { name: 'Ressources', value: 1248, color: '#10B981' },
];

// Mock Data pour les listes
const recentActivities = [
  { id: 1, action: "Nouveau user inscrit", time: "Il y a 10 min", icon: <UserPlus className="w-4 h-4" />, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400" },
  { id: 2, action: "Nouvel outil ajouté", time: "Il y a 5 min", icon: <FilePlus className="w-4 h-4" />, color: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" },
  { id: 3, action: "Prompt soumis", time: "Il y a 5 min", icon: <TerminalSquare className="w-4 h-4" />, color: "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400" },
  { id: 4, action: "Ressource téléchargée", time: "Il y a 12 min", icon: <Download className="w-4 h-4" />, color: "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400" },
];

const topTools = [
  { id: 1, name: "ChatGPT Plus", rating: 4.9, icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
  { id: 2, name: "Midjourney", rating: 4.8, icon: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png" },
  { id: 3, name: "Notion AI", rating: 4.7, icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
  { id: 4, name: "Claude 3", rating: 4.6, icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" }, // Using placeholder for anthropic
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header section */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Vue d'ensemble complète de la plateforme</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Bienvenue sur votre tableau de bord administrateur.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Utilisateurs totaux" value="12,549" trend={12.3} trendText="ce mois" icon={<Users />} />
        <StatCard title="Outils IA" value="1,248" trend={8.2} trendText="ce mois" icon={<Wrench />} />
        <StatCard title="Prompts" value="3,754" trend={15.1} trendText="ce mois" icon={<TerminalSquare />} />
        <StatCard title="Revenus" value="$24,780" trend={18.3} trendText="ce mois" icon={<DollarSign />} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Line Chart */}
        <div className="xl:col-span-2 bg-white dark:bg-[#0F172A] p-6 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Activité de la plateforme</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Vue d'ensemble des 30 derniers jours</p>
            </div>
            <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-xl px-4 py-2 font-medium focus:outline-none focus:border-primary text-slate-700 dark:text-slate-300">
              <option>30 derniers jours</option>
              <option>7 derniers jours</option>
              <option>Cette année</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="vues" stroke="#3B82F6" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="interactions" stroke="#8B5CF6" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none flex flex-col">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Répartition des contenus</h3>
          </div>
          
          <div className="flex-1 min-h-[250px] relative flex items-center justify-center mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Total</span>
              <span className="text-3xl font-black text-slate-900 dark:text-white">6,250</span>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 space-y-3">
            {pieChartData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{item.value.toLocaleString()}</span>
                  <span className="text-slate-400 text-xs w-10 text-right">
                    {((item.value / 6250) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Activity */}
        <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Activité récente</h3>
            <button className="text-sm font-bold text-primary hover:text-blue-600 transition-colors flex items-center gap-1">
              Voir tout <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.color}`}>
                    {activity.icon}
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white text-sm">{activity.action}</span>
                </div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Tools */}
        <div className="bg-white dark:bg-[#0F172A] p-6 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Top outils populaires</h3>
            <button className="text-sm font-bold text-primary hover:text-blue-600 transition-colors flex items-center gap-1">
              Voir tout <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {topTools.map((tool, index) => (
              <div key={tool.id} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-6 text-sm font-black text-slate-400">{index + 1}</div>
                  <div className="w-10 h-10 relative bg-white rounded-xl overflow-hidden shadow-sm p-1">
                    <Image src={tool.icon} alt={tool.name} fill className="object-contain p-1" />
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white text-sm">{tool.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-bold text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-lg">
                  ★ {tool.rating}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
