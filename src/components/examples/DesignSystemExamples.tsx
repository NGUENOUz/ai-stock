// src/components/examples/DesignSystemExamples.tsx
/**
 * EXEMPLES DE COMPOSANTS - DESIGN SYSTEM AI-STOCK
 * 
 * Ce fichier contient des exemples d'utilisation du Design System.
 * Utilisez ces patterns comme référence pour créer de nouveaux composants.
 */

"use client";

import React from "react";
import { motion } from "framer-motion";

// ============================================
// BOUTONS
// ============================================

export function ButtonExamples() {
  return (
    <div className="space-y-4">
      {/* Primary Button */}
      <button className="bg-primary text-black px-6 py-3 rounded-full font-bold hover:bg-primary-600 transition-all active:scale-95">
        Bouton Primary
      </button>

      {/* Secondary Button */}
      <button className="bg-neutral-100 text-neutral-800 px-6 py-3 rounded-full font-bold hover:bg-neutral-200 transition-all active:scale-95">
        Bouton Secondary
      </button>

      {/* Ghost Button */}
      <button className="bg-transparent border border-neutral-200 text-neutral-800 px-6 py-3 rounded-full font-bold hover:bg-neutral-50 transition-all active:scale-95">
        Bouton Ghost
      </button>

      {/* Avec utility class */}
      <button className="btn-primary">
        Avec classe utility
      </button>
    </div>
  );
}

// ============================================
// CARDS
// ============================================

export function CardExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Card Simple */}
      <div className="framer-card p-6">
        <h3 className="text-xl font-bold mb-2">Card Simple</h3>
        <p className="text-neutral-600 text-sm">
          Utilise la classe utility framer-card pour un style cohérent.
        </p>
      </div>

      {/* Card avec Image */}
      <div className="framer-card overflow-hidden">
        <div className="w-full h-40 bg-gradient-to-br from-primary to-primary-600" />
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">Card avec Image</h3>
          <p className="text-neutral-600 text-sm">
            Image en haut, contenu en bas.
          </p>
        </div>
      </div>

      {/* Card Interactive */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-premium hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer group">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          Card Interactive
        </h3>
        <p className="text-neutral-600 text-sm">
          Effet hover avec lift et changement de couleur.
        </p>
      </div>
    </div>
  );
}

// ============================================
// TOOL CARD (Exemple complet)
// ============================================

interface ToolCardExampleProps {
  name: string;
  logo: string;
  banner: string;
  description: string;
  pricing: "Gratuit" | "Payant" | "Freemium" | "Essai Gratuit";
  isFeatured?: boolean;
}

export function ToolCardExample({
  name,
  logo,
  banner,
  description,
  pricing,
  isFeatured = false,
}: ToolCardExampleProps) {
  const pricingStyles = {
    Gratuit: "badge-success",
    Payant: "badge-error",
    Freemium: "badge-warning",
    "Essai Gratuit": "badge-info",
  };

  return (
    <div className="framer-card p-6 group cursor-pointer">
      {/* Header avec logo et infos */}
      <div className="flex items-center gap-4 mb-4">
        <img src={logo} alt={name} className="w-12 h-12 rounded-lg object-cover" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">{name}</h3>
            {isFeatured && (
              <span className="text-primary text-xs">⭐</span>
            )}
          </div>
          <span className={pricingStyles[pricing]}>{pricing}</span>
        </div>
      </div>

      {/* Banner */}
      <img 
        src={banner} 
        alt={`${name} banner`}
        className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
      />

      {/* Description */}
      <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
        {description}
      </p>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 bg-transparent border border-neutral-200 text-neutral-800 px-4 py-2 rounded-lg text-sm font-bold hover:bg-neutral-50 transition-all">
          En savoir plus
        </button>
        <button className="flex-1 bg-primary text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-600 transition-all">
          Visiter
        </button>
      </div>
    </div>
  );
}

// ============================================
// BADGES
// ============================================

export function BadgeExamples() {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Success */}
      <span className="badge-success">Gratuit</span>

      {/* Error */}
      <span className="badge-error">Payant</span>

      {/* Warning */}
      <span className="badge-warning">Freemium</span>

      {/* Info */}
      <span className="badge-info">Essai Gratuit</span>

      {/* Custom */}
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase bg-purple-light text-purple-dark border border-purple">
        Premium
      </span>
    </div>
  );
}

// ============================================
// INPUTS
// ============================================

export function InputExamples() {
  return (
    <div className="space-y-4 max-w-md">
      {/* Input standard */}
      <input
        type="text"
        placeholder="Rechercher..."
        className="input"
      />

      {/* Input avec label */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-neutral-400 mb-2">
          Email
        </label>
        <input
          type="email"
          placeholder="votre@email.com"
          className="w-full h-12 px-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Textarea */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-neutral-400 mb-2">
          Message
        </label>
        <textarea
          placeholder="Votre message..."
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all"
        />
      </div>
    </div>
  );
}

// ============================================
// HERO SECTION
// ============================================

export function HeroExample() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background avec grille */}
      <div className="absolute inset-0 bg-grid-fade" />
      
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      {/* Contenu */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white shadow-premium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wide text-neutral-500">
            Nouveau sur AI-STOCK
          </span>
        </motion.div>

        {/* Titre */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-black mb-6 text-balance">
          La plus grande communauté <br />
          <span className="text-primary italic">d'outils IA</span>
        </h1>

        {/* Description */}
        <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
          Découvrez, partagez et monétisez vos prompts, workflows et outils IA.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="btn-primary">
            Rejoindre AI-STOCK
          </button>
          <button className="btn-ghost">
            Découvrir les outils
          </button>
        </div>
      </div>
    </section>
  );
}
