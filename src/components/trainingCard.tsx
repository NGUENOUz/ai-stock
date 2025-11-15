// src/components/TrainingCard.tsx
import React from "react";
import Link from "next/link";
import { Clock, Video, Crown } from "lucide-react";
import { Training } from "../types/training";

export const TrainingCard: React.FC<{ training: Training }> = ({ training }) => {
  const { title, imageUrl, durationMinutes, numberOfVideos, instructor, id, price, isPremium } = training;

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const formattedDuration = `${hours}h ${minutes}m`;

  const priceDisplay = isPremium ? "Premium" : price === 0 ? "Gratuit" : `${price} €`;
  const priceColorClass = isPremium
    ? "text-[#FFD86A] font-semibold drop-shadow-[0_0_6px_rgba(255,215,100,0.6)]"
    : price === 0
    ? "text-green-500 font-semibold"
    : "text-yellow-400 font-semibold";

  const tagLabel = isPremium ? "PREMIUM" : "GRATUIT";

  // ⭐️ BADGE PREMIUM VERSION OR MÉTALLIQUE
  const tagClasses = isPremium
    ? `
      bg-gradient-to-br 
      from-[#FFF4C9] via-[#F8D97F] to-[#C79A34] 
      text-black
      shadow-[0_0_18px_rgba(255,215,130,0.55)]
      group-hover:shadow-[0_0_28px_rgba(255,230,160,0.85)]
      transition-all duration-700
    `
    : `
      bg-gradient-to-br from-green-500 to-green-700 text-white
    `;

  return (
    <Link href={`/formations/${id}`} passHref>
      <div
        className="
          group relative cursor-pointer rounded-3xl overflow-hidden
          backdrop-blur-3xl 
          bg-white/15 dark:bg-neutral-900/25 
          border border-white/20 dark:border-white/10
          shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          transition-all duration-[900ms] ease-out
          
          hover:-translate-y-3 hover:scale-[1.03]
          hover:shadow-[0_25px_75px_rgba(255,210,120,0.45)]
        "
      >
        {/* AURA LUMINEUSE VISION PRO */}
        <div
          className="
            absolute -inset-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,215,130,0.25),transparent_70%)]
            opacity-0 group-hover:opacity-100 transition-opacity duration-700
            pointer-events-none
          "
        ></div>

        {/* ⭐️ LIGNE LUMINEUSE ANIMÉE (SHINE EFFECT) */}
        <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
          <div
            className="
              absolute top-0 left-[-120%] w-[80%] h-full 
              bg-gradient-to-r 
              from-transparent 
              via-[rgba(255,240,180,0.45)] 
              to-transparent
              skew-x-[-20deg]
              group-hover:left-[120%]
              transition-all duration-[1600ms] ease-out
            "
          ></div>
        </div>

        {/* REFLET */}
        <div
          className="
            absolute inset-0 pointer-events-none 
            bg-[linear-gradient(135deg,rgba(255,255,255,0.15),transparent)]
            opacity-0 group-hover:opacity-70 
            translate-y-[-40%] group-hover:translate-y-[20%]
            transition-all duration-[1200ms] ease-out
          "
        />

        {/* IMAGE */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="
              w-full h-full object-cover 
              transition-transform duration-[1100ms]
              group-hover:scale-[1.15] group-hover:translate-y-1
            "
          />

          {/* ⭐️ BADGE OR MÉTALLIQUE */}
          <div
            className={`
              absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-bold 
              flex items-center gap-1 backdrop-blur-xl
              opacity-0 translate-y-[-6px] 
              group-hover:opacity-100 group-hover:translate-y-0
              ${tagClasses}
            `}
          >
            {isPremium && <Crown className="w-4 h-4 text-yellow-800" />}
            {tagLabel}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col">
          <h3
            className="
              text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 
              line-clamp-2 transition-all duration-700
              group-hover:text-[#FFE79A] group-hover:drop-shadow-[0_0_10px_rgba(255,230,150,0.6)]
            "
          >
            {title}
          </h3>

          <div
            className="
              flex justify-between items-center text-sm 
              text-gray-700 dark:text-gray-400 mb-5 pb-4
              border-b border-white/20
            "
          >
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 opacity-70" /> {formattedDuration}
            </div>

            <div className="flex items-center gap-1">
              <Video className="w-4 h-4 opacity-70" /> {numberOfVideos} vidéos
            </div>

            <span className={priceColorClass}>{priceDisplay}</span>
          </div>

          {/* INSTRUCTOR */}
          <div className="flex items-center mt-auto group/instructor">
            <Link href={`/instructors/${instructor.id}`} onClick={(e) => e.stopPropagation()}>
              <img
                src={instructor.avatarUrl}
                alt={instructor.name}
                className="
                  w-11 h-11 rounded-full object-cover mr-4
                  border border-yellow-400 shadow-[0_0_20px_rgba(255,210,120,0.45)]
                  transition-transform duration-700 group-hover/instructor:scale-110
                "
              />
            </Link>

            <Link href={`/instructors/${instructor.id}`} onClick={(e) => e.stopPropagation()}>
              <span
                className="
                  text-sm font-semibold text-gray-900 dark:text-gray-200
                  transition-colors duration-700 
                  group-hover/instructor:text-[#FFE79A]
                "
              >
                {instructor.name}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};
