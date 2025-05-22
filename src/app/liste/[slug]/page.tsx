// src/app/liste/[slug]/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation'; // Pour gérer le cas où l'IA n'est pas trouvée

import { AiTool } from '@/types/type'; // Assure-toi que le chemin est correct
import { AiToolCard } from '@/components/AiToolCard'; // Réutiliser la carte pour les suggestions
import { getAiToolBySlug ,getRelatedAiTools } from '@/lib/supabase/services/service';

// Définis les props que cette page recevra (les paramètres de la route dynamique)
interface AiToolDetailsPageProps {
  params: {
    slug: string;
  };
}

// Composant de la page de détails
const AiToolDetailsPage = async ({ params }: AiToolDetailsPageProps) => {
  const {slug} = params;

  // 1. Récupérer les détails de l'IA principale
  const { data: tool, error: toolError } = await getAiToolBySlug(slug);

  if (toolError || !tool) {
    // Si l'IA n'est pas trouvée, afficher une page 404
    notFound();
  }

  // 2. Récupérer les suggestions d'IA similaires
  // Pour l'exemple, nous allons récupérer d'autres IA qui sont "featured"
  // ou qui partagent potentiellement une catégorie si tu as implémenté les catégories.
  // Limite à 3 suggestions, et exclue l'IA actuelle.
  const { data: relatedTools, error: relatedError } = await getRelatedAiTools(tool.id, 3); // La fonction prendra l'ID de l'outil et une limite

  return (
    <div className="container mx-auto px-4 py-8 text-neutral-200">
      {/* Section Détails de l'IA principale */}
      <section className="bg-gray-900 rounded-xl p-8 shadow-lg mb-12">
        {tool.ban_url && (
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={tool.ban_url}
              alt={`${tool.name} banner`}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
              priority // Charger la bannière en priorité
            />
          </div>
        )}

        <div className="flex items-center mb-6">
          {tool.logo_url && (
            <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-700 flex items-center justify-center mr-4">
              <Image
                src={tool.logo_url}
                alt={`${tool.name} logo`}
                height={80}
                width={80}
                className="object-contain rounded-xl"
              />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{tool.name}</h1>
            <div className="flex items-center gap-2 mb-2">
              <span className={`
                inline-block px-3 py-1 rounded-full text-sm font-semibold
                border-2 border-solid
                ${
                  tool.pricing === 'Gratuit' ? 'bg-green-500 text-green-900 border-green-700' :
                  tool.pricing === 'Essai Gratuit' ? 'bg-blue-500 text-blue-900 border-blue-700' :
                  tool.pricing === 'Freemium' ? 'bg-purple-500 text-purple-900 border-purple-700' :
                  tool.pricing === 'Payant' ? 'bg-red-500 text-red-900 border-red-700' :
                  'bg-gray-500 text-gray-900 border-gray-700'
                }
              `}>
                {tool.pricing || 'Non spécifié'}
              </span>
              {tool.is_featured && (
                <span className="flex items-center text-sm text-orange-500 px-2 py-1 rounded-full bg-gray-800">
                  Vérifié
                  {/* Remplace par ton icône VerifiedIcon réelle */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-1 w-4 h-4">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25a4.49 4.49 0 0 1 3.397 1.549A4.49 4.49 0 0 0 16.5 4.5h1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h1.5c.621 0 1.125.504 1.125 1.125v1.125c0 .886.299 1.76.84 2.475l.17.224a4.49 4.49 0 0 1 .84 2.475v1.125c0 .621-.504 1.125-1.125 1.125h-1.5c-.621 0-1.125.504-1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.125a4.49 4.49 0 0 1-3.397 1.549A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549A4.49 4.49 0 0 0 7.5 19.5H6.375c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.625c-.621 0-1.125-.504-1.125-1.125V12.75a4.49 4.49 0 0 1-.84-2.475l-.17-.224A4.49 4.49 0 0 1 2.25 9.167V8.042c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125H7.5c.886 0 1.76-.299 2.475-.84l.224-.17ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>
            {tool.website_url && (
              <a
                href={tool.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500 flex items-center text-lg mt-2"
              >
                Visiter le site officiel
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <p className="text-neutral-300 text-lg mb-6">{tool.description_short}</p>

        {/* Placeholder pour une description complète si tu en as une */}
        {/* <div className="prose dark:prose-invert text-neutral-300">
          <h2 className="text-2xl font-semibold text-white mb-4">Description Complète</h2>
          <p>{tool.description_long}</p>
          // Tu pourrais avoir plus de contenu ici, des captures d'écran, etc.
        </div> */}

        {/* Ajoutez d'autres détails ici si tu les as dans ta base de données, par exemple :
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Caractéristiques Clés</h2>
          <ul className="list-disc list-inside text-neutral-300 ml-4">
            <li>Caractéristique 1</li>
            <li>Caractéristique 2</li>
          </ul>
        </div>
        */}

      </section>

      {/* Section Suggestions */}
      {relatedTools && relatedTools.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Autres IA que vous pourriez aimer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedTools.map((relatedTool) => (
              <AiToolCard key={relatedTool.id} tool={relatedTool} />
            ))}
          </div>
        </section>
      )}

      {/* Bouton pour revenir à la liste */}
      <div className="mt-12 text-center">
        <Link href="/liste" className="inline-flex items-center text-blue-400 hover:text-blue-500 text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Retour à la liste des IA
        </Link>
      </div>
    </div>
  );
};

export default AiToolDetailsPage;

// Fonction pour générer les chemins statiques si tu utilises generateStaticParams
// export async function generateStaticParams() {
//   const { data: tools } = await supabase.from('ai_tools').select('slug');
//   return tools?.map((tool) => ({
//     slug: tool.slug,
//   })) || [];
// }