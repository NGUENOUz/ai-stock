"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Star, MapPin, Calendar, ExternalLink, Check,
  Zap, BookOpen, Sparkles, Award, Users, TrendingUp, Crown,
  Download, MessageCircle, Share2
} from "lucide-react";

export default function ContributorProfilePage({ params }: any) {
  const [activeTab, setActiveTab] = useState<"workflows" | "formations" | "prompts">("workflows");

  const contributor = {
    id: "sophie-martin",
    name: "Sophie Martin",
    avatar: "https://picsum.photos/200/200?random=10",
    cover: "https://picsum.photos/1400/400?random=50",
    verified: true,
    role: "Expert Automation & IA",
    bio: "Passionnée par l'automatisation et l'IA, j'aide les entreprises à gagner du temps grâce à des workflows intelligents. Spécialisée en N8N, Zapier et Make avec +5 ans d'expérience.",
    location: "Paris, France",
    joinedDate: "Janvier 2022",
    website: "https://sophiemartin.com",
    stats: [
      { label: "Workflows", value: "24", icon: Zap },
      { label: "Formations", value: "8", icon: BookOpen },
      { label: "Étudiants", value: "3.4K", icon: Users },
      { label: "Note moyenne", value: "4.9", icon: Star },
    ],
    badges: [
      { name: "Top Contributeur", icon: Crown, color: "text-primary bg-primary/10" },
      { name: "Expert Vérifié", icon: Check, color: "text-success bg-success-light" },
      { name: "Bestseller", icon: TrendingUp, color: "text-purple bg-purple-light" },
    ],
  };

  const workflows = [
    {
      id: "1",
      title: "Lead Enrichment + CRM",
      platform: "N8N",
      price: 29,
      rating: 4.9,
      downloads: 1240,
      thumbnail: "https://picsum.photos/400/250?random=100",
    },
    {
      id: "2",
      title: "Support Client IA",
      platform: "N8N",
      price: 39,
      rating: 4.9,
      downloads: 1100,
      thumbnail: "https://picsum.photos/400/250?random=101",
    },
    {
      id: "3",
      title: "Marketing Automation",
      platform: "Zapier",
      price: 0,
      rating: 4.7,
      downloads: 890,
      thumbnail: "https://picsum.photos/400/250?random=102",
    },
  ];

  const formations = [
    {
      id: "1",
      title: "Maîtriser N8N de A à Z",
      students: 1200,
      rating: 4.9,
      price: 99,
      thumbnail: "https://picsum.photos/400/250?random=200",
      duration: "8h 30min",
    },
    {
      id: "2",
      title: "Automatisation No-Code Avancée",
      students: 850,
      rating: 4.8,
      price: 149,
      thumbnail: "https://picsum.photos/400/250?random=201",
      duration: "12h 15min",
    },
  ];

  const prompts = [
    {
      id: "1",
      title: "Pack 50 Prompts Automation",
      downloads: 2400,
      rating: 4.8,
      price: 19,
      thumbnail: "https://picsum.photos/400/250?random=300",
    },
    {
      id: "2",
      title: "Prompts N8N + GPT-4",
      downloads: 1800,
      rating: 4.9,
      price: 0,
      thumbnail: "https://picsum.photos/400/250?random=301",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/workflows" className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Retour</span>
          </Link>
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-xl bg-neutral-100 text-neutral-400 hover:bg-neutral-200 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Cover */}
      <div className="relative h-64 bg-neutral-100">
        <Image src={contributor.cover} alt="Cover" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative -mt-20 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            {/* Avatar */}
            <div className="relative">
              <div className="w-40 h-40 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-white">
                <Image src={contributor.avatar} alt={contributor.name} width={160} height={160} className="object-cover" />
              </div>
              {contributor.verified && (
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Check size={20} className="text-black font-bold" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border-2 border-neutral-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-black text-black mb-1">{contributor.name}</h1>
                  <p className="text-lg text-neutral-600 font-semibold">{contributor.role}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-6 py-3 bg-primary text-black rounded-xl font-black hover:bg-primary-600 transition-all shadow-md">
                    <MessageCircle size={18} className="inline mr-2" />
                    Contacter
                  </button>
                  {contributor.website && (
                    <a
                      href={contributor.website}
                      target="_blank"
                      className="p-3 border-2 border-neutral-200 rounded-xl hover:border-primary transition-colors"
                    >
                      <ExternalLink size={18} className="text-neutral-600" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-neutral-700 leading-relaxed mb-4 font-medium">{contributor.bio}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  <span className="font-semibold">{contributor.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  <span className="font-semibold">Membre depuis {contributor.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {contributor.stats.map((stat, i) => (
            <div key={i} className="bg-white border-2 border-neutral-200 rounded-2xl p-6 text-center hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <stat.icon size={24} className="text-primary" />
              </div>
              <p className="text-3xl font-black text-black mb-1">{stat.value}</p>
              <p className="text-sm font-bold text-neutral-500 uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 mb-12">
          {contributor.badges.map((badge, i) => (
            <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm ${badge.color}`}>
              <badge.icon size={16} />
              {badge.name}
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-neutral-200 mb-8">
          <div className="flex gap-8">
            {[
              { id: "workflows", label: "Workflows", count: workflows.length },
              { id: "formations", label: "Formations", count: formations.length },
              { id: "prompts", label: "Prompts", count: prompts.length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 text-sm font-black border-b-2 transition-colors uppercase tracking-wider ${
                  activeTab === tab.id ? "border-primary text-black" : "border-transparent text-neutral-500 hover:text-black"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="pb-16">
          {activeTab === "workflows" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflows.map(w => (
                <Link
                  key={w.id}
                  href={`/workflows/${w.id}`}
                  className="group bg-white border-2 border-neutral-200 rounded-2xl overflow-hidden hover:border-primary hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 bg-neutral-100">
                    <Image src={w.thumbnail} alt={w.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-black px-3 py-1.5 bg-white/90 backdrop-blur-sm text-black rounded-full">
                        {w.platform}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black text-black mb-3 group-hover:text-primary transition-colors">
                      {w.title}
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-primary fill-primary" />
                        <span className="text-sm font-bold">{w.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-neutral-500">
                        <Download size={14} />
                        <span className="text-sm font-bold">{w.downloads}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-neutral-100">
                      {w.price === 0 ? (
                        <span className="text-lg font-black text-success">Gratuit</span>
                      ) : (
                        <span className="text-2xl font-black text-black">{w.price}€</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === "formations" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formations.map(f => (
                <Link
                  key={f.id}
                  href={`/formations/${f.id}`}
                  className="group bg-white border-2 border-neutral-200 rounded-2xl overflow-hidden hover:border-primary hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 bg-neutral-100">
                    <Image src={f.thumbnail} alt={f.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black text-black mb-3 group-hover:text-primary transition-colors">
                      {f.title}
                    </h3>
                    <div className="flex items-center justify-between mb-4 text-sm text-neutral-600">
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span className="font-bold">{f.students} étudiants</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-primary fill-primary" />
                        <span className="font-bold">{f.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500 font-semibold mb-4">{f.duration}</p>
                    <div className="pt-4 border-t border-neutral-100">
                      <span className="text-2xl font-black text-black">{f.price}€</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === "prompts" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prompts.map(p => (
                <Link
                  key={p.id}
                  href={`/prompt/${p.id}`}
                  className="group bg-white border-2 border-neutral-200 rounded-2xl overflow-hidden hover:border-primary hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 bg-neutral-100">
                    <Image src={p.thumbnail} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black text-black mb-3 group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-primary fill-primary" />
                        <span className="text-sm font-bold">{p.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-neutral-500">
                        <Download size={14} />
                        <span className="text-sm font-bold">{p.downloads}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-neutral-100">
                      {p.price === 0 ? (
                        <span className="text-lg font-black text-success">Gratuit</span>
                      ) : (
                        <span className="text-2xl font-black text-black">{p.price}€</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
