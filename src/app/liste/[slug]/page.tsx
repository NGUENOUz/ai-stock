// src/app/liste/[slug]/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
// Importe getFeaturedTools et getRelatedAiToolsByCategory
import { AiTool } from '@/types/type';
import { AiToolCard } from '@/components/AiToolCard';
import { ThreeDMarquee } from "@/components/maquette"; // Pour le carrousel des suggestions
import { getAiToolBySlug, getFeaturedTools, getRelatedAiToolsByCategory } from '@/lib/supabase/services/service';
import HeaderComponent from '../../../components/header';
import "../../liste/style.scss"
import { AiToolCarousel } from '@/components/aiToolsCaroussel';


// Composant pour l'icône de vérification (si tu ne l'as pas déjà dans un fichier séparé)
const VerifiedIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25a4.49 4.49 0 0 1 3.397 1.549A4.49 4.49 0 0 0 16.5 4.5h1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h1.5c.621 0 1.125.504 1.125 1.125v1.125c0 .886.299 1.76.84 2.475l.17.224a4.49 4.49 0 0 1 .84 2.475v1.125c0 .621-.504 1.125-1.125 1.125h-1.5c-.621 0-1.125.504-1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.125a4.49 4.49 0 0 1-3.397 1.549A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549A4.49 4.49 0 0 0 7.5 19.5H6.375c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.625c-.621 0-1.125-.504-1.125-1.125V12.75a4.49 4.49 0 0 1-.84-2.475l-.17-.224A4.49 4.49 0 0 1 2.25 9.167V8.042c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125H7.5c.886 0 1.76-.299 2.475-.84l.224-.17ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
      clipRule="evenodd"
    />
  </svg>
);

interface AiToolDetailsPageProps {
  params: {
    slug: string;
  };
}

const AiToolDetailsPage = async ({ params }: AiToolDetailsPageProps) => {
  const { slug } = params;

  // Récupérer les détails de l'IA principale
  const { data: tool, error: toolError } = await getAiToolBySlug(slug);

  if (toolError || !tool) {
    notFound();
  }

  // Récupérer les IA en vogue pour la section "IA en Vogue de la Semaine"
  const { data: featuredTools, error: featuredError } = await getFeaturedTools(4); // Limite à 4

  // Récupérer les suggestions d'IA similaires par catégorie
  // Assurez-vous que votre fonction getRelatedAiToolsByCategory existe et fonctionne
  const { data: relatedTools, error: relatedError } = await getRelatedAiToolsByCategory(tool.categories, tool.id, 6); // Limite à 6 pour le carrousel

  return (
   <>
   <HeaderComponent/>
    <div className="container mx-auto px-4 py-8 text-neutral-200 mt-20">
      {/* Chemin de raccourci (Breadcrumbs) */}
      <nav className="mb-8 text-sm md:text-base">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/" className="text-blue-400 hover:text-blue-300">
              Accueil
            </Link>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          <li className="flex items-center">
            <Link href="/liste" className="text-blue-400 hover:text-blue-300">
              Liste des IA
            </Link>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          <li className="text-gray-400">
            {tool.name}
          </li>
        </ol>
      </nav>

      {/* Container principal des détails de l'IA */}
      <section className="bg-gray-900 rounded-xl p-8 shadow-lg mb-12 flex flex-col lg:flex-row gap-8">
        {/* Colonne de gauche (Bannière, Logo, Titre, Statut, Prix) */}
        <div className="lg:w-2/3 flex flex-col items-center lg:items-start">
          {tool.ban_url && (
            <div className="relative w-full h-full sm:h-64 rounded-lg overflow-hidden mb-6">
              <Image
                src={tool.ban_url}
                alt={`${tool.name} banner`}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                priority
              />
            </div>
          )}

         
        </div>

        {/* Colonne de droite (Description complète) */}
        <div className="lg:w-2/3">

         <div className="titleDescription flex flex-row gap-5 h-20 item-center">
           {tool.logo_url && (
            <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-700 flex items-center justify-center mb-4 fit-cover">
              <Image
                src={tool.logo_url}
                alt={`${tool.name} logo`}
                height={96}
                width={96}
                className="object-contain rounded-xl"
              />
            </div>


          )}
          
           <div className='flex flex-col'>
             <h1 className="text-3xl font-bold text-white text-center lg:text-left mb-2">{tool.name}</h1>
             <div className="flex items-center gap-2 mb-4">
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
                <VerifiedIcon className="ml-1 w-4 h-4" />
              </span>
            )}
          </div>
         </div>
         
             
          {tool.website_url && (
            <a
              href={tool.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-1 py-1 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white text-lg font-bold hover:from-emerald-600 hover:to-green-600 transition-colors duration-200 flex items-center justify-center mt-0 pt-0"
            >
              Visiter le site officiel
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          )}
         </div>

          <h2 className="text-2xl font-semibold text-white mb-4">Description</h2>
          <p className="text-neutral-300 text-base leading-relaxed">
            {tool.description_long || tool.description_short || "Aucune description complète disponible pour le moment."}
          </p>

          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-3">Fonctionnalités Clés</h3>
            <ul className="list-disc list-inside text-neutral-300 ml-4">
              <li>Gestion de projet intuitive</li>
              <li>Collaboration en temps réel</li>
              <li>Intégration avec d'autres outils</li>
              <li>Personnalisation avancée</li>
            </ul>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-3">Cas d'Utilisation</h3>
            <ul className="list-disc list-inside text-neutral-300 ml-4">
              <li>Organisation de notes et documents</li>
              <li>Suivi de tâches et de projets personnels</li>
              <li>Création de bases de données et de wikis d'équipe</li>
              <li>Planification de contenu et de marketing</li>
            </ul>
          </div>
          
        </div>
      </section>

      {/* Section "IA en Vogue de la Semaine" */}
      {featuredTools && featuredTools.length > 0 && (
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            IA en Vogue de la Semaine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"> {/* Utilise justify-items-center pour centrer les cartes */}
            {featuredTools.map((featuredTool) => (
              <AiToolCard key={featuredTool.id} tool={featuredTool} />
            ))}
          </div>
        </section>
      )}

      {/* Bouton pour visiter la liste complète des IA */}
      <div className="mt-12 text-center">
        <Link href="/liste" className="inline-flex items-center text-blue-400 hover:text-blue-500 text-lg px-6 py-3 rounded-xl border border-blue-400 hover:border-blue-500 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Voir toutes les IA
        </Link>
      </div>

      
        <section className="mt-16">
          

         {tool.categories && tool.categories.length > 0 && (
    <AiToolCarousel
      title="Autres outils que d'autres personnes comme toi ont également consulté"
      categoryId={tool.categories} // Passe le tableau des catégories
      currentToolId={tool.id} // Exclut l'outil actuel
      limit={8} // Combien d'IA similaires à afficher
      
    />
  )}
        
        </section>
      
    </div>
   </>
  );
};

export default AiToolDetailsPage;