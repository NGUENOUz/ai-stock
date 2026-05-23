"use client";

import { useEffect, useState } from "react";
import { ToolCard } from "./ToolCard";
import { apiClient } from "@/lib/api-client";
import { AiTool } from "@/types/type";

/**
 * ✅ VERSION MIGRÉE : ToolsGrid avec API-First
 * 
 * AVANT : Données statiques hardcodées
 * MAINTENANT : Données dynamiques depuis l'API
 */
export const ToolsGridMigrated = () => {
  const [tools, setTools] = useState<AiTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTools() {
      try {
        setLoading(true);
        
        // ✅ NOUVEAU : Utilisation du client API
        const result = await apiClient.getTools({
          is_featured: true, // Seulement les outils en vedette
          limit: 6,
          sort_by: 'created_at',
          sort_order: 'desc',
        });

        setTools(result.data);
      } catch (err: any) {
        console.error('Erreur lors du chargement des outils:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTools();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-6 py-24">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-6 py-24">
        <div className="text-center text-red-500">
          <p>Erreur lors du chargement des outils</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-black tracking-tight mb-4">
            Les outils IA qui <span className="text-primary italic">dominent</span> le marché
          </h2>
          <p className="text-neutral-500 text-lg">
            Notre sélection rigoureuse des meilleures solutions pour booster votre productivité.
          </p>
        </div>
        <button className="px-6 py-3 rounded-full border border-neutral-200 font-bold hover:bg-neutral-50 transition-all">
          Voir tout l'annuaire
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            title={tool.name}
            category={tool.categories?.[0] || 'Non catégorisé'}
            description={tool.description_short || 'Aucune description disponible'}
            rating={4.5} // À calculer depuis la business logic plus tard
          />
        ))}
      </div>

      {tools.length === 0 && (
        <div className="text-center text-neutral-500 py-12">
          Aucun outil disponible pour le moment
        </div>
      )}
    </section>
  );
};
