"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Heart, Share2, Download, Star, Check, Zap,
  Shield, Clock, Users, ExternalLink, ChevronRight, Play,
  FileText, CheckCircle2, AlertCircle, Sparkles, Crown,
  TrendingUp, Award
} from "lucide-react";

export default function WorkflowDetailPage({ params }: any) {
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "guide" | "reviews">("overview");

  const workflow = {
    id: "1",
    title: "Automatisation Lead Enrichment + CRM",
    tagline: "Enrichissez et synchronisez vos leads automatiquement",
    description: "Ce workflow automatise l'enrichissement de vos leads via Apollo.io et les synchronise directement dans HubSpot. Chaque nouveau lead est enrichi avec des données professionnelles (email, téléphone, entreprise, poste) puis ajouté à votre CRM avec notification Slack.",
    platform: "N8N",
    category: "Ventes",
    sector: "SaaS",
    price: 29,
    isFree: false,
    rating: 4.9,
    reviews: 156,
    usageCount: 1240,
    thumbnail: "https://picsum.photos/1400/600?random=100",
    apps: [
      { name: "Apollo.io", logo: "https://picsum.photos/60/60?random=1", role: "Enrichissement données" },
      { name: "HubSpot", logo: "https://picsum.photos/60/60?random=2", role: "CRM" },
      { name: "Slack", logo: "https://picsum.photos/60/60?random=3", role: "Notifications" },
    ],
    contributor: {
      id: "sophie-martin",
      name: "Sophie Martin",
      avatar: "https://picsum.photos/100/100?random=10",
      verified: true,
      role: "Expert Automation",
      totalWorkflows: 24,
      totalStudents: 3400,
    },
    features: [
      "Enrichissement automatique via Apollo API",
      "Synchronisation bidirectionnelle HubSpot",
      "Notifications Slack en temps réel",
      "Gestion des doublons intelligente",
      "Logs et rapports détaillés",
      "Support multi-pipelines",
    ],
    requirements: [
      "Compte N8N (gratuit ou payant)",
      "API Key Apollo.io",
      "Compte HubSpot avec accès API",
      "Webhook Slack (optionnel)",
    ],
    steps: [
      {
        title: "Télécharger le workflow",
        desc: "Cliquez sur le bouton de téléchargement pour obtenir le fichier JSON",
        icon: Download,
      },
      {
        title: "Importer dans N8N",
        desc: "Ouvrez N8N, allez dans Workflows > Import from File et sélectionnez le JSON",
        icon: FileText,
      },
      {
        title: "Configurer les credentials",
        desc: "Ajoutez vos API keys Apollo, HubSpot et Slack dans les nodes correspondants",
        icon: Shield,
      },
      {
        title: "Tester le workflow",
        desc: "Lancez un test avec un lead fictif pour vérifier que tout fonctionne",
        icon: Play,
      },
      {
        title: "Activer l'automatisation",
        desc: "Activez le workflow et profitez de l'automatisation complète",
        icon: Zap,
      },
    ],
    stats: [
      { label: "Temps gagné", value: "15h/mois", icon: Clock },
      { label: "Taux de succès", value: "98%", icon: TrendingUp },
      { label: "Utilisateurs", value: "1.2K+", icon: Users },
      { label: "Note moyenne", value: "4.9/5", icon: Star },
    ],
    isBestseller: true,
  };

  const reviews = [
    { author: "Marc D.", role: "Sales Manager", rating: 5, comment: "Gain de temps énorme ! Plus besoin d'enrichir manuellement les leads. Le workflow est stable et fiable.", avatar: "MD" },
    { author: "Julie R.", role: "Growth Hacker", rating: 5, comment: "Parfait pour notre équipe. La synchronisation HubSpot fonctionne à merveille.", avatar: "JR" },
    { author: "Thomas L.", role: "Founder", rating: 4, comment: "Très bon workflow, quelques ajustements nécessaires pour notre cas mais le support est réactif.", avatar: "TL" },
  ];

  const relatedWorkflows = [
    { id: "2", title: "Pipeline Marketing Automation", price: 0, rating: 4.7, thumbnail: "https://picsum.photos/300/200?random=101" },
    { id: "3", title: "Support Client IA + Ticketing", price: 39, rating: 4.9, thumbnail: "https://picsum.photos/300/200?random=102" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/workflows" className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Retour aux workflows</span>
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

      {/* Hero */}
      <section className="relative bg-neutral-50 border-b border-neutral-200">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-6 py-10 relative">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-black px-3 py-1.5 bg-primary text-black rounded-full uppercase tracking-wider">
                  {workflow.platform}
                </span>
                <span className="text-xs font-black px-3 py-1.5 bg-neutral-200 text-neutral-700 rounded-full uppercase tracking-wider">
                  {workflow.category}
                </span>
                {workflow.isBestseller && (
                  <span className="flex items-center gap-1 text-xs font-black px-3 py-1.5 bg-primary/20 text-primary rounded-full">
                    <Crown size={12} /> Bestseller
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-black mb-3 tracking-tight">{workflow.title}</h1>
              <p className="text-xl text-neutral-600 mb-6 font-medium">{workflow.tagline}</p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-primary fill-primary" />
                  <span className="font-black text-black">{workflow.rating}</span>
                  <span className="text-neutral-500">({workflow.reviews} avis)</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <Download size={18} />
                  <span className="font-bold">{workflow.usageCount} utilisations</span>
                </div>
              </div>

              {/* Apps */}
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3">Applications utilisées</p>
                <div className="flex flex-wrap gap-4">
                  {workflow.apps.map((app, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-neutral-200">
                      <Image src={app.logo} alt={app.name} width={40} height={40} className="rounded-lg" />
                      <div>
                        <p className="font-bold text-sm text-black">{app.name}</p>
                        <p className="text-xs text-neutral-500">{app.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="lg:w-80 w-full">
              <div className="bg-white rounded-2xl border-2 border-neutral-200 p-6 shadow-premium">
                <div className="mb-5">
                  {workflow.isFree ? (
                    <p className="text-3xl font-black text-success">Gratuit</p>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-2 mb-1">
                        <p className="text-3xl font-black text-black">{workflow.price}€</p>
                        <span className="text-neutral-500 font-bold">une fois</span>
                      </div>
                      <p className="text-sm text-neutral-600 font-medium">Accès à vie + mises à jour</p>
                    </>
                  )}
                </div>
                <button className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-black rounded-xl font-black hover:bg-primary-600 transition-all mb-3 shadow-md active:scale-95">
                  <Download size={18} />
                  Télécharger le workflow
                </button>
                <button className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-neutral-200 text-neutral-700 rounded-xl font-bold hover:bg-neutral-50 transition-colors">
                  <Play size={18} />
                  Voir la démo
                </button>
              </div>

              {/* Contributor */}
              <Link href={`/contributors/${workflow.contributor.id}`} className="block mt-6 p-4 bg-neutral-50 rounded-2xl border border-neutral-200 hover:border-primary transition-colors group">
                <p className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3">Créé par</p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <Image src={workflow.contributor.avatar} alt={workflow.contributor.name} width={48} height={48} className="rounded-full" />
                    {workflow.contributor.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-white">
                        <Check size={10} className="text-black" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-black group-hover:text-primary transition-colors">{workflow.contributor.name}</p>
                    <p className="text-xs text-neutral-500 font-medium">{workflow.contributor.role}</p>
                  </div>
                  <ChevronRight size={18} className="text-neutral-400 group-hover:text-primary transition-colors" />
                </div>
                <div className="flex items-center gap-4 text-xs text-neutral-600">
                  <span className="font-semibold">{workflow.contributor.totalWorkflows} workflows</span>
                  <span className="font-semibold">{workflow.contributor.totalStudents} étudiants</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-black text-white py-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {workflow.stats.map((stat, i) => (
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
              { id: "guide", label: "Guide d'installation" },
              { id: "reviews", label: "Avis" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 text-sm font-black border-b-2 transition-colors uppercase tracking-wider ${
                  activeTab === tab.id ? "border-primary text-black" : "border-transparent text-neutral-500 hover:text-black"
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
          <div className="lg:col-span-2 space-y-10">
            {activeTab === "overview" && (
              <>
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 border-2 border-neutral-200 shadow-lg">
                  <Image src={workflow.thumbnail} alt="Preview" fill className="object-cover" />
                </div>

                <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
                  <h2 className="text-2xl font-black text-black mb-4 flex items-center gap-2">
                    <Sparkles size={24} className="text-primary" />
                    Description
                  </h2>
                  <p className="text-neutral-700 leading-relaxed text-lg font-medium">{workflow.description}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-black mb-6">Fonctionnalités incluses</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {workflow.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-3 p-5 bg-white rounded-xl border-2 border-neutral-200">
                        <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-bold text-neutral-800">{f}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={24} className="text-amber-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-black text-black mb-2">Prérequis</h3>
                      <ul className="space-y-2">
                        {workflow.requirements.map((req, i) => (
                          <li key={i} className="text-sm text-neutral-700 font-medium flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "guide" && (
              <div className="space-y-6">
                <div className="bg-primary/10 border-2 border-primary rounded-2xl p-6">
                  <h2 className="text-2xl font-black text-black mb-2 flex items-center gap-2">
                    <FileText size={24} className="text-primary" />
                    Guide d'installation
                  </h2>
                  <p className="text-neutral-600 font-medium">Suivez ces étapes pour installer et configurer le workflow en moins de 10 minutes.</p>
                </div>

                {workflow.steps.map((step, i) => (
                  <div key={i} className="flex gap-6 p-6 bg-white border-2 border-neutral-200 rounded-2xl">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-black font-black text-lg">
                        {i + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <step.icon size={20} className="text-primary" />
                        <h3 className="font-black text-black text-lg">{step.title}</h3>
                      </div>
                      <p className="text-neutral-600 font-medium leading-relaxed">{step.desc}</p>
                    </div>
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
            <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-200">
              <h3 className="font-black text-black mb-5">Workflows similaires</h3>
              <div className="space-y-4">
                {relatedWorkflows.map(w => (
                  <Link key={w.id} href={`/workflows/${w.id}`} className="block group">
                    <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                      <Image src={w.thumbnail} alt={w.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="font-bold text-sm text-black group-hover:text-primary transition-colors mb-1">{w.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-black">{w.price === 0 ? "Gratuit" : `${w.price}€`}</span>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-primary fill-primary" />
                        <span className="text-xs font-bold">{w.rating}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-black to-neutral-900 rounded-2xl p-6 text-white border-2 border-neutral-800">
              <Award size={36} className="text-primary mb-4" />
              <h3 className="font-black text-xl mb-2">Créer un workflow</h3>
              <p className="text-neutral-400 text-sm mb-5 font-medium">Partagez vos automatisations et générez des revenus passifs.</p>
              <button className="w-full py-3 bg-primary text-black rounded-xl font-black hover:bg-primary-600 transition-colors shadow-lg">
                Devenir contributeur
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
