"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Heart, MessageCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Story } from "./StoriesBar";
import { cn } from "@/lib/utils";

interface StoryViewerProps {
  stories: Story[];
  initialIndex: number | null;
  onClose: () => void;
}

const STORY_DURATION = 5000; // 5 seconds per story

export default function StoryViewer({ stories, initialIndex, onClose }: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);

  useEffect(() => {
    if (initialIndex !== null && initialIndex >= 0 && initialIndex < stories.length) {
      setCurrentIndex(initialIndex);
      setProgress(0);
      accumulatedRef.current = 0;
    }
  }, [initialIndex, stories.length]);

  useEffect(() => {
    if (initialIndex === null || isPaused) return;

    startTimeRef.current = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = accumulatedRef.current + (now - startTimeRef.current);
      
      if (elapsed >= STORY_DURATION) {
        handleNext();
      } else {
        setProgress((elapsed / STORY_DURATION) * 100);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, initialIndex]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
      accumulatedRef.current = 0;
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
      accumulatedRef.current = 0;
    } else {
      setProgress(0);
      accumulatedRef.current = 0;
    }
  };

  const handlePointerDown = () => {
    setIsPaused(true);
    accumulatedRef.current += Date.now() - startTimeRef.current;
  };

  const handlePointerUp = () => {
    setIsPaused(false);
    startTimeRef.current = Date.now();
  };

  if (initialIndex === null || !stories[currentIndex]) return null;

  const currentStory = stories[currentIndex];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
      >
        <div className="absolute top-4 right-4 z-50">
          <button onClick={onClose} className="p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Story Container */}
        <div className="relative w-full max-w-[400px] h-[100dvh] md:h-[80vh] md:rounded-[32px] overflow-hidden bg-[#111] shadow-2xl flex flex-col">
          
          {/* Progress Bars */}
          <div className="absolute top-0 inset-x-0 p-4 z-20 flex gap-1.5 pt-6 bg-gradient-to-b from-black/60 to-transparent">
            {stories.map((s, idx) => (
              <div key={s.id} className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-75 ease-linear"
                  style={{
                    width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? '100%' : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-10 inset-x-0 px-4 z-20 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden relative">
              <Image src={currentStory.author.avatar} alt={currentStory.author.name} fill className="object-cover" />
            </div>
            <div className="flex items-center gap-2 text-white">
              <span className="font-bold text-sm shadow-black drop-shadow-md">{currentStory.author.name}</span>
              <span className="text-white/70 text-xs shadow-black drop-shadow-md">{currentStory.createdAt}</span>
            </div>
          </div>

          {/* Media Content */}
          <div 
            className="flex-1 relative"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Click zones */}
            <div className="absolute inset-y-0 left-0 w-1/3 z-10 cursor-pointer" onClick={(e) => { e.stopPropagation(); handlePrev(); }} />
            <div className="absolute inset-y-0 right-0 w-2/3 z-10 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleNext(); }} />

            {currentStory.mediaUrl && (
              <Image 
                src={currentStory.mediaUrl} 
                alt="Story content" 
                fill 
                className="object-cover"
                priority
              />
            )}
            
            {/* Caption Overlay */}
            {currentStory.caption && (
              <div className="absolute bottom-20 inset-x-0 p-6 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <p className="text-white font-medium text-lg drop-shadow-md">{currentStory.caption}</p>
              </div>
            )}
          </div>

          {/* Interaction Footer */}
          <div className="absolute bottom-0 inset-x-0 p-4 z-20 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-4">
            <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2.5 flex items-center">
              <input 
                type="text" 
                placeholder="Répondre..." 
                className="bg-transparent border-none text-white text-sm w-full focus:outline-none placeholder:text-white/60"
              />
            </div>
            <button className="text-white hover:scale-110 transition-transform">
              <Heart className="w-6 h-6" />
            </button>
            <button className="text-white hover:scale-110 transition-transform">
              <Send className="w-6 h-6" />
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
