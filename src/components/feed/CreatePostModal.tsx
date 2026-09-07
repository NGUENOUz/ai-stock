"use client";

import React, { useState } from "react";
import { X, Image as ImageIcon, Video, Type, Music, Code, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [activeType, setActiveType] = useState<"image" | "video" | "text" | "audio" | "code">("image");
  const [prompt, setPrompt] = useState("");
  const [tool, setTool] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  if (!isOpen) return null;

  const types = [
    { id: "image", icon: ImageIcon, label: "Image" },
    { id: "video", icon: Video, label: "Vidéo" },
    { id: "text", icon: Type, label: "Texte" },
    { id: "audio", icon: Music, label: "Audio" },
    { id: "code", icon: Code, label: "Code" },
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit behavior
    alert("Post créé avec succès ! (Mock: pas réellement enregistré pour l'instant)");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0F172A] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Créer une publication</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          
          {/* Type selector */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 hide-scrollbar">
            {types.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveType(t.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap border",
                  activeType === t.id 
                    ? "bg-primary text-white border-primary" 
                    : "bg-transparent text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-primary/50"
                )}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </div>

          {/* Media URL Input (Mock for upload) */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              Lien de votre média (Image/Vidéo URL)
            </label>
            <input 
              type="url"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <p className="text-xs text-slate-500 mt-2">Pour cette V2, utilisez une URL externe (ex: Unsplash) au lieu d'un upload de fichier réel.</p>
          </div>

          {/* Prompt Input */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              Le Prompt utilisé <span className="text-red-500">*</span>
            </label>
            <textarea 
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Décrivez précisément la requête envoyée à l'IA..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors min-h-[120px] resize-y"
            />
          </div>

          {/* Tool Input */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              Outil IA <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
            >
              <option value="" disabled>Sélectionnez l'outil utilisé</option>
              <option value="chatgpt">ChatGPT 4</option>
              <option value="midjourney">Midjourney v6</option>
              <option value="claude">Claude 3 Opus</option>
              <option value="sora">Sora</option>
              <option value="dalle3">DALL-E 3</option>
            </select>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all"
            >
              Publier <Send className="w-4 h-4" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
