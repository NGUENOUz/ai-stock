"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import StoryViewer from "./StoryViewer";

export interface Story {
  id: string;
  author: { name: string; avatar: string; isMe?: boolean };
  mediaUrl: string;
  type: "image" | "video";
  caption?: string;
  viewed: boolean;
  createdAt: string;
}

const mockStories: Story[] = [
  {
    id: "s1",
    author: { name: "Moi", avatar: "https://i.pravatar.cc/150?u=me", isMe: true },
    mediaUrl: "", // placeholder for creation
    type: "image",
    viewed: true,
    createdAt: "Maintenant"
  },
  {
    id: "s2",
    author: { name: "Alex Dev", avatar: "https://i.pravatar.cc/150?u=1" },
    mediaUrl: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&q=80&w=600&h=1000",
    type: "image",
    caption: "Nouveau prompt Midjourney incroyable ! 🚀",
    viewed: false,
    createdAt: "Il y a 2h"
  },
  {
    id: "s3",
    author: { name: "Sarah", avatar: "https://i.pravatar.cc/150?u=2" },
    mediaUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=600&h=1000",
    type: "image",
    caption: "En plein test de Sora...",
    viewed: false,
    createdAt: "Il y a 5h"
  },
  {
    id: "s4",
    author: { name: "Mounir IA", avatar: "https://i.pravatar.cc/150?u=3" },
    mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600&h=1000",
    type: "image",
    viewed: true,
    createdAt: "Il y a 8h"
  },
];

export default function StoriesBar() {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [stories, setStories] = useState<Story[]>(mockStories);

  const handleStoryClick = (index: number) => {
    if (index === 0) {
      // Trigger creation
      alert("Ouverture de la création de story...");
      return;
    }
    setActiveStoryIndex(index);
    
    // Mark as viewed
    const updated = [...stories];
    updated[index].viewed = true;
    setStories(updated);
  };

  return (
    <>
      <div className="w-full bg-white dark:bg-[#151e32] border border-slate-100 dark:border-slate-800 rounded-3xl p-4 mb-6 shadow-sm overflow-hidden flex items-center gap-4">
        <div className="flex overflow-x-auto gap-4 no-scrollbar pb-2 pt-1 items-center shrink-0 w-full">
          {stories.map((story, idx) => (
            <button 
              key={story.id} 
              onClick={() => handleStoryClick(idx)}
              className="flex flex-col items-center gap-2 group shrink-0 relative focus:outline-none"
            >
              <div className={cn(
                "relative w-16 h-16 rounded-full p-[2px] transition-all",
                story.author.isMe 
                  ? "border border-slate-200 dark:border-slate-700" 
                  : story.viewed 
                    ? "bg-slate-200 dark:bg-slate-700" 
                    : "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500"
              )}>
                <div className="w-full h-full rounded-full border-2 border-white dark:border-[#151e32] overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                  <Image src={story.author.avatar} alt={story.author.name} fill className="object-cover" />
                </div>
                
                {story.author.isMe && (
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary text-white rounded-full border-2 border-white dark:border-[#151e32] flex items-center justify-center">
                    <Plus className="w-3 h-3" />
                  </div>
                )}
              </div>
              
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 truncate w-16 text-center">
                {story.author.isMe ? "Votre story" : story.author.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <StoryViewer 
        stories={stories.filter(s => !s.author.isMe)} 
        initialIndex={activeStoryIndex !== null ? activeStoryIndex - 1 : null} 
        onClose={() => setActiveStoryIndex(null)}
      />
    </>
  );
}
