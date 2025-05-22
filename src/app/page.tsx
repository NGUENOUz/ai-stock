// pages/index.tsx
"use client"
import { useEffect, useState } from 'react';

import type { NextPage } from 'next';
import type { AiToolCategory, AiTool } from '../types/type';
import { getPopularCategories,getLatestTools } from '@/lib/supabase/services/service';

const Home: NextPage = () => {
  const [popularCategories, setPopularCategories] = useState<AiToolCategory[]>([]);
  const [latestTools, setLatestTools] = useState<AiTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHomePageData() {
      setLoading(true);
      setError(null);

      try {
        const { data: popularCategoriesData, error: popularCategoriesError } = await getPopularCategories(5);
        if (popularCategoriesError) {
          console.error('Erreur lors de la récupération des catégories populaires :', popularCategoriesError);
          setError('Erreur lors du chargement des données.');
        } else {
          setPopularCategories(popularCategoriesData || []);
        }

        const { data: latestToolsData, error: latestToolsError } = await getLatestTools(8);
        if (latestToolsError) {
          console.error('Erreur lors de la récupération des derniers outils :', latestToolsError);
          setError('Erreur lors du chargement des données.');
        } else {
          setLatestTools(latestToolsData || []);
        }
      } catch (err) {
        console.error('Erreur inattendue lors de la récupération des données :', err);
        setError('Erreur inattendue lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    }

    fetchHomePageData();
  }, []);

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Le plus grand annuaire d'IA au monde</h1>
        <p className="text-lg text-gray-700 mb-6">Découvrez les IA qui vont transformer votre travail.</p>
        <input type="text" placeholder="Rechercher des outils IA..." className="w-full md:w-1/2 px-4 py-2 border rounded-md" />
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Catégories Populaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {popularCategories.map(category => (
            <div key={category.id} className="bg-gray-100 rounded-md p-4 text-center">
              <a href={`/outils?category=${category.slug}`} className="text-blue-500 hover:underline">{category.name}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Derniers Outils Ajoutés</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestTools.map(tool => (
            <div key={tool.id} className="bg-white rounded-md shadow-md p-4">
              <div className="flex items-center mb-2">
                {tool.logo_url && <img src={tool.logo_url} alt={`${tool.name} logo`} className="w-8 h-8 mr-2" />}
                <h3 className="text-xl font-semibold"><a href={`/tools/${tool.slug}`} className="text-blue-500 hover:underline">{tool.name}</a></h3>
              </div>
              {tool.description_short && <p className="text-gray-600 text-sm">{tool.description_short}</p>}
            </div>
          ))}
        </div>
      </section>

      <div className="text-center">
        <a href="/outils" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
          Découvrez tous les outils IA
        </a>
      </div>
    </div>
  );
};

export default Home;