"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search, SlidersHorizontal, TrendingUp, Sparkles, Clock,
  ChevronRight, ChevronLeft, Star, Users, Download, Check,
  Zap, Shield, Crown, ExternalLink, Play
} from "lucide-react";

// Types
interface Workflow {
  id: string;
  title: string;
  description: string;
  platform: string;
  category: string;
  sector: string;
  price: number;
  isFree: boolean;
  rating: number;
  usageCount: number;
  apps: { name: string; logo: string }[];
  contributor: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  thumbnail: string;
  isBestseller: boolean;
  isNew: boolean;
}

const PLATFORMS = ["Tous", "N8N", "Zapier", "Make", "Integromat", "Pipedream"];
const CATEGORIES = ["Marketing", "Ventes", "Productivité", "Finance", "Support Client", "RH"];
const SECTORS = ["E-commerce", "SaaS", "Agence", "Freelance", "Startup", "Entreprise"];
const PRICE_FILTERS = ["Tous", "Gratuit", "Payant"];
const SORT_OPTIONS = ["Popularité", "Plus récents", "Prix croissant", "Prix décroissant", "Meilleures notes"];

// Mock data
const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: "1",
    title: "Automatisation Lead Enrichment + CRM",
    description: "Enrichissez automatiquement vos leads avec Apollo et synchronisez dans HubSpot",
    platform: "N8N",
    category: "Ventes",
    sector: "SaaS",
    price: 29,
    isFree: false,
    rating: 4.9,
    usageCount: 1240,
    apps: [
      { name: "Apollo", logo: "https://picsum.photos/40/40?random=1" },
      { name: "HubSpot", logo: "https://picsum.photos/40/40?random=2" },
      { name: "Slack", logo: "https://picsum.photos/40/40?random=3" },
    ],
    contributor: {
      name: "Sophie Martin",
      avatar: "https://picsum.photos/50/50?random=10",
      verified: true,
    },
    thumbnail: "https://picsum.photos/400/250?random=100",
    isBestseller: true,
    isNew: false,
  },
  {
    id: "2",
    title: "Pipeline Marketing Automation Complet",
    description: "De la capture de lead à la conversion : email, SMS, notifications",
    platform: "Zapier",
    category: "Marketing",
    sector: "E-commerce",
    price: 0,
    isFree: true,
    rating: 4.7,
    usageCount: 890,
    apps: [
      { name: "Mailchimp", logo: "https://picsum.photos/40/40?random=4" },
      { name: "Twilio", logo: "https://picsum.photos/40/40?random=5" },
      { name: "Google Sheets", logo: "https://picsum.photos/40/40?random=6" },
    ],
    contributor: {
      name: "Alex Rousseau",
      avatar: "https://picsum.photos/50/50?random=11",
      verified: true,
    },
    thumbnail: "https://picsum.photos/400/250?random=101",
    isBestseller: false,
    isNew: true,
  },
  {
    id: "3",
    title: "Gestion Factures & Comptabilité Auto",
    description: "Extraction automatique des factures PDF vers votre logiciel comptable",
    platform: "Make",
    category: "Finance",
    sector: "Freelance",
    price: 19,
    isFree: false,
    rating: 4.8,
    usageCount: 650,
    apps: [
      { name: "Gmail", logo: "https://picsum.photos/40/40?random=7" },
      { name: "QuickBooks", logo: "https://picsum.photos/40/40?random=8" },
      { name: "Notion", logo: "https://picsum.photos/40/40?random=9" },
    ],
    contributor: {
      name: "Léa Dubois",
      avatar: "https://picsum.photos/50/50?random=12",
      verified: false,
    },
    thumbnail: "https://picsum.photos/400/250?random=102",
    isBestseller: false,
    isNew: false,
  },
  {
    id: "4",
    title: "Support Client IA + Ticketing",
    description: "Réponses automatiques avec GPT-4 et création de tickets Zendesk",
    platform: "N8N",
    category: "Support Client",
    sector: "SaaS",
    price: 39,
    isFree: false,
    rating: 4.9,
    usageCount: 1100,
    apps: [
      { name: "OpenAI", logo: "https://picsum.photos/40/40?random=13" },
      { name: "Zendesk", logo: "https://picsum.photos/40/40?random=14" },
      { name: "Discord", logo: "https://picsum.photos/40/40?random=15" },
    ],
    contributor: {
      name: "Sophie Martin",
      avatar: "https://picsum.photos/50/50?random=10",
      verified: true,
    },
    thumbnail: "https://picsum.photos/400/250?random=103",
    isBestseller: true,
    isNew: false,
  },
  {
    id: "5",
    title: "Recrutement Automatisé LinkedIn",
    description: "Scraping LinkedIn + scoring candidats + emails personnalisés",
    platform: "Zapier",
    category: "RH",
    sector: "Agence",
    price: 0,
    isFree: true,
    rating: 4.6,
    usageCount: 520,
    apps: [
      { name: "LinkedIn", logo: "https://picsum.photos/40/40?random=16" },
      { name: "Airtable", logo: "https://picsum.photos/40/40?random=17" },
      { name: "Gmail", logo: "https://picsum.photos/40/40?random=18" },
    ],
    contributor: {
      name: "Alex Rousseau",
      avatar: "https://picsum.photos/50/50?random=11",
      verified: true,
    },
    thumbnail: "https://picsum.photos/400/250?random=104",
    isBestseller: false,
    isNew: true,
  },
  {
    id: "6",
    title: "Content Marketing Multi-Canal",
    description: "Publication automatique sur 10+ plateformes avec optimisation SEO",
    platform: "Make",
    category: "Marketing",
    sector: "Agence",
    price: 49,
    isFree: false,
    rating: 4.8,
    usageCount: 780,
    apps: [
      { name: "WordPress", logo: "https://picsum.photos/40/40?random=19" },
      { name: "Buffer", logo: "https://picsum.photos/40/40?random=20" },
      { name: "Canva", logo: "https://picsum.photos/40/40?random=21" },
    ],
    contributor: {
      name: "Léa Dubois",
      avatar: "https://picsum.photos/50/50?random=12",
      verified: false,
    },
    thumbnail: "https://picsum.photos/400/250?random=105",
    isBestseller: false,
    isNew: false,
  },
];

export default function WorkflowsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("Tous");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("Popularité");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const toggleSector = (sector: string) => {
    setSelectedSectors(prev =>
      prev.includes(sector) ? prev.filter(s => s !== sector) : [...prev, sector]
    );
    setCurrentPage(1);
  };

  const filteredWorkflows = useMemo(() => {
    let result = MOCK_WORKFLOWS.filter(w => {
      const matchesSearch = w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlatform = selectedPlatform === "Tous" || w.platform === selectedPlatform;
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(w.category);
      const matchesSector = selectedSectors.length === 0 || selectedSectors.includes(w.sector);
      const matchesPrice = priceFilter === "Tous" ||
        (priceFilter === "Gratuit" && w.isFree) ||
        (priceFilter === "Payant" && !w.isFree);
      return matchesSearch && matchesPlatform && matchesCategory && matchesSector && matchesPrice;
    });

    // Sorting
    if (sortBy === "Popularité") result.sort((a, b) => b.usageCount - a.usageCount);
    if (sortBy === "Plus récents") result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    if (sortBy === "Prix croissant") result.sort((a, b) => a.price - b.price);
    if (sortBy === "Prix décroissant") result.sort((a, b) => b.price - a.price);
    if (sortBy === "Meilleures notes") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [searchTerm, selectedPlatform, selectedCategories, selectedSectors, priceFilter, sortBy]);

  const totalPages = Math.ceil(filteredWorkflows.length / itemsPerPage);
  const paginatedWorkflows = filteredWorkflows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="relative min-h-screen bg-white">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 pt-32 md:pt-40">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-8 h-8 text-primary" />
            <span className="text-xs font-black uppercase tracking-wider text-neutral-400">Workflows</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black mb-6">
            Automatisations <span className="text-primary">prêtes à l'emploi.</span>
          </h1>
          <p className="text-xl text-neutral-500 max-w-3xl leading-relaxed">
            Gagnez des heures chaque semaine avec des workflows testés et approuvés par la communauté.
          </p>
        </div>

        {/* Search & Filters Bar */}
        <div className="sticky top-[72px] z-40 w-full bg-white/70 backdrop-blur-md border-y border-neutral-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Rechercher un workflow..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Platform Filter */}
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-4 py-3 bg-white border border-neutral-200 rounded-2xl font-semibold text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                {PLATFORMS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white border border-neutral-200 rounded-2xl font-semibold text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                {SORT_OPTIONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-16">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-44 space-y-10">
              {/* Price */}
              <div>
                <h3 className="font-black text-neutral-400 mb-6 uppercase text-[10px] tracking-[0.2em]">Prix</h3>
                <div className="space-y-3">
                  {PRICE_FILTERS.map(p => (
                    <label key={p} className="flex items-center group cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={priceFilter === p}
                        onChange={() => setPriceFilter(p)}
                        className="w-5 h-5 text-primary border-neutral-300 focus:ring-primary"
                      />
                      <span className="ml-3 text-sm font-bold text-neutral-600">{p}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-black text-neutral-400 mb-6 uppercase text-[10px] tracking-[0.2em]">Catégories</h3>
                <div className="space-y-3">
                  {CATEGORIES.map(cat => (
                    <label key={cat} className="flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-5 h-5 border-2 border-neutral-200 rounded-md checked:bg-primary transition-all"
                      />
                      <span className="ml-3 text-sm font-bold text-neutral-500 peer-checked:text-primary">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sectors */}
              <div>
                <h3 className="font-black text-neutral-400 mb-6 uppercase text-[10px] tracking-[0.2em]">Secteurs</h3>
                <div className="space-y-3">
                  {SECTORS.map(sector => (
                    <label key={sector} className="flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSectors.includes(sector)}
                        onChange={() => toggleSector(sector)}
                        className="w-5 h-5 border-2 border-neutral-200 rounded-md checked:bg-primary transition-all"
                      />
                      <span className="ml-3 text-sm font-bold text-neutral-500">{sector}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <main className="grow">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm font-bold text-neutral-500">
                {filteredWorkflows.length} workflow{filteredWorkflows.length > 1 ? "s" : ""} trouvé{filteredWorkflows.length > 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedWorkflows.map((workflow) => (
                <Link
                  key={workflow.id}
                  href={`/workflows/${workflow.id}`}
                  className="group relative flex flex-col bg-white border-2 border-neutral-200 rounded-2xl overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300"
                >
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex gap-2">
                    {workflow.isBestseller && (
                      <span className="flex items-center gap-1 text-xs font-black px-2.5 py-1 bg-primary text-black rounded-full">
                        <Crown size={12} /> Bestseller
                      </span>
                    )}
                    {workflow.isNew && (
                      <span className="text-xs font-black px-2.5 py-1 bg-success text-white rounded-full">
                        Nouveau
                      </span>
                    )}
                  </div>

                  {/* Thumbnail */}
                  <div className="relative h-48 bg-neutral-100 overflow-hidden">
                    <Image src={workflow.thumbnail} alt={workflow.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Platform badge */}
                    <div className="absolute bottom-3 right-3">
                      <span className="text-xs font-black px-3 py-1.5 bg-white/90 backdrop-blur-sm text-black rounded-full">
                        {workflow.platform}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Apps logos */}
                    <div className="flex items-center gap-1 mb-3 -ml-1">
                      {workflow.apps.map((app, i) => (
                        <div key={i} className="w-8 h-8 rounded-lg border-2 border-white shadow-sm overflow-hidden bg-white">
                          <Image src={app.logo} alt={app.name} width={32} height={32} className="object-cover" />
                        </div>
                      ))}
                      {workflow.apps.length > 3 && (
                        <div className="w-8 h-8 rounded-lg border-2 border-white bg-neutral-100 flex items-center justify-center text-xs font-black text-neutral-600">
                          +{workflow.apps.length - 3}
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black text-black mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {workflow.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-2 flex-1">
                      {workflow.description}
                    </p>

                    {/* Category */}
                    <div className="mb-4">
                      <span className="text-xs font-black uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                        {workflow.category}
                      </span>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      {/* Contributor */}
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Image src={workflow.contributor.avatar} alt={workflow.contributor.name} width={28} height={28} className="rounded-full" />
                          {workflow.contributor.verified && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center border-2 border-white">
                              <Check size={8} className="text-black" />
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-semibold text-neutral-600">{workflow.contributor.name}</span>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1 text-neutral-500">
                          <Star size={12} className="text-primary fill-primary" />
                          <span className="font-bold">{workflow.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-neutral-500">
                          <Download size={12} />
                          <span className="font-bold">{workflow.usageCount}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mt-4 pt-4 border-t border-neutral-100">
                      {workflow.isFree ? (
                        <span className="text-lg font-black text-success">Gratuit</span>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-black">{workflow.price}€</span>
                          <span className="text-sm text-neutral-400 font-medium">une fois</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="p-3 rounded-xl border-2 border-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:border-primary hover:bg-primary/5 active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-black text-black px-4">
                  Page {currentPage} / {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="p-3 rounded-xl border-2 border-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:border-primary hover:bg-primary/5 active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </main>
        </div>

        {/* CTA Banner - Devenir Contributeur */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="relative bg-gradient-to-br from-black via-neutral-900 to-black rounded-[3rem] p-12 md:p-20 overflow-hidden border-2 border-neutral-800">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] -ml-32 -mb-32" />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-black uppercase tracking-wider text-primary">Rejoignez la communauté</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                  Partagez vos workflows et <span className="text-primary">générez des revenus.</span>
                </h2>
                <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                  Rejoignez plus de 500 contributeurs qui monétisent leurs automatisations. Créez une fois, vendez à l'infini.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    href="/dashboard"
                    className="group flex items-center gap-3 bg-primary text-black px-8 py-4 rounded-2xl font-black text-lg hover:bg-primary-600 transition-all shadow-xl shadow-primary/20"
                  >
                    <Zap className="w-5 h-5" />
                    Devenir contributeur
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button className="flex items-center gap-2 text-white hover:text-primary transition-colors font-bold">
                    <Play className="w-4 h-4" />
                    Comment ça marche ?
                  </button>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 shrink-0">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <p className="text-4xl font-black text-primary mb-2">500+</p>
                  <p className="text-sm font-bold text-neutral-400 uppercase tracking-wide">Contributeurs</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <p className="text-4xl font-black text-primary mb-2">15K+</p>
                  <p className="text-sm font-bold text-neutral-400 uppercase tracking-wide">Workflows</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <p className="text-4xl font-black text-primary mb-2">2.5M€</p>
                  <p className="text-sm font-bold text-neutral-400 uppercase tracking-wide">Revenus générés</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <p className="text-4xl font-black text-primary mb-2">4.8★</p>
                  <p className="text-sm font-bold text-neutral-400 uppercase tracking-wide">Note moyenne</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
