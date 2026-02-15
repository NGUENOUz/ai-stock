"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    Search, Heart, TrendingUp, Sparkles, Clock, 
    ChevronRight, LayoutGrid, Flame, ChevronLeft,
    Scale, X, Check, Minus 
} from 'lucide-react';

// --- Types Enrichis ---
interface AiTool {
    id: number;
    name: string;
    shortDesc: string;
    category: string;
    sector: string;
    priceType: 'Gratuit' | 'Freemium' | 'Payant'; // Nouveau
    upvotes: number;
    isTrending: boolean;
    isNew: boolean;
    logo: string;
    features?: string[]; // Pour le comparateur
}

// Simulation de données avec Prix
const allAiTools: AiTool[] = Array.from({ length: 48 }, (_, i) => ({
    id: i + 1,
    name: `Outil IA ${i + 1}`,
    shortDesc: "Une solution intelligente pour optimiser vos workflows et gagner en productivité au quotidien.",
    category: "Technologie",
    sector: ["Banque", "Médecine", "Droit", "Formation"][i % 4],
    priceType: ["Gratuit", "Freemium", "Payant"][i % 3] as any,
    upvotes: Math.floor(Math.random() * 2000),
    isTrending: i % 5 === 0,
    isNew: i % 8 === 0,
    logo: `https://picsum.photos/60/60?random=${i}`,
    features: ["API", "Support 24/7", "Export Cloud"]
}));

const sectorsList = ["Banque", "Médecine", "Droit", "Formation", "Immobilier", "Marketing"];
const priceList = ["Gratuit", "Freemium", "Payant"];

export default function AiToolsListPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState<number[]>([]);
    const [compareList, setCompareList] = useState<AiTool[]>([]); // Comparateur
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'trending' | 'new'>('all');
    const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
    const [selectedPrices, setSelectedPrices] = useState<string[]>([]); // Filtre Prix
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const saved = localStorage.getItem('user-favs');
        if (saved) setFavorites(JSON.parse(saved));
    }, []);

    const toggleFavorite = (id: number) => {
        const newFavs = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
        setFavorites(newFavs);
        localStorage.setItem('user-favs', JSON.stringify(newFavs));
    };

    const toggleCompare = (tool: AiTool) => {
        if (compareList.find(t => t.id === tool.id)) {
            setCompareList(compareList.filter(t => t.id !== tool.id));
        } else if (compareList.length < 3) {
            setCompareList([...compareList, tool]);
        }
    };

    const handleSectorChange = (sector: string) => {
        setSelectedSectors(prev => prev.includes(sector) ? prev.filter(s => s !== sector) : [...prev, sector]);
        setCurrentPage(1);
    };

    const handlePriceChange = (price: string) => {
        setSelectedPrices(prev => prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]);
        setCurrentPage(1);
    };

    const filteredTools = useMemo(() => {
        let result = allAiTools.filter(tool => {
            const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSector = selectedSectors.length === 0 || selectedSectors.includes(tool.sector);
            const matchesPrice = selectedPrices.length === 0 || selectedPrices.includes(tool.priceType);
            return matchesSearch && matchesSector && matchesPrice;
        });
        if (activeTab === 'popular') result.sort((a, b) => b.upvotes - a.upvotes);
        if (activeTab === 'trending') result = result.filter(t => t.isTrending);
        if (activeTab === 'new') result = result.filter(t => t.isNew);
        return result;
    }, [searchTerm, selectedSectors, selectedPrices, activeTab]);

    const totalPages = Math.ceil(filteredTools.length / itemsPerPage);
    const paginatedTools = filteredTools.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="relative min-h-screen bg-white">
            {/* Grille & Glow Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-primary/10 rounded-full blur-[120px] -z-10" />
            </div>

            <div className="relative z-10 pt-32 md:pt-40">
                
                {/* Hero Section */}
                 <div className="max-w-7xl mx-auto px-6 mb-16">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6">
                        Annuaire des <span className="text-primary">IA par secteur.</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">
                        Explorez les solutions d'intelligence artificielle qui dominent le marché. 
                        Sélectionnez votre industrie et trouvez l'outil parfait.
                    </p>
                </div>

                {/* Barre de Recherche Sticky */}
                <div className="sticky top-18 z-40 w-full bg-white/70 backdrop-blur-md border-y border-slate-100 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200 w-full md:w-auto overflow-x-auto no-scrollbar">
                            {['all', 'popular', 'trending', 'new'].map(id => (
                                <button 
                                    key={id} 
                                    onClick={() => setActiveTab(id as any)}
                                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === id ? 'bg-white shadow-sm text-primary ring-1 ring-slate-200' : 'text-slate-500'}`}
                                >
                                    {id === 'all' ? 'Tous' : id === 'popular' ? 'Populaires' : id === 'trending' ? 'En vogue' : 'Nouveautés'}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-100">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" placeholder="Rechercher..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none" onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-16">
                    
                    {/* Sidebar Filtres */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="sticky top-44 space-y-10">
                            {/* Secteurs */}
                            <div>
                                <h3 className="font-black text-slate-400 mb-8 uppercase text-[10px] tracking-[0.2em]">Secteurs</h3>
                                <div className="space-y-4">
                                    {sectorsList.map(sector => (
                                        <label key={sector} className="flex items-center group cursor-pointer">
                                            <input type="checkbox" checked={selectedSectors.includes(sector)} onChange={() => handleSectorChange(sector)} className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-md checked:bg-primary transition-all" />
                                            <span className="ml-4 text-sm font-bold text-slate-500 peer-checked:text-primary">{sector}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {/* Prix */}
                            <div>
                                <h3 className="font-black text-slate-400 mb-8 uppercase text-[10px] tracking-[0.2em]">Prix</h3>
                                <div className="space-y-4">
                                    {priceList.map(price => (
                                        <label key={price} className="flex items-center group cursor-pointer">
                                            <input type="checkbox" checked={selectedPrices.includes(price)} onChange={() => handlePriceChange(price)} className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-md checked:bg-primary transition-all" />
                                            <span className="ml-4 text-sm font-bold text-slate-500 peer-checked:text-primary">{price}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Grille */}
                    <main className="grow">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {paginatedTools.map((tool, index) => (
                                <div key={tool.id} className="group relative flex flex-col bg-white border border-slate-100 rounded-[2.5rem] p-7 hover:border-primary/30 hover:shadow-xl transition-all duration-500">
                                    {/* Rang # */}
                                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center font-black text-xs shadow-sm z-10">
                                        #{ (currentPage - 1) * itemsPerPage + index + 1 }
                                    </div>

                                    <div className="flex justify-between items-start mb-8">
                                        <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden border border-slate-50">
                                            <Image src={tool.logo} alt={tool.name} width={64} height={64} />
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => toggleCompare(tool)} className={`p-2.5 rounded-full transition-all ${compareList.find(t => t.id === tool.id) ? 'bg-primary text-white' : 'bg-slate-50 text-slate-300'}`}>
                                                <Scale className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => toggleFavorite(tool.id)} className={`p-2.5 rounded-full transition-all ${favorites.includes(tool.id) ? 'bg-red-50 text-red-500' : 'bg-slate-50'}`}>
                                                <Heart className={`w-5 h-5 ${favorites.includes(tool.id) ? 'fill-current' : ''}`} />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2 mb-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-lg">
                                            {tool.sector}
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 px-3 py-1 rounded-lg">
                                            {tool.priceType}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black mb-3">{tool.name}</h3>
                                    <p className="text-[15px] text-slate-500 leading-relaxed mb-8 grow">{tool.shortDesc}</p>

                                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                        <div className="flex items-center gap-1.5 text-green-600 font-bold text-xs">
                                            <TrendingUp className="w-4 h-4" /> {tool.upvotes}
                                        </div>
                                        <Link href={`/liste/${tool.id}`} className="flex items-center justify-center w-12 h-12 bg-slate-900 text-white rounded-2xl hover:bg-primary transition-all">
                                            <ChevronRight className="w-6 h-6" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-24 flex items-center justify-center gap-6">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} className="p-4 rounded-2xl border border-slate-200 disabled:opacity-20"><ChevronLeft /></button>
                            <span className="font-black">Page {currentPage} / {totalPages}</span>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} className="p-4 rounded-2xl border border-slate-200 disabled:opacity-20"><ChevronRight /></button>
                        </div>
                    </main>
                </div>
            </div>

            {/* 📊 BARRE FLOTTANTE COMPARATEUR */}
            {compareList.length > 0 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl bg-slate-900 text-white rounded-3xl p-4 shadow-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {compareList.map(t => (
                                <img key={t.id} src={t.logo} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-white" />
                            ))}
                        </div>
                        <p className="text-sm font-bold">{compareList.length}/3 outils</p>
                    </div>
                    <button onClick={() => setIsCompareModalOpen(true)} className="px-6 py-2 bg-primary rounded-xl font-black text-sm">Comparer</button>
                </div>
            )}
        </div>
    );
}