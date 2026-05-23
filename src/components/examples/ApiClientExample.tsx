"use client";

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { AiTool } from '@/types/type';

/**
 * Exemple d'utilisation du nouveau client API
 * Ce composant remplace l'ancien appel direct à Supabase
 */
export function ToolsListExample() {
  const [tools, setTools] = useState<AiTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTools() {
      try {
        setLoading(true);
        
        // ✅ NOUVEAU : Utilisation du client API
        const result = await apiClient.getTools({
          search: '',
          categories: [],
          page: 1,
          limit: 12,
          sort_by: 'created_at',
          sort_order: 'desc',
        });

        setTools(result.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTools();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      <h2>Liste des outils ({tools.length})</h2>
      <div className="grid grid-cols-3 gap-4">
        {tools.map((tool) => (
          <div key={tool.id} className="border p-4 rounded">
            <h3>{tool.name}</h3>
            <p>{tool.description_short}</p>
            <span className="badge">{tool.pricing}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Exemple : Récupérer les outils en vedette
 */
export function FeaturedToolsExample() {
  const [tools, setTools] = useState<AiTool[]>([]);

  useEffect(() => {
    async function fetchFeatured() {
      // ✅ NOUVEAU : API client
      const featured = await apiClient.getFeaturedTools(4);
      setTools(featured);
    }

    fetchFeatured();
  }, []);

  return (
    <div>
      {tools.map((tool) => (
        <div key={tool.id}>{tool.name}</div>
      ))}
    </div>
  );
}

/**
 * Exemple : Récupérer un outil par slug
 */
export async function getToolDetails(slug: string) {
  try {
    // ✅ NOUVEAU : API client
    const tool = await apiClient.getToolBySlug(slug);
    return tool;
  } catch (error) {
    console.error('Erreur:', error);
    return null;
  }
}
