"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Heart, TrendingUp, ChevronRight, ChevronLeft,
  Scale, X, PlusCircle, SlidersHorizontal, Star, Zap,
  RotateCcw, Check, ExternalLink, Database
} from 'lucide-react';
import ToolsIllustration from "@/components/hero-illustrations/ToolsIllustration";
import { apiClient } from '@/lib/api-client';
import { AiTool } from '@/types/type';
import ComparisonModal from '@/components/ComparisonModal';
import { cn } from "@/lib/utils";
import CursorGlow from "@/components/CursorGlow";
import mockToolsData from '@/bd/mock-tools.json';
import MobileFilterSheet, { MobileFilterBar } from "@/components/MobileFilterSheet";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface LocalTool {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  category: string;
  priceType: string;
  upvotes: number;
  isTrending: boolean;
  isNew: boolean;
  logo: string;
  rating: number;
  features: string[];
}

// ─── FILTRES MAQUETTE ─────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all", label: "Tous les outils", count: 200 },
  { id: "Productivité", label: "Productivité", count: 34 },
  { id: "Design", label: "Design & Image", count: 28 },
  { id: "Code", label: "Code & Dev", count: 21 },
  { id: "Marketing", label: "Marketing", count: 19 },
  { id: "Rédaction", label: "Rédaction", count: 16 },
  { id: "Vidéo", label: "Vidéo & Audio", count: 14 },
  { id: "Analyse", label: "Analyse de données", count: 12 },
  { id: "Autre", label: "Autre", count: 56 },
];

const PRICE_TYPES = ["Gratuit", "Freemium", "Payant"];

const SORT_OPTIONS = [
  { value: "popular", label: "Populaires" },
  { value: "newest", label: "Les plus récents" },
  { value: "rating", label: "Mieux notés" },
  { value: "name", label: "Alphabétique" },
];

const COMPATIBILITY = ["Web", "Mobile", "API", "Chrome Extension"];

function getMockFeatures(toolName: string): string[] {
  if (toolName.toLowerCase().includes('chat') || toolName.toLowerCase().includes('gpt'))
    return ["Accès API", "Interface Web", "Modèles personnalisés", "Multi-langues", "Export"];
  if (toolName.toLowerCase().includes('mid') || toolName.toLowerCase().includes('dall'))
    return ["Génération images", "Styles multiples", "HD Export", "Upscaling 4K", "Usage commercial"];
  if (toolName.toLowerCase().includes('claude'))
    return ["Accès API", "Longs contextes", "Analyse docs", "Génération code", "Multi-langues"];
  return ["Accès API", "Interface Web", "Support 24/7", "Export", "Intégrations"];
}

// ─── BADGE PRIX ───────────────────────────────────────────────────────────────
function PriceBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    "Gratuit": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    "Freemium": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "Payant": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  };
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold", styles[type] || styles["Freemium"])}>
      {type}
    </span>
  );
}

// ─── TOOL CARD ────────────────────────────────────────────────────────────────
function ToolCard({
  tool, isFav, isInCompare, onToggleFav, onToggleCompare,
}: {
  tool: LocalTool;
  isFav: boolean;
  isInCompare: boolean;
  onToggleFav: () => void;
  onToggleCompare: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
      className="group relative bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 rounded-2xl p-5 flex flex-col gap-4 hover:border-primary/30 dark:hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)] dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)] transition-all duration-300 backdrop-blur-sm"
    >
      {/* Lien invisible couvrant toute la carte */}
      <Link href={`/liste/${tool.slug}`} className="absolute inset-0 z-0 rounded-2xl" aria-label={`Voir ${tool.name}`} />

      {/* Header : Logo + actions */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 shrink-0">
          <Image
            src={tool.logo}
            alt={tool.name}
            width={56} height={56}
            className="object-cover w-full h-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://ui-avatars.com/api/?name=${tool.name.slice(0,2)}&background=3B82F6&color=fff&bold=true`;
            }}
          />
          {tool.isTrending && (
            <div className="absolute top-0 right-0 w-4 h-4 bg-primary rounded-bl-lg flex items-center justify-center">
              <Zap className="w-2.5 h-2.5 text-white fill-white" />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleCompare(); }}
            title="Comparer"
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
              isInCompare
                ? "bg-primary text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-700/50 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
            )}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFav(); }}
            title="Favori"
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
              isFav
                ? "bg-rose-100 dark:bg-rose-900/30 text-rose-500"
                : "bg-slate-100 dark:bg-slate-700/50 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
            )}
          >
            <Heart className={cn("w-3.5 h-3.5", isFav && "fill-current")} />
          </button>
        </div>
      </div>

      {/* Nom + Badges */}
      <div className="relative z-10 pointer-events-none">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <PriceBadge type={tool.priceType} />
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">{tool.category}</span>
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-primary transition-colors">
          {tool.name}
        </h3>
      </div>

      {/* Description */}
      <p className="relative z-10 text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1 pointer-events-none">
        {tool.shortDesc}
      </p>

      {/* Footer : rating + lien */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/50 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => (
              <Star
                key={i}
                className={cn("w-3.5 h-3.5", i <= Math.round(tool.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-600")}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{tool.rating.toFixed(1)}</span>
        </div>
        <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
          Voir <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── SIDEBAR FILTER SECTION ───────────────────────────────────────────────────
function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">{title}</h4>
      {children}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AiToolsListPage() {
  const [allTools, setAllTools] = useState<LocalTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedCompat, setSelectedCompat] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<LocalTool[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const itemsPerPage = 9;

  // Fetch
  useEffect(() => {
    const saved = localStorage.getItem('user-favs');
    if (saved) setFavorites(JSON.parse(saved));

    async function fetchTools() {
      try {
        setLoading(true);
        let rawTools: AiTool[];
        try {
          // Simulation d'un chargement rapide pour l'UX sans bloquer sur l'API
          await new Promise(resolve => setTimeout(resolve, 600));
          
          /* Code API temporairement désactivé pour éviter le timeout
          const result = await apiClient.getTools({ limit: 100 });
          rawTools = result.data;
          */
          
          rawTools = mockToolsData as unknown as AiTool[];
        } catch {
          rawTools = mockToolsData as unknown as AiTool[];
        }
        const mapped: LocalTool[] = rawTools.map((tool: AiTool) => ({
          id: tool.id,
          slug: tool.slug || tool.id,
          name: tool.name,
          shortDesc: tool.description_short || 'Aucune description disponible',
          category: tool.categories?.[0] || 'Autre',
          priceType: tool.pricing_type || 'Freemium',
          upvotes: Math.floor(Math.random() * 2000) + 100,
          isTrending: tool.is_featured || false,
          isNew: false,
          logo: tool.logo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name.slice(0,2))}&background=3B82F6&color=fff&bold=true`,
          rating: +(Math.random() * 1.5 + 3.5).toFixed(1),
          features: getMockFeatures(tool.name),
        }));
        setAllTools(mapped);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    }
    fetchTools();
  }, []);

  const toggleFavorite = (id: string) => {
    const n = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(n);
    localStorage.setItem('user-favs', JSON.stringify(n));
  };

  const toggleCompare = (tool: LocalTool) => {
    if (compareList.find(t => t.id === tool.id))
      setCompareList(compareList.filter(t => t.id !== tool.id));
    else if (compareList.length < 3)
      setCompareList([...compareList, tool]);
  };

  const togglePrice = (p: string) => {
    setSelectedPrices(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedPrices([]);
    setSelectedCompat([]);
    setSearchTerm('');
    setSortBy('popular');
    setCurrentPage(1);
  };

  // Filter + sort
  const filtered = useMemo(() => {
    let res = allTools.filter(t => {
      const matchSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === 'all' || t.category === selectedCategory;
      const matchPrice = selectedPrices.length === 0 || selectedPrices.includes(t.priceType);
      return matchSearch && matchCat && matchPrice;
    });
    if (sortBy === 'popular') res = [...res].sort((a, b) => b.upvotes - a.upvotes);
    if (sortBy === 'rating') res = [...res].sort((a, b) => b.rating - a.rating);
    if (sortBy === 'name') res = [...res].sort((a, b) => a.name.localeCompare(b.name));
    return res;
  }, [allTools, searchTerm, selectedCategory, selectedPrices, sortBy]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const hasActiveFilters = selectedCategory !== 'all' || selectedPrices.length > 0 || searchTerm;

  // ─── SIDEBAR CONTENT (catégories seulement, prix déplacé vers sticky bar) ────
  const SidebarContent = () => (
    <div className="space-y-0">
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="w-full flex items-center gap-2 text-xs font-bold text-primary mb-6 hover:underline"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Réinitialiser les filtres
        </button>
      )}

      {/* Catégories */}
      <FilterGroup title="Catégories">
        <div className="space-y-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all",
                selectedCategory === cat.id
                  ? "bg-primary/10 text-primary font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <span>{cat.label}</span>
              <span className={cn(
                "text-xs font-bold px-1.5 py-0.5 rounded-md",
                selectedCategory === cat.id ? "bg-primary/20 text-primary" : "text-slate-400 dark:text-slate-500"
              )}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </FilterGroup>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] relative">

      {/* ── FOND GRILLE + BLUR ──────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* ── HEADER PAGE (non sticky) avec CursorGlow ──────────────────────── */}
      <div className="relative">
        <CursorGlow gradientClasses="from-blue-500 to-purple-500" />
        <div className="relative z-10 pt-28 pb-6">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-between">
            <div className="w-full md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
                Outils IA
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base max-w-xl">
                Explorez les meilleures solutions d'intelligence artificielle triées par popularité et par catégorie.
              </p>
            </div>
            <div className="hidden md:block w-1/2">
               <ToolsIllustration />
            </div>
          </div>
        </div>
      </div>

      {/* ── BARRE STICKY : recherche + tarification + tri + compteur ─────── */}
      <div className="sticky top-[72px] z-30 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
          <MobileFilterBar
            searchValue={searchTerm}
            onSearchChange={v => { setSearchTerm(v); setCurrentPage(1); }}
            searchPlaceholder="Rechercher un outil..."
            onFilterOpen={() => setSidebarOpen(true)}
            activeFiltersCount={hasActiveFilters ? 1 : 0}
          />

          {/* Gauche : recherche (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                placeholder="Rechercher un outil..."
                className="h-9 pl-10 pr-4 w-56 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Tarification */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              {PRICE_TYPES.map(p => (
                <button
                  key={p}
                  onClick={() => togglePrice(p)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                    selectedPrices.includes(p)
                      ? "bg-white dark:bg-slate-700 text-primary shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Tri */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Trier par</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-xs font-bold text-slate-700 dark:text-slate-200 bg-transparent outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
          </div>

          </div>

          {/* Droite : compteur + reset */}
          <div className="hidden lg:flex items-center gap-3 text-sm shrink-0">
              <span className="text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-900 dark:text-white">
                  {loading ? "…" : filtered.length}
                </span>{" "}
                {filtered.length > 1 ? "outils" : "outil"}
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <RotateCcw className="w-3 h-3" /> Tout effacer
                </button>
              )}
            </div>
          </div>
        </div>


      {/* Mobile filter sheet */}
      <MobileFilterSheet
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        title="Filtrer les outils"
        resultCount={filtered.length}
        onReset={resetFilters}
        groups={[
          {
            id: "category",
            label: "Cat\u00e9gorie",
            type: "pills",
            value: selectedCategory,
            onChange: (v) => { setSelectedCategory(v); setCurrentPage(1); },
            options: CATEGORIES.map((c) => ({ value: c.id, label: c.label, count: c.count })),
          },
          {
            id: "price",
            label: "Tarification",
            type: "pills",
            value: selectedPrices.length === 0 ? "Tous" : selectedPrices[0],
            onChange: (v) => { 
              if (v === "Tous") setSelectedPrices([]); 
              else {
                setSelectedPrices([v]); 
                setCurrentPage(1);
              }
            },
            options: [{value: "Tous", label: "Tous"}, ...PRICE_TYPES.map((s) => ({ value: s, label: s }))],
          },
          {
            id: "sort",
            label: "Trier par",
            type: "select",
            value: sortBy,
            onChange: (v) => { setSortBy(v); setCurrentPage(1); },
            options: SORT_OPTIONS,
          },
        ]}
      />

      {/* ── LAYOUT PRINCIPAL ─────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 py-8 flex gap-8">

        {/* ─ SIDEBAR Desktop : catégories uniquement ──────────────────────── */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-[144px]">
            <SidebarContent />
          </div>
        </aside>

        {/* ─ MAIN ──────────────────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">

          {/* État : loading */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl h-52 animate-pulse" />
              ))}
            </div>
          )}

          {/* État : erreur */}
          {!loading && error && (
            <div className="text-center py-20">
              <p className="font-bold text-red-500 mb-2">Impossible de charger les outils</p>
              <p className="text-sm text-slate-400">{error}</p>
            </div>
          )}

          {/* État : vide */}
          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <p className="font-bold text-slate-600 dark:text-slate-300 mb-1">Aucun outil trouvé</p>
              <p className="text-sm text-slate-400">Essayez d'autres filtres ou mots-clés.</p>
              <button onClick={resetFilters} className="mt-4 btn-primary py-2 px-5 text-sm">
                Réinitialiser
              </button>
            </div>
          )}

          {/* ─ Grille Tools ─ */}
          {!loading && !error && filtered.length > 0 && (
            <>
              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paginated.map(tool => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      isFav={favorites.includes(tool.id)}
                      isInCompare={!!compareList.find(t => t.id === tool.id)}
                      onToggleFav={() => toggleFavorite(tool.id)}
                      onToggleCompare={() => toggleCompare(tool)}
                    />
                  ))}
                </div>
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary hover:text-primary transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                          "w-9 h-9 rounded-xl text-sm font-bold transition-all border",
                          page === currentPage
                            ? "bg-primary text-white border-primary shadow-sm"
                            : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary"
                        )}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary hover:text-primary transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* ── CTA Soumettre un outil ─────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 mb-20">
        <div className="relative bg-slate-900 dark:bg-slate-800 rounded-3xl p-10 md:p-16 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/20 rounded-full blur-[80px]" />
          </div>
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
              Vous avez créé une <span className="text-primary">solution IA ?</span>
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Rejoignez 500+ outils déjà référencés et augmentez votre visibilité auprès de 15 000 professionnels.
            </p>
          </div>
          <button className="relative z-10 inline-flex items-center gap-3 bg-white text-slate-900 font-bold py-4 px-8 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 shrink-0">
            <PlusCircle className="w-5 h-5" />
            Ajouter mon outil
          </button>
        </div>
      </section>

      {/* ── SIDEBAR Mobile ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-slate-900 z-50 overflow-y-auto p-6 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-extrabold text-slate-900 dark:text-white">Filtres</h3>
                <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── COMPARATEUR FLOTTANT ───────────────────────────────────────────── */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xl bg-slate-900 rounded-2xl px-5 py-3.5 shadow-2xl flex items-center justify-between border border-slate-700"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {compareList.map(t => (
                  <img key={t.id} src={t.logo} alt={t.name} className="w-9 h-9 rounded-full border-2 border-slate-900 object-cover bg-white" />
                ))}
              </div>
              <p className="text-sm font-bold text-white">
                {compareList.length} <span className="text-slate-400 font-normal">/ 3 sélectionnés</span>
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <button onClick={() => setCompareList([])} className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
                Vider
              </button>
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="px-5 py-2 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all"
              >
                Comparer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL COMPARATEUR ─────────────────────────────────────────────── */}
      {isCompareModalOpen && (
        <ComparisonModal
          onClose={() => setIsCompareModalOpen(false)}
          tools={compareList.map(t => ({
            id: t.id,
            name: t.name,
            logo_url: t.logo,
            features: t.features.reduce((acc, f) => { acc[f] = true; return acc; }, {} as Record<string, boolean>),
            stats: {},
          }))}
        />
      )}
    </div>
  );
}