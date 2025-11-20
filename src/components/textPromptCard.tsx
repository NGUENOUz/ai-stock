import React from "react";
import Link from "next/link";
import { IconCrown, IconHeart, IconShare2, IconCopy, IconLock } from "@tabler/icons-react";
import ImagePromptCard from "./ImagePromptCard";

interface TextPromptProps {
  id: number;
  title: string;
  isPremium?: boolean;
  prompt: string;
}

interface TextPromptCardProps {
  prompt: TextPromptProps;
  isPremiumUser: boolean;
  promptsUsed: number;
  quotaLimit: number;
  onRequestCopy: (prompt: any) => void;
}

const TextPromptCard: React.FC<TextPromptCardProps> = ({
  prompt,
  isPremiumUser,
  promptsUsed,
  quotaLimit,
  onRequestCopy,
}) => {
  const isLocked = prompt.isPremium && !isPremiumUser;
  const isQuotaReached = !isPremiumUser && promptsUsed >= quotaLimit;

  // Réutilise l'affichage d'un image card locké
  if (isLocked || isQuotaReached) {
    return (
      <ImagePromptCard
        prompt={prompt as any}
        isPremiumUser={isPremiumUser}
        promptsUsed={promptsUsed}
        quotaLimit={quotaLimit}
        onRequestCopy={onRequestCopy}
      />
    );
  }

  return (
    <div className="relative p-6 rounded-3xl border border-white/14 bg-white/10 dark:bg-neutral-900/25 shadow-[0_4px_26px_rgba(255,215,120,0.09)] hover:border-yellow-500/50 transition duration-500">
      <IconCrown className="absolute top-5 right-5 w-7 h-7 text-[#F8D98A] drop-shadow-[0_0_7px_rgba(255,215,100,0.58)]" />
      <h3 className="text-2xl font-semibold mb-3 text-yellow-400">{prompt.title}</h3>
      <p
        className="text-gray-200 text-sm bg-neutral-900/50 p-4 rounded-lg font-mono line-clamp-4 cursor-pointer"
        onClick={() => onRequestCopy(prompt)}
      >
        {prompt.prompt}
        <span className="block text-right text-xs text-yellow-500 mt-2">
          (Clic pour copier le prompt complet)
        </span>
      </p>
      <div className="mt-5 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-red-400 hover:text-red-500 transition">
            <IconHeart className="w-5 h-5 mr-1 fill-current" /> 150
          </button>
          <button className="text-gray-400 hover:text-yellow-400 transition">
            <IconShare2 className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={() => onRequestCopy(prompt)}
          className="text-sm bg-gradient-to-br from-[#FFF4C9] via-[#F5D98A] to-[#C89C36] text-black px-4 py-2 rounded-xl font-bold hover:scale-[1.06] transition-all duration-300 shadow-[0_3px_10px_rgba(255,215,120,0.14)]"
        >
          <IconCopy className="w-4 h-4 mr-1 inline-block" /> Copier le Prompt
        </button>
      </div>
    </div>
  );
};

export default TextPromptCard;
