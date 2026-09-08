"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Copy, 
  ExternalLink,
  MoreHorizontal,
  Flame
} from "lucide-react";
import { cn } from "@/lib/utils";
import CommentSection from "./CommentSection";

// MOCK DATA TYPES
interface FeedPostType {
  id: string;
  author: {
    name: string;
    avatar: string;
    badge?: string;
  };
  content: {
    type: "image" | "video" | "text" | "audio" | "code";
    mediaUrl?: string; // Optional for text/code
    prompt: string;
  };
  tool: {
    name: string;
    slug: string;
  };
  stats: {
    likes: number;
    comments: number;
  };
  createdAt: string;
  isTrending?: boolean;
}

export default function FeedPost({ post }: { post: FeedPostType }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.stats.likes);
  const [showComments, setShowComments] = useState(false);

  // Mock comments
  const mockComments = [
    {
      id: "c1",
      author: { name: "Alex User", avatar: "https://i.pravatar.cc/150?u=12" },
      content: "Superbe résultat ! Je vais tester ce prompt tout de suite.",
      createdAt: "Il y a 2h",
      likes: 4
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(post.content.prompt);
    // TODO: Toast "Copié !"
  };

  // Determine if it should have a trending badge (mock logic)
  const isTrending = post.isTrending || (likesCount > 500 || post.stats.comments > 20);

  return (
    <div className="bg-white dark:bg-[#0F172A] border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden mb-6 shadow-sm hover:shadow-glow-primary transition-all duration-300">
      
      {/* HEADER */}
      <div className="p-5 flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <Link href="#" className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-slate-100 dark:border-slate-800">
            <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Link href="#" className="font-bold text-slate-900 dark:text-white hover:underline">
                {post.author.name}
              </Link>
              {post.author.badge && (
                <span className="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {post.author.badge}
                </span>
              )}
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <span>{post.createdAt}</span>
              <span>•</span>
              <span className="capitalize">{post.content.type}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isTrending && (
            <span className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">
              <Flame className="w-3 h-3" />
              Tendance
            </span>
          )}
          <button className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* MEDIA CONTENT */}
      {(post.content.mediaUrl || post.content.type === 'text' || post.content.type === 'code') && (
        <div className={cn(
          "relative w-full overflow-hidden flex items-center justify-center",
          post.content.type === 'image' || post.content.type === 'video' 
            ? "aspect-video sm:aspect-[4/3] bg-slate-100 dark:bg-slate-900" 
            : "min-h-[200px] p-6 bg-slate-50 dark:bg-[#0B1120]"
        )}>
          {post.content.mediaUrl && post.content.type === 'video' ? (
            <video 
              src={post.content.mediaUrl} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            />
          ) : post.content.mediaUrl && post.content.type === 'image' ? (
            <Image src={post.content.mediaUrl} alt="Post content" fill className="object-cover" />
          ) : post.content.type === 'code' ? (
            <div className="w-full h-full bg-[#1e1e1e] rounded-xl border border-slate-700/50 p-4 font-mono text-sm text-green-400 overflow-hidden relative shadow-inner text-left flex flex-col">
              <div className="flex items-center gap-1.5 mb-3 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <p className="opacity-90 line-clamp-6">{post.content.prompt}</p>
            </div>
          ) : post.content.type === 'text' ? (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/40 dark:to-slate-900/40 rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-6 flex items-center justify-center text-center shadow-inner">
              <p className="text-lg md:text-xl font-medium text-slate-700 dark:text-slate-300 italic leading-relaxed">
                "{post.content.prompt.length > 150 ? post.content.prompt.substring(0, 150) + '...' : post.content.prompt}"
              </p>
            </div>
          ) : (
             <div className="w-full h-full flex items-center justify-center text-slate-400">
                [Media Placeholder]
             </div>
          )}
        </div>
      )}

      {/* PROMPT & TOOL */}
      <div className="p-5">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <Link href={`/liste/${post.tool.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:bg-primary/5 px-2.5 py-1.5 rounded-lg transition-colors -ml-2">
              <ExternalLink className="w-3.5 h-3.5" />
              {post.tool.name}
            </Link>
            
            <button 
              onClick={handleCopyPrompt}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-primary/10 transition-colors shadow-sm"
              title="Copier"
            >
              <Copy className="w-3.5 h-3.5" />
              Copier
            </button>
          </div>
          
          {(post.content.type === 'image' || post.content.type === 'video') && (
            <div className="bg-slate-50 dark:bg-[#151E32] rounded-xl p-4 font-mono text-sm text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800/50 mt-3">
              <p className="line-clamp-3">{post.content.prompt}</p>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
          <button 
            onClick={handleLike}
            className={cn("flex items-center gap-2 font-medium transition-colors group", isLiked ? "text-red-500" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200")}
          >
            <Heart className={cn("w-5 h-5 transition-transform group-hover:scale-110 group-active:scale-95", isLiked ? "fill-red-500" : "")} />
            <span className="text-sm font-bold">{likesCount}</span>
          </button>
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors group"
          >
            <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110 group-active:scale-95" />
            <span className="text-sm font-bold">{post.stats.comments}</span>
          </button>
          <button className="flex items-center gap-2 font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors ml-auto">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* COMMENTS */}
      <CommentSection 
        postId={post.id} 
        isOpen={showComments} 
        initialComments={post.stats.comments > 0 ? [] : []} 
      />
    </div>
  );
}
