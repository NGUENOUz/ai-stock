"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, BookOpen, History, Users, Settings, LogOut,
  Search, SlidersHorizontal, Bell, MessageSquare, Star, Play,
  TrendingUp, Zap, Award, ChevronRight, Sparkles, Clock,
  BarChart2, Filter, ExternalLink, Crown, CheckCircle2,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import ContributorRequestModal from "@/components/dashboard/ContributorRequestModal";

// ─── Data mock ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { icon: LayoutDashboard, label: "Vue d'ensemble", href: "/dashboard", active: true },
  { icon: BookOpen, label: "Mes Formations", href: "/formations" },
  { icon: History, label: "Historique", href: "/dashboard/history" },
  { icon: Users, label: "Créateurs suivis", href: "/dashboard/creators" },
  { icon: BarChart2, label: "Statistiques", href: "/dashboard/stats" },
  { icon: Settings, label: "Paramètres", href: "/dashboard/settings" },
];

const FOLLOWED_CREATORS = [
  { name: "Sophie M.", avatar: "SM", color: "bg-pink-500" },
  { name: "Alex R.", avatar: "AR", color: "bg-blue-500" },
  { name: "Karim B.", avatar: "KB", color: "bg-emerald-500" },
  { name: "Léa D.", avatar: "LD", color: "bg-amber-500" },
];

const PROGRESS_CARDS = [
  { label: "Formations en cours", value: 3, max: 8, icon: BookOpen, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "Prompts sauvegardés", value: 24, max: 50, icon: Zap, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Crédits restants", value: 180, max: 200, icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
];

const CONTINUE_ITEMS = [
  {
    badge: "FORMATION IA",
    badgeColor: "bg-violet-100 text-violet-700",
    title: "Maîtriser ChatGPT & les LLMs",
    progress: 65,
    author: "Sophie M.",
    authorColor: "bg-pink-500",
    duration: "4h 20min",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    badge: "PROMPT PACK",
    badgeColor: "bg-indigo-100 text-indigo-700",
    title: "100 Prompts Midjourney Pro",
    progress: 30,
    author: "Alex R.",
    authorColor: "bg-blue-500",
    duration: "Pack 100",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    badge: "WORKFLOW",
    badgeColor: "bg-emerald-100 text-emerald-700",
    title: "Automatisation n8n + IA",
    progress: 10,
    author: "Karim B.",
    authorColor: "bg-emerald-500",
    duration: "2h 45min",
    gradient: "from-emerald-500 to-teal-500",
  },
];

const RECENT_ACTIVITY = [
  { creator: "Sophie M.", date: "Aujourd'hui", type: "Formation", typeColor: "bg-violet-100 text-violet-700", title: "Module 3 : Fine-tuning GPT-4" },
  { creator: "Alex R.", date: "Hier", type: "Prompt", typeColor: "bg-indigo-100 text-indigo-700", title: "Prompt Pack Copywriting v2" },
  { creator: "Léa D.", date: "Il y a 3j", type: "Outil", typeColor: "bg-emerald-100 text-emerald-700", title: "AI Image Enhancer Pro" },
  { creator: "Karim B.", date: "Il y a 5j", type: "Workflow", typeColor: "bg-amber-100 text-amber-700", title: "Pipeline Automatisation IA" },
];

const TOP_CREATORS = [
  { name: "Sophie Martin", role: "Expert LLMs", avatar: "SM", color: "bg-pink-500", rating: 4.9 },
  { name: "Alex Rousseau", role: "Prompt Engineer", avatar: "AR", color: "bg-blue-500", rating: 4.8 },
  { name: "Léa Dubois", role: "AI Designer", avatar: "LD", color: "bg-amber-500", rating: 4.7 },
];

const ACTIVITY_BARS = [40, 65, 45, 80, 55, 90, 70];
const DAYS = ["L", "M", "M", "J", "V", "S", "D"];

// ─── Sub-components ────────────────────────────────────────────────────────────

function Avatar({ initials, color, size = "md" }: { initials: string; color: string; size?: "sm" | "md" | "lg" }) {
  const s = size === "sm" ? "w-7 h-7 text-xs" : size === "lg" ? "w-12 h-12 text-base" : "w-9 h-9 text-sm";
  return (
    <div className={`${s} ${color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

function ProgressBar({ value, max, color = "bg-violet-500" }: { value: number; max: number; color?: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5">
      <div className={`${color} h-1.5 rounded-full transition-all`} style={{ width: `${pct}%` }} />
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────

export default function UserDashboard() {
  const { userName, email, subscription, isContributor, contributorRequestPending, handleLogout, role } = useAppStore();
  const [showContributorModal, setShowContributorModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Redirection automatique pour les admins
  useEffect(() => {
    console.log('🔍 Dashboard user - Rôle détecté:', role);
    if (role === 'admin') {
      console.log('🔄 Admin détecté, redirection vers admin dashboard...');
      router.replace('/admin/dashboard');
      return;
    }
  }, [role, router]);

  const initials = userName
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">

      {/* ── LEFT SIDEBAR ─────────────────────────────────────────────────────── */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col py-6 px-4 fixed h-full z-20 shadow-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 px-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-xl font-extrabold text-gray-900">ai-stock</span>
        </Link>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {NAV_LINKS.map(({ icon: Icon, label, href, active }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-violet-50 text-violet-700"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <Icon size={18} className={active ? "text-violet-600" : ""} />
              {label}
              {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-600" />}
            </Link>
          ))}
        </nav>

        {/* Followed creators */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-3">Créateurs suivis</p>
          <div className="space-y-2">
            {FOLLOWED_CREATORS.map(c => (
              <div key={c.name} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                <Avatar initials={c.avatar} color={c.color} size="sm" />
                <span className="text-sm text-gray-600 font-medium">{c.name}</span>
                <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-4 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all w-full"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </aside>

      {/* ── CENTER CONTENT ───────────────────────────────────────────────────── */}
      <main className="flex-1 ml-64 mr-72 px-8 py-8 min-h-screen">

        {/* Search bar */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher formations, prompts, outils..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 shadow-sm"
            />
          </div>
          <button className="p-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:bg-gray-50 transition-colors">
            <SlidersHorizontal size={18} className="text-gray-500" />
          </button>
          <button className="p-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:bg-gray-50 transition-colors relative">
            <Bell size={18} className="text-gray-500" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-violet-600 rounded-full" />
          </button>
        </div>

        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700 rounded-2xl p-7 mb-6 overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <div className="absolute top-4 right-8 w-20 h-20 border-2 border-white rounded-full" />
            <div className="absolute top-12 right-24 w-8 h-8 border border-white rounded-full" />
            <div className="absolute top-2 right-32 text-white text-3xl">✦</div>
            <div className="absolute top-16 right-12 text-white text-xl">✦</div>
            <div className="absolute top-6 right-16 text-white text-lg">⋆</div>
          </div>
          <div className="relative z-10">
            <p className="text-violet-200 text-sm font-medium mb-1">Bienvenue, {userName} 👋</p>
            <h2 className="text-white text-2xl font-extrabold mb-2">
              Continuez votre parcours IA
            </h2>
            <p className="text-violet-200 text-sm mb-5 max-w-md">
              Accédez à vos formations, explorez de nouveaux prompts et rejoignez une communauté de passionnés.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/formations" className="px-5 py-2.5 bg-white text-violet-700 rounded-xl text-sm font-bold hover:bg-violet-50 transition-colors shadow-md">
                Explorer les formations
              </Link>
              {!isContributor && !contributorRequestPending && (
                <button
                  onClick={() => setShowContributorModal(true)}
                  className="px-5 py-2.5 bg-white/20 text-white border border-white/30 rounded-xl text-sm font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                  Devenir contributeur
                </button>
              )}
              {contributorRequestPending && (
                <span className="flex items-center gap-1.5 px-4 py-2 bg-white/20 text-white rounded-xl text-sm font-medium">
                  <Clock size={14} /> Demande en attente
                </span>
              )}
              {isContributor && (
                <span className="flex items-center gap-1.5 px-4 py-2 bg-white/20 text-white rounded-xl text-sm font-medium">
                  <CheckCircle2 size={14} /> Contributeur ✓
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Progress Cards Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {PROGRESS_CARDS.map(({ label, value, max, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 ${bg} rounded-xl`}>
                  <Icon size={16} className={color} />
                </div>
                <span className={`text-xs font-bold ${color}`}>{Math.round((value / max) * 100)}%</span>
              </div>
              <p className="text-xs text-gray-500 mb-1">{label}</p>
              <p className="text-lg font-extrabold text-gray-800 mb-2">
                {value}<span className="text-sm font-normal text-gray-400">/{max}</span>
              </p>
              <ProgressBar value={value} max={max} color={color.replace("text-", "bg-")} />
            </div>
          ))}
        </div>

        {/* Continue Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-800">Continuer où vous en étiez</h3>
            <Link href="/formations" className="text-sm text-violet-600 font-semibold hover:underline flex items-center gap-1">
              Tout voir <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {CONTINUE_ITEMS.map(item => (
              <div key={item.title} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group cursor-pointer">
                {/* Thumbnail */}
                <div className={`h-28 bg-gradient-to-br ${item.gradient} relative flex items-center justify-center`}>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={18} className="text-white ml-0.5" />
                  </div>
                  <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-full ${item.badgeColor} bg-white`}>
                    {item.badge}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-bold text-gray-800 mb-1 line-clamp-2">{item.title}</h4>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Clock size={11} className="text-gray-400" />
                    <span className="text-xs text-gray-400">{item.duration}</span>
                  </div>
                  <ProgressBar value={item.progress} max={100} />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5">
                      <Avatar initials={item.author.split(" ").map(n => n[0]).join("")} color={item.authorColor} size="sm" />
                      <span className="text-xs text-gray-500">{item.author}</span>
                    </div>
                    <span className="text-xs font-semibold text-violet-600">{item.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contributor Section */}
        {isContributor && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-800">Espace Contributeur</h3>
              <Link href="/contributor/submissions" className="text-sm text-violet-600 font-semibold hover:underline flex items-center gap-1">
                Gérer mes soumissions <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-50 rounded-xl">
                    <CheckCircle2 size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Contenus Approuvés</p>
                    <p className="text-lg font-bold text-gray-800">12</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <Clock size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">En Révision</p>
                    <p className="text-lg font-bold text-gray-800">3</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Star size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Revenus ce mois</p>
                    <p className="text-lg font-bold text-gray-800">2,450€</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-800">Activité récente</h3>
            <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Filter size={12} /> Filtrer
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-6 py-3">Créateur / Date</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 py-3">Contenu</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {RECENT_ACTIVITY.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3.5">
                    <p className="text-sm font-semibold text-gray-800">{row.creator}</p>
                    <p className="text-xs text-gray-400">{row.date}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${row.typeColor}`}>{row.type}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm text-gray-700 font-medium">{row.title}</p>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button className="text-xs font-semibold text-violet-600 hover:text-violet-800 flex items-center gap-1 ml-auto">
                      Voir <ExternalLink size={11} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* ── RIGHT SIDEBAR ────────────────────────────────────────────────────── */}
      <aside className="w-72 bg-white border-l border-gray-100 fixed right-0 h-full py-6 px-5 overflow-y-auto shadow-sm">

        {/* Profile */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Votre Profil</p>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell size={15} className="text-gray-500" />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <MessageSquare size={15} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center mb-6">
          {/* Avatar with ring */}
          <div className="relative mb-3">
            <svg className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)]" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="26" fill="none" stroke="#EDE9FE" strokeWidth="3" />
              <circle cx="28" cy="28" r="26" fill="none" stroke="#7C3AED" strokeWidth="3"
                strokeDasharray="163" strokeDashoffset="57" strokeLinecap="round"
                transform="rotate(-90 28 28)" />
            </svg>
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-extrabold text-lg">
              {initials}
            </div>
          </div>
          <p className="font-bold text-gray-800 text-sm">{userName}</p>
          <p className="text-xs text-gray-400 mb-2">{email}</p>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              subscription === "Pro" ? "bg-amber-100 text-amber-700" :
              subscription === "Premium" ? "bg-violet-100 text-violet-700" :
              "bg-gray-100 text-gray-500"
            }`}>
              {subscription === "Pro" && <Crown size={10} className="inline mr-1" />}
              {subscription}
            </span>
            {isContributor && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                Contributeur
              </span>
            )}
          </div>
        </div>

        {/* Activity Chart */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-700">Activité cette semaine</p>
            <TrendingUp size={14} className="text-violet-600" />
          </div>
          <div className="flex items-end gap-1.5 h-16">
            {ACTIVITY_BARS.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-md transition-all ${i === 5 ? "bg-violet-600" : "bg-violet-200"}`}
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-gray-400">{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade banner (if not Pro) */}
        {subscription !== "Pro" && (
          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-4 mb-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Crown size={16} className="text-amber-300" />
              <p className="text-sm font-bold">Passer à Pro</p>
            </div>
            <p className="text-xs text-violet-200 mb-3">Accès illimité, crédits bonus et support prioritaire.</p>
            <Link href="/pricing" className="block text-center py-2 bg-white text-violet-700 rounded-xl text-xs font-bold hover:bg-violet-50 transition-colors">
              Voir les plans
            </Link>
          </div>
        )}

        {/* Top Creators */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Top Créateurs</p>
            <Link href="/dashboard/creators" className="text-xs text-violet-600 font-semibold hover:underline">Voir tout</Link>
          </div>
          <div className="space-y-3">
            {TOP_CREATORS.map(c => (
              <div key={c.name} className="flex items-center gap-3">
                <Avatar initials={c.avatar} color={c.color} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.role}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-0.5">
                    <Star size={10} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-gray-600">{c.rating}</span>
                  </div>
                  <button className="text-xs font-bold text-violet-600 hover:text-violet-800 transition-colors">
                    Suivre
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Contributor CTA (if not yet) */}
          {!isContributor && !contributorRequestPending && (
            <button
              onClick={() => setShowContributorModal(true)}
              className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-violet-300 text-violet-600 rounded-xl text-xs font-bold hover:bg-violet-50 transition-colors"
            >
              <Sparkles size={13} />
              Devenir contributeur
            </button>
          )}
          {contributorRequestPending && (
            <div className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 bg-amber-50 border border-amber-200 text-amber-600 rounded-xl text-xs font-semibold">
              <Clock size={13} /> Demande en cours d'examen
            </div>
          )}
        </div>
      </aside>

      {/* Modal */}
      {showContributorModal && (
        <ContributorRequestModal onClose={() => setShowContributorModal(false)} />
      )}
    </div>
  );
}
