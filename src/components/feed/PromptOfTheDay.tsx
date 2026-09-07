import React from "react";
import { Star, Copy, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PromptOfTheDayProps {
  prompt: {
    title: string;
    description: string;
    content: string;
    tool: string;
    author: {
      name: string;
      avatar: string;
    };
    image?: string;
  };
}

export default function PromptOfTheDay({ prompt }: PromptOfTheDayProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    // You could add a toast notification here
  };

  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20 p-6 mb-8 overflow-hidden group">
      <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
        <Sparkles className="w-32 h-32 text-indigo-500" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-current" />
              Prompt du Jour
            </span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
            {prompt.title}
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-2">
            {prompt.description}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Image src={prompt.author.avatar} alt={prompt.author.name} width={24} height={24} className="rounded-full" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{prompt.author.name}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <Link href={`/liste/${prompt.tool.toLowerCase().replace(/ /g, '-')}`} className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
              {prompt.tool} <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="relative bg-slate-900 rounded-xl p-4 pr-12 font-mono text-sm text-slate-300">
            <p className="line-clamp-3">{prompt.content}</p>
            <button 
              onClick={handleCopy}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Copier le prompt"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {prompt.image && (
          <div className="w-full md:w-1/3 aspect-[4/3] md:aspect-auto md:h-auto rounded-xl overflow-hidden relative shrink-0">
            <Image src={prompt.image} alt={prompt.title} fill className="object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}
