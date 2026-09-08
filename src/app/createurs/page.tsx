"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Star,
  UserPlus,
  MessageCircle,
  Crown,
  CheckCircle2,
  TrendingUp,
  Trophy,
  ArrowRight,
  Sparkles,
  Zap,
  Users,
  ChevronDown,
  Medal,
  Flame,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import CursorGlow from "@/components/CursorGlow";
import CreatorsIllustration from "@/components/hero-illustrations/CreatorsIllustration";
import MobileFilterSheet, { MobileFilterBar } from "@/components/MobileFilterSheet";
import { globalStats } from "@/data/globalStats";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Creator {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  cover: string;
  verified: boolean;
  trend: string | null;
  badges: { name: string; icon: React.ElementType; color: string }[];
  stats: { followers: string; followersNum: number; resources: number; rating: number };
  category: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = ["Tous", "Automation", "Développement", "Design", "Marketing", "Rédaction", "Data"];
const SORT_OPTIONS = ["Rang", "Ressources", "Note", "Abonnés"];
const ITEMS_PER_PAGE = 9;

const HERO_STATS = [
  { value: `${globalStats.activeCreators}`, label: "Créateurs actifs", icon: Users },
  { value: `${(globalStats.totalMembers / 1000).toFixed(1)}K+`, label: "Membres cumulés", icon: TrendingUp },
  { value: "4.8★", label: "Note moyenne", icon: Star },
];

const CREATORS: Creator[] = [
  {
    id: "sophie-martin",
    name: "Sophie Martin",
    role: "Expert Automation & IA",
    location: "Paris, France",
    avatar: "https://i.pravatar.cc/150?img=10",
    cover: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=800&h=300",
    verified: true,
    trend: "hot",
    badges: [{ name: "Top Contributeur", icon: Crown, color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40" }],
    stats: { followers: "3.4K", followersNum: 3400, resources: 24, rating: 4.9 },
    category: "Automation",
  },
  {
    id: "thomas-dubois",
    name: "Thomas Dubois",
    role: "Prompt Engineer Senior",
    location: "Montréal, Canada",
    avatar: "https://i.pravatar.cc/150?img=11",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=300",
    verified: true,
    trend: "rising",
    badges: [{ name: "Bestseller", icon: TrendingUp, color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40" }],
    stats: { followers: "8.2K", followersNum: 8200, resources: 145, rating: 4.8 },
    category: "Rédaction",
  },
  {
    id: "elena-koval",
    name: "Elena Koval",
    role: "AI Product Designer",
    location: "Berlin, Allemagne",
    avatar: "https://i.pravatar.cc/150?img=47",
    cover: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800&h=300",
    verified: false,
    trend: "new",
    badges: [],
    stats: { followers: "1.2K", followersNum: 1200, resources: 12, rating: 5.0 },
    category: "Design",
  },
  {
    id: "marc-antoine",
    name: "Marc Antoine",
    role: "Développeur Full-Stack IA",
    location: "Lyon, France",
    avatar: "https://i.pravatar.cc/150?img=51",
    cover: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800&h=300",
    verified: true,
    trend: null,
    badges: [{ name: "Expert", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40" }],
    stats: { followers: "5.5K", followersNum: 5500, resources: 38, rating: 4.7 },
    category: "Développement",
  },
  {
    id: "julie-leb",
    name: "Julie Leblanc",
    role: "Growth Hacker IA",
    location: "Genève, Suisse",
    avatar: "https://i.pravatar.cc/150?img=43",
    cover: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800&h=300",
    verified: true,
    trend: "hot",
    badges: [],
    stats: { followers: "4.1K", followersNum: 4100, resources: 18, rating: 4.9 },
    category: "Marketing",
  },
  {
    id: "lucas-m",
    name: "Lucas Morel",
    role: "Spécialiste Data Science",
    location: "Bordeaux, France",
    avatar: "https://i.pravatar.cc/150?img=60",
    cover: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80&w=800&h=300",
    verified: false,
    trend: "new",
    badges: [],
    stats: { followers: "890", followersNum: 890, resources: 5, rating: 4.6 },
    category: "Data",
  },
];

// ─── Score composite ──────────────────────────────────────────────────────────
function calcScore(c: Creator): number {
  return c.stats.resources * 30 + c.stats.followersNum * 0.005 + c.stats.rating * 200;
}

// Rang global (sur tous les créateurs)
const GLOBAL_RANKED = [...CREATORS].sort((a, b) => calcScore(b) - calcScore(a));
const GLOBAL_RANK_MAP = new Map(GLOBAL_RANKED.map((c, i) => [c.id, i + 1]));

// ─── Sub-components ───────────────────────────────────────────────────────────

function RatingBar({ value }: { value: number }) {
  const pct = ((value - 4) / 1) * 100;
  return (
    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400"
      />
    </div>
  );
}

function RankBadge({ rank, categoryRank, category }: { rank: number; categoryRank: number | null; category: string }) {
  // Affiche le rang catégorie si filtré, sinon le rang global
  const displayRank = categoryRank ?? rank;
  const isFiltered = categoryRank !== null;

  const medal =
    displayRank === 1 ? "🥇" :
    displayRank === 2 ? "🥈" :
    displayRank === 3 ? "🥉" : null;

  const bg =
    displayRank === 1 ? "bg-amber-500 shadow-amber-500/40" :
    displayRank === 2 ? "bg-slate-400 shadow-slate-400/40" :
    displayRank === 3 ? "bg-orange-600 shadow-orange-600/40" :
    "bg-slate-700/90 dark:bg-slate-700 shadow-slate-800/20";

  return (
    <div className={cn(
      "absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-[11px] font-black shadow-lg backdrop-blur-sm",
      bg
    )}>
      {medal ? <span>{medal}</span> : <Trophy className="w-3 h-3" />}
      <span>#{displayRank}{isFiltered ? ` en ${category}` : " Global"}</span>
    </div>
  );
}

function TrendChip({ trend }: { trend: string | null }) {
  if (!trend) return null;
  if (trend === "hot")
    return <span className="inline-flex items-center gap-1 text-orange-500 text-[10px] font-black"><Flame className="w-3 h-3" /> Tendance</span>;
  if (trend === "rising")
    return <span className="inline-flex items-center gap-1 text-blue-500 text-[10px] font-black"><TrendingUp className="w-3 h-3" /> En hausse</span>;
  if (trend === "new")
    return <span className="inline-flex items-center gap-1 text-emerald-500 text-[10px] font-black"><Zap className="w-3 h-3" /> Nouveau</span>;
  return null;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreateursPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState("Rang");
  const [sortOpen, setSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filtrage + tri + rang catégorie
  const { rankedCreators, categoryRankMap } = useMemo(() => {
    let pool = CREATORS;

    // Filtre catégorie
    if (activeCategory !== "Tous") {
      pool = pool.filter((c) => c.category === activeCategory);
    }

    // Filtre recherche
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      pool = pool.filter(
        (c) => c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)
      );
    }

    // Rang dans la catégorie courante (si filtré)
    const sorted = [...pool].sort((a, b) => calcScore(b) - calcScore(a));
    const catRankMap = new Map(sorted.map((c, i) => [c.id, i + 1]));

    // Tri selon le critère
    let result = [...pool];
    if (activeSort === "Rang") result = sorted;
    else if (activeSort === "Ressources") result = [...pool].sort((a, b) => b.stats.resources - a.stats.resources);
    else if (activeSort === "Note") result = [...pool].sort((a, b) => b.stats.rating - a.stats.rating);
    else if (activeSort === "Abonnés") result = [...pool].sort((a, b) => b.stats.followersNum - a.stats.followersNum);

    return {
      rankedCreators: result,
      categoryRankMap: activeCategory !== "Tous" ? catRankMap : null,
    };
  }, [activeCategory, searchQuery, activeSort]);

  // Pagination
  const totalPages = Math.ceil(rankedCreators.length / ITEMS_PER_PAGE);
  const paginatedCreators = rankedCreators.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page on filter change
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };
  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  // Top 3 global pour le widget sidebar
  const top3 = GLOBAL_RANKED.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] font-sans text-slate-900 dark:text-white relative">

      {/* Background tech grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative">
        <CursorGlow gradientClasses="from-blue-500 to-violet-500" />
        <div className="relative z-10 pt-16 lg:pt-8 pb-6 max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Créateurs vérifiés & certifiés
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
              Les{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                esprits brillants
              </span>{" "}
              de l'IA
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
              Explorez et classez les meilleurs experts IA. Le rang est calculé selon les ressources publiées, les abonnés et la note de la communauté.
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden md:block w-1/2"
          >
            <CreatorsIllustration />
          </motion.div>
        </div>
      </div>

      {/* ── Sticky Filter Bar ─────────────────────────────────────────────── */}
      <div className="sticky top-16 lg:top-0 z-40 bg-[#F8FAFC]/90 dark:bg-[#0B1120]/90 backdrop-blur-xl border-y border-slate-200/50 dark:border-slate-800/50 py-3 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Mobile: search + filter icon ── */}
          <MobileFilterBar
            searchValue={searchQuery}
            onSearchChange={handleSearch}
            searchPlaceholder="Rechercher un cr\u00e9ateur..."
            onFilterOpen={() => setMobileFiltersOpen(true)}
            activeFiltersCount={(activeCategory !== "Tous" ? 1 : 0) + (activeSort !== "Rang" ? 1 : 0)}
          />

          {/* ── Desktop: full bar ── */}
          <div className="hidden md:flex md:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
              {/* Search */}
              <div className="relative w-full md:w-60 shrink-0">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un créateur..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0F172A] border border-slate-200/60 dark:border-slate-800 rounded-full text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-colors shadow-sm"
                />
              </div>

              {/* Category pills */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/30 dark:border-slate-700/30 shrink-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                      activeCategory === cat
                        ? "bg-white dark:bg-[#0F172A] text-slate-900 dark:text-white shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Filter Button - Desktop */}
              <button 
                onClick={() => setMobileFiltersOpen(true)}
                className="w-11 h-11 shrink-0 rounded-full bg-white dark:bg-[#0F172A] border border-slate-200/60 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors shadow-sm ml-auto"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile filter sheet ─────────────────────────────────────────────── */}
      <MobileFilterSheet
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        title="Filtrer les cr\u00e9ateurs"
        resultCount={rankedCreators.length}
        onReset={() => { handleCategoryChange("Tous"); setActiveSort("Rang"); }}
        groups={[
          {
            id: "category",
            label: "Cat\u00e9gorie",
            type: "pills",
            value: activeCategory,
            onChange: (v) => { handleCategoryChange(v); },
            options: CATEGORIES.map((c) => ({ value: c, label: c })),
          },
          {
            id: "sort",
            label: "Trier par",
            type: "select",
            value: activeSort,
            onChange: (v) => { setActiveSort(v); setCurrentPage(1); },
            options: SORT_OPTIONS.map((s) => ({ value: s, label: s })),
          },
        ]}
      />

      {/* ── Main Layout ───────────────────────────────────────────────────── */}
      <div className="pt-10 pb-24 max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Sidebar ─────────────────────────────────────────────────── */}
          <aside className="lg:w-64 shrink-0 space-y-6 hidden lg:block">
            <div className="bg-white dark:bg-[#0F172A] rounded-3xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-sm sticky top-[160px]">

              {/* Top 3 du mois */}
              <h3 className="font-extrabold text-sm flex items-center gap-2 mb-5 text-slate-900 dark:text-white uppercase tracking-wider">
                <span className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-500 flex items-center justify-center">
                  <Trophy className="w-3.5 h-3.5" />
                </span>
                Top 3 du mois
              </h3>

              <div className="space-y-3 mb-6">
                {top3.map((creator, i) => {
                  const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉";
                  const borderColor = i === 0 ? "border-amber-400" : i === 1 ? "border-slate-400" : "border-orange-500";
                  return (
                    <Link
                      key={creator.id}
                      href={`/contributors/${creator.id}`}
                      className="flex items-center gap-3 group"
                    >
                      <span className="text-lg w-6 text-center">{medal}</span>
                      <div className={`relative w-9 h-9 rounded-full overflow-hidden border-2 ${borderColor} shadow-sm group-hover:scale-110 transition-transform`}>
                        <Image src={creator.avatar} alt={creator.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-500 transition-colors truncate">{creator.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{creator.stats.resources} ressources</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 dark:border-slate-800 my-5" />

              {/* Créateur à la une */}
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                Créateur à la une
              </h3>
              <Link
                href={`/contributors/${GLOBAL_RANKED[0].id}`}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-900/40 hover:shadow-md transition-all group"
              >
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-800 shadow-lg">
                  <Image src={GLOBAL_RANKED[0].avatar} alt={GLOBAL_RANKED[0].name} fill className="object-cover" />
                  <div className="absolute -bottom-1 -right-1 bg-amber-400 rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-extrabold text-slate-900 dark:text-white text-sm group-hover:text-blue-500 transition-colors">{GLOBAL_RANKED[0].name}</p>
                  <p className="text-xs text-blue-500 dark:text-blue-400 font-semibold mt-0.5">{GLOBAL_RANKED[0].role}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{GLOBAL_RANKED[0].stats.resources} ressources · {GLOBAL_RANKED[0].stats.followers} abonnés</p>
                </div>
              </Link>

              {/* Divider */}
              <div className="border-t border-slate-100 dark:border-slate-800 my-5" />

              {/* Légende du score */}
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                Comment est calculé le rang ?
              </h3>
              <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center justify-between">
                  <span>📦 Ressources</span><span className="font-bold text-slate-700 dark:text-slate-300">×30 pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>👥 Abonnés</span><span className="font-bold text-slate-700 dark:text-slate-300">×0.005 pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>⭐ Note</span><span className="font-bold text-slate-700 dark:text-slate-300">×200 pts</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Creator Grid ─────────────────────────────────────────────── */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {paginatedCreators.length > 0 ? (
                <motion.div
                  key={activeCategory + searchQuery + activeSort + currentPage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {paginatedCreators.map((creator, idx) => {
                    const globalRank = GLOBAL_RANK_MAP.get(creator.id) ?? 99;
                    const catRank = categoryRankMap?.get(creator.id) ?? null;

                    return (
                      <motion.div
                        key={creator.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.07 }}
                        className="bg-white dark:bg-[#0F172A] rounded-[2rem] border border-slate-200/60 dark:border-slate-800 overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/8 dark:hover:shadow-blue-500/10 hover:border-blue-200 dark:hover:border-blue-900/60 transition-all duration-300 flex flex-col"
                      >
                        {/* Cover */}
                        <Link href={`/contributors/${creator.id}`} className="block relative h-32 w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <Image src={creator.cover} alt="Cover" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          {/* Rank badge (remplace TrendBadge) */}
                          <RankBadge rank={globalRank} categoryRank={catRank} category={activeCategory} />
                          {/* Trend chip (petit, en bas du cover) */}
                          {creator.trend && (
                            <div className="absolute bottom-3 right-3 z-20 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                              <TrendChip trend={creator.trend} />
                            </div>
                          )}
                        </Link>

                        <div className="px-6 pb-6 pt-0 relative flex-1 flex flex-col">
                          {/* Avatar */}
                          <Link
                            href={`/contributors/${creator.id}`}
                            className="block relative w-20 h-20 -mt-10 mx-auto rounded-full border-4 border-white dark:border-[#0F172A] overflow-hidden bg-slate-100 z-10 shadow-lg group-hover:border-blue-100 dark:group-hover:border-blue-900/50 transition-colors duration-300"
                          >
                            <Image src={creator.avatar} alt={creator.name} fill className="object-cover" />
                          </Link>

                          {/* Info */}
                          <div className="text-center mt-3 mb-4">
                            <Link href={`/contributors/${creator.id}`} className="flex items-center justify-center gap-1.5 mb-1">
                              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {creator.name}
                              </h3>
                              {creator.verified && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                            </Link>
                            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">{creator.role}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">{creator.location}</p>
                          </div>

                          {/* Badges */}
                          {creator.badges.length > 0 ? (
                            <div className="flex justify-center gap-2 mb-4">
                              {creator.badges.map((badge) => (
                                <div
                                  key={badge.name}
                                  className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider", badge.color)}
                                >
                                  <badge.icon className="w-3 h-3" /> {badge.name}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="h-7 mb-4" />
                          )}

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                            <div className="text-center">
                              <div className="text-base font-black text-slate-900 dark:text-white">{creator.stats.followers}</div>
                              <div className="text-[10px] font-bold uppercase text-slate-400">Abonnés</div>
                            </div>
                            <div className="text-center border-x border-slate-200 dark:border-slate-800">
                              <div className="text-base font-black text-slate-900 dark:text-white">{creator.stats.resources}</div>
                              <div className="text-[10px] font-bold uppercase text-slate-400">Ressources</div>
                            </div>
                            <div className="text-center">
                              <div className="text-base font-black text-slate-900 dark:text-white flex items-center justify-center gap-0.5">
                                {creator.stats.rating} <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                              </div>
                              <div className="text-[10px] font-bold uppercase text-slate-400">Note</div>
                            </div>
                          </div>

                          {/* Rating bar */}
                          <div className="mb-5 px-1">
                            <RatingBar value={creator.stats.rating} />
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-3 mt-auto">
                            <button className="flex-1 py-2.5 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 hover:scale-[1.02] text-sm">
                              <UserPlus className="w-4 h-4" /> Suivre
                            </button>
                            <Link
                              href={`/contributors/${creator.id}`}
                              className="p-2.5 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold rounded-xl transition-colors"
                            >
                              <MessageCircle className="w-5 h-5" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Aucun créateur trouvé</h3>
                  <p className="text-slate-500 dark:text-slate-400">Essayez de modifier vos termes de recherche ou de changer de catégorie.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Pagination ─────────────────────────────────────────────── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-blue-500 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all shadow-sm ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-blue-600/25"
                        : "bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-blue-500 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ›
                </button>
              </div>
            )}

            {/* ── CTA Banner ─────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-16 bg-gradient-to-br from-blue-600/10 to-violet-600/10 dark:from-blue-600/20 dark:to-violet-600/20 border border-blue-200/60 dark:border-blue-800/40 rounded-[2rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-violet-500/20 blur-[80px] rounded-full pointer-events-none" />

              <div className="max-w-xl relative z-10 text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4 flex flex-col md:flex-row items-center justify-center lg:justify-start gap-3">
                  <Sparkles className="w-8 h-8 text-blue-500" />
                  Rejoignez l'élite des créateurs IA
                </h2>
                <p className="text-slate-600 dark:text-slate-300 font-medium text-base leading-relaxed">
                  Publiez vos ressources, grimpez dans le classement et générez des revenus grâce à la communauté.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-5 justify-center lg:justify-start">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-500 dark:text-slate-400">
                    <Medal className="w-4 h-4 text-amber-500" /> Badging vérifié
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-500 dark:text-slate-400">
                    <TrendingUp className="w-4 h-4 text-blue-500" /> Revenus passifs
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-500 dark:text-slate-400">
                    <Users className="w-4 h-4 text-violet-500" /> Communauté active
                  </div>
                </div>
              </div>
              <div className="shrink-0 relative z-10">
                <Link
                  href="/contributor"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-600/40 transition-all hover:scale-105 transform"
                >
                  Devenir Créateur <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
