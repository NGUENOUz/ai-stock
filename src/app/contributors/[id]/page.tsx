"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ArrowLeft, Star, MapPin, Calendar, ExternalLink, Check,
  BookOpen, Sparkles, Users, TrendingUp, Crown, Award,
  MessageCircle, Share2, UserPlus, FileText, Heart, Copy, Eye, Play,
  Twitter, Linkedin, Github, Briefcase, Mail, CheckCircle2,
  ChevronLeft, ChevronRight, Trophy,
} from "lucide-react";

// ─── Constants ───────────────────────────────────────────────────────────────

const PROMPTS_PER_PAGE = 6;
const RESOURCES_PER_PAGE = 8;

// ─── Mock data ────────────────────────────────────────────────────────────────

const contributor = {
  id: "sophie-martin",
  name: "Sophie Martin",
  avatar: "https://i.pravatar.cc/150?img=10",
  cover: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1600&h=500",
  verified: true,
  role: "Expert Automation & IA",
  globalRank: 2,
  bio: "Passionnée par l'automatisation et l'IA, j'aide les entreprises à gagner du temps grâce à des workflows intelligents.",
  location: "Paris, France",
  joinedDate: "Janvier 2022",
  website: "https://sophiemartin.com",
  availableForHire: true,
  socials: {
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  skills: ["N8N", "Zapier", "Make", "ChatGPT (API)", "Python", "Node.js"],
  services: [
    "Audit d'automatisation d'entreprise",
    "Création de workflows sur-mesure",
    "Formation IA & Prompt Engineering",
    "Consulting stratégique IA",
  ],
  detailedBio: `Avec plus de 5 ans d'expérience dans l'optimisation des processus métiers, j'accompagne les PME et les startups dans leur transformation digitale via l'Intelligence Artificielle.\n\nJ'ai conçu plus d'une centaine de workflows automatisés qui font gagner en moyenne 15h par semaine à mes clients. Mon approche est pragmatique : l'IA n'est pas qu'un gadget, c'est un levier de croissance qui doit s'intégrer nativement dans vos outils existants (CRM, ERP, Slack, etc.).\n\nN'hésitez pas à consulter mes ressources gratuites ou à me contacter pour discuter d'un projet !`,
  stats: [
    { label: "Prompts", value: "24", icon: Sparkles },
    { label: "Ressources", value: "8", icon: BookOpen },
    { label: "Abonnés", value: "3.4K", icon: Users },
    { label: "Note", value: "4.9", icon: Star },
  ],
  badges: [
    { name: "Top Contributeur", icon: Crown, color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800" },
    { name: "Expert Vérifié", icon: Check, color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" },
    { name: "Bestseller", icon: TrendingUp, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800" },
  ],
};

// Autres créateurs pour la section "Découvrir"
const otherCreators = [
  { id: "thomas-dubois", name: "Thomas Dubois", role: "Prompt Engineer", avatar: "https://i.pravatar.cc/150?img=11", rank: 1 },
  { id: "marc-antoine", name: "Marc Antoine", role: "Développeur Full-Stack IA", avatar: "https://i.pravatar.cc/150?img=51", rank: 3 },
  { id: "julie-leb", name: "Julie Leblanc", role: "Growth Hacker IA", avatar: "https://i.pravatar.cc/150?img=43", rank: 4 },
  { id: "elena-koval", name: "Elena Koval", role: "AI Product Designer", avatar: "https://i.pravatar.cc/150?img=47", rank: 5 },
];

const allPrompts = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: [
    "Pack 50 Prompts Automation N8N",
    "Cinematic Tokyo Cyberpunk Night",
    "Script de cold email B2B ultra-personnalisé",
    "Realistic product photography mockup",
    "Générateur de personas marketing",
    "Workflow Zapier → Notion → Slack",
    "Logo minimaliste 3D gradient",
    "Analyse concurrentielle IA",
  ][i],
  tool: ["ChatGPT 4", "Midjourney v6", "Claude 3", "Midjourney v6", "ChatGPT 4", "Cursor", "Midjourney v6", "Claude 3"][i],
  toolColor: ["bg-[#10B981]", "bg-[#2563EB]", "bg-[#D97757]", "bg-[#2563EB]", "bg-[#10B981]", "bg-[#3B82F6]", "bg-[#2563EB]", "bg-[#D97757]"][i],
  type: ["text", "image", "text", "image", "text", "text", "image", "text"][i],
  views: ["24k", "18k", "12k", "31k", "9k", "22k", "15k", "7k"][i],
  likes: [2400, 1800, 1200, 3100, 900, 2200, 1500, 700][i],
  author: { name: "Sophie Martin", avatar: "https://i.pravatar.cc/150?img=10" },
  image: [
    "https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528297506728-9533d2ac3fa4?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
  ][i],
}));

const allResources = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 1),
  title: [
    "Maîtriser N8N de A à Z",
    "Automatisation No-Code Avancée",
    "ChatGPT pour les Pros",
    "Workflows Zapier & Make",
    "Prompt Engineering Masterclass",
    "IA pour les PME",
  ][i],
  students: [1200, 850, 2100, 640, 1800, 430][i],
  rating: [4.9, 4.8, 4.7, 4.9, 4.8, 4.6][i],
  price: [99, 149, 79, 59, 129, 49][i],
  thumbnail: [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=250",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400&h=250",
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=400&h=250",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400&h=250",
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=400&h=250",
    "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80&w=400&h=250",
  ][i],
  duration: ["8h 30min", "12h 15min", "6h 00min", "4h 45min", "10h 20min", "3h 30min"][i],
}));

// ─── Sub-components ───────────────────────────────────────────────────────────

function RankMedal({ rank }: { rank: number }) {
  const config =
    rank === 1 ? { emoji: "🥇", bg: "from-amber-400 to-yellow-500", shadow: "shadow-amber-400/40" } :
    rank === 2 ? { emoji: "🥈", bg: "from-slate-400 to-slate-500", shadow: "shadow-slate-400/40" } :
    rank === 3 ? { emoji: "🥉", bg: "from-orange-500 to-orange-600", shadow: "shadow-orange-500/40" } :
    { emoji: `#${rank}`, bg: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/30" };

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-black shadow-lg bg-gradient-to-r",
      config.bg, config.shadow
    )}>
      <Trophy className="w-3.5 h-3.5" />
      {config.emoji} Global
    </div>
  );
}

function PaginationBar({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-blue-500 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={cn(
            "w-9 h-9 flex items-center justify-center rounded-xl font-bold text-sm transition-all shadow-sm",
            current === page
              ? "bg-blue-600 text-white shadow-blue-600/25"
              : "bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          )}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-blue-500 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContributorProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"about" | "prompts" | "ressources">("about");
  const [likedPrompts, setLikedPrompts] = useState<number[]>([]);
  const [promptPage, setPromptPage] = useState(1);
  const [resourcePage, setResourcePage] = useState(1);

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.preventDefault(); e.stopPropagation();
    setLikedPrompts((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const paginatedPrompts = useMemo(() =>
    allPrompts.slice((promptPage - 1) * PROMPTS_PER_PAGE, promptPage * PROMPTS_PER_PAGE),
    [promptPage]
  );
  const paginatedResources = useMemo(() =>
    allResources.slice((resourcePage - 1) * RESOURCES_PER_PAGE, resourcePage * RESOURCES_PER_PAGE),
    [resourcePage]
  );
  const totalPromptPages = Math.ceil(allPrompts.length / PROMPTS_PER_PAGE);
  const totalResourcePages = Math.ceil(allResources.length / RESOURCES_PER_PAGE);

  const TABS = [
    { id: "about", label: "À Propos", icon: FileText, count: null },
    { id: "prompts", label: "Prompts", icon: Sparkles, count: allPrompts.length },
    { id: "ressources", label: "Ressources", icon: BookOpen, count: allResources.length },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120]">

      {/* ── Cover Hero ────────────────────────────────────────────────────── */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden bg-slate-900">
        <Image
          src={contributor.cover}
          alt="Cover"
          fill
          className="object-cover opacity-80"
          priority
        />
        {/* Rich gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] dark:from-[#0B1120] via-black/20 to-black/50" />
        {/* Subtle noise texture feel */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_60%)]" />

        {/* Breadcrumb — navigation retour intégrée dans le hero */}
        <div className="absolute top-0 left-0 right-0 pt-24 md:pt-28 px-6 z-10">
          <div className="max-w-[1400px] mx-auto">
            <Link
              href="/createurs"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-bold transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="opacity-70">Créateurs</span>
              <span className="opacity-40 mx-1">›</span>
              <span>{contributor.name}</span>
            </Link>
          </div>
        </div>

        {/* Share button overlay */}
        <div className="absolute top-24 md:top-28 right-6 z-10">
          <div className="max-w-[1400px] mx-auto flex justify-end">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white text-sm font-bold rounded-full transition-all">
              <Share2 className="w-4 h-4" /> Partager
            </button>
          </div>
        </div>
      </div>

      {/* ── Profile Header ────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

        {/* Avatar + Info card */}
        <div className="relative -mt-20 md:-mt-24 mb-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">

          {/* Avatar with rank ring */}
          <div className="relative shrink-0 mx-auto md:mx-0">
            {/* Gold ring for top 3 */}
            <div className={cn(
              "w-32 h-32 md:w-40 md:h-40 rounded-full p-1 shadow-2xl",
              contributor.globalRank === 1 ? "bg-gradient-to-tr from-amber-400 to-yellow-300" :
              contributor.globalRank === 2 ? "bg-gradient-to-tr from-slate-400 to-slate-300" :
              contributor.globalRank === 3 ? "bg-gradient-to-tr from-orange-500 to-orange-400" :
              "bg-gradient-to-tr from-blue-500 to-indigo-400"
            )}>
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#F8FAFC] dark:border-[#0B1120]">
                <Image src={contributor.avatar} alt={contributor.name} fill className="object-cover" />
              </div>
            </div>
            {/* Verified checkmark */}
            {contributor.verified && (
              <div className="absolute bottom-2 right-2 z-20 w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center border-4 border-[#F8FAFC] dark:border-[#0B1120] shadow-lg">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {/* Info glassmorphism card */}
          <div className="flex-1 w-full bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-xl border border-white/60 dark:border-slate-800/60">
            <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">

              <div className="min-w-0">
                {/* Name + rank */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                    {contributor.name}
                  </h1>
                  <RankMedal rank={contributor.globalRank} />
                  {contributor.availableForHire && (
                    <span className="text-[10px] uppercase font-black bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Disponible
                    </span>
                  )}
                </div>
                <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-3">
                  {contributor.role}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{contributor.location}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />Membre depuis {contributor.joinedDate}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-2xl">
                  {contributor.bio}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 shrink-0">
                <div className="flex flex-wrap items-center gap-3">
                  <button className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm">
                    <UserPlus className="w-4 h-4" /> Suivre
                  </button>
                  <button className="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold rounded-xl transition-all hover:-translate-y-0.5 flex items-center gap-2 text-sm">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold rounded-xl transition-all hover:-translate-y-0.5 flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
                {/* Social links */}
                <div className="flex items-center gap-2">
                  {contributor.website && (
                    <a href={contributor.website} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {contributor.socials.linkedin && (
                    <a href={contributor.socials.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-[#0A66C2] hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {contributor.socials.twitter && (
                    <a href={contributor.socials.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-[#1DA1F2] hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {contributor.socials.github && (
                    <a href={contributor.socials.github} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats row ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {contributor.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-[#0F172A] rounded-2xl p-5 text-center border border-slate-200/60 dark:border-slate-800 shadow-sm hover:-translate-y-1 transition-transform"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-3 mb-10">
          {contributor.badges.map((badge, i) => (
            <div key={i} className={cn("flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border", badge.color)}>
              <badge.icon className="w-4 h-4" />
              {badge.name}
            </div>
          ))}
        </div>

        {/* ── Tabs ────────────────────────────────────────────────────────── */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-white dark:bg-[#0F172A] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative w-full max-w-md">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    "relative flex-1 z-10 px-4 py-3 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-colors",
                    isActive ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="profileTabBg"
                      className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <tab.icon className={cn("w-4 h-4", isActive ? "text-blue-600 dark:text-blue-400" : "")} />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {tab.count !== null && (
                      <span className={cn("px-2 py-0.5 rounded-md text-xs font-black", isActive ? "bg-white dark:bg-slate-700 shadow-sm" : "bg-slate-100 dark:bg-slate-800")}>
                        {tab.count}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Tab Content ──────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >

            {/* 1. ABOUT ─────────────────────────────────────────────────── */}
            {activeTab === "about" && (
              <div className="flex flex-col lg:flex-row gap-8 pb-20">
                <div className="lg:w-2/3 space-y-6">
                  {/* Detailed bio */}
                  <div className="bg-white dark:bg-[#0F172A] rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-5">Présentation</h3>
                    {contributor.detailedBio.split("\n\n").map((para, i) => (
                      <p key={i} className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed font-medium last:mb-0">{para}</p>
                    ))}
                  </div>

                  {/* Services */}
                  <div className="bg-white dark:bg-[#0F172A] rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-600" /> Ce que je propose
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {contributor.services.map((service, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/3">
                  <div className="bg-white dark:bg-[#0F172A] rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm lg:sticky lg:top-28">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-5">Boîte à outils</h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {contributor.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-sm font-bold rounded-lg border border-blue-100 dark:border-blue-800/50">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <hr className="border-slate-200 dark:border-slate-800 mb-6" />
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">Besoin d'un accompagnement ?</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 font-medium">
                      Je suis disponible pour des missions de consulting ou du développement sur-mesure.
                    </p>
                    <button className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm">
                      <Mail className="w-4 h-4" /> Me contacter
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PROMPTS ──────────────────────────────────────────────── */}
            {activeTab === "prompts" && (
              <div className="pb-20">
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
                  {paginatedPrompts.map((prompt) => (
                    <Link
                      href={`/prompt/${prompt.id}`}
                      key={prompt.id}
                      className="break-inside-avoid group relative flex flex-col bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200/60 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer"
                    >
                      <div className="relative w-full h-56 bg-slate-100 dark:bg-slate-900 overflow-hidden">
                        <Image src={prompt.image} alt={prompt.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 z-10 pointer-events-none" />

                        {/* Actions on hover */}
                        <div className={`absolute top-4 left-4 z-30 flex items-center gap-2 transition-opacity duration-300 ${likedPrompts.includes(prompt.id) ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                          <button onClick={(e) => toggleLike(e, prompt.id)} className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 shadow-xl ${likedPrompts.includes(prompt.id) ? "bg-pink-500/90 text-white border-pink-500" : "bg-white/20 border-white/20 text-white hover:bg-pink-500 hover:border-pink-500"}`}>
                            <Heart className={`w-4 h-4 ${likedPrompts.includes(prompt.id) ? "fill-white" : ""}`} />
                          </button>
                          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 shadow-xl">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>

                        {prompt.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-blue-600 transition-all duration-300 shadow-2xl">
                              <Play className="w-5 h-5 text-white fill-white ml-1" />
                            </div>
                          </div>
                        )}

                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg z-30">
                          <div className={`w-2 h-2 rounded-full ${prompt.toolColor}`} />
                          {prompt.tool}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 pointer-events-none">
                          <h3 className="font-extrabold text-base text-white leading-tight mb-2 drop-shadow-md line-clamp-2">{prompt.title}</h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Image src={prompt.author.avatar} alt={prompt.author.name} width={20} height={20} className="rounded-full border border-white/20" />
                              <span className="text-[11px] font-bold text-white/90">{prompt.author.name}</span>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] font-bold text-white/80">
                              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{prompt.views}</span>
                              <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-white" />{prompt.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <PaginationBar current={promptPage} total={totalPromptPages} onChange={setPromptPage} />
              </div>
            )}

            {/* 3. RESOURCES ────────────────────────────────────────────── */}
            {activeTab === "ressources" && (
              <div className="pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {paginatedResources.map((r) => (
                    <Link
                      key={r.id}
                      href={`/ressources/${r.id}`}
                      className="group bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col"
                    >
                      <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <Image src={r.thumbnail} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/70 backdrop-blur-md text-white text-xs font-bold rounded-xl flex items-center gap-1.5 border border-white/10">
                          <BookOpen className="w-3.5 h-3.5" /> {r.duration}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-base font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">{r.title}</h3>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-sm font-bold text-slate-600 dark:text-slate-300">
                              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{r.rating}
                            </span>
                            <span className="flex items-center gap-1 text-sm font-bold text-slate-400">
                              <Users className="w-3.5 h-3.5" />{r.students}
                            </span>
                          </div>
                          <span className="text-xl font-black text-slate-900 dark:text-white">{r.price}€</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <PaginationBar current={resourcePage} total={totalResourcePages} onChange={setResourcePage} />
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* ── Autres créateurs ─────────────────────────────────────────────── */}
        <div className="pb-20 mt-4">
          <div className="border-t border-slate-200 dark:border-slate-800 pt-12">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" /> Découvrir d'autres créateurs
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {otherCreators.map((c) => (
                <Link
                  key={c.id}
                  href={`/contributors/${c.id}`}
                  className="flex flex-col items-center gap-3 p-5 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all group"
                >
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-700 group-hover:border-blue-400 transition-colors">
                    <Image src={c.avatar} alt={c.name} fill className="object-cover" />
                    <div className="absolute -top-1 -right-1 bg-amber-400 text-[9px] font-black text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                      #{c.rank}
                    </div>
                  </div>
                  <div className="text-center min-w-0 w-full">
                    <p className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors truncate">{c.name}</p>
                    <p className="text-xs text-slate-400 truncate">{c.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
