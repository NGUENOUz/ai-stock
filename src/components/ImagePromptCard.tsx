import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconLock, IconCrown, IconHeart, IconCopy } from "@tabler/icons-react";

type ImagePrompt = {
  id: number;
  title: string;
  style: string;
  tool: string;
  likes: number;
  imageUrl: string;
  prompt: string;
  isPremium?: boolean;
};

interface ImagePromptCardProps {
  prompt: ImagePrompt;
  isPremiumUser: boolean;
  promptsUsed: number;
  quotaLimit: number;
  onRequestCopy: (prompt: ImagePrompt) => void;
}

const ImagePromptCard: React.FC<ImagePromptCardProps> = ({
  prompt,
  isPremiumUser,
  promptsUsed,
  quotaLimit,
  onRequestCopy,
}) => {
  const isLocked = prompt.isPremium && !isPremiumUser;
  const isQuotaReached = !isPremiumUser && promptsUsed >= quotaLimit;

  const truncatedPrompt = isLocked
    ? "Débloquez l'accès Premium pour révéler ce prompt..."
    : isQuotaReached
    ? "Quota épuisé : Souscrivez pour copier ce prompt."
    : `${prompt.prompt.substring(0, 80)}...`;

  return (
    <div
      className={`group relative cursor-pointer rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.18)] flex flex-col h-full bg-white/15 dark:bg-neutral-900/25 border border-white/20 dark:border-white/10 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_26px_rgba(255,215,120,0.33)] ${
        isLocked || isQuotaReached ? "opacity-70 grayscale-[23%]" : ""
      }`}
    >
      {(isLocked || isQuotaReached) && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-4 text-center rounded-3xl">
          <IconLock className="w-10 h-10 text-red-500 mb-2" />
          <p className="font-bold text-lg text-yellow-100 drop-shadow-[0_0_8px_rgba(255,235,125,0.3)]">
            {isLocked ? "ACCÈS PREMIUM" : "QUOTA ÉPUISÉ"}
          </p>
          <Link href="/pricing" className="text-yellow-400 text-sm mt-1 hover:underline">
            Débloquer maintenant
          </Link>
        </div>
      )}

      <div className="relative h-48 w-full">
        <Image
          src={prompt.imageUrl}
          alt={prompt.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="transition duration-700 group-hover:scale-[1.05] group-hover:brightness-110"
        />
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full shadow-[0_0_10px_rgba(255,215,120,0.32)] backdrop-blur-md ${
            isLocked || prompt.isPremium
              ? "bg-gradient-to-br from-[#FFF4C9] via-[#F5D98A] to-[#C89C36] text-black"
              : "bg-black/60 text-white"
          }`}
        >
          {prompt.isPremium && <IconCrown className="w-3 h-3 inline-block mr-1" />}
          {prompt.tool}
        </span>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold mb-1 line-clamp-2 text-white">{prompt.title}</h3>
          <div className="text-xs text-yellow-500 mb-3">{prompt.style}</div>
          <p
            className="text-gray-400 text-sm bg-neutral-900/40 p-3 rounded-lg font-mono mb-4 min-h-[90px] backdrop-blur-[2px]"
            onClick={() => onRequestCopy(prompt)}
          >
            {truncatedPrompt}
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-red-400 hover:text-red-500 transition">
              <IconHeart className="w-5 h-5 mr-1 fill-current" /> {prompt.likes}
            </button>
          </div>
          <button
            onClick={() => onRequestCopy(prompt)}
            className={`text-sm flex items-center px-3 py-1.5 rounded-xl font-semibold transition-all duration-300 ${
              isLocked || isQuotaReached
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gradient-to-br from-[#FFF4C9] via-[#F5D98A] to-[#C89C36] text-black hover:scale-[1.05] shadow-[0_3px_10px_rgba(255,215,120,0.16)]"
            }`}
            disabled={isLocked || isQuotaReached}
          >
            <IconCopy className="w-4 h-4 mr-1" />
            {isLocked ? "Premium" : isQuotaReached ? "Épuisé" : "Copier"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePromptCard;
