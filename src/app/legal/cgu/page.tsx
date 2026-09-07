"use client";

import React from "react";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <PageTransitionWrapper>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour à l'accueil
          </Link>
          
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Conditions Générales d'Utilisation (CGU / CGV)</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2>1. Objet</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation ont pour objet de définir les modalités de mise à disposition des services du site AI-STOCK, ainsi que les conditions d'utilisation de ces services par l'utilisateur.
            </p>

            <h2>2. Accès aux services</h2>
            <p>
              L'accès à certaines sections de la plateforme (comme le Feed communautaire ou la soumission de prompts) nécessite la création d'un compte utilisateur. Vous vous engagez à fournir des informations exactes lors de votre inscription.
            </p>

            <h2>3. Propriété intellectuelle</h2>
            <p>
              Le contenu publié sur AI-STOCK (design, textes, images de la plateforme) est protégé par le droit d'auteur. 
              En publiant du contenu sur le Feed ou en soumettant des prompts, vous accordez à AI-STOCK une licence non exclusive pour utiliser, afficher et distribuer ce contenu sur la plateforme.
            </p>

            <h2>4. Règles de conduite</h2>
            <p>
              Les utilisateurs s'engagent à ne pas publier de contenu offensant, illégal, diffamatoire ou enfreignant les droits de tiers. AI-STOCK se réserve le droit de modérer, modifier ou supprimer tout contenu ne respectant pas ces règles.
            </p>

            <h2>5. Responsabilité</h2>
            <p>
              AI-STOCK s'efforce de fournir des informations précises sur les outils IA, mais ne garantit pas l'exactitude ou l'exhaustivité de ces informations. L'utilisation des outils répertoriés se fait sous votre propre responsabilité.
            </p>

            <h2>6. Modification des CGU</h2>
            <p>
              AI-STOCK se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés des changements importants.
            </p>
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
}
