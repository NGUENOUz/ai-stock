"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    Search, Heart, TrendingUp, Sparkles, Clock, 
    ChevronRight, LayoutGrid, Flame, ChevronLeft,
    Scale, X, Check, Minus, PlusCircle
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { AiTool } from '@/types/type';

// --- Types ---
interface LocalTool {
    id: string;
    name: string;
    shortDesc: string;
    category: string;
    sector: string;
    priceType: string;
    upvotes: number;
    isTrending: boolean;
    isNew: boolean;
    logo: string;
    features: string[]; 
}

const sectorsList = ["Banque", "Médecine", "Droit", "Formation", "Immobilier", "Marketing"];
const priceList = ["Gratuit", "Freemium", "Payant"];

export default function AiToolsListPage() {
    const [allAiTools, setAllAiTools] = useState<LocalTool[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState<string[]>([]);
    const [compareList, setCompareList] = useState<LocalTool[]>([]); 
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'trending' | 'new'>('all');
    const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
    const [selectedPrices, setSelectedPrices] = useState<string[]>([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const saved = localStorage.getItem('user-favs');
        if (saved) setFavorites(JSON.parse(saved));

        async function fetchTools() {
            try {
                setLoading(true);
                setError(null);
                const result = await apiClient.getTools({ limit: 100 });
                const mapped: LocalTool[] = result.data.map(tool => ({
                    id: tool.id,
                    name: tool.name,
                    shortDesc: tool.description_short || 'Aucune description',
                    category: tool.categories?.[0] || 'Non catégorisé',
                    sector: tool.categories?.[0] || 'Autre',
                    priceType: tool.pricing_type || 'Gratuit',
                    upvotes: 0,
                    isTrending: tool.is_featured || false,
                    isNew: false,
                    logo: tool.logo_url || 'https://via.placeholder.com/60',
                    features: []
                }));
                setAllAiTools(mapped);
            } catch (err: any) {
                console.error('Erreur chargement outils:', err);
                setError(err.message || 'Erreur lors du chargement');
            } finally {
                setLoading(false);
            }
        }
        fetchTools();
    }, []);

    const toggleFavorite = (id: string) => {
        const newFavs = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
        setFavorites(newFavs);
        localStorage.setItem('user-favs', JSON.stringify(newFavs));
    };

    const toggleCompare = (tool: LocalTool) => {
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
    }, [searchTerm, selectedSectors, selectedPrices, activeTab, allAiTools]);

    const totalPages = Math.ceil(filteredTools.length / itemsPerPage);
    const paginatedTools = filteredTools.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="relative min-h-screen bg-white">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
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
                {/* Search Bar */}
                <div className="sticky top-[72px] z-40 w-full bg-white/70 backdrop-blur-md border-y border-slate-100 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200 w-full md:w-auto overflow-x-auto no-scrollbar">
                            {['all', 'popular', 'trending', 'new'].map(id => (
                                <button key={id} onClick={() => setActiveTab(id as any)} className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === id ? 'bg-white shadow-sm text-primary ring-1 ring-slate-200' : 'text-slate-500'}`}>
                                    {id === 'all' ? 'Tous' : id === 'popular' ? 'Populaires' : id === 'trending' ? 'En vogue' : 'Nouveautés'}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-[400px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" placeholder="Rechercher un outil..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none" onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-16">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="sticky top-44 space-y-10">
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
                        {loading && (
                            <div className="flex justify-center items-center min-h-[400px]">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        )}
                        {error && (
                            <div className="text-center text-red-500 py-12">
                                <p className="font-bold mb-2">Erreur lors du chargement</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        {!loading && !error && allAiTools.length === 0 && (
                            <div className="text-center text-slate-500 py-12">Aucun outil disponible</div>
                        )}
                        {!loading && !error && allAiTools.length > 0 && (
                        <>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {paginatedTools.map((tool, index) => (
                                <Link key={tool.id} href={`/liste/${tool.id}`} className="group relative flex flex-col bg-white border border-slate-200 rounded-3xl p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                                    {/* Badge numéro */}
                                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary text-slate-900 rounded-full flex items-center justify-center font-black text-xs shadow-lg z-10">
                                        #{(currentPage - 1) * itemsPerPage + index + 1}
                                    </div>

                                    {/* Header avec logo et actions */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm group-hover:border-primary/30 transition-all">
                                            <Image src={tool.logo} alt={tool.name} width={64} height={64} className="object-cover" />
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={(e) => { e.preventDefault(); toggleCompare(tool); }} 
                                                className={`p-2 rounded-xl transition-all ${compareList.find(t => t.id === tool.id) ? 'bg-primary text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                                            >
                                                <Scale className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={(e) => { e.preventDefault(); toggleFavorite(tool.id); }} 
                                                className={`p-2 rounded-xl transition-all ${favorites.includes(tool.id) ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                                            >
                                                <Heart className={`w-4 h-4 ${favorites.includes(tool.id) ? 'fill-current' : ''}`} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Badges catégorie et prix */}
                                    <div className="flex gap-2 mb-4">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
                                            {tool.sector}
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                                            {tool.priceType}
                                        </span>
                                    </div>

                                    {/* Titre */}
                                    <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-primary transition-colors">
                                        {tool.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2 grow">
                                        {tool.shortDesc}
                                    </p>

                                    {/* Footer avec stats */}
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className="flex items-center gap-1.5 text-green-600 font-bold text-xs">
                                            <TrendingUp className="w-4 h-4" />
                                            {tool.upvotes}
                                        </div>
                                        <div className="flex items-center justify-center w-10 h-10 bg-slate-900 text-white rounded-xl group-hover:bg-primary transition-all">
                                            <ChevronRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-16 flex items-center justify-center gap-4">
                            <button 
                                disabled={currentPage === 1} 
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
                                className="p-3 rounded-xl border-2 border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:border-primary hover:bg-primary/5 active:scale-95"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="font-black text-slate-900 px-4">Page {currentPage} / {totalPages}</span>
                            <button 
                                disabled={currentPage === totalPages} 
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
                                className="p-3 rounded-xl border-2 border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:border-primary hover:bg-primary/5 active:scale-95"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                        </>
                        )}
                    </main>
                </div>

                {/* 🚀 BLOC AJOUTER UN OUTIL (Avant Footer) */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="relative bg-slate-900 rounded-[3rem] p-12 md:p-20 overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] -mr-48 -mt-48" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-xl text-center md:text-left">
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                                    Vous avez créé une <span className="text-primary">solution IA ?</span>
                                </h2>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    Rejoignez plus de 500 outils déjà référencés et augmentez votre visibilité auprès des professionnels de votre secteur.
                                </p>
                            </div>
                            <button className="group flex items-center gap-4 bg-white text-slate-900 px-8 py-5 rounded-2xl font-black text-lg hover:bg-primary hover:text-white transition-all">
                                <PlusCircle className="w-6 h-6" />
                                Ajouter mon outil
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* 📊 BARRE FLOTTANTE COMPARATEUR */}
            {compareList.length > 0 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl bg-slate-900 text-white rounded-3xl p-4 shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom-10">
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {compareList.map(t => (
                                <img key={t.id} src={t.logo} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-white object-cover" />
                            ))}
                        </div>
                        <p className="text-sm font-bold">{compareList.length} / 3 outils</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setCompareList([])} className="text-xs font-bold text-slate-400 hover:text-white">Vider</button>
                        <button onClick={() => setIsCompareModalOpen(true)} className="px-6 py-2 bg-primary rounded-xl font-black text-sm hover:scale-105 transition-transform">Comparer</button>
                    </div>
                </div>
            )}

            {/* 🏁 MODAL COMPARATEUR FONCTIONNEL */}
            {isCompareModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsCompareModalOpen(false)} />
                    <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b flex justify-between items-center">
                            <h2 className="text-2xl font-black">Comparaison des outils</h2>
                            <button onClick={() => setIsCompareModalOpen(false)} className="p-3 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"><X className="w-6 h-6" /></button>
                        </div>
                        <div className="overflow-auto p-8">
                            <table className="w-full text-left">
                                <thead>
                                    <tr>
                                        <th className="pb-6 border-b text-slate-400 text-[10px] uppercase tracking-widest">Fonctionnalités</th>
                                        {compareList.map(t => (
                                            <th key={t.id} className="pb-6 border-b px-6 min-w-[200px]">
                                                <div className="flex items-center gap-3">
                                                    <img src={t.logo} className="w-10 h-10 rounded-xl" />
                                                    <span className="font-black text-slate-900">{t.name}</span>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    <tr>
                                        <td className="py-6 font-bold text-slate-900 text-sm">Modèle Prix</td>
                                        {compareList.map(t => <td key={t.id} className="py-6 px-6 text-sm font-bold text-primary">{t.priceType}</td>)}
                                    </tr>
                                    <tr>
                                        <td className="py-6 font-bold text-slate-900 text-sm">Secteur</td>
                                        {compareList.map(t => <td key={t.id} className="py-6 px-6 text-sm text-slate-500">{t.sector}</td>)}
                                    </tr>
                                    {["API", "Support 24/7", "Export Cloud", "Mobile App"].map(feature => (
                                        <tr key={feature}>
                                            <td className="py-6 font-bold text-slate-900 text-sm">{feature}</td>
                                            {compareList.map(t => (
                                                <td key={t.id} className="py-6 px-6">
                                                    {t.features.includes(feature) ? <Check className="w-5 h-5 text-green-500" /> : <Minus className="w-5 h-5 text-slate-200" />}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}