"use client";

import React, { useState } from "react";
import { X, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitPromptModal({ isOpen, onClose }: SubmitPromptModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tool, setTool] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // MOCK: En vrai, on enverrait ça vers Supabase avec un statut "pending"
    alert("Votre prompt a bien été soumis ! Il est actuellement en attente de validation par notre équipe.");
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
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0F172A] rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 hide-scrollbar">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white dark:bg-[#0F172A] border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Soumettre un Prompt</h2>
              <p className="text-xs text-slate-500">Partagez votre expertise avec la communauté</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                Titre du prompt <span className="text-red-500">*</span>
              </label>
              <input 
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Image photoréaliste de produit..."
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                Catégorie <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="" disabled>Sélectionner...</option>
                <option value="images">Images</option>
                <option value="textes">Textes / Copywriting</option>
                <option value="code">Code / Dev</option>
                <option value="productivite">Productivité</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea 
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Expliquez brièvement à quoi sert ce prompt et comment l'utiliser..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors min-h-[80px] resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              Le Prompt <span className="text-red-500">*</span>
            </label>
            <textarea 
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Copiez-collez le prompt exact ici. Utilisez des crochets [COMME CECI] pour les variables à modifier."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors min-h-[120px] resize-y font-mono"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                Outil recommandé <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={tool}
                onChange={(e) => setTool(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="" disabled>Sélectionner...</option>
                <option value="chatgpt">ChatGPT</option>
                <option value="midjourney">Midjourney</option>
                <option value="claude">Claude</option>
                <option value="autre">Autre (préciser dans description)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                Image d'exemple (URL optionnelle)
              </label>
              <input 
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
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
              Soumettre
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
