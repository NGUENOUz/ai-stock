"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Heart, Share2, ExternalLink, Star, TrendingUp,
  Check, Zap, Shield, Globe, Users, Award, Sparkles,
  ChevronRight, Play, Clock, Target, BarChart3, Rocket,
  CheckCircle2, Download, Code, Headphones, Lock, Gauge
} from "lucide-react";

export default function AiToolDetailPage({ params }: any) {
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "reviews">("overview");

  const tool = {
    id: 1,
    name: "StockPredict AI",
    tagline: "Prédictions financières alimentées par l'IA",
    category: "Finance & Trading",
    description: "StockPredict AI utilise des algorithmes de deep learning avancés pour analyser les marchés financiers en temps réel et fournir des prédictions précises. Conçu pour les traders professionnels et les investisseurs qui recherchent un avantage compétitif sur les marchés.",
    logo: "https://picsum.photos/120/120?random=1",
    banner: "https://picsum.photos/1400/600?random=11",
    pricing: "Freemium",
    priceDetails: "Gratuit jusqu'à 100 requêtes/mois",
    priceMonthly: "29€",
    website: "https://stockpredict.ai",
    rating: 4.8,
    reviews: 1240,
    upvotes: 3420,
    users: "50K+",
    verified: true,
    features: [
      { title: "Analyse temps réel", desc: "Données actualisées chaque seconde", icon: Zap },
      { title: "Prédictions IA", desc: "Modèles entraînés sur 10 ans", icon: Sparkles },
      { title: "Alertes intelligentes", desc: "Notifications personnalisées", icon: TrendingUp },
      { title: "API complète", desc: "Intégration facile", icon: Globe },
      { title: "Sécurité bancaire", desc: "Chiffrement militaire", icon: Shield },
      { title: "Support 24/7", desc: "Équipe disponible", icon: Users },
    ],
    highlights: [
      "Précision de 87% sur les prédictions à court terme",
      "Utilisé par plus de 500 institutions financières",
      "Couverture de 50+ marchés internationaux",
      "Mises à jour en temps réel sans latence",
      "Interface intuitive et personnalisable",
      "Historique complet des performances",
    ],
    useCases: [
      { title: "Trading algorithmique", desc: "Automatisez vos stratégies de trading avec des signaux IA précis", icon: Target },
      { title: "Gestion de portefeuille", desc: "Optimisez vos investissements grâce à l'analyse prédictive", icon: BarChart3 },
      { title: "Analyse de risque", desc: "Évaluez les risques en temps réel et protégez votre capital", icon: Shield },
    ],
    stats: [
      { label: "Utilisateurs actifs", value: "50K+", icon: Users },
      { label: "Précision moyenne", value: "87%", icon: Target },
      { label: "Marchés couverts", value: "50+", icon: Globe },
      { label: "Uptime", value: "99.9%", icon: Gauge },
    ],
    benefits: [
      { icon: CheckCircle2, text: "Accès complet à l'API" },
      { icon: Download, text: "Export des données illimité" },
      { icon: Code, text: "Documentation complète" },
      { icon: Headphones, text: "Support prioritaire" },
      { icon: Lock, text: "Sécurité de niveau bancaire" },
      { icon: Rocket, text: "Mises à jour gratuites" },
    ],
  };

  const similarTools = [
    { id: 2, name: "CryptoRadar", category: "Crypto", logo: "https://picsum.photos/80/80?random=20", rating: 4.6, users: "30K+" },
    { id: 3, name: "EquityMind", category: "Actions", logo: "https://picsum.photos/80/80?random=21", rating: 4.7, users: "25K+" },
    { id: 4, name: "InvestoBot", category: "Automation", logo: "https://picsum.photos/80/80?random=22", rating: 4.5, users: "20K+" },
  ];

  const reviews = [
    { author: "Sophie M.", role: "Trader Pro", rating: 5, comment: "Incroyable précision, j'ai augmenté mes gains de 40% en 3 mois. L'interface est intuitive et les alertes arrivent au bon moment.", avatar: "SM" },
    { author: "Marc D.", role: "Investisseur", rating: 5, comment: "L'interface est intuitive et les alertes sont très pertinentes. Le support client est réactif et professionnel.", avatar: "MD" },
    { author: "Julie R.", role: "Analyste", rating: 4, comment: "Excellent outil, quelques fonctionnalités manquent encore mais l'équipe est à l'écoute des retours.", avatar: "JR" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header fixe */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/liste" className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Retour à la liste</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2.5 rounded-xl transition-all ${isLiked ? "bg-red-50 text-red-500" : "bg-neutral-100 text-neutral-400 hover:bg-neutral-200"}`}
            >
              <Heart size={18} className={isLiked ? "fill-current" : ""} />
            </button>
            <button className="p-2.5 rounded-xl bg-neutral-100 text-neutral-400 hover:bg-neutral-200 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-neutral-50 border-b border-neutral-200">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-6 py-10 relative">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Logo & Info */}
            <div className="flex gap-6 items-start flex-1">
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl bg-white shadow-lg border-2 border-neutral-200 overflow-hidden flex-shrink-0">
                  <Image src={tool.logo} alt={tool.name} width={112} height={112} className="object-cover" />
                </div>
                {tool.verified && (
                  <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-primary rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <Check size={16} className="text-black font-bold" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-black px-3 py-1.5 bg-primary text-black rounded-full uppercase tracking-wider">
                    {tool.category}
                  </span>
                  <span className="text-xs font-black px-3 py-1.5 bg-success-light text-success-dark rounded-full uppercase tracking-wider">
                    {tool.pricing}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-black mb-3 tracking-tight">{tool.name}</h1>
                <p className="text-xl text-neutral-600 mb-5 font-medium">{tool.tagline}</p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Star size={18} className="text-primary fill-primary" />
                    <span className="font-black text-black">{tool.rating}</span>
                    <span className="text-neutral-500">({tool.reviews} avis)</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Users size={18} />
                    <span className="font-bold">{tool.users} utilisateurs</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600">
                    <TrendingUp size={18} />
                    <span className="font-bold">{tool.upvotes} votes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="lg:w-80 w-full">
              <div className="bg-white rounded-2xl border-2 border-neutral-200 p-6 shadow-premium">
                <div className="mb-5">
                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-bold mb-2">Tarification</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <p className="text-3xl font-black text-black">{tool.priceMonthly}</p>
                    <span className="text-neutral-500 font-bold">/mois</span>
                  </div>
                  <p className="text-sm text-neutral-600 font-medium">{tool.priceDetails}</p>
                </div>
                <a
                  href={tool.website}
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-black rounded-xl font-black hover:bg-primary-600 transition-all mb-3 shadow-md active:scale-95"
                >
                  Essayer gratuitement
                  <ExternalLink size={18} />
                </a>
                <button className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-neutral-200 text-neutral-700 rounded-xl font-bold hover:bg-neutral-50 transition-colors">
                  <Play size={18} />
                  Voir la démo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-black text-white py-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tool.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <stat.icon size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-neutral-200 sticky top-16 bg-white z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: "overview", label: "Vue d'ensemble" },
              { id: "features", label: "Fonctionnalités" },
              { id: "reviews", label: "Avis" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 text-sm font-black border-b-2 transition-colors uppercase tracking-wider ${
                  activeTab === tab.id
                    ? "border-primary text-black"
                    : "border-transparent text-neutral-500 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {activeTab === "overview" && (
              <>
                {/* Banner */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 border-2 border-neutral-200 shadow-lg">
                  <Image src={tool.banner} alt="Preview" fill className="object-cover" />
                </div>

                {/* Description */}
                <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
                  <h2 className="text-2xl font-black text-black mb-4 flex items-center gap-2">
                    <Sparkles size={24} className="text-primary" />
                    À propos de {tool.name}
                  </h2>
                  <p className="text-neutral-700 leading-relaxed text-lg font-medium">{tool.description}</p>
                </div>

                {/* Highlights */}
                <div>
                  <h2 className="text-2xl font-black text-black mb-6">Points forts</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {tool.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3 p-5 bg-white rounded-xl border-2 border-neutral-200 hover:border-primary transition-colors">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={14} className="text-black font-bold" />
                        </div>
                        <p className="text-sm font-bold text-neutral-800">{h}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Use Cases */}
                <div>
                  <h2 className="text-2xl font-black text-black mb-6">Cas d'usage</h2>
                  <div className="space-y-4">
                    {tool.useCases.map((uc, i) => (
                      <div key={i} className="p-6 bg-white border-2 border-neutral-200 rounded-2xl hover:shadow-lg transition-all group">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                            <uc.icon size={22} className="text-primary group-hover:text-black transition-colors" />
                          </div>
                          <div>
                            <h3 className="font-black text-black mb-2">{uc.title}</h3>
                            <p className="text-sm text-neutral-600 font-medium">{uc.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits Grid */}
                <div className="bg-black text-white rounded-2xl p-8">
                  <h2 className="text-2xl font-black mb-6">Inclus dans l'abonnement</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {tool.benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <b.icon size={20} className="text-primary flex-shrink-0" />
                        <span className="text-sm font-bold">{b.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "features" && (
              <div className="grid md:grid-cols-2 gap-6">
                {tool.features.map((f, i) => (
                  <div key={i} className="p-6 bg-white border-2 border-neutral-200 rounded-2xl hover:shadow-lg hover:border-primary transition-all">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                      <f.icon size={26} className="text-primary" />
                    </div>
                    <h3 className="font-black text-black mb-2 text-lg">{f.title}</h3>
                    <p className="text-sm text-neutral-600 font-medium">{f.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {reviews.map((r, i) => (
                  <div key={i} className="p-6 bg-white border-2 border-neutral-200 rounded-2xl">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center text-black font-black text-lg flex-shrink-0">
                        {r.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-black text-black">{r.author}</p>
                            <p className="text-sm text-neutral-500 font-medium">{r.role}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: r.rating }).map((_, i) => (
                              <Star key={i} size={16} className="text-primary fill-primary" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-neutral-700 font-medium leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Similar Tools */}
            <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-200">
              <h3 className="font-black text-black mb-5 flex items-center gap-2">
                <Sparkles size={20} className="text-primary" />
                Outils similaires
              </h3>
              <div className="space-y-3">
                {similarTools.map(st => (
                  <Link key={st.id} href={`/liste/${st.id}`} className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-all border border-neutral-200 hover:border-primary group">
                    <Image src={st.logo} alt={st.name} width={48} height={48} className="rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-black truncate group-hover:text-primary transition-colors">{st.name}</p>
                      <p className="text-xs text-neutral-500 font-medium">{st.category}</p>
                    </div>
                    <ChevronRight size={18} className="text-neutral-400 group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-black to-neutral-900 rounded-2xl p-6 text-white border-2 border-neutral-800">
              <Award size={36} className="text-primary mb-4" />
              <h3 className="font-black text-xl mb-2">Vous avez un outil IA ?</h3>
              <p className="text-neutral-400 text-sm mb-5 font-medium">Référencez-le gratuitement et gagnez en visibilité auprès de milliers d'utilisateurs.</p>
              <button className="w-full py-3 bg-primary text-black rounded-xl font-black hover:bg-primary-600 transition-colors shadow-lg">
                Ajouter mon outil
              </button>
            </div>

            {/* Trust Badge */}
            <div className="bg-white rounded-2xl p-6 border-2 border-neutral-200">
              <div className="flex items-center gap-3 mb-3">
                <Shield size={24} className="text-primary" />
                <h4 className="font-black text-black">Sécurité garantie</h4>
              </div>
              <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                Tous les outils sont vérifiés par notre équipe. Paiements sécurisés et données chiffrées.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
