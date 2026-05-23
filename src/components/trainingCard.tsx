// src/components/TrainingCard.tsx
import React from "react";
import Link from "next/link";
import { Clock, Video, Crown, Sparkles, Play } from "lucide-react";
import { Training } from "../types/training";

export const TrainingCard: React.FC<{ training: Training }> = ({ training }) => {
  const { title, imageUrl, durationMinutes, numberOfVideos, instructor, id, price, isPremium } = training;

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const formattedDuration = `${hours}h ${minutes}m`;

  const priceDisplay = isPremium ? "Premium" : price === 0 ? "Gratuit" : `${price} €`;

  return (
    <div className="group relative">
      {/* Glow effect au hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-primary-600 to-primary opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 rounded-2xl" />
      
      <Link href={`/formations/${id}`} className="block relative">
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden h-full flex flex-col shadow-premium hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-neutral-50">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Overlay gradient au hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Play button au hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-glow transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-7 h-7 text-black fill-black ml-1" />
              </div>
            </div>

            {/* Badge Premium/Gratuit */}
            {isPremium ? (
              <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-black text-xs font-bold shadow-md backdrop-blur-sm ring-2 ring-white/20 group-hover:scale-110 transition-transform duration-300">
                <Crown className="w-3.5 h-3.5" />
                PREMIUM
                <Sparkles className="w-3 h-3 animate-pulse" />
              </div>
            ) : price === 0 ? (
              <div className="absolute top-4 right-4 badge-success backdrop-blur-sm ring-2 ring-white/20 group-hover:scale-110 transition-transform duration-300">
                GRATUIT
              </div>
            ) : null}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-black mb-4 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>

            {/* Infos */}
            <div className="flex items-center justify-between text-sm text-neutral-600 mb-5 pb-5 border-b border-neutral-100 group-hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-1.5 group-hover:text-primary transition-colors">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{formattedDuration}</span>
              </div>

              <div className="flex items-center gap-1.5 group-hover:text-primary transition-colors">
                <Video className="w-4 h-4" />
                <span className="font-medium">{numberOfVideos} vidéos</span>
              </div>

              <span className="font-bold text-black group-hover:text-primary transition-colors">{priceDisplay}</span>
            </div>

            {/* Instructor */}
            <div className="flex items-center mt-auto">
              <Link 
                href={`/instructors/${instructor.id}`} 
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-3 group/instructor"
              >
                <div className="relative">
                  <img
                    src={instructor.avatarUrl}
                    alt={instructor.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-neutral-200 group-hover/instructor:border-primary group-hover/instructor:scale-110 transition-all duration-300"
                  />
                  {/* Ring effect */}
                  <div className="absolute inset-0 rounded-full ring-2 ring-primary opacity-0 group-hover/instructor:opacity-50 scale-100 group-hover/instructor:scale-125 transition-all duration-300" />
                </div>
                <span className="text-sm font-bold text-neutral-800 group-hover/instructor:text-primary transition-colors">
                  {instructor.name}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
