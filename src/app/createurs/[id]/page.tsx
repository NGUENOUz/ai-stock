"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Edit3, Settings, Share2, MapPin, Link as LinkIcon, Calendar, Twitter, Github, Linkedin, Grid, Heart, Star, Award, MessageCircle, MoreHorizontal } from "lucide-react";
import CursorGlow from "@/components/CursorGlow";
import FeedPost from "@/components/feed/FeedPost";

// Mock data
const mockUser = {
  id: "alex-dev",
  name: "Alex Dev",
  username: "@alexdev",
  avatar: "https://i.pravatar.cc/150?u=1",
  cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  bio: "Creative Developer & AI Enthusiast. Building the future of UI with generative AI tools. Part of the AI-STOCK core team.",
  location: "Paris, France",
  website: "https://alexdev.com",
  joinDate: "Septembre 2023",
  stats: {
    followers: 1250,
    following: 45,
    posts: 34,
    points: 12400
  },
  badges: ["Pro", "Pionnier", "Top 100"],
  social: {
    twitter: "#",
    github: "#"
  }
};

const mockPosts = [
  {
    id: 'post-1',
    author: { name: "Alex Dev", handle: "@alexdev", avatar: mockUser.avatar, badge: "PRO" },
    timeAgo: "Il y a 2h",
    content: {
      type: "image",
      prompt: "Une interface utilisateur futuriste pour une application de trading de crypto-monnaies, style cyberpunk, néons bleus et roses, haute résolution, hyper détaillé, UI/UX --v 6.0",
      mediaUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
    },
    tool: { name: "Midjourney", slug: "midjourney" },
    stats: { likes: 124, comments: 12 }
  },
  {
    id: 'post-2',
    author: { name: "Alex Dev", handle: "@alexdev", avatar: mockUser.avatar, badge: "PRO" },
    timeAgo: "Hier",
    content: {
      type: "text",
      prompt: "Agis comme un expert en SEO technique. Analyse cette structure de page et donne-moi 5 recommandations pour améliorer le Core Web Vitals : [Structure]",
    },
    tool: { name: "Claude 3", slug: "claude-3" },
    stats: { likes: 89, comments: 5 }
  }
];

export default function CreatorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isMe = resolvedParams.id === "me" || resolvedParams.id === mockUser.id;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] pb-24">
      <CursorGlow gradientClasses="from-blue-500 to-purple-500" />
      
      {/* Cover */}
      <div className="h-64 md:h-80 w-full relative bg-slate-200 dark:bg-slate-800">
        <Image src={mockUser.cover} alt="Cover" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Top actions */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
           <Link href="/createurs" className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition-colors">
             <ArrowLeft className="w-5 h-5" />
           </Link>
           <div className="flex gap-2">
             <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition-colors">
               <Share2 className="w-5 h-5" />
             </button>
             {isMe && (
               <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition-colors">
                 <Settings className="w-5 h-5" />
               </button>
             )}
           </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 -mt-20">
        
        {/* Profile Card */}
        <div className="bg-white dark:bg-[#0F172A] rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/60 dark:border-slate-800 mb-8">
           <div className="flex flex-col md:flex-row gap-6 items-start md:items-end justify-between mb-6">
             <div className="flex items-end gap-4 -mt-16 md:-mt-20 relative z-20">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-[#0F172A] overflow-hidden bg-slate-100 shadow-xl">
                  <Image src={mockUser.avatar} alt={mockUser.name} fill className="object-cover" />
                </div>
                <div className="pb-4">
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{mockUser.name}</h1>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">{mockUser.username}</p>
                </div>
             </div>
             
             <div className="w-full md:w-auto flex gap-3 pb-2 shrink-0">
               {isMe ? (
                 <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                   <Edit3 className="w-4 h-4" /> Éditer
                 </button>
               ) : (
                 <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
                   Suivre
                 </button>
               )}
             </div>
           </div>

           <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-3xl text-sm md:text-base">
             {mockUser.bio}
           </p>

           <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400 mb-8">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {mockUser.location}</span>
              <a href={mockUser.website} className="flex items-center gap-1.5 text-primary hover:underline"><LinkIcon className="w-4 h-4" /> {mockUser.website.replace('https://', '')}</a>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> A rejoint en {mockUser.joinDate}</span>
           </div>

           {/* Stats & Badges */}
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-slate-100 dark:border-slate-800/50">
             <div className="flex items-center gap-8">
               <div className="text-center">
                 <div className="font-black text-lg md:text-xl text-slate-900 dark:text-white">{mockUser.stats.following}</div>
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Abonnements</div>
               </div>
               <div className="text-center">
                 <div className="font-black text-lg md:text-xl text-slate-900 dark:text-white">{mockUser.stats.followers}</div>
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Abonnés</div>
               </div>
               <div className="text-center">
                 <div className="font-black text-lg md:text-xl text-primary">{mockUser.stats.points.toLocaleString()}</div>
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Points</div>
               </div>
             </div>
             
             <div className="flex items-center gap-2">
               {mockUser.badges.map(b => (
                 <span key={b} className="px-3 py-1 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 text-[11px] font-black uppercase tracking-widest rounded-full flex items-center gap-1">
                   <Award className="w-3 h-3" /> {b}
                 </span>
               ))}
             </div>
           </div>
        </div>

        {/* Content Tabs */}
        <div className="flex items-center gap-8 border-b border-slate-200/60 dark:border-slate-800 mb-8">
          <button className="pb-4 text-sm font-bold border-b-2 border-primary text-slate-900 dark:text-white flex items-center gap-2">
            <Grid className="w-4 h-4" /> Prompts ({mockUser.stats.posts})
          </button>
          <button className="pb-4 text-sm font-bold border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors flex items-center gap-2">
            <Heart className="w-4 h-4" /> Favoris
          </button>
        </div>

        {/* Feed Posts */}
        <div className="space-y-6 max-w-2xl mx-auto lg:mx-0">
          {mockPosts.map((post: any) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>

      </div>
    </div>
  );
}
